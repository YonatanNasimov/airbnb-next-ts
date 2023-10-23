import bcrypt from 'bcrypt';
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export const POST = async (request: Request) => {

    try {
        const body = await request.json();

        const { email, password, name } = body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        })

        return NextResponse.json(user);

    } catch (error) {
        console.log(error);
        return new NextResponse("Server Error: " + error, {
            status: 500
        })
    }
}

