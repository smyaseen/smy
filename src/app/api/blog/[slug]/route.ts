import { readMarkdownFile } from '@/server/read-markdown-file';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, { params: {slug} }: { params: { slug: string } }) {
  return readMarkdownFile(slug);
}