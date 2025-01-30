"use client";

import { useParams } from "next/navigation";
import PostContent from "@/components/PostContent";

export default function Page() {
  const { id } = useParams() as { id: string };

  return <PostContent id={id} />;
}
