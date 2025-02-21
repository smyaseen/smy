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

  try {
    const dirPath = path.join(process.cwd(), "content", "blog");
    try {
      await fs.access(dirPath);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      await fs.mkdir(dirPath, { recursive: true });
    }

    await fs.writeFile(filePath, markdown, "utf-8");
  } catch (error) {
    console.error("Error writing markdown file:", error);
  }

  return {
    publication,
    post,
    jsonLd,
  };
};

export default useBlogSlug;
