import BlogFilter from "../useCases/filter";
import BlogList from "../useCases/list";

const BlogPage = ({
  searchParams,
  type,
}: {
  searchParams?: {
    query?: string;
    sort?: string;
    tags?: string;
  };
  type: "blog" | "project";
}) => {
  return (
    <main className="mb-8 flex flex-col gap-y-4">
      <BlogFilter />
      <BlogList type={type} searchParams={searchParams} />
    </main>
  );
};

export default BlogPage;
