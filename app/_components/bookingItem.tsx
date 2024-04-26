"use client"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Booking, Prisma } from "@prisma/client"
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button"
import { cancelBooking } from "../_actions/cancel-booking"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2 } from "lucide-react"

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true;
            barbershop: true;
        }
    }>;
}
const BookingItem = ({ booking }: BookingItemProps) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const isBookingConfirmed = isFuture(booking.date);

    const handleCancelClick = async () => {
        setIsDeleteLoading(true)
        try {
            await cancelBooking(booking.id);
            toast.success("Reserva cancelada com sucesso")
        } catch (error) {

        } finally {
            setIsDeleteLoading(false);
        }
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Card className="min-w-[95%]">
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
            </SheetTrigger>
            <SheetContent>
                <SheetHeader >
                    <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
                </SheetHeader>
                <div className={`relative w-full h-fit mt-5`}>
                    <Card className="flex items-center justify-start">
                        <CardContent className="flex items-center gap-2 px-5 py-5 justify-start">
                            <Avatar>
                                <AvatarImage src={booking.barbershop.imageUrl} />

                            </Avatar>
                            <div className="flex flex-col justify-start">
                                <h1>{booking.barbershop.name}</h1>
                                <span className="text-sm overflow-hidden text-ellipsis text-nowrap text-gray-400">{booking.barbershop.address}</span>
                            </div>

                        </CardContent>
                    </Card>

                </div>

                <div className="pt-3">{isBookingConfirmed ? (<Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">Agendado</Badge>) : (<Badge className="bg-secondary text-white hover:bg-secondary w-fit">Finalizado</Badge>)}</div>
                <div className="py-3 ">

                    <Card>
                        <CardContent className=" flex flex-col p-2 gap-2">
                            <div className="flex justify-between">
                                <h2>{booking.service.name}</h2>
                                <span>{Intl.NumberFormat("pt-BR", {
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(Number(booking.service.price))}</span>
                            </div>
                            {booking.date && (
                                <div className="flex justify-between">
                                    <h1 className="text-gray-400 text-sm">Data</h1>
                                    <h4 className="text-sm">{format(booking.date, "dd 'de' MMMM", { locale: ptBR })}</h4>
                                </div>
                            )}

                            <div className="flex justify-between">
                                <h1 className="text-gray-400 text-sm">Horário</h1>
                                <h4 className="text-sm">{format(booking.date, "hh:mm", { locale: ptBR })}</h4>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="absolute w-full justify-center gap-2 bottom-0 left-0 flex h-fit-content px-5">
                    <SheetClose asChild><Button className="relative bg-secondary bottom-3 w-full hover:bg-secondary ">
                        Voltar</Button></SheetClose>
                    <Button className="relative bg-red-600 bottom-3 w-full hover:bg-red-500" onClick={handleCancelClick} disabled={!isBookingConfirmed || isDeleteLoading}>
                        {isDeleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Cancelar Reserva</Button>
                </div>

            </SheetContent>
        </Sheet >
    )
}
export default BookingItem