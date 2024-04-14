import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card"
import { Barbershop } from "@prisma/client"
import { StarIcon } from "lucide-react";
import Image from "next/image";
interface BarbershopItemProps {
    barbershop: Barbershop;
}
const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
    return (
        <Card className="items-center min-w-[167px] max-w-[167px] rounded-2xl overflow-hidden">
            <CardContent className="p-1">
                <div className="w-full h-[159px] relative">
                    <div className="absolute top-2 left-2 z-50"><Badge className="flex gap-1 opacity-90 items-center" variant="secondary"><StarIcon size={12} className={`text-primary fill-primary`} /><span>5,0</span> </Badge></div>

                    <Image className="rounded-2xl" alt={barbershop.name} src={barbershop.imageUrl} style={{ objectFit: 'cover' }} fill />
                </div>
                <div className="px-2 pb-1">
                    <h1 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap">{barbershop.name}</h1>
                    <p className="text-sm overflow-hidden text-ellipsis text-nowrap text-gray-400">{barbershop.address}</p>
                    <Button className="w-full mt-1 mb-0">
                        Reservar
                    </Button>
                </div>

            </CardContent>
        </Card>
    )
}
export default BarbershopItem