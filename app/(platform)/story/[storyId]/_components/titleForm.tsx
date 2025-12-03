"use client";
import { Story } from "@/generated/prisma/client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader, Pencil } from "lucide-react";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

interface Props {
  initialData: Story;
}

const formSchema = z.object({
  title: z.string().min(10, { message: "Title is required !" }).max(5000),
});

const TitleForm = ({ initialData }: Props) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      toast("Story is updating ...");
      const res = await axios.patch(`/api/story/${initialData.id}`, {
        ...values,
      });
      if (res.status === 200) {
        console.log("created");
        toast("Story is updated", { className: "bg-emerald-500 text-white" });
        toggleEdit();
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast("Somthing went wrong", { className: "bg-rose-500 text-white" });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="border border-secondary rounded-md p-4 bg-secondary w-80">
      <div className="flex items-center justify-between font-medium text-primary">
        Title
        <Button variant={"ghost"} type="button" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edite title
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p className="text-sm mt-2 text-primary">{initialData.title}</p>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="(ex: The day i deployed my first project)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} type="submit">
              {isSubmitting && <Loader className="mr-2 w-5 h-5 animate-spin" />}
              Update
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default TitleForm;
