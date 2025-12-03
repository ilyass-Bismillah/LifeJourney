import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TitleForm from "./_components/titleForm";
import StoryForm from "./_components/storyForm";
import ImageForm from "./_components/imageForm";
import DeleteStory from "./_components/deleteStory";

const EditStoryPage = async ({ params }: { params: Promise<{ storyId: string }> }) => {
  const { storyId } = await params;
  const { userId } = await auth();

  if (!userId) return null;

  const story = await prisma.story.findFirst({
    where: {
      id: storyId,
      userId: userId,
    },
  });

  if (!story) redirect("/story");

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex flex-col space-y-3">
        <div>
          <h1 className="text-2xl font-semibold">Edit your story</h1>
          <p className="text-sm text-muted-foreground">
            update your title, story and image
          </p>
        </div>
        <TitleForm initialData={story} />
        <StoryForm initialData={story} />
        <ImageForm initialData={story} />
        <div className="flex items-center justify-between gap-5">
            <Link href="/story">
            <Button variant={"link"}>Back to my stories</Button>
            </Link>
            <DeleteStory initialData={story} />
        </div>
      </div>
    </div>
  );
};

export default EditStoryPage;
