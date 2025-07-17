import Filter from "@/components/filter";
import { IPostType } from "@/types/post-types";
import getAllBlogTags from "../domain/repository/get-all-blog-tags";

async function BlogTagsFilter({ type }: { type: IPostType }) {
  const allTags = await getAllBlogTags({ type });

  return <Filter tags={allTags} />;
}

export default BlogTagsFilter;
