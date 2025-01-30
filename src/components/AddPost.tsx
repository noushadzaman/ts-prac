"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Post {
  title: string;
  content: string;
}

const AddPost = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Post>();

  const onSubmit: SubmitHandler<Post> = (data) => {
    const storedPosts = JSON.parse(
      localStorage.getItem("posts") || "[]"
    ) as Post[];
    localStorage.setItem("posts", JSON.stringify([...storedPosts, data]));
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">ADD POST</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>
            Add post here (posts will be stored in localstorage)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                {...register("title", { required: true })}
                placeholder="post title here"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="content" className="text-right">
                Content
              </Label>
              <Input
                id="content"
                placeholder="post content here"
                className="col-span-3"
                {...register("content")}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">ADD</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddPost;
