"use client"
import { Barbershop, Booking, Service } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button";
import { intlFormat, setHours, setMinutes } from "date-fns";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTrigger } from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { useEffect, useMemo, useState } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "../_helpers/hours";
import { Loader2 } from "lucide-react"
import { saveBooking } from "../_actions/save-bookings";
import { toast } from "sonner";
import { getDayBookings } from "../_actions/get-day-bookings";
import { now } from "next-auth/client/_utils";
interface ServiceItemsProps {
    barbershop: Barbershop
    service: Service;
    isAuthenticated?: boolean;
}
const ServiceItem = ({ service, barbershop, isAuthenticated }: ServiceItemsProps) => {
    const { data } = useSession();
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [hour, setHour] = useState<string | undefined>()
    const [submitIsLoading, setSubmitIsLoading] = useState<boolean>(false)
    const [sheetIsOpen, setSheetIsOpen] = useState(false);
    const [dayBookings, setDayBookings] = useState<Booking[]>([])

    const router = useRouter();
    useEffect(() => {
        if (!date) {
            return
        }
        const refreshAvailableHours = async () => {
            const _dayBookings = await getDayBookings(barbershop.id, date);
            setDayBookings(_dayBookings);
        }
        refreshAvailableHours();
    }, [date])
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


    }
    const timeList = useMemo(() => {
        if (!date) {
            return []
        }
        return generateDayTimeList(date).filter(time => {
            //time : "09:00"
            //se houver alguma reserva em "daybookings" com a hora e minuto igual ao time não incluir
            const timeHour = Number(time.split(":")[0]);
            const timeMinutes = Number(time.split(":")[1]);

            const booking = dayBookings.find((booking) => {
                const bookingHour = booking.date.getHours();
                const bookingMinutes = booking.date.getMinutes();
                return bookingHour == timeHour && bookingMinutes == timeMinutes;
            });
            if (!booking) {
                return true;
            }

            return false

        })

    }, [date, dayBookings]);

    const handleBookingSubmit = async () => {
        setSubmitIsLoading(true)
        try {
            if (!hour || !date || !data?.user) { return }

            //how hour is "09:45" on string format and we need to format that to UTF
            const formatedHour = Number(hour.split(':')[0]);
            const formatedMins = Number(hour.split(':')[1]);
            const newDate = setMinutes(setHours(date, formatedHour), formatedMins)
            const currentDate = new Date().getTime()
            const formingHour = new Date().setTime(Number(newDate));
            const openTime = new Date().setTime(9)
            const closeTime = new Date().setTime(21)
            // const currentDay = new Date().getDate();
            // const bkDay = new Date(date).getDay();
            // console.log(bkDay);
            // console.log(currentDay);

            if (formingHour >= currentDate && (formingHour < closeTime || formingHour > openTime)) {


                await saveBooking({
                    serviceId: service.id,
                    barbershopId: barbershop.id,
                    date: newDate,
                    userId: (data.user as any).id
                });
                setSheetIsOpen(false)
                setDate(undefined)
                setHour(undefined)
                toast("Reserva realizada com sucesso", {
                    className: 'justify-between',
                    description: `${format(newDate, "dd 'de' MMMM 'às' HH':'mm'.' ", { locale: ptBR })}`,
                    action: <Button className={`bg-primary`} onClick={() => router.push('/bookings')}>Visualizar</Button>,
                })
            } else {


                setSheetIsOpen(false)
                setDate(undefined)
                setHour(undefined)
                toast("Data ou Horário não permitido", {
                    className: 'justify-between',
                    description: `${format(newDate, "dd 'de' MMMM 'às' HH':'mm'.' ", { locale: ptBR })}`,

                })
            }


        } catch (error) {
            console.log(error)
        } finally {
            setSubmitIsLoading(false)
        }

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
                            <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                                <SheetTrigger asChild>
                                    <Button className="bg-secondary font-bold" onClick={handleBookingClick}>
                                        Reservar
                                    </Button>
                                </SheetTrigger>
                                {isAuthenticated && (<SheetContent className="p-0 h-full">
                                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                        <h1>Fazer Reservar</h1>
                                    </SheetHeader>
                                    <style>{`.rdp-caption_start { width: 100%!important } td{ border-radius:100%!important;background-color:inherit!important;}`}</style>
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={handleDateClick}
                                        className="rounded-md border-y w-full lg-max-w-[100%] rdp-caption_start py-5"
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
                                    <SheetFooter className="absolute w-full justify-center flex h-fit-content bottom-3 px-5">
                                        <Button className="px-5 w-full bottom" disabled={(!hour || !date || submitIsLoading)} onClick={handleBookingSubmit}>
                                            {submitIsLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            Confirmar Reserva</Button>
                                    </SheetFooter>
                                </SheetContent>)}

                            </Sheet>

                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}
export default ServiceItem