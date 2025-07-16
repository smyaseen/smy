"use client";

import { Post } from "@/hashnode/generated/graphql";
import { IPostType } from "@/types/post-types";
import dynamic from "next/dynamic";

const FloatingMenu = dynamic(() => import("@/components/floating-menu"));
const Analytics = dynamic(() => import("@/components/analytics"));

type Props = {
  post: Post;
  type: IPostType;
  postId: string;
  publicationId?: string;
};

export default function BlogClientExtras({ post, type, postId, publicationId }: Props) {
  return (
    <>
      <FloatingMenu post={post} type={type} />
      <Analytics postId={postId} publicationId={publicationId} />
    </>
  );
}
