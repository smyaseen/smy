import { createPublicationJsonLd } from "@/lib/create-publication-json-ld";
import getPublication from "@/server/get-publication";
import { IPostType } from "@/types/post-types";
import getAllBlogPosts from "../domain/repository/get-all-blog-posts";
import getAllProjects from "../domain/repository/get-all-projects";

export type IUseAllPostsList = {
  query?: string;
  sort?: string;
  tags?: string;
  first?: number;
  type: IPostType;
  selectedProjectsSlug?: Array<string>;
};

const useAllPostsList = async ({ type, selectedProjectsSlug }: IUseAllPostsList) => {
  const [posts, publication] = await Promise.all([type === "blog" ? getAllBlogPosts() : getAllProjects(selectedProjectsSlug), getPublication()]);
  const publicationJsonLd = createPublicationJsonLd(publication);

  return {
    posts,
    publicationJsonLd,
  };
};

export default useAllPostsList;
