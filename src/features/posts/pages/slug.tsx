import BlogSlugComponent from "../components/blog-slug";

const BlogSlugPage = ({ params }: { params: { slug: string } }) => {
  return <BlogSlugComponent params={params} />;
};

export default BlogSlugPage;
