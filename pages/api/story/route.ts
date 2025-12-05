import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function handler(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

  if (req.method === "POST") {
    const body = await req.json();
    const newStory = await prisma.story.create({
      data: { ...body, userId },
    });
    return NextResponse.json(newStory, { status: 200 });
  }

  return NextResponse.json("Method not allowed", { status: 405 });
}