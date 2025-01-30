"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import PostForm from "./PostForm";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleRemove = (id: string) => {
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  return (
    <div className="flex flex-col gap-10 justify-center items-end pt-10 max-w-3xl mx-auto">
      <PostForm posts={posts} setPosts={setPosts} />
      <Table>
        <TableCaption>A list of your posts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead className="text-right">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map(({ id, title, content }, idx) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell className="max-w-[40px] overflow-hidden">
                <Link href={`/post/${id}`}>{title}</Link>
              </TableCell>
              <TableCell className="max-w-[40px] overflow-hidden">
                {content}
              </TableCell>
              <TableCell>
                <PostForm posts={posts} setPosts={setPosts} id={id} />
              </TableCell>
              <TableCell className="flex flex-col items-end justify-center">
                <Trash2
                  onClick={() => handleRemove(id)}
                  className="cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostList;
