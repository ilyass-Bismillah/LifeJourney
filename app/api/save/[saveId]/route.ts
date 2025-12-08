import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function DELETE(req: NextRequest, { params }: { params: { saveId: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({error: "Unauthorized"}, { status: 401 });

  const { saveId } = params;

  const existingSave = await prisma.save.findUnique({ where: { id: saveId } });
  if (!existingSave) return NextResponse.json({error: "Save not found"}, { status: 404 });

  await prisma.save.delete({ where: { id: saveId } });

  return NextResponse.json({message: "Save deleted"}, { status: 200 });
}
