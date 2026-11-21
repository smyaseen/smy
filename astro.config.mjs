// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeExternalLinks, rehypeStripAligns } from "./src/lib/rehype-plugins.ts";

export default defineConfig({
  site: "https://sm-y.dev",
  // Pages build to `blog/<slug>.html` and nginx serves them at `/blog/<slug>`,
  // matching the URLs the Next.js site used.
  trailingSlash: "never",
  build: { format: "file" },
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: "github-dark-dimmed", wrap: false },
    rehypePlugins: [rehypeStripAligns, rehypeExternalLinks, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
