"use client"
import { Barbershop, Service } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button";
import { intlFormat } from "date-fns";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "../_helpers/hours";
interface ServiceItemsProps {
    barbershop: Barbershop
    service: Service;
    isAuthenticated?: boolean;
}
const ServiceItem = ({ service, barbershop, isAuthenticated }: ServiceItemsProps) => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [hour, setHour] = useState<string | undefined>()
    const router = useRouter();
    const handleDateClick = (date: Date | undefined) => {
        setDate(date);
        setHour(undefined)
    }
    const handleHourClick = (time: string | undefined) => {
        setHour(time);
    }

    const handleBookingClick = () => {
        if (!isAuthenticated) {
            return signIn('google');
        }
        //todo abrir modal de agendamento
        // confirm('reservar')

    }
    const timeList = useMemo(() => {
        return date ? generateDayTimeList(date) : [];
    }, [date]);

    const handleSheetBookingClick = () => {
        confirm('reservando')
    }
    return (
        <Card>
            <CardContent className="p-3 w-full">
                <div className="flex items-center w-full">
                    <div className="relative min-h-[110px] min-w-[110px] max-w-[110px] max-h-[110px] items-center flex">
                        <Image className="rounded-lg" alt={service.name} src={service.imageUrl} style={{ objectFit: 'contain' }} fill />
                    </div>
                    <div className="flex flex-col px-2 w-full">
                        <h1>{service.name}</h1>
                        <p className="text-sm text-gray-400">{service.description}</p>
                        <div className="flex justify-between items-center w-full mt-2 mb-0">
                            <p>{Intl.NumberFormat("pt-BR", {
                                style: 'currency',
                                currency: 'BRL'
                            }).format(Number(service.price))}</p>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button className="bg-secondary" onClick={handleBookingClick}>
                                        Reservar
                                    </Button>
                                </SheetTrigger>

                                <SheetContent className="p-0 h-full">
                                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                        <h1>Reservar</h1>
                                    </SheetHeader>
                                    <style>{`.rdp-caption_start { width: 100%!important } td{ border-radius:100%!important;background-color:inherit!important;}`}</style>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={handleDateClick}
                                        className="rounded-md border-y w-full lg-max-w-[100%] rdp-caption_start"
                                        locale={ptBR}
                                        fromDate={new Date()}

                                        styles={{
                                            head_cell: {
                                                width: "100%",
                                                textTransform: "capitalize",
                                            },
                                            cell: { width: "100%" },
                                            button: { borderRadius: "100%" },
                                            nav_button_next: { width: '32px', height: '32px' },
                                            nav_button_previous: { width: '32px', height: '32px' },
                                            caption: { textTransform: "capitalize" }

                                        }}
                                    />
                                    {date && (
                                        <div className=" flex overflow-x-auto gap-2 [&::-webkit-scrollbar]:hidden py-6 px-5 border-y border-solid border-secondary">
                                            {timeList.map((time) => {
                                                return (
                                                    <Button onClick={() => { handleHourClick(time) }} key={time} variant={hour == time ? 'default' : 'outline'} className={`text-white rounded-full `}>
                                                        {time}
                                                    </Button>
                                                )
                                            })}
                                        </div>
                                    )}

                                    <div className="py-3 px-5 border-t border-solid border-secondary">
                                        <Card>
                                            <CardContent className=" flex flex-col p-2 gap-2">
                                                <div className="flex justify-between">
                                                    <h2>{service.name}</h2>
                                                    <span>{Intl.NumberFormat("pt-BR", {
                                                        style: 'currency',
                                                        currency: 'BRL'
                                                    }).format(Number(service.price))}</span>
                                                </div>
                                                {date && (
                                                    <div className="flex justify-between">
                                                        <h1 className="text-gray-400 text-sm">Data</h1>
                                                        <h4 className="text-sm">{format(date, "dd 'de' MMMM", { locale: ptBR })}</h4>
                                                    </div>
                                                )}
                                                {hour && (
                                                    <div className="flex justify-between">
                                                        <h1 className="text-gray-400 text-sm">Horário</h1>
                                                        <h4 className="text-sm">{hour}</h4>
                                                    </div>
                                                )}
                                                <div className="flex justify-between">
                                                    <h1 className="text-gray-400 text-sm">Barbearia</h1>
                                                    <h4 className="text-sm text-gray-">{barbershop.name}</h4>
                                                </div>

                                            </CardContent>
                                        </Card>
                                    </div>
                                    <SheetFooter className="relative w-full justify-center flex h-fit-content px-5">
                                        <Button className="absolute w-[89%] bottom ">Reservar</Button>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>

                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}
export default ServiceItem