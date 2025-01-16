import url from "@/hashnode/api-url";
import { GetPostsFromSeriesDocument } from "@/hashnode/generated/graphql";
import request from "graphql-request";

type Props = {
  first?: number;
  after?: string;
};

export default async function getProjects({ first = 20, after = undefined }: Props) {
  const { publication } = await request({
    url,
    document: GetPostsFromSeriesDocument,
    variables: {
      host: process.env.HASHNODE_HOST!,
      first,
      after,
      slug: "projects",
    },
  });

  return publication?.series?.posts;
}
