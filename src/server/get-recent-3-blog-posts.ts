import { Post } from "@/hashnode/generated/graphql";
import getBlogPosts from "./get-blog-posts";

export default async function getRecentThreeBlogPosts() {
  const posts: Post[] = [];

  // 4 because if there is series, it will be discarded
  const page = await getBlogPosts({ first: 4 });

  const nodes = page?.edges?.flatMap((edge) => edge?.node) as Post[];
  posts.push(...nodes);

  return posts;
}
