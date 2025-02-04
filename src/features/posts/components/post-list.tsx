import { Post } from "@/hashnode/generated/graphql";
import { SortTypes } from "@/types/sort-types";
import BlogPostListItem from "./blog-post-list-item";

type Props = {
  posts: Post[];
  query?: string;
  sort?: string;
  tags?: string;
  first?: number;
  type: "blog" | "project";
};

function PostList({ posts, query = "", sort = "", tags = "", first, type }: Props) {
  let filteredPosts = posts;

  if (type === "blog") {
    filteredPosts = posts.filter((post) => post.series?.name !== "Projects");
  }

  filteredPosts = first ? filteredPosts.slice(0, first) : filteredPosts;

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sort === SortTypes.Date) {
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    } else if (sort === SortTypes.Views) {
      return b.views - a.views;
    }
    return 0;
  });

  const tagsArray = tags?.split(",").filter((t) => t !== "");

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {sortedPosts
        .filter((post) => {
          const isMatchingQuery = post.content.text?.toLowerCase().includes(query?.toLowerCase() ?? "");
          const isMatchingTags = tagsArray?.length === 0 || tagsArray?.some((tag) => post.tags?.map((t) => t.name.toLowerCase()).includes(tag));
          return isMatchingQuery && isMatchingTags;
        })
        .map((post) => (
          <BlogPostListItem key={post.id} post={post} />
        ))}
    </ul>
  );
}

export default PostList;
