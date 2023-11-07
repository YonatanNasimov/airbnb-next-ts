import prisma from "@/libs/prismadb"

const getListings = async () => {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }))

        return safeListings;
    } catch (error: any) {
        throw new Error;
    }
}

export default getListings;