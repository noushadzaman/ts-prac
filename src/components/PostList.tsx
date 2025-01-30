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

interface Post {
  id: number;
  title: string;
  content: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const storedPosts = JSON.parse(
      localStorage.getItem("posts") || "[]"
    ) as Post[];
    setPosts(storedPosts);
  }, []);

  const handleRemove = (id: number) => {
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
          {posts.map((post, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">{idx + 1}</TableCell>
              <TableCell className="max-w-[40px] overflow-hidden">
                {post.title}
              </TableCell>
              <TableCell className="max-w-[40px] overflow-hidden">
                {post.content}
              </TableCell>
              <TableCell>
                <PostForm posts={posts} setPosts={setPosts} id={post.id} />
              </TableCell>
              <TableCell className="flex flex-col items-end justify-center">
                <Trash2
                  onClick={() => handleRemove(post.id)}
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
