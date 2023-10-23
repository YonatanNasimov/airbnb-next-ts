import { NextResponse } from "next/server";

export const GET = async (_request: Request) => {
  return new NextResponse("api running...", { status: 200 });
};
