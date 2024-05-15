import BarbershopItem from "../(home)/_components/barberItem"
import Search from "../(home)/_components/search";
import Header from "../_components/header"
import { db } from "../_lib/prisma"
import { redirect } from "next/navigation";
interface BarbershopsPageProps {
    searchParams: {
        search?: string;
    }
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
    if (!searchParams.search) {
        return redirect("/");
    }
    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams.search,
                mode: 'insensitive'
            }
        }
    })
    return (
        <>
            <Header />
            <div className="px-5 py-6">
                <Search defaultValues={{
                    search: searchParams.search
                }} />
                <h1 className="text-gray-400 font-bold tex-xs uppercase">Results for &quot;{searchParams.search}&quot;</h1>

                <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden mt-5">
                    {
                        barbershops.map((barbershop) => {

                            return (
                                <div key={barbershop.id}>
                                    <BarbershopItem barbershop={barbershop} />
                                </div>)
                        })
                    }
                </div>
            </div>
        </>
    )
}
export default BarbershopsPage