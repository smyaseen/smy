import usePostList, { IUsePostList } from "../hooks/usePostList";
import BlogPostListItem from "./blog-post-list-item";

function PostList({ posts, query = "", sort = "", tags = "", first, type }: IUsePostList) {
  const { sortedPosts, tagsArray } = usePostList({ posts, query, sort, tags, first, type });

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {sortedPosts.map((post) => (
        <BlogPostListItem key={post.id} post={post} />
      ))}
    </ul>
  );
}

export default PostList;
