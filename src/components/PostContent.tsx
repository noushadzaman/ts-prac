"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
}

export default function PostContent() {
  const { id } = useParams() as { id: string | undefined };
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return;

    const postsData = window.localStorage.getItem("posts");
    if (!postsData) {
      console.log("No posts found in localStorage");
      setPost(null);
      return;
    }

    const posts = JSON.parse(postsData) as Post[];
    const foundPost = posts.find((p) => p.id === id);
    setPost(foundPost || null);
  }, [id]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
      >
        <div className="flex flex-col  mt-24 gap-5 max-w-xl mx-auto">
          <div className="flex items-end justify-end w-full">
            <Link href={"/"}>
              <Button>
                <MoveLeft />
                Go Back
              </Button>
            </Link>
          </div>
          <div className="space-y-5">
            <h1 className="text-2xl">
              POST TITLE: {post?.title || "Post Not Found"}
            </h1>
            <p className="text-sm">POST CONTENT: {post?.content}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
