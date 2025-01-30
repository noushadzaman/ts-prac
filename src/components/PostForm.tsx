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
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Post {
  id: string;
  title: string;
  content: string;
}
interface PostFormProps {
  id?: string;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostForm: React.FC<PostFormProps> = ({ posts, setPosts, id }) => {
  const [open, setOpen] = useState(false);
  const postFound = posts.find((post) => post.id === id);
  console.log(postFound);
  const { register, handleSubmit, reset } = useForm<Post>();

  const onSubmit: SubmitHandler<Post> = (data) => {
    if (!id) {
      const newPostId = crypto.randomUUID();
      const storedPosts = JSON.parse(
        localStorage.getItem("posts") || "[]"
      ) as Post[];
      localStorage.setItem(
        "posts",
        JSON.stringify([...storedPosts, { ...data, id: newPostId }])
      );
      setPosts([...posts, { ...data, id: newPostId }]);
      setOpen(false);
      reset();
    } else {
      const storedPosts = JSON.parse(
        localStorage.getItem("posts") || "[]"
      ) as Post[];
      const newPosts = storedPosts.map((post) => {
        if (post.id === id) {
          return { ...post, title: data.title, content: data.content };
        } else {
          return post;
        }
      });
      setPosts(newPosts);
      localStorage.setItem("posts", JSON.stringify(newPosts));
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          {id ? (
            <Pencil className="cursor-pointer hover:scale-150 transition-all duration-300" />
          ) : (
            <Button variant="destructive">ADD POST</Button>
          )}
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>
            Add post here (posts will be stored in localStorage)
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
                defaultValue={postFound?.title}
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
                defaultValue={postFound?.content}
                placeholder="post content here"
                className="col-span-3"
                {...register("content", { required: true })}
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

export default PostForm;
