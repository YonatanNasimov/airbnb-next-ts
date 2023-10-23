// next13 hot reloading make a lot of "new PrismaClient()" instances to be created.
import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}

//globalThis => not affected by hot reload
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV != 'production') globalThis.prisma = client

export default client;