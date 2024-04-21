import { getServerSession } from 'next-auth'
import Header from '../_components/header'
import authOptions from '../api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';
import BookingItem from '../_components/bookingItem';
import { db } from '../_lib/prisma';
import { isFuture, isPast } from 'date-fns';


const BookingsPage = async () => {
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
    const countBookings = bookings.length;
    const [confirmedBookings, finishedBookings] = await Promise.all([
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    gte: new Date(),
                },
            },
            include: {
                service: true,
                barbershop: true,
            },
        }),
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    lt: new Date(),
                },
            },
            include: {
                service: true,
                barbershop: true,
            },
        }),
    ]);
    const countConfirmedBooking = confirmedBookings.length;
    const countFinishedBooking = finishedBookings.length

    return (
        <>
            <Header />
            <div className="px-5 py-6">
                <div className={`flex justify-between items-center`}><h1 className='text-xl font-bold'>Agendamentos</h1>
                    <h4 className="text-sm text-gray-400">
                        ({countBookings}) Total
                    </h4>
                </div>
                <div className={`flex justify-between items-center`}>
                    <h4 className={` text-sm text-gray-400 uppercase font-bold mt-6 mb-3`}>Próximos</h4>
                    <h4 className="text-sm text-gray-400">
                        ({countConfirmedBooking}) Agendamentos
                    </h4>
                </div>
                <div className={`flex flex-col gap-3 mt-5`}>
                    {confirmedBookings.map((booking) => {
                        return (
                            <BookingItem key={booking.id} booking={booking} />
                        )
                    })}
                </div>
                <div className={`flex justify-between items-center mt-5`}><h4 className={` text-sm text-gray-400 uppercase font-bold mt-6 mb-3`}>Finalizados</h4>
                    <h4 className="text-sm text-gray-400">
                        ({countFinishedBooking}) Finalizados
                    </h4>
                </div>
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