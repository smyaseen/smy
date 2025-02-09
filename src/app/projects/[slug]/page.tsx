import BlogSlugPage from "@/features/posts/pages/slug";

export default async function Page({ params }: { params: { slug: string } }) {
  return <BlogSlugPage params={params} />;
}
