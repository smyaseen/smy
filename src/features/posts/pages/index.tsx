import { IPostType } from "@/types/post-types";
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
  type: IPostType;
}) => {
  return (
    <main className="mb-8 flex flex-col gap-y-4">
      <BlogFilter type={type} />
      <BlogList type={type} searchParams={searchParams} />
    </main>
  );
};

export default BlogPage;
