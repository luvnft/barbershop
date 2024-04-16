import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/app/_lib/prisma"
import { Adapter } from "next-auth/adapters"
const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENTID as string,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async session({ session, user }) {
            session.user = { ...session.user, id: user.id } as {
                id: string;
                name: string;
                email: string;

            };
            return session;
        },
    },
    secret: process.env.SECRET
}
export default authOptions