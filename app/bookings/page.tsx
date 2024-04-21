import { getServerSession } from 'next-auth'
import Header from '../_components/header'
import authOptions from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import BookingItem from '../_components/bookingItem';
import { db } from '../_lib/prisma';
import { isFuture, isPast } from 'date-fns';


export const BookingsPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
        return redirect('/');
    }
    const bookings = await db.booking.findMany({
        where: {
            userId: (session.user as any).id
        }, include: {
            service: true,
            barbershop: true,
        }
    })
    const confirmedBookings = bookings.filter(booking => isFuture(booking.date))
    const finishedBookings = bookings.filter(booking => isPast(booking.date))

    return (
        <>
            <Header />
            <div className="px-5 py-6">
                <h1 className='text-xl font-bold'>Agendamentos</h1>
                <h4 className={` text-sm text-gray-400 uppercase font-bold mt-6 mb-3`}>Próximos</h4>
                <div className={`flex flex-col gap-3 mt-5`}>
                    {confirmedBookings.map((booking) => {
                        return (
                            <BookingItem key={booking.id} booking={booking} />
                        )
                    })}
                </div>
                <h4 className={` text-sm text-gray-400 uppercase font-bold mt-6 mb-3`}>Finalizados</h4>

                <div className={`flex flex-col gap-3 mt-5`}>
                    {finishedBookings.map((booking) => {
                        return (
                            <BookingItem key={booking.id} booking={booking} />
                        )
                    })}
                </div>

            </div>
        </>
    )
}
export default BookingsPage