import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/db";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json("Unauthorized", { status: 500 });
  }

  const body = await req.json();
  const newStory = await prisma.story.create({
    data: {
      ...body,
    },
  });
  return NextResponse.json(newStory, { status: 201 });
}
