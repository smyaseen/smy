import { Post, PostCard } from "@/types/post-types";

/**
 * Projects a full Post down to what a card needs, plus a prebuilt search
 * haystack. This is what crosses the server/client boundary. The full
 * markdown body never does.
 */
export default function toPostCard(post: Post): PostCard {
  const excerpt = post.seo.description || post.brief || "";

  return {
    slug: post.slug,
    title: post.title,
    excerpt,
    path: post.path,
    publishedAt: post.publishedAt,
    readTimeInMinutes: post.readTimeInMinutes,
    coverImage: post.coverImage ? { url: post.coverImage.url, alt: post.coverImage.attribution || excerpt || post.title } : null,
    tags: post.tags.map((tag) => tag.name.toLocaleLowerCase()),
    search: [post.title, excerpt, post.tags.map((t) => t.name).join(" "), post.content.text].join(" ").toLowerCase(),
  };
}
