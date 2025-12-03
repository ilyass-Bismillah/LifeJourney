"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";
import axios from "axios"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(10, {message: "Title is required !"}).max(5000),
});

const NewStoryPage = () => {
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const { userId } = useAuth()
    const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      const res = await axios.post("/api/story", {
        ...values,
        userId
      })
      if(res.status === 200) {
        console.log("created");
        toast("Story is created", {className: "bg-emerald-500 text-white"})
        router.push(`/story/${res.data.id}`)
        router.refresh()
      }
    }catch(error) {
      console.log(error)
      toast("Somthing went wrong", {className: "bg-rose-500 text-white"})
    }finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col space-y-3">
        <div>
          <h1 className="text-2xl font-semibold">Give your story a title</h1>
          <p className="text-sm text-muted-foreground">Name your story, don&apos;t worry you can change it later.</p>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="(ex: The day i deployed my first project)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmitting} type="submit">{isSubmitting && <Loader className="mr-2 w-5 h-5 animate-spin"/>}Create</Button>
        </form>
      </Form>
      </div>
    </div>
  );
};

export default NewStoryPage;
