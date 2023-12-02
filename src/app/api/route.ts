import { NextResponse } from "next/server";

export const GET = async (_request: Request) => {
  return NextResponse.json("api running...");
};
