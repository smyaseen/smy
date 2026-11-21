import { getCollection, type CollectionEntry } from "astro:content";
import site from "./site";

export type Post = CollectionEntry<"posts">;
export type PostType = "blog" | "projects";

/** The trimmed-down shape the client-side post browser filters over. */
export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  path: string;
  publishedAt: string;
  readTimeInMinutes: number;
  coverImage: { url: string; alt: string } | null;
  tags: string[];
  /** Lowercased title + excerpt + tags + body, used for client-side search. */
  search: string;
};

export const isProject = (post: Post) => post.data.series?.slug === site.projectsSeriesSlug;
export const postType = (post: Post): PostType => (isProject(post) ? "projects" : "blog");
export const postPath = (post: Post) => `/${postType(post)}/${post.data.slug}`;
export const postUrl = (post: Post) => `${site.url}${postPath(post)}`;
export const postDescription = (post: Post) => post.data.seo?.description || post.data.subtitle || post.data.brief || post.data.title;

/** Every post, newest first. */
export async function getAllPosts() {
  const posts = await getCollection("posts");
  return posts.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export async function getPostsOfType(type: PostType) {
  return (await getAllPosts()).filter((post) => postType(post) === type);
}

export const formatDate = (date: Date) => date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/**
 * Flattens markdown to plain prose. Only used to give the search box something
 * to match against, so it favours being cheap over being exhaustive.
 */
export function markdownToText(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`\n]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s+/gm, "")
    .replace(/^\s{0,3}>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/[*_~]{1,3}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function toPostCard(post: Post): PostCard {
  const { data } = post;
  const excerpt = data.seo?.description || data.brief || "";
  const tags = data.tags.map((tag) => tag.name.toLocaleLowerCase());

  return {
    slug: data.slug,
    title: data.title,
    excerpt,
    path: postPath(post),
    publishedAt: data.publishedAt.toISOString(),
    readTimeInMinutes: data.readTimeInMinutes,
    coverImage: data.coverImage ? { url: data.coverImage.url, alt: data.coverImage.attribution || excerpt || data.title } : null,
    tags,
    search: [data.title, excerpt, tags.join(" "), markdownToText(post.body ?? "")].join(" ").toLowerCase(),
  };
}
