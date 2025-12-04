import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"

export async function DELETE(req: NextRequest, context: { params : Promise<{ saveId: string}>}){
    const {userId} = await auth();
    if (!userId){
        return NextResponse.json("Unauthorized", { status: 401})
    }

    const { saveId } = await context.params

    const existingSave = await prisma.save.findUnique({
        where: { id: saveId}
    })

    if (!existingSave){
        return NextResponse.json("Save not found", { status: 404})
    }

     await prisma.save.delete({
        where: { id: saveId}
    })

     return NextResponse.json("Save deleted", { status: 200})
}