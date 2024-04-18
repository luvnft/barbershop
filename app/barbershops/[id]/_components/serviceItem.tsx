"use client"
import { Service } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button";
import { intlFormat } from "date-fns";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "../_helpers/hours";
interface ServiceItemsProps {
    service: Service;
    isAuthenticated?: boolean;
}
const ServiceItem = ({ service, isAuthenticated }: ServiceItemsProps) => {
    const [date, setDate] = useState<Date | undefined>(new Date())
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

                                <SheetContent className="p-0">
                                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                        <h1>Reservar</h1>
                                    </SheetHeader>
                                    <style>{`.rdp-caption_start { width: 100%!important }`}</style>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={handleDateClick}
                                        className="rounded-md border w-full lg-max-w-[100%] rdp-caption_start"
                                        locale={ptBR}
                                        fromDate={new Date()}
                                        styles={{
                                            head_cell: {
                                                width: "100%",
                                                textTransform: "capitalize",
                                            },
                                            cell: { width: "100%" },
                                            button: { width: "100%" },
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