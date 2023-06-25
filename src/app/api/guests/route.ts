import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    console.log(body, 'hit body');

    const data = await prisma.guest.create({
      data: body
    })
    
  // Do whatever you want
  return NextResponse.json({
    data: data
  });
}