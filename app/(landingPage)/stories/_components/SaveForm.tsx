"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface StoryType {
  id: string;
  title: string;
  story?: string | null;
  image?: string | null;
  userId: string;
}

interface SaveType {
  id: string;
  userId: string;
  storyId: string;
}

interface Props {
  story: StoryType;
  saves: SaveType[];
}

const SaveForm = ({ story, saves }: Props) => {
  const { userId } = useAuth();
  const router = useRouter();

  if (!userId) return null;

  const getSave = saves.find(
    (save) => save.storyId === story.id && save.userId === userId
  );

  const handleSave = async () => {
    try {
      if (getSave) {
        const res = await axios.delete("/api/save", {
          data: { saveId: getSave.id },
        });
        if (res.status === 200) {
          router.refresh();
          toast("Story is removed!");
        }
        return;
      }

      const res = await axios.post("/api/save", {
        storyId: story.id,
        userId,
      });

      if (res.status === 200) {
        router.refresh();
        toast("Story is saved!");
      }
    } catch (error) {
      console.log(error);
      toast("Something went wrong", {
        className: "bg-rose-500 text-white",
      });
    }
  };

  return (
    <Button variant="ghost" onClick={handleSave}>
      <Heart className={getSave ? "text-rose-500" : ""} />
    </Button>
  );
};

export default SaveForm;
