"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

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
    <div>
      <h1>{post?.title || "Post Not Found"}</h1>
      <p>{post?.content}</p>
    </div>
  );
}
