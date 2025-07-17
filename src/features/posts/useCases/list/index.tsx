import { CatSpinner } from "@/components/cat-spinner";
import { cn, fadeIn } from "@/lib/utils";
import { IPostType } from "@/types/post-types";
import { Suspense } from "react";
import AllPostsList from "../../components/all-post-list";

type IBlogList = {
  searchParams?: {
    query?: string;
    sort?: string;
    tags?: string;
  };
  type: IPostType;
};

const BlogList = async ({ searchParams = {}, type }: IBlogList) => {
  const { query = "", sort = "date", tags = "" } = await searchParams;

  return (
    <section className={cn(fadeIn, "animation-delay-400")}>
      <Suspense fallback={<CatSpinner />}>
        <AllPostsList type={type} query={query} sort={sort} tags={tags} />
      </Suspense>
    </section>
  );
};

export default BlogList;
