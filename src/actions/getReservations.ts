import prisma from "@/libs/prismadb"

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

const getReservations = async (params: IParams) => {

    try {

        const { listingId, userId, authorId } = params;

        const query: any = {};

        if (listingId) {
            query.listingId = listingId
        }

        if (userId) {
            query.userId = userId
        }

        if (authorId) {
            query.listing = { userId: authorId };
        }

        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safeReservations = reservations.map(
            (reservations) => ({
                ...reservations,
                createdAt: reservations.createdAt.toISOString(),
                startDate: reservations.startDate.toISOString(),
                endDate: reservations.endDate.toISOString(),
                listing: {
                    ...reservations.listing,
                    createdAt: reservations.listing.createdAt.toISOString()
                }
            })
        )

        return safeReservations;

    } catch (error) {
        throw new Error;
    }

}

export default getReservations;