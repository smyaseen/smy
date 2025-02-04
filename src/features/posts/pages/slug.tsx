import BlogSlugComponent from "../components/blog-slug-component";

const BlogSlugPage = ({ params }: { params: { slug: string } }) => {
  return <BlogSlugComponent params={params} />;
};

export default BlogSlugPage;
