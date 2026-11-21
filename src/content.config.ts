import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const tag = z.object({ name: z.string(), slug: z.string().optional() });

const posts = defineCollection({
  // `generateId` keeps the frontmatter slug as the entry id, so URLs stay exactly as they were.
  loader: glob({ pattern: "*.md", base: "./content/posts", generateId: ({ data }) => String(data.slug) }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().nullish(),
    slug: z.string(),
    brief: z.string().nullish(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().nullish(),
    readTimeInMinutes: z.number().default(1),
    canonicalUrl: z.string().nullish(),
    coverImage: z.object({ url: z.string(), attribution: z.string().nullish() }).nullish(),
    seo: z.object({ title: z.string().nullish(), description: z.string().nullish() }).nullish(),
    series: z.object({ name: z.string(), slug: z.string() }).nullish(),
    tags: z.array(tag).default([]),
    tableOfContents: z.object({ enabled: z.boolean() }).passthrough().nullish(),
  }),
});

export const collections = { posts };
