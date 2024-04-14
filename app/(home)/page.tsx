import Image from "next/image"
import Header from "../_components/header"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
const Home = () => {
    return (
        <div className={`dark`}>
            <Header />
            <div className="px-5 pt-5">
                <h2 className="text-xl font-bold">Olá, Miguel</h2>
                <p className="capitalize font-thin text-sm">{format(new Date(), "EEEE',' dd 'de' MMMM", {
                    locale: ptBR,
                })}</p>
            </div>
        </div>
    )
}
export default Home
