import { Post } from "@/hashnode/generated/graphql";
import getBlogPosts from "./get-blog-posts";

export default async function getRecentThreeBlogPosts() {
  const posts: Post[] = [];

  const page = await getBlogPosts({ first: 3 });

  const nodes = page?.edges?.flatMap((edge) => edge?.node) as Post[];
  posts.push(...nodes);

  return posts;
}
