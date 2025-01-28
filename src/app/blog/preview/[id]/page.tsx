import BlogSlugPage from "@/components/blog-slug-page";

export default async function Page({ params }: { params: { slug: string } }) {
  return <BlogSlugPage params={params} />;
}
