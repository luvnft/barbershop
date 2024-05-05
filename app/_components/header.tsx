"use client"
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, CircleUserRoundIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react"
import { signIn, signOut, useSession } from "next-auth/react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { SideMenu } from "./Menu";
const Header = () => {

    return (
        <Card >
            <CardContent className="py-8 px-5 justify-between flex flex-row items-center">
                <Link className="items-center" href="/"><Image alt="logo" src="/logo.svg" height={22} width={120} /></Link>

                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon">
                            <MenuIcon size={20} />
                        </Button></SheetTrigger>
                    <SheetContent className="p-0">
                        <SideMenu />
                    </SheetContent>
                </Sheet>


            </CardContent>

        </Card >
    )
}
export default Header
