import { getPostBySlug } from "@/server/content/posts";

export default function getBlogPost({ slug }: { slug: string }) {
  return getPostBySlug(slug);
}
