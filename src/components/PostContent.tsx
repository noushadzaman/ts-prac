"use client";

import { useEffect, useState } from "react";

interface Post {
  id: string;
  title: string;
  content: string;
}

interface PostContentProps {
  id?: string;
}

const PostContent: React.FC<PostContentProps> = ({ id }) => {
  const [post, setPost] = useState<Post | null>(null);
  useEffect(() => {
    if (!id) return;
    const posts: Post[] = JSON.parse(localStorage.getItem("posts") || "[]");
    const foundPost = posts.find((p) => p.id === id);
    setPost(foundPost || null);
  }, [id]);

  return (
    <div>
      <h1>{post?.title}</h1>
      <p>{post?.content}</p>
    </div>
  );
};

export default PostContent;
