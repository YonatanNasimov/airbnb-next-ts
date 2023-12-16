import prisma from '@/libs/prismadb';
import getCurrentUser from '@/actions/getCurrentUser';
import { NextResponse } from 'next/server';

interface IParams {
    listingId?: string;
}

export const DELETE = async (
    request: Request,
    { params }: { params: IParams }
) => {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { listingId } = params;

    if (!listingId || typeof listingId != 'string') {
        throw new Error('Invalid ID');
    }

    const listing = await prisma.listing.deleteMany({
        where: {
            id: listingId,
            userId: currentUser.id
        }
    })

    return NextResponse.json(listing);
} 