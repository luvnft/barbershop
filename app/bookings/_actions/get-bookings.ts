"use client"

import { db } from '@/app/_lib/prisma';
import { useSession } from 'next-auth/react';

export default function page() {
    const { data } = useSession();

    const bookings = db.booking.findMany({
        where: {
            userId: (data.user as string).id

        }
    })
    return (
        false
    )
}
