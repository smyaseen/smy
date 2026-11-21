import type { APIRoute, GetStaticPaths } from "astro";
import fs from "node:fs";
import { getAllPosts, getPostsOfType, type Post } from "./posts";

/**
 * Serves a post's source markdown at `<path>.md`, frontmatter included, so
 * agents and readers get the metadata alongside the prose. These are written
 * out as static files at build time.
 */
export const markdownPaths =
  (which: "all" | "projects"): GetStaticPaths =>
  async () => {
    const posts = which === "all" ? await getAllPosts() : await getPostsOfType("projects");
    return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
  };

export const markdownResponse: APIRoute = ({ props }) => {
  const { post } = props as { post: Post };
  const markdown = fs.readFileSync(post.filePath!, "utf8");
  return new Response(markdown, { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
};
