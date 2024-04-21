"use client"

import { SideMenu } from "@/app/_components/Menu"
import { Avatar, AvatarImage } from "@/app/_components/ui/avatar"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet"
import { Barbershop } from "@prisma/client"
import { ChevronLeftIcon, CircleUserRoundIcon, LogInIcon, LogOutIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface BarbershopHeaderProps {
    barbershop: Barbershop,
}

export const BarbershopHeaderContent = ({ barbershop }: BarbershopHeaderProps) => {
    const router = useRouter();
    // const { data } = useSession();
    const handleLoginClick = async () => {
        await signIn('google');
    }
    const handleLogOutClick = async () => {
        await signOut();
    }
    const handleBackClick = () => {
        router.push('/')
    }
    return (
        <div>
            <div className="h-[250px] w-full relative">
                <Button size="icon" className="absolute top-4 left-4 z-50 bg-secondary hover:bg-secondary" onClick={handleBackClick} ><ChevronLeftIcon /></Button>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="absolute top-4 right-4 z-50 bg-secondary hover:bg-secondary">
                            <MenuIcon size={20} />
                        </Button></SheetTrigger>
                    <SheetContent className="p-0">
                        <SideMenu />
                    </SheetContent>
                </Sheet>
                <Image fill src={barbershop.imageUrl} alt={barbershop.name} className={`opacity-75`} style={{ objectFit: 'cover' }} />
            </div>
            <div className="flex flex-col px-5 py-3 pb-6 border-b border-solid border-primary">
                <h2 className="font-bold font-xl">{barbershop.name}</h2>
                <div className={`flex flex-col mt-1`}>
                    <p className="flex items-center gap-1"><MapPinIcon size={12} className="text-primary" />{barbershop.address}</p>
                    <p className="flex items-center gap-1"><StarIcon size={12} className="text-primary" />5,0 (500 avaliações)</p>
                </div>


            </div>


        </div>
    )
}