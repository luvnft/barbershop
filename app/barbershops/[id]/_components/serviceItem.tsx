"use client"
import { Service } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "@/app/_components/ui/card"
import { Button } from "@/app/_components/ui/button";
import { intlFormat } from "date-fns";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface ServiceItemsProps {
    service: Service;
    isAuthenticated?: boolean;
}
const ServiceItem = ({ service, isAuthenticated }: ServiceItemsProps) => {
    const router = useRouter();
    const handleBookingClick = () => {
        if (!isAuthenticated) {
            return signIn('google');
        }
        //todo abrir modal de agendamento
        confirm('reservar')

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
                            <Button className="bg-secondary" onClick={handleBookingClick}>
                                Reservar
                            </Button>

                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}
export default ServiceItem