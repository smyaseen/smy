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
  const images = post?.coverImage?.url;

  const metadata: Metadata = {
    title: `SMY - ${title}`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `SMY - ${title}`,
      description,
      type: "article",
      siteName: "Syed Muhammad Yaseen - SMY",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
    other: {
      "og:title": `SMY - ${title}`,
      "og:description": description,
      "og:image": images || "",
      "og:url": canonicalUrl || "",
      "og:type": "article",
      "twitter:card": "summary_large_image",
      "twitter:title": `SMY - ${title}`,
      "twitter:description": description,
      "twitter:image": images || "",
    },
  };

  return metadata;
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return (
    <BlogSlugPage
      params={{
        slug: params.slug,
        type: PostType.PROJECT,
      }}
    />
  );
}
