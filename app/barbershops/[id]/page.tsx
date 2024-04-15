
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { BarbershopHeaderContent } from "./_components/barbershopHeaderContent";
import ServiceItem from "./_components/serviceItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";



interface BarbershopsPageProps {
    params: { id?: string };
}
const BarbershopsPage = async ({ params }: BarbershopsPageProps) => {
    const session = await getServerSession(authOptions)

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
                        <ServiceItem key={service.id} service={service} isAuthenticated={!!session?.user} />
                    )
                })}
            </div>
        </div>
    );
}

export default BarbershopsPage;