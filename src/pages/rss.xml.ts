import { getAllPosts, postDescription, postPath } from "@/lib/posts";
import site from "@/lib/site";
import rss from "@astrojs/rss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const posts = await getAllPosts();

  return rss({
    title: `${site.displayTitle} | Blog`,
    description: site.descriptionSEO,
    site: site.url,
    trailingSlash: false,
    items: posts.map((post) => ({
      title: post.data.title,
      description: postDescription(post),
      pubDate: post.data.publishedAt,
      link: postPath(post),
      categories: post.data.tags.map((tag) => tag.name),
    })),
  });
};
