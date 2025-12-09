"use client";
import { useMemo, useState } from "react";
import { Story, Save } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
  story: Story;
  saves: Save[];
}

const SaveForm = ({ story, saves }: Props) => {
  const { userId } = useAuth();
  const router = useRouter();

  const foundSave = useMemo(() => {
    return saves.find(
      (s) => s.storyId === story.id && s.userId === userId
    );
  }, [userId, saves, story.id]);

  const [isSaved, setIsSaved] = useState(!!foundSave);
  const [currentSaveId, setCurrentSaveId] = useState(foundSave?.id || null);

  if (!userId) return null;

  const handleSave = async () => {
    try {
      if (isSaved && currentSaveId) {
        setIsSaved(false);

        await axios.delete("/api/save", { data: { saveId: currentSaveId } });
        setCurrentSaveId(null);
        toast("Story removed!");
      } else {
        setIsSaved(true);

        const res = await axios.post("/api/save", {
          storyId: story.id,
          userId,
        });

        setCurrentSaveId(res.data.id);
        toast("Story saved!");
      }

      router.refresh();
    } catch (error) {
      console.log(error);
      toast("Something went wrong", { className: "bg-rose-500 text-white" });
    }
  };

  return (
    <Button variant={"ghost"} onClick={handleSave}>
      <Heart className={isSaved ? "text-rose-500" : ""} />
    </Button>
  );
};

export default SaveForm;
