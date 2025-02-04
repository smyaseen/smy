import Search from "@/components/search";
import Sort from "@/components/sort";
import { cn, fadeIn } from "@/lib/utils";
import { Suspense } from "react";
import BlogTagsFilter from "../../components/blog-tags-filter";

const BlogFilter = () => {
  return (
    <section className={cn(fadeIn, "animation-delay-200 flex gap-x-2")}>
      <Search placeholder="Search blog posts..." />
      <Sort />
      <Suspense fallback={null}>
        <BlogTagsFilter />
      </Suspense>
    </section>
  );
};

export default BlogFilter;
