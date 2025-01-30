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
import { motion, AnimatePresence } from "motion/react";

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
    const storedPosts = JSON.parse(
      localStorage.getItem("posts") || "[]"
    ) as Post[];
    const newPosts = storedPosts.filter((post) => post.id !== id);
    setPosts(newPosts);
    localStorage.setItem("posts", JSON.stringify(newPosts));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
      >
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

                  <TableCell className="max-w-[100px] overflow-hidden">
                    <Link className="font-semibold" href={`/post/${id}`}>
                      {title}
                    </Link>
                  </TableCell>
                  <TableCell className="overflow-hidden max-w-[160px] text-gray-600">
                    {content}
                  </TableCell>
                  <TableCell>
                    <PostForm posts={posts} setPosts={setPosts} id={id} />
                  </TableCell>
                  <TableCell className="flex flex-col items-end justify-center">
                    <Trash2
                      onClick={() => handleRemove(id)}
                      className="cursor-pointer hover:scale-150 transition-all duration-300"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PostList;
