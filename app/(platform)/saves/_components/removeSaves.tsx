"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  saveId: string;
}

const RemoveSaves = ({ saveId }: Props) => {
  const [isRemoving, setIsRemoving] = React.useState(false);
  const router = useRouter();

  const handleRemoveSave = async () => {
    try {
      const res = await axios.delete(`/api/save/${saveId}`);
      if (res.status === 200) {
        router.refresh();
        toast("Save is removed");
      }
    } catch (error) {
      console.log(error);
      toast("Somthing went wrong", { className: "bg-rose-500 text-white" });
    } finally {
      setIsRemoving(false);
    }
  };
  return (
    <Button
      variant={"destructive"}
      disabled={isRemoving}
      onClick={handleRemoveSave}
    >
      {isRemoving ? <Loader className="animate-spin" /> : <Trash />}
    </Button>
  );
};

export default RemoveSaves;
