import { Post } from "@/hashnode/generated/graphql";
import getProjects from "./get-projects";

export default async function getAllProjects() {
  const posts: Post[] = [];
  let hasNextPage = true;
  let after = "";

  while (hasNextPage) {
    const page = await getProjects({ after });

    const nodes = page?.edges?.flatMap((edge) => edge?.node) as Post[];
    posts.push(...nodes);

    hasNextPage = !!page?.pageInfo.hasNextPage;
    after = page?.pageInfo.endCursor as string;
  }

  return posts;
}
