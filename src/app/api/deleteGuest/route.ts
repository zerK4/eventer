import { NextResponse } from "next/server";
import _ from "lodash";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    const body = await req.json();
    let items;

    if (!_.isArray(body)) {
        items = [body];
    } else {
        items = body;
    }
  
    console.log(items, 'getting body back');
    
    try {
        const data = await prisma.guest.deleteMany({
            where: {
                name: {
                    in: items.map((item) => item.name)
                }
            }
        })
        return NextResponse.json({
            data: {
              message: `${items.length} guests deleted!`,
            }
          }, { status: 200}); 

    } catch (e) {
        console.error(e);

        return NextResponse.json({
            data: {
              message: `Ooops, there was a issue deleting the users!`,
            }
          }, { status: 403}); 
    }
  }