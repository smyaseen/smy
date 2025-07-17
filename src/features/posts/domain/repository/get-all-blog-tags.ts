import { Tag } from "@/hashnode/generated/graphql";
import { IPostType } from "@/types/post-types";
import getAllBlogPosts from "./get-all-blog-posts";

export default async function getAllBlogTags({ type }: { type: IPostType }) {
  const posts = await getAllBlogPosts();

  let filteredPosts = posts;

  if (type === "blog") {
    filteredPosts = posts.filter((post) => post.series?.name !== "Projects");
  } else {
    filteredPosts = posts.filter((post) => post.series?.name === "Projects");
  }

  const allTags: Pick<Tag, "postsCount" | "name">[] = filteredPosts
    .flatMap((p) => p.tags)
    .reduce((acc: Pick<Tag, "postsCount" | "name">[], tag) => {
      const name = tag?.name.toLocaleLowerCase();
      if (!name) return acc;

      if (!acc.find((t) => t.name === name)) {
        acc.push({
          name,
          postsCount: filteredPosts.filter((p) => p.tags?.find((t) => t.name.toLocaleLowerCase() === name)).length,
        });
      }

      return acc;
    }, []);

  return allTags;
}
