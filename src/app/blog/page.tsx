import PostsPage from "@/features/posts/pages";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMY - Blog",
  description: "Engineering articles by Syed Muhammad Yaseen on backends, AI tooling and web development.",
  openGraph: {
    title: "SMY - Blog",
    description: "Engineering articles by Syed Muhammad Yaseen on backends, AI tooling and web development.",
    url: "https://sm-y.dev/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMY - Blog",
    description: "Engineering articles by Syed Muhammad Yaseen on backends, AI tooling and web development.",
  },
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    sort?: string;
    tags?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  return <PostsPage type="blog" searchParams={searchParams} />;
}
