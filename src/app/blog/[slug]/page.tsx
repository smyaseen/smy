import BlogSlugPage from "@/features/posts/pages/slug";
import { PostType } from "@/types/post-types";

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <BlogSlugPage
      params={{
        slug: params.slug,
        type: PostType.BLOG,
      }}
    />
  );
}
