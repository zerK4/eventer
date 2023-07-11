import { NextResponse } from "next/server";
import _ from "lodash";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();
    let items;

    console.log(body, 'getting body back');
    if (!_.isArray(body)) {
        items = [body];
    } else {
        items = body;
    }
  
    
    try {
        const data = await prisma.guest.deleteMany({
            where: {
                id: {
                    in: items.map((item) => item.id)
                }
            }
        })
        return NextResponse.json({
              message: `${items.length} guests deleted!`,
              data: data
          }, { status: 200}); 

    } catch (e: any) {
        console.error(e);

        return NextResponse.json({
              message: `Ooops, there was a issue deleting the users!`,
              err: e.message
          }, { status: 403}); 
    }
  }