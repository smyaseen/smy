import { Mdx } from "@/components/mdx";
import { PostTOC } from "@/components/post-toc";
import { IPostType } from "@/types/post-types";
import { Image as PlaceHolderImage } from "lucide-react";
import Link from "next/link";
import useBlogSlug, { IUseBlogSlug } from "../hooks/useBlogSlug";

import ImageRoundedLazy from "@/components/image-rounded-lazy";
import BlogClientExtrasWrapper from "./blog-client-extras-wrapper";

export default async function BlogSlug({
  params,
}: IUseBlogSlug & {
  params: {
    type: IPostType;
  };
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { publication, post, jsonLd } = await useBlogSlug({ params });
  const {
    publishedAt,
    readTimeInMinutes,
    title,
    views,
    id,
    content: { markdown },
    coverImage,
    seo,
  } = post;

  const coverImageUrl = coverImage?.url;
  const coverImageAlt = coverImage?.attribution || seo?.description || title;

  return (
    <>
      <section className="flex flex-col gap-2">
        {coverImageUrl ? (
          <div className="w-full px-4 sm:px-0">
            <ImageRoundedLazy
              src={coverImageUrl}
              alt={coverImageAlt}
              width={960}
              height={540}
              priority
              placeholder="empty"
              className="w-full h-auto max-w-full mx-auto rounded-md object-contain"
            />
          </div>
        ) : (
          <div className="w-full max-w-[960px] h-[540px] flex items-center justify-center bg-muted rounded-md m-auto">
            <PlaceHolderImage size={64} className="text-muted-foreground" />
          </div>
        )}

        <h1 className="text-3xl font-bold text-center">{title}</h1>
        <h2 className="text-xl text-center">{seo?.description}</h2>
        <h3 className="text-sm font-light">
          {new Date(publishedAt).toLocaleDateString("en-GB")} • {views} views • {readTimeInMinutes} min read
        </h3>
        <Link href={`/api/${params.type}/${params.slug}.md`} className="text-xs underline">
          View Markdown
        </Link>
      </section>

      {post?.features?.tableOfContents?.isEnabled && post.features?.tableOfContents?.items?.length > 0 && (
        <section>
          <PostTOC post={post} />
        </section>
      )}

      <div className="relative mb-16">
        <article>
          <Mdx code={markdown} />
        </article>

        <BlogClientExtrasWrapper post={post} type={params.type} postId={id} publicationId={publication?.id} />
      </div>

      <script id="jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
