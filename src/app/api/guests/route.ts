import prisma from "@/lib/prisma";
import { GuestStore } from "@/store/useGuestStore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body: GuestStore['guest'] = await req.json();

    console.log(body, 'hit body');

    const exists = await prisma.guest.findFirst({
      where: {
        name: body.name
      }
    })

    if (exists) {
      return NextResponse.json({
        message: `The guest ${body.name} already exists!`,
      }, { status: 403 });
    }
    try {
      const data = await prisma.guest.create({
        data: {
          name: body.name,
          email: body.email,
          phone: body.phone,
          location: body.location,
        }
      })
      
      return NextResponse.json({
        data: {
          message: `Guest ${body.name} created successfully!`,
          data: data
        }
      });
    } catch (err: any) {
      return NextResponse.json({
        data: {
          message: `Ooops, guest ${body.name} was not created, please try again! ${err.message}`,
        }
      }, { status: 403}); 
    }
}
