import useBlogSlug from "@/features/posts/hooks/useBlogSlug";
import { NextResponse } from "next/server";

export async function readMarkdown(slug: string) {
  try {
    const { post: { content: { markdown } } } = await useBlogSlug({ params: { slug: slug.replace('.md', '') } });

    return new NextResponse(markdown, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } catch (error) {
    console.error("Error reading markdown file:", error);
    return new NextResponse(JSON.stringify({ message: "Markdown file not found" }), { status: 404 });
  }
}