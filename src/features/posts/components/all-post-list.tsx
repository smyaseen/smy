import { createPublicationJsonLd } from "@/lib/create-publication-json-ld";

import getPublication from "@/server/get-publication";
import getAllBlogPosts from "../domain/get-all-blog-posts";
import getAllProjects from "../domain/get-all-projects";
import PostList from "./post-list";

type Props = {
  query?: string;
  sort?: string;
  tags?: string;
  first?: number;
  type: "blog" | "project";
  selectedProjectsSlug?: Array<string>;
};

async function AllPostsList({ query, sort, tags, first, type, selectedProjectsSlug }: Props) {
  const [posts, publication] = await Promise.all([type === "blog" ? getAllBlogPosts() : getAllProjects(selectedProjectsSlug), getPublication()]);
  const publicationJsonLd = createPublicationJsonLd(publication);

  return (
    <>
      <PostList posts={posts} query={query} sort={sort} tags={tags} first={first} type={type} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(publicationJsonLd) }} />
    </>
  );
}

export default AllPostsList;
