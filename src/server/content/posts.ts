import site from "@/lib/site";
import { Post, PostFrontmatter, PostType } from "@/types/post-types";
import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";
import markdownToText from "./markdown-to-text";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function assertFrontmatter(data: Partial<PostFrontmatter>, file: string): asserts data is PostFrontmatter {
  for (const key of ["title", "slug", "publishedAt"] as const) {
    if (!data[key]) {
      throw new Error(`content/posts/${file}: missing required frontmatter field "${key}"`);
    }
  }
}

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);

  assertFrontmatter(data, file);

  const isProject = data.series?.slug === site.projectsSeries.slug;
  const postPath = `/${isProject ? PostType.PROJECT : PostType.BLOG}/${data.slug}`;

  return {
    ...data,
    subtitle: data.subtitle ?? null,
    brief: data.brief ?? null,
    updatedAt: data.updatedAt ?? null,
    canonicalUrl: data.canonicalUrl ?? null,
    coverImage: data.coverImage ?? null,
    seo: data.seo ?? { title: null, description: null },
    series: data.series ?? null,
    tags: data.tags ?? [],
    tableOfContents: data.tableOfContents ?? { enabled: false, items: [] },
    content: {
      markdown: content.trim(),
      text: markdownToText(content),
    },
    path: postPath,
    url: `${site.url}${postPath}`,
  };
}

let cached: Post[] | null = null;

/**
 * Reads every post from `content/posts`, newest first.
 *
 * The result is memoised in production, where the files cannot change while the
 * server is running. In development it re-reads on every call so edits to a
 * markdown file show up without restarting the dev server.
 */
export function getAllPosts(): Post[] {
  if (cached && process.env.NODE_ENV === "production") return cached;

  const posts = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(parse)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  cached = posts;
  return posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function isProject(post: Post) {
  return post.series?.slug === site.projectsSeries.slug;
}
