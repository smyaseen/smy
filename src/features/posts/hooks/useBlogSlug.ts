import createPostJsonLd from "@/lib/create-post-json-ld";
import getPublication from "@/server/get-publication";
import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";
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

  const {
    content: { markdown },
  } = post;

  // Save the markdown content to a file
  const filePath = path.join(process.cwd(), "content", "blog", `${params.slug}.md`);
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, markdown, "utf-8");

  return {
    publication,
    post,
    jsonLd,
  };
};

export default useBlogSlug;
