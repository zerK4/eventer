import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { event, creator } = body;

    const user = await prisma.account.findUnique({
        where: {
            email: creator
        }
    })

    console.log(user, creator, 'user here');
    

    try {
        const data = await prisma.event.create({
            data: {
                name: event.name,
                type: event.type,
                location: event.location,
                code: event.code,
                creator: {
                    connect: user?.id as any
                }
            }
        })

        return NextResponse.json({
            message: `Event ${event.name} created successfully!`,
            data: data
        }, {status: 201})
    } catch (err: any) {
        console.error(err.message);

        return NextResponse.json({
            message: `Event ${event.name} was not created!`,
            data: err.message
        })
    }
}

export async function PUT(req: Request) {

}