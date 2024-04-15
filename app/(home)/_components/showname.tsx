"use client"
import { useSession } from "next-auth/react";

export const ShowName = () => {
const { data } = useSession();
return(
    <h2 className="text-xl font-bold">Olá {data?.user?.name ? ', Gustavo' : ''}</h2>
)
}