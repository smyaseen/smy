import BlogPreview from "../components/blog-preview";

type Props = {
  params: {
    id: string;
  };
};

const BlogPreviewPage = ({ params }: Props) => {
  return <BlogPreview params={params} />;
};

export default BlogPreviewPage;
