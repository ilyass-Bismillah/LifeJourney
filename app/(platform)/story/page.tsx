import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { columns } from "./_components/columns";
import { DataTable } from "@/components/data-table";

const StoryPage = async () => {
  const { userId } = await auth();
  const stories = await prisma.story.findMany({
    where: { userId: userId! },
    orderBy: [{ createdAt: "desc" }],
  });
  return (
    <div className="flex flex-col space-y-5 w-full">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">My stories</h1>
        <Link href="/story/new">
          <Button>
            <Plus className="mr-2 h-5 w-5" />
            Create new story
          </Button>
        </Link>
      </div>
      <Separator />
      <DataTable
        data={stories}
        columns={columns}
        searchValue="title"
        placeholder="Search by title..."
      />
    </div>
  );
};

export default StoryPage;
