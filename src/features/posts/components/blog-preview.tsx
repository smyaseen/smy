import { Mdx } from "@/components/mdx";
import { cn, fadeIn } from "@/lib/utils";
import { Metadata } from "next/types";
import getBlogPostDraft from "../domain/server/get-blog-post-draft";
import useBlogPreview, { IUseBlogPreview } from "../hooks/useBlogPreview";

export async function generateMetadata({ params }: IUseBlogPreview) {
  const post = await getBlogPostDraft(params);
  const title = post?.seo?.title || post?.title || "";
  const canonicalUrl = post?.canonicalUrl;
  const description = post?.seo?.description || post?.subtitle || post?.title || "";
  const images = post?.coverImage?.url;

  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "article",
      siteName: "Syed Muhammad Yaseen | SMY",
      images,
    },
  };

  return metadata;
}

export default async function BlogPreview({ params }: IUseBlogPreview) {
  const { title, markdown, readTimeInMinutes } = await useBlogPreview({ params });
  return (
    <>
      <section className={cn(fadeIn, "animation-delay-200 mb-8 flex flex-col gap-1")}>
        <h1 className="text-3xl font-bold">{title}</h1>
        <h4 className="text-xs font-light">
          {new Date().toLocaleDateString()} • 0 views • {readTimeInMinutes} min read • 0 likes
        </h4>
      </section>
      <article className={cn(fadeIn, "animation-delay-400")}>
        <Mdx code={markdown} />
      </article>
    </>
  );
}
