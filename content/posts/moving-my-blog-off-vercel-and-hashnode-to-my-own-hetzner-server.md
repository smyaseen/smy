---
title: Moving My Blog Off Vercel and Hashnode to My Own Hetzner Server
subtitle: >-
  How I moved sm-y.dev from Vercel to a Hetzner box running Coolify, the domain
  from Namecheap to Cloudflare, and the posts from Hashnode to plain markdown,
  mostly by talking to Claude in a terminal.
slug: moving-my-blog-off-vercel-and-hashnode-to-my-own-hetzner-server
brief: >-
  My Vercel free tier ended and Hashnode started charging for its API, so I
  moved the whole site onto a Hetzner server I already had, behind Cloudflare,
  deployed with Coolify. Claude did most of the clicking and typing.
publishedAt: '2026-11-21T18:00:00.000Z'
updatedAt: null
readTimeInMinutes: 6
canonicalUrl: null
coverImage: null
seo:
  title: Moving My Blog From Vercel and Hashnode to Hetzner and Coolify
  description: >-
    How I moved sm-y.dev from Vercel to a self-hosted Hetzner server with
    Coolify, the domain from Namecheap to Cloudflare, and my posts from Hashnode
    to markdown, using Claude Code, MCPs and a terminal.
series: null
tags:
  - name: self-hosting
    slug: self-hosting
  - name: devops
    slug: devops
  - name: Cloudflare
    slug: cloudflare
  - name: AI
    slug: ai
  - name: astro
    slug: astro
tableOfContents:
  enabled: true
  items: []
---

This site has been sitting still for a while. The last post went up in July 2025, the projects page still describes work I finished long ago, and in the meantime both platforms it ran on changed their terms. So I moved everything to a server I own, and I did most of it in one afternoon with Claude in a terminal.

## What broke

Two things, a few months apart.

First, Hashnode. The blog used to pull every post from Hashnode's GraphQL API at build time. In May 2026 Hashnode put API access behind a paid plan, and the endpoint started redirecting to a changelog about it. My site had no posts to fetch. I scraped my own articles back off the public Hashnode pages and saved each one as a markdown file with YAML frontmatter in the repo, so the content finally lives with the code.

Then Vercel. My free tier ended, and one day the site was answering every request with `402 Payment required` and `DEPLOYMENT_DISABLED`. I could have paid, but a static blog with 30 posts only needs a web server.

## The server I already had

About a year ago I bought a small Hetzner cloud server: 4 vCPUs, 8 GB of RAM, 40 GB of disk. Hetzner still sells that plan, but it's very hard to get hold of now, so I'm glad I grabbed it when I did. It has been running Coolify for my other projects ever since, including [reversedwithai.com](https://reversedwithai.com), and it hasn't given me any trouble.

Coolify is a self-hosted alternative to Vercel or Heroku. You point it at a GitHub repo, it builds a Docker image on every push and runs it behind Traefik, which handles routing and Let's Encrypt certificates. For a solo developer it's most of what I used Vercel for, on hardware I pay for once a month.

## Rewriting the site in Astro

The old site was Next.js with React, Radix, framer-motion and about 60 other packages, all to render markdown. I rewrote it in Astro, which builds every page to static HTML at build time. The only JavaScript left is a few small scripts for search, the theme toggle and the table of contents.

The build runs in a Dockerfile: Node builds the site, then an `nginx:stable-alpine` image serves the `dist` folder. The final image is just nginx and some HTML files. I kept every old URL working, including the raw markdown at `/blog/<slug>.md` that I wrote about [in an earlier post](/blog/how-i-made-my-nextjs-blog-serve-markdown-files-for-agent-experience-seo-ax-seo), and added an RSS feed, a sitemap and an `llms.txt`.

Hashnode's export had one surprise. It writes images as `![](url align="center")`, which standard markdown parsers don't understand, so 14 posts were showing image URLs as plain text. Stripping the `align` part from the source files fixed it.

## Namecheap to Cloudflare

While I was at it, I moved the domain. sm-y.dev was registered at Namecheap with Namecheap's DNS. Cloudflare Registrar sells domains at cost, so a `.dev` renewal is $12.20 a year, and having DNS and the registrar in one place is simpler.

The bigger reason is that I like Cloudflare a lot. Besides DNS and the proxy in front of my server, I already run Workers, R2 storage and email routing there for my other projects, all from one dashboard and mostly on the free tier. It can do far more than I use it for, and that deserves its own post someday.

I added the site to Cloudflare first so it could import the existing DNS records, then switched the nameservers at Namecheap, unlocked the domain, requested the auth code and started the transfer in Cloudflare. The transfer went through the same day.

One thing caught me out at the end. My server's firewall only lets Cloudflare's network reach ports 80 and 443. With the DNS records set to "DNS only", visitors and Let's Encrypt both timed out. Switching them to Proxied, the same way my other sites are set up, fixed it, and Traefik got real certificates for both `sm-y.dev` and `www.sm-y.dev`.

## How I actually did it

I didn't do most of this by hand. These days I mostly work from a terminal, at home and at work, with Claude Code connected to MCP servers that let it reach the tools I'd otherwise click through myself. For this migration that meant Cloudflare and Namecheap, the server and pretty much everything else. I described what I wanted, and it worked through it with me:

- It read the old Next.js code and wrote the Astro version.
- Over SSH it built and tested everything on the server itself, because my home connection is slow. Each build ran in a throwaway Docker container, with a private preview I could open through an SSH tunnel.
- Through the Claude in Chrome MCP it worked in my Cloudflare and Namecheap dashboards: adding the site, changing nameservers, unlocking the domain, editing DNS records. It stopped and handed the payment and the auth code back to me.
- Coolify's API was turned off on my server, so it created the app with Coolify's own command line inside the container. It matched the setup of my existing apps and left them alone.
- When the first certificate request failed, it read the Traefik logs, worked out it was the firewall, and found that my other sites were proxied.

It wasn't hands-off. I made the calls on design, on money and on what to publish, and I rejected a couple of redesigns before landing on this one. But the slow parts (reading logs, clicking through dashboards, writing Dockerfiles) took minutes instead of a weekend.

## What's next

The setup is boring now, which is what I wanted: push to `main`, and about a minute later the site is live.

The part I'm less proud of is the content. Most posts here are from 2024 and 2025, and the projects page stops at Mergn. Since then I've done a lot, especially AI engineering: LLM agent tooling at Securiti AI and Veeam, evaluation loops, and building with tools like the ones that did this migration. I plan to write that up here, now that publishing a post is just adding a markdown file.
