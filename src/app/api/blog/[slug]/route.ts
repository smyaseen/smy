import { readMarkdown } from "@/server/read-markdown-file";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const {
    slug
  } = params;

  return readMarkdown(slug);
}
