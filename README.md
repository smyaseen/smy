# [A Modern Developer Portfolio with Next.js, Shadcn & Tailwind v4](https://www.sm-y.dev/projects/building-a-modern-developer-portfolio-with-nextjs-hashnode-shadcn-tailwind-v4)

## Getting Started

```console
npx create-next-app -e https://github.com/smyaseen/smy
```

```console
pnpm install
```

## Content

Posts live in [`content/posts`](content/posts) as markdown files with YAML frontmatter — one file per post, and the file name is the URL slug. A post is served under `/projects` when its frontmatter sets `series.slug: projects`, and under `/blog` otherwise. The About page bio is [`content/about.md`](content/about.md).

Every post is rendered at build time, so adding or editing a file means rebuilding (in development the files are re-read on each request).

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

## Environment Variables

[.env.example](.env.example) contains the environment variables this project reads. Copy it to `.env.local` to get started.

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

This project was originally cloned from [Hashnode-Next](https://github.com/alexkates/hashnode-next) and has since moved off Hashnode to local markdown.

Special thanks to [@alexkates](https://github.com/alexkates) for the original work.
