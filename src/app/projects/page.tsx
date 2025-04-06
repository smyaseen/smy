import BlogPage from "@/features/posts/pages";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMY - Projects",
  description: "Explore projects by Syed Muhammad Yaseen on various topics.",
  openGraph: {
    title: "SMY - Projects",
    description: "Explore projects by Syed Muhammad Yaseen on various topics.",
    url: "https://sm-y.dev/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMY - Projects",
    description: "Explore projects by Syed Muhammad Yaseen on various topics.",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    sort?: string;
    tags?: string;
  };
}) {
  return <BlogPage type="project" searchParams={searchParams} />;
}
