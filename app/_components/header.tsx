import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react"
const Header = () => {
    return (
        <Card >
            <CardContent className="py-8 px-5 justify-between flex flex-row">
                <Image alt="logo" src="/logo.svg" height={22} width={120} />
                <Button variant="outline" size="icon">
                    <MenuIcon size={20}/>
                </Button>
            </CardContent>

        </Card >
    )
}
export default Header
