"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Post {
  id: string;
  title: string;
  content: string;
}

export default function Page() {
  const { id } = useParams() as { id: string }; 
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return; 
    const posts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
    const foundPost = posts.find((p) => p.id === id);
    setPost(foundPost || null);
  }, [id]);

  if (!post) return <h1>Post Not Found</h1>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
