import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    console.log(body, 'body here');
    

    const exists = await prisma.account.findFirst({
        where: {
            email: body.email
        }
    })

    if (exists) {
        return NextResponse.json({
            message: 'Account already exists!'
        }, { status: 403});
    }

    try {
        const data = await prisma.account.create({
            data: body
        })

        return NextResponse.json({
            data: data,
            message: 'Account created successfully!'
        }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({
            message: err.message
        }, { status: 500});
    }
}

export async function PUT(req: Request) {
    const body = await req.json();

    try {
        const data = await prisma.account.update({
            where: {
                email: body.email
            }, data: {
                phone: body.phone,
                type: body.type
            }
        })

        return NextResponse.json({
            data: data,
            message: `Your account was created successfully!`
        }, { status: 201 })
    } catch (err: any){
        console.error(err)

        return NextResponse.json({
            data: err.message,
            message: `Ooop, there was an error creating your account!`
        }, { status: 500 })
    }

    console.log(body, 'hitting body');
}