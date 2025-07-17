import Search from "@/components/search";
import Sort from "@/components/sort";
import { cn, fadeIn } from "@/lib/utils";
import { IPostType } from "@/types/post-types";
import { Suspense } from "react";
import BlogTagsFilter from "../../components/blog-tags-filter";

const BlogFilter = ({ type }: { type: IPostType }) => {
  return (
    <section className={cn(fadeIn, "animation-delay-200 flex gap-x-2")}>
      <Search placeholder="Search blog posts..." />
      <Sort />
      <Suspense fallback={null}>
        <BlogTagsFilter type={type} />
      </Suspense>
    </section>
  );
};

export default BlogFilter;
