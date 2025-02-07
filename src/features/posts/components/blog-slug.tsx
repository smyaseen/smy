import Analytics from "@/components/analytics";
import ImageRounded from "@/components/image-rounded";
import { Mdx } from "@/components/mdx";
import { PostTOC } from "@/components/post-toc";
import { cn, fadeIn } from "@/lib/utils";
import { Image as PlaceHolderImage } from "lucide-react";
import { Metadata } from "next/types";
import getBlogPost from "../domain/adapter/get-blog-post";
import useBlogSlug, { IUseBlogSlug } from "../hooks/useBlogSlug";

export async function generateMetadata({ params }: IUseBlogSlug) {
  const post = await getBlogPost(params);

  const title = post?.seo?.title || post?.title;
  const canonicalUrl = post?.canonicalUrl;
  const description = post?.seo?.description || post?.subtitle || post?.title;
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

export default async function BlogSlug({ params }: IUseBlogSlug) {
  const { publication, post, jsonLd } = await useBlogSlug({ params });
  const {
    publishedAt,
    readTimeInMinutes,
    title,
    views,
    id,
    content: { markdown },
  } = post;

  return (
    <>
      <section className={cn(fadeIn, "animation-delay-200 mb-8 flex flex-col gap-1")}>
        {post.coverImage?.url ? (
          <ImageRounded
            // className="object-fill"
            src={post.coverImage?.url}
            alt={post.coverImage?.attribution || post.seo?.description || post.title}
            width={1200}
            height={500}
            className="w-[960px] h-[540px] m-auto rounded-md object-contain"
          />
        ) : (
          <PlaceHolderImage width={600} height={500} />
        )}
        <h1 className="text-3xl font-bold">{title}</h1>
        <h3 className="text-xs font-light">
          {new Date(publishedAt).toLocaleDateString()} • {views} views • {readTimeInMinutes} min read
        </h3>
      </section>

      <section>{post?.features?.tableOfContents?.isEnabled && post.features?.tableOfContents?.items?.length > 0 && <PostTOC post={post} />}</section>

      <article className={cn(fadeIn, "animation-delay-400")}>
        <Mdx code={markdown} />
      </article>
      <Analytics postId={id} publicationId={publication?.id!} />
      <script id="jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
