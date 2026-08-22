import { getPostBySlug } from "@/server/content/posts";
import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

/**
 * Serves a post's source markdown at `/blog/<slug>.md` (and the same under
 * `/projects`). The file is returned verbatim, frontmatter included, so that
 * agents and readers get the metadata alongside the prose.
 */
export function readMarkdown(slug: string) {
  const cleanSlug = slug.replace(/\.md$/, "");
  const post = getPostBySlug(cleanSlug);

  if (!post) {
    return new NextResponse(JSON.stringify({ message: "Markdown file not found" }), { status: 404 });
  }

  try {
    const markdown = fs.readFileSync(path.join(process.cwd(), "content", "posts", `${cleanSlug}.md`), "utf8");

    return new NextResponse(markdown, {
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error reading markdown file:", error);
    return new NextResponse(JSON.stringify({ message: "Markdown file not found" }), { status: 404 });
  }
}
