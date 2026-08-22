import { PostCard } from "@/types/post-types";
import { SortTypes } from "@/types/sort-types";

export type FilterPostsProps = {
  posts: PostCard[];
  query?: string;
  sort?: string;
  tags?: string[];
};

/**
 * Pure filter + sort over already-projected cards. Runs on the client on every
 * keystroke, so it does no allocation beyond the result array.
 */
export default function filterPosts({ posts, query = "", sort = "", tags = [] }: FilterPostsProps) {
  const needle = query.trim().toLowerCase();

  const filtered = posts.filter((post) => {
    const matchesQuery = !needle || post.search.includes(needle);
    const matchesTags = tags.length === 0 || tags.some((tag) => post.tags.includes(tag));
    return matchesQuery && matchesTags;
  });

  return filtered.sort((a, b) =>
    sort === SortTypes.ReadTime ? a.readTimeInMinutes - b.readTimeInMinutes : new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}
