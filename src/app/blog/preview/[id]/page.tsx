import BlogPreviewPage from "@/features/posts/pages/preview";

export default async function Page({ params }: { params: { id: string } }) {
  <BlogPreviewPage params={params} />;
}
