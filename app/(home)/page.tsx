import Image from "next/image"
import Header from "../_components/header"
import { format, isFuture } from "date-fns"
import { ptBR } from "date-fns/locale"
import Search from "./_components/search"
import BookingItem from "../_components/bookingItem"
import { db } from "../_lib/prisma"
import BarbershopItem from "./_components/barberItem"
import { ShowName } from "./_components/showname"
import { getServerSession } from "next-auth"
import authOptions from "../api/auth/[...nextauth]/options"
import Link from "next/link"


export default async function Home() {
    const session = await getServerSession(authOptions)
    //chamar prisma e chamar barbearia 
    // porque estamos usando o serverside
    const [barbershops, recommendedBarbershops, confirmedBookings] = await Promise.all([
        db.barbershop.findMany({}),
        db.barbershop.findMany({
          orderBy: {
            id: "asc",
          },
        }),
        session?.user
          ? db.booking.findMany({
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
            })
          : Promise.resolve([]),
      ]);
      


    return (

        <div className={`dark mb-28`}>
            <Header />
            <div className="px-5 pt-5">
                <ShowName />
                <p className="capitalize font-thin text-sm">{format(new Date(), "EEEE',' dd 'de' MMMM", {
                    locale: ptBR,
                })}</p>
            </div>
            <div className="mt-4 px-5">
                <Search />
            </div>
            <div className="mt-5">
                {confirmedBookings.length > 0 ? (<div className={`flex justify-between px-5`}><h3 className=" text-sm uppercase font-bold text-gray-400 mb-5">Agendamentos</h3> <Link className="text-sm text-gray-400" href="/bookings">Ver tudo</Link></div>) : ''}

                <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden px-5">
                    {confirmedBookings.map((booking) => {
                        return (
                            <BookingItem key={booking.id} booking={booking} />
                        )
                    })}
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-sm uppercase font-bold text-gray-400 mb-5 px-5">🫶🏽 CO-SIGN</h2>
                <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {barbershops.map((barbershop) => {
                        return (
                            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                        )
                    })}
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-sm uppercase font-bold text-gray-400 mb-5 px-5">🔥 TRENDING</h2>
                <div className="flex px-5 gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                    {recommendedBarbershops.map((barbershop) => {
                        return (
                            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                        )
                    })}
                </div>
            </div>
        </div>

    )
}
