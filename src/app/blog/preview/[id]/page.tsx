import BlogPreviewPage from "@/features/posts/pages/preview";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  <BlogPreviewPage params={params} />;
}
