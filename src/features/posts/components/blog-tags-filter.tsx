import Filter from "@/components/filter";
import getAllBlogTags from "../domain/get-all-blog-tags";

async function BlogTagsFilter() {
  const allTags = await getAllBlogTags();

  return <Filter tags={allTags} />;
}

export default BlogTagsFilter;
