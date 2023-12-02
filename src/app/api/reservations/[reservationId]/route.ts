import { NextResponse } from "next/server"

import getCurrentUser from "@/actions/getCurrentUser"
import prisma from "@/libs/prismadb"

interface IParams {
    reservationId?: string;
}

export const DELETE = async (
    request: Request,
    { params }: { params: IParams }) => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = params

    if (!reservationId || typeof reservationId != 'string') {
        throw new Error('Invalid ID');
    }

    const reservation = await prisma.reservation.deleteMany({
        // the only people who can delete a reservation are:
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id }, // the creator of the reservation 
                { listing: { userId: currentUser.id } } // the creator of the listing that the reservation is on
            ]
        }
    })

    return NextResponse.json(reservation);
} 