import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { BarbershopHeaderContent } from "./_components/barbershopHeaderContent";
import ServiceItem from "./_components/serviceItem";



interface BarbershopsPageProps {
    params: { id?: string };
}
const BarbershopsPage = async ({ params }: BarbershopsPageProps) => {


    if (!params.id) {
        return null
    }
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id
        },
        include: {
            services: true,
        }

    });
    if (!barbershop) {
        return null;
    }

    return (
        <div>
            <BarbershopHeaderContent barbershop={barbershop} />
            <div className="flex flex-col gap-2  px-5 py-6">
                {barbershop.services.map((service) => {
                    return (
                        <ServiceItem key={service.id} service={service} />
                    )
                })}
            </div>
        </div>
    );
}

export default BarbershopsPage;