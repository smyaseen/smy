import { Post } from "@/hashnode/generated/graphql";
import getProjects from "../adapter/get-projects";

export default async function getAllProjects(selectedProjectsSlug?: Array<string>) {
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

  if (selectedProjectsSlug) {
    return posts.filter((post) => selectedProjectsSlug.includes(post.slug));
  }

  return posts;
}
