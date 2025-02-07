import { Post } from "@/hashnode/generated/graphql";
import { SortTypes } from "@/types/sort-types";

export type CreatePostListViewModelProps = {
  posts: Post[];
  query?: string;
  sort?: string;
  tags?: string;
  first?: number;
  type: "blog" | "project";
};

export function createPostListViewModel({ posts, query = "", sort = "", tags = "", first, type }: CreatePostListViewModelProps) {
  let filteredPosts = posts;

  if (type === "blog") {
    filteredPosts = posts.filter((post) => post.series?.name !== "Projects");
  }

  filteredPosts = first ? filteredPosts.slice(0, first) : filteredPosts;

  const tagsArray = tags?.split(",").filter((t) => t !== "");

  const sortedPosts = filteredPosts
    .sort((a, b) => {
      if (sort === SortTypes.Date) {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      } else if (sort === SortTypes.Views) {
        return b.views - a.views;
      }
      return 0;
    })
    .filter((post) => {
      const isMatchingQuery = post.content.text?.toLowerCase().includes(query?.toLowerCase() ?? "");
      const isMatchingTags = tagsArray?.length === 0 || tagsArray?.some((tag) => post.tags?.map((t) => t.name.toLowerCase()).includes(tag));
      return isMatchingQuery && isMatchingTags;
    });

  return {
    tagsArray,
    sortedPosts,
  };
}
