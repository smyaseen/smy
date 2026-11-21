import { getPostsOfType, postDescription, postPath } from "@/lib/posts";
import site from "@/lib/site";
import type { APIRoute } from "astro";

/** An llms.txt index (https://llmstxt.org) pointing agents at the raw markdown of every post. */
export const GET: APIRoute = async () => {
  const section = async (type: "blog" | "projects") =>
    (await getPostsOfType(type))
      .map((post) => `- [${post.data.title}](${site.url}${postPath(post)}.md): ${postDescription(post).replace(/\s+/g, " ")}`)
      .join("\n");

  const body = `# ${site.displayTitle}

> ${site.descriptionSEO}

Every post is also available as raw markdown with its frontmatter by appending \`.md\` to its URL.

## About

- [About](${site.url}/about): Background, current role and experience.

## Projects

${await section("projects")}

## Blog

${await section("blog")}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
