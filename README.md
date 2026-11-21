# [sm-y.dev](https://sm-y.dev)

The personal site and blog of Syed Muhammad Yaseen, built with [Astro](https://astro.build) and Tailwind CSS v4. Every page is static HTML. The only JavaScript is a few small scripts for search, the theme toggle and the table of contents.

## Getting Started

```console
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # type-checks, then writes the site to dist/
```

## Content

Posts live in [`content/posts`](content/posts) as markdown files with YAML frontmatter, one file per post. The `slug` field is the URL. A post is served under `/projects` when its frontmatter sets `series.slug: projects`, and under `/blog` otherwise. The About page bio is [`content/about.md`](content/about.md).

Every post is rendered at build time, so adding or editing a file means rebuilding. `pnpm dev` picks up edits live.

Each post's source is also published as raw markdown at its URL plus `.md` (for example `/blog/my-post.md`), and [`/llms.txt`](https://sm-y.dev/llms.txt) lists them all for AI agents. The site also builds `/rss.xml` and `/sitemap-index.xml`.

To add a post, create `content/posts/my-post.md`:

```markdown
---
title: My Post
slug: my-post
publishedAt: "2026-01-01T00:00:00.000Z"
readTimeInMinutes: 4
seo:
  description: A one-line summary used on cards and in metadata.
coverImage:
  url: /covers/my-post.png
tags:
  - name: TypeScript
    slug: typescript
---

Your markdown body goes here.
```

## Deployment

The [`Dockerfile`](Dockerfile) builds the site with Node and serves `dist/` from nginx using [`nginx.conf`](nginx.conf), which maps `/blog/my-post` to `blog/my-post.html` and serves `.md` files as `text/markdown`. It is deployed through Coolify on a Hetzner server, which rebuilds on every push to `main`. The site needs no environment variables.

## Contributing

Please read through our [contributing guide](.github/CONTRIBUTING.md) before starting any work.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/my-amazing-feature`)
3. Commit your Changes (`git commit -am 'Add some my-amazing-feature'`)
4. Push to the Branch (`git push origin feature/my-amazing-feature`)
5. Open a Pull Request

## Authors

<a href="https://github.com/smyaseen/smy/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=smyaseen/smy" />
</a>

## Stats

![Alt](https://repobeats.axiom.co/api/embed/4d2cef9bfa1196e825b05e19c493269d5da30fa0.svg "Repobeats analytics image")

## License

Distributed under the MIT License. See the [license](LICENSE.md) for more information.

## Credit

This project was originally cloned from [Hashnode-Next](https://github.com/alexkates/hashnode-next). It has since moved off Hashnode to local markdown, and from Next.js to Astro.

Special thanks to [@alexkates](https://github.com/alexkates) for the original work.
