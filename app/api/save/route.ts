import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

  const body = await req.json();

  const newSave = await prisma.save.create({
    data: { ...body, userId },
  });

  return NextResponse.json(newSave, { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  context: { params: { saveId: string } }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

  const { saveId } = context.params;

  const existingSave = await prisma.save.findUnique({ where: { id: saveId } });
  if (!existingSave) return NextResponse.json("Save not found", { status: 404 });

  await prisma.save.delete({ where: { id: saveId } });
  return NextResponse.json("Save deleted", { status: 200 });
}
