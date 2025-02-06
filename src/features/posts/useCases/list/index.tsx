import { CatSpinner } from "@/components/cat-spinner";
import { cn, fadeIn } from "@/lib/utils";
import { Suspense } from "react";
import AllPostsList from "../../components/all-post-list";

type IBlogList = {
  searchParams?: {
    query?: string;
    sort?: string;
    tags?: string;
  };
  type: "blog" | "project";
};

const BlogList = ({ searchParams = {}, type }: IBlogList) => {
  const { query = "", sort = "date", tags = "" } = searchParams;

  return (
    <section className={cn(fadeIn, "animation-delay-400")}>
      <Suspense fallback={<CatSpinner />}>
        <AllPostsList type={type} query={query} sort={sort} tags={tags} />
      </Suspense>
    </section>
  );
};

export default BlogList;
