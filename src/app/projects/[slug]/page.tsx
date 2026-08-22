import getAllProjects from "@/features/posts/domain/repository/get-all-projects";
import getBlogPost from "@/features/posts/domain/repository/get-blog-post";
import BlogSlugPage from "@/features/posts/pages/slug";
import { PostType } from "@/types/post-types";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

// Every post is known at build time, so anything else is a genuine 404
// rather than a path to render on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = getBlogPost({ slug });

  if (!post) return {};

  const title = post.seo.title || post.title;
  const description = post.seo.description || post.subtitle || post.title;
  const images = post.coverImage?.url ?? "";
  const url = post.canonicalUrl || post.url;

  const metadata: Metadata = {
    title: `SMY - ${title}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `SMY - ${title}`,
      description,
      type: "article",
      siteName: "Syed Muhammad Yaseen - SMY",
      images,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images,
    },
  };

  return metadata;
}

export default async function Page(props: Props) {
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
