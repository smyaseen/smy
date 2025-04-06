import getBlogPost from "@/features/posts/domain/adapter/get-blog-post";
import BlogSlugPage from "@/features/posts/pages/slug";
import { PostType } from "@/types/post-types";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await getBlogPost({ slug });

  const title = post?.seo?.title || post?.title;
  const canonicalUrl = post?.canonicalUrl;
  const description = post?.seo?.description || post?.subtitle || post?.title;
  const images = post?.coverImage?.url ? [{ url: post.coverImage.url }] : [];

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
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: images.length > 0 ? images[0].url : undefined,
    },
    other: {
      "og:title": title,
      "og:description": description,
      "og:image": images.length > 0 ? images[0].url : "",
      "og:url": canonicalUrl || "",
      "og:type": "article",
      "twitter:card": "summary_large_image",
      "twitter:title": title,
      "twitter:description": description,
      "twitter:image": images.length > 0 ? images[0].url : "",
    },
  };

  return metadata;
}

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <BlogSlugPage
      params={{
        slug: params.slug,
        type: PostType.BLOG,
      }}
    />
  );
}
