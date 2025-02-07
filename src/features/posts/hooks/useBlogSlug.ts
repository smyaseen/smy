import createPostJsonLd from "@/lib/create-post-json-ld";
import getPublication from "@/server/get-publication";
import { notFound } from "next/navigation";
import getBlogPost from "../domain/adapter/get-blog-post";

export type IUseBlogSlug = {
  params: {
    slug: string;
  };
};

const useBlogSlug = async ({ params }: IUseBlogSlug) => {
  const post = await getBlogPost(params);
  const publication = await getPublication();

  if (!post) {
    notFound();
  }

  const jsonLd = createPostJsonLd(publication, post);

  return {
    publication,
    post,
    jsonLd,
  };
};

export default useBlogSlug;
