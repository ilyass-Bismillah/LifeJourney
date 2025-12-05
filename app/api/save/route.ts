import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function handler(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 401 });
  }

  if (req.method === "POST") {
    const body = await req.json();

    const newSave = await prisma.save.create({
      data: { ...body, userId },
    });

    return NextResponse.json(newSave, { status: 200 });
  }

  if (req.method === "DELETE") {
    const { saveId } = await req.json();

    if (!saveId) {
      return NextResponse.json("saveId missing", { status: 400 });
    }

    const existingSave = await prisma.save.findUnique({
      where: { id: saveId },
    });

    if (!existingSave) {
      return NextResponse.json("Save not found", { status: 404 });
    }

    await prisma.save.delete({
      where: { id: saveId },
    });

    return NextResponse.json("Save deleted", { status: 200 });
  }

  return NextResponse.json("Method not allowed", { status: 405 });
}
