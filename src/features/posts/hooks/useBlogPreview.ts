import { notFound } from "next/navigation";
import getBlogPostDraft from "../domain/server/get-blog-post-draft";

export type IUseBlogPreview = {
  params: {
    id: string;
  };
};

const useBlogPreview = async ({ params }: IUseBlogPreview) => {
  const draft = await getBlogPostDraft(params);

  if (!draft) {
    notFound();
  }

  const title = draft.title || "";
  const markdown = draft.content?.markdown || "";

  const { readTimeInMinutes, coverImage } = draft;

  return {
    title,
    markdown,
    readTimeInMinutes,
    coverImage,
  };
};

export default useBlogPreview;
