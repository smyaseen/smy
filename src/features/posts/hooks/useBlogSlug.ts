import createPostJsonLd from "@/lib/create-post-json-ld";
import { getAllPosts, isProject } from "@/server/content/posts";
import { notFound } from "next/navigation";

export type IUseBlogSlug = {
  params: {
    slug: string;
  };
};

const useBlogSlug = ({ params }: IUseBlogSlug) => {
  const all = getAllPosts();
  const index = all.findIndex((candidate) => candidate.slug === params.slug);

  if (index === -1) {
    notFound();
  }

  const post = all[index];

  // Neighbours are drawn from the same collection the post belongs to, so a
  // project links on to the next project rather than the next blog post.
  const siblings = all.filter((candidate) => isProject(candidate) === isProject(post));
  const position = siblings.findIndex((candidate) => candidate.slug === post.slug);

  return {
    post,
    jsonLd: createPostJsonLd(post),
    // `siblings` is newest-first, so the newer post is the one before it.
    next: siblings[position - 1] ?? null,
    previous: siblings[position + 1] ?? null,
  };
};

export default useBlogSlug;
