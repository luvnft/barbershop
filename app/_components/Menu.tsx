import { CalendarIcon, CircleUserRoundIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Button } from "./ui/button"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

export const SideMenu = () => {
    const { data } = useSession();
    const handleLoginClick = async () => {
        await signIn('google');
    }
    const handleLogOutClick = async () => {
        await signOut();
    }
    return (
        <>

            <SheetHeader className="text-left border-b border-solid border-secondary p-5 flex">
                <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            {data?.user ? (
                <div className="flex justify-between px-5 py-6 items-center">
                    <div className="flex items-center gap-1 ">
                        <Avatar>
                            <AvatarImage src={data.user?.image ?? ""} />
                        </Avatar>
                        <h1>{data.user?.name}</h1>
                    </div>
                    <Button onClick={handleLogOutClick} variant="secondary" className="bg-secondary" size="icon"><LogOutIcon size={18} /></Button>
                </div>
            ) : (
                <div className="w-full justify-start px-5 py-6 items-center">
                    <div className="flex gap-1"><CircleUserRoundIcon /> 👋, log in!</div>
                    <div className="mt-2"><Button variant="secondary" size="icon" className="flex w-full justify-start px-5 gap-3" onClick={handleLoginClick}><LogInIcon size={12} /> Login</Button></div>
                </div>
            )
            }
            <div className="flex flex-col gap-2 px-5 items-center w-full">
                <Button variant="outline" className="justify-start w-full" asChild>
                    <Link href="/">
                        <HomeIcon size={18} className="mr-2" />
                        Home
                    </Link>
                </Button>
                {data?.user && (
                    <Button variant="outline" className="justify-start w-full" asChild>
                        <Link href="/bookings">
                            <CalendarIcon size={18} className="mr-2" />
                            Appointments
                        </Link>
                    </Button>
                )}
            </div>


        </>
    )
}