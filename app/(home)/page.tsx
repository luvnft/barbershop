import Image from "next/image"
import Header from "../_components/header"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Search from "./_components/search"
import BookingItem from "../_components/bookingItem"
const Home = () => {
    return (
        <div className={`dark`}>
            <Header />
            <div className="px-5 pt-5">
                <h2 className="text-xl font-bold">Olá, Gustavo</h2>
                <p className="capitalize font-thin text-sm">{format(new Date(), "EEEE',' dd 'de' MMMM", {
                    locale: ptBR,
                })}</p>
            </div>
            <div className="mt-4 px-5">
                <Search />
            </div>
            <div className="px-5 mt-5">
                <h3 className="text-sm uppercase font-bold text-gray-400 mb-5">Agendamentos</h3>
                <BookingItem />
            </div>
        </div>
    )
}
export default Home
