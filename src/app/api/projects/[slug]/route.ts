import { readMarkdown } from "@/server/read-markdown-file";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params: { slug } }: { params: { slug: string } }) {
  return readMarkdown(slug);
}
