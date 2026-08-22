import PostsPage from "@/features/posts/pages";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMY - Projects",
  description: "Products and platforms built by Syed Muhammad Yaseen.",
  openGraph: {
    title: "SMY - Projects",
    description: "Products and platforms built by Syed Muhammad Yaseen.",
    url: "https://sm-y.dev/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMY - Projects",
    description: "Products and platforms built by Syed Muhammad Yaseen.",
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
  return <PostsPage type="projects" searchParams={searchParams} />;
}
