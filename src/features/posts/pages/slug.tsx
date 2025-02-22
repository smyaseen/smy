import { IPostType } from "@/types/post-types";
import BlogSlugComponent from "../components/blog-slug";

const BlogSlugPage = ({ params }: { params: { slug: string; type: IPostType } }) => {
  return <BlogSlugComponent params={params} />;
};

export default BlogSlugPage;
