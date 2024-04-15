"use client"
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react"
import { signIn } from "next-auth/react";
const Header = () => {
    const handleLoginClick = async () => {
        await signIn();
    }
    return (
        <Card >
            <CardContent className="py-8 px-5 justify-between flex flex-row">
                <Image alt="logo" src="/logo.svg" height={22} width={120} />
                <Button onClick={handleLoginClick} variant="outline" size="icon">
                    <MenuIcon size={20} />
                </Button>
            </CardContent>

        </Card >
    )
}
export default Header
