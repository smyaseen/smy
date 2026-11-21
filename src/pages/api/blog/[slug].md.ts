import { markdownPaths, markdownResponse } from "@/lib/markdown-endpoint";

export const getStaticPaths = markdownPaths("all");
export const GET = markdownResponse;
