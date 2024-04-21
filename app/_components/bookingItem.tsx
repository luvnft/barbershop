import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Booking, Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true;
            barbershop: true;
        }
    }>;
}
const BookingItem = ({ booking }: BookingItemProps) => {
    const isBookingConfirmed = isFuture(booking.date);
    return (
        <Card>
            <CardContent className="pl-5 pr-0 py-0 flex justify-between">
                <div className="flex flex-col gap-2 py-5">
                    {isBookingConfirmed ? (
                        <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">Agendado</Badge>
                    ) : (<Badge className="bg-secondary text-gray-400 hover:bg-secondary w-fit">Finalizado</Badge>)}

                    <h2 className="font-bold">{booking.service.name}</h2>
                    <div className="flex align-center items-center">
                        <Avatar className="h-6 w-6">
                            <AvatarImage src={booking.barbershop.imageUrl} />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <h3 className="ml-2">{booking.barbershop.name}</h3>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center border-l border-solid border-secondary px-6">
                    <p className="text-sm capitalize">{format(booking.date, "MMMM", {
                        locale: ptBR,
                    })}</p>
                    <p className="text-2xl">{format(booking.date, "dd", {
                        locale: ptBR,
                    })}</p>
                    <p className="text-sm">{format(booking.date, "HH':'mm", {
                        locale: ptBR,
                    })}</p>
                </div>
            </CardContent>
        </Card>
    )
}
export default BookingItem