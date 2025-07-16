"use client";

import { Post } from "@/hashnode/generated/graphql";
import { IPostType } from "@/types/post-types";
import dynamic from "next/dynamic";

const BlogClientExtras = dynamic(() => import("./blog-client-extras"), {
  loading: () => null,
});

type Props = {
  post: Post;
  type: IPostType;
  postId: string;
  publicationId?: string;
};

export default function BlogClientExtrasWrapper(props: Props) {
  return <BlogClientExtras {...props} />;
}
