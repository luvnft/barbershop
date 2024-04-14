import {Card, CardContent} from "./ui/card"
import { Badge } from "./ui/badge"
import {Avatar, AvatarFallback, AvatarImage} from "./ui/avatar"

const BookingItem = ()=>{
return(
    <Card>
        <CardContent className="pl-5 pr-0 py-0 flex justify-between">
            <div className="flex flex-col gap-2 py-5">
                <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">Confirmado</Badge>
                <h2 className="font-bold">Corte de Cabelo</h2>
                <div className="flex align-center items-center">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src="https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png" />
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <h3 className="ml-2">Barbearia Demais</h3>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-solid border-secondary px-6">
                <p className="text-sm">Fevereiro</p>
                <p className="text-2xl">06</p>
                <p className="text-sm">09:45</p>
            </div>
        </CardContent>
    </Card>
)
}
export default BookingItem