import BlogPage from "@/features/posts/pages";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    sort?: string;
    tags?: string;
  };
}) {
  return <BlogPage type="blog" searchParams={searchParams} />;
}
