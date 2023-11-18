import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb"
import getCurrentUser from "@/actions/getCurrentUser"

export const POST = async (request: Request) => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json()

    const {
        totalPrice,
        startDate,
        endDate,
        listingId,
    } = body;

    if (!totalPrice || !listingId || !endDate || !startDate) {
        return NextResponse.error();
    }
   
    // update the listing by create reservation related to that listing
    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    endDate,
                    startDate,
                    totalPrice
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation);
}