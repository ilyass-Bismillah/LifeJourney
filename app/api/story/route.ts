import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({error: "Unauthorized"}, { status: 401 });

  const body = await req.json();

  const newStory = await prisma.story.create({
    data: { ...body, userId },
  });

  return NextResponse.json(newStory, { status: 200 });
}
