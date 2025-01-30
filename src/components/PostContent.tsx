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
  const [isClient, setIsClient] = useState(false); // Track if we're on the client

  useEffect(() => {
    // Ensure this only runs on the client-side
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!id || !isClient) return; // Ensure we're on the client

    const postsData = window.localStorage.getItem("posts");
    if (!postsData) {
      console.log("No posts found in localStorage");
      setPost(null);
      return;
    }

    const posts = JSON.parse(postsData) as Post[];
    const foundPost = posts.find((p) => p.id === id);
    setPost(foundPost || null);
  }, [id, isClient]);

  if (!isClient) return <div>Loading...</div>; // Show loading state until client-side is ready

  return (
    <div>
      <h1>{post?.title || "Post Not Found"}</h1>
      <p>{post?.content}</p>
    </div>
  );
}
