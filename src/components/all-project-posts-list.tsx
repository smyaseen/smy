import { createPublicationJsonLd } from "@/lib/create-publication-json-ld";
import getAllProjects from "@/server/get-all-projects";
import getPublication from "@/server/get-publication";
import ProjectPostList from "./project-post-list";

type Props = {
  query?: string;
  sort?: string;
  tags?: string;
  selectedProjectsSlug?: Array<string>;
};

async function AllProjectPostsList({ query, sort, tags, selectedProjectsSlug }: Props) {
  const [posts, publication] = await Promise.all([getAllProjects(selectedProjectsSlug), getPublication()]);
  const publicationJsonLd = createPublicationJsonLd(publication);

  return (
    <>
      <ProjectPostList posts={posts} query={query} sort={sort} tags={tags} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(publicationJsonLd) }} />
    </>
  );
}

export default AllProjectPostsList;
