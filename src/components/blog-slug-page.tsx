import Analytics from "@/components/analytics";
import { Mdx } from "@/components/mdx";
import { PostTOC } from "@/components/post-toc";
import createPostJsonLd from "@/lib/create-post-json-ld";
import { cn, fadeIn } from "@/lib/utils";
import getBlogPost from "@/server/get-blog-post";
import getPublication from "@/server/get-publication";
import { Image as PlaceHolderImage } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next/types";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
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

export default async function BlogSlugPage({ params }: Props) {
  const post = await getBlogPost(params);
  const publication = await getPublication();

  if (!post) {
    notFound();
  }

  const jsonLd = createPostJsonLd(publication, post);

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
          <Image
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
