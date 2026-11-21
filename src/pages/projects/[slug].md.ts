import { markdownPaths, markdownResponse } from "@/lib/markdown-endpoint";

export const getStaticPaths = markdownPaths("projects");
export const GET = markdownResponse;
