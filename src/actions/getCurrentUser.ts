import { getServerSession } from "next-auth/next"
import { GET } from "@/app/api/auth/[...nextauth]/route"
import prisma from "@/libs/prismadb";

export const getSession = async () => {
    return await getServerSession(GET)
}

const getCurrentUser = async () => {
    try {
        const session = await getSession();
        // @ts-ignore
        if (!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                // @ts-ignore
                email: session.user.email as string,
            }
        });

        if (!currentUser) {
            return null;
        }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt.toISOString(),
            updatedAt: currentUser.updatedAt.toISOString(),
            emailVerified:
                currentUser.emailVerified?.toISOString() || null,
        }
    } catch (error: any) {
        return null;
    }
}
export default getCurrentUser;