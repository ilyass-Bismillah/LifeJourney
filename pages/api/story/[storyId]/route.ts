import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export default async function handler(
  req: NextRequest,
  context: { params: Promise<{ storyId: string }> }
) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json("Unauthorized", { status: 401 });

  const { storyId } = await context.params;

  if (req.method === "PATCH") {
    const body = await req.json();

    const existingStory = await prisma.story.findUnique({
      where: { id: storyId },
    });

    if (!existingStory)
      return NextResponse.json("Story not found", { status: 404 });

    const updatedStory = await prisma.story.update({
      where: { id: storyId },
      data: { ...body, userId },
    });

    return NextResponse.json(updatedStory, { status: 200 });
  }

  if (req.method === "DELETE") {
    const existingStory = await prisma.story.findUnique({
      where: { id: storyId },
    });

    if (!existingStory)
      return NextResponse.json("Story not found", { status: 404 });

    await prisma.story.delete({
      where: { id: storyId },
    });

    return NextResponse.json("Story deleted", { status: 200 });
  }

  return NextResponse.json("Method not allowed", { status: 405 });
}

