---
title: >-
  How I Made My Next.js Blog Serve Markdown Files for Agent Experience SEO
  (AX-SEO)
subtitle: >-
  Boosting AI Visibility: How Serving Markdown in Next.js Enhances Agent
  Experience SEO
slug: how-i-made-my-nextjs-blog-serve-markdown-files-for-agent-experience-seo-ax-seo
brief: >-
  I’ll show you how to serve raw Markdown files in a Next.js blog using
  middleware and API routes, enabling Agent Experience SEO (AX-SEO).

  AX-SEO focuses on optimizing content for AI agents, LLM-powered search
  engines, and automated crawlers that now p...
publishedAt: '2025-02-22T11:32:06.774Z'
updatedAt: '2025-02-24T05:40:28.620Z'
readTimeInMinutes: 3
canonicalUrl: null
coverImage:
  url: >-
    https://cdn.hashnode.com/res/hashnode/image/upload/v1740223825142/5c0d03cb-1357-4bfd-8f0f-e44fefd9a04b.png
  attribution: null
seo:
  title: How I Made My Next.js Blog Serve Markdown for Agent Experience SEO
  description: >-
    Optimize your Next.js blog for AX-SEO by serving raw Markdown to enhance AI
    indexing and improve content discoverability
series: null
tags:
  - name: Next.js
    slug: nextjs
  - name: agentic AI
    slug: agentic-ai
  - name: llm
    slug: llm
  - name: bot
    slug: bot
  - name: SEO
    slug: seo
  - name: Hashnode
    slug: hashnode
  - name: Blogging
    slug: blogging
  - name: markdown
    slug: markdown
  - name: chatgpt
    slug: chatgpt
  - name: openai
    slug: openai
  - name: Open Source
    slug: opensource
  - name: generative ai
    slug: generative-ai
tableOfContents:
  enabled: true
  items:
    - id: toc-0
      level: 2
      slug: how-i-did-it
      title: How I Did It
      parentId: null
    - id: toc-1
      level: 3
      slug: step-1-middleware-for-md-routing
      title: 'Step 1: Middleware for .md Routing'
      parentId: null
    - id: toc-2
      level: 3
      slug: step-2-api-route-to-serve-markdown
      title: 'Step 2: API Route to Serve Markdown'
      parentId: null
    - id: toc-3
      level: 3
      slug: step-3-fetching-markdown-content-from-cms
      title: 'Step 3: Fetching Markdown Content from CMS'
      parentId: null
    - id: toc-4
      level: 3
      slug: step-4-adding-a-markdown-link-to-the-blog
      title: 'Step 4: Adding a Markdown Link to the Blog'
      parentId: null
    - id: toc-5
      level: 2
      slug: how-this-boosts-agent-experience-seo-ax-seo
      title: How This Boosts Agent Experience SEO (AX-SEO)
      parentId: null
    - id: toc-6
      level: 2
      slug: final-thoughts
      title: Final Thoughts
      parentId: null
---
I’ll show you how to serve **raw Markdown files** in a **Next.js blog** using **middleware and API routes**, enabling **Agent Experience SEO (AX-SEO)**.

AX-SEO focuses on optimizing content for **AI agents, LLM-powered search engines, and automated crawlers** that now play a major role in content discovery.

By the end of this post, you’ll be able to:

✅ Implement **Next.js middleware** for `.md` URL rewriting.  
✅ Set up **API routes** to fetch and serve Markdown content.  
✅ Optimize your blog for **Agent Experience SEO** (AI-driven search).  
✅ Provide **clean, structured data** for AI-powered search engines.

---

Traditional SEO is no longer enough. AI search engines, **LLM-powered assistants (ChatGPT, Perplexity, Google’s AI Overviews, etc.), and autonomous agents** are now **indexing** and **ranking** content differently.

**Why does AX-SEO matter?**

* **AI agents prefer structured content** – Raw Markdown is **easier to parse** than HTML.
    
* **LLMs use Markdown for training & retrieval** – AI search engines extract structured text **more efficiently**.
    
* **AX-SEO improves discoverability** – AI-driven platforms rank content **based on how well agents can process it**.
    

If you want your blog **optimized for AI-driven search**, this guide is for you!

---

Most blogs serve only **HTML**, making extracting structured information hard for AI tools. Common mistakes include:

❌ **Not offering raw text formats** – AI agents struggle with unnecessary markup.  
❌ **Ignoring structured data for LLMs** – AI search engines prioritize **clean content**.

This guide **avoids these mistakes** and ensures a **future-proof** content strategy for AI indexing.

---

## **How I Did It**

### **Step 1: Middleware for** `.md` Routing

I used **Next.js Middleware** to detect `.md` URLs and redirect them to an API route:

```ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname.endsWith(".md")) {
    url.pathname = `/api${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/blog/:path*.md", "/projects/:path*.md"],
};
```

### **Step 2: API Route to Serve Markdown**

Next, I created API endpoints to fetch Markdown content:

```ts
import { readMarkdown } from "@/server/read-markdown-file";
import { NextRequest } from "next/server";

export async function GET(_req: NextRequest, { params: { slug } }: { params: { slug: string } }) {
  return readMarkdown(slug);
}
```

### **Step 3: Fetching Markdown Content from CMS**

The `readMarkdown` the function retrieves the raw Markdown content:

```ts
import useBlogSlug from "@/features/posts/hooks/useBlogSlug";
import { NextResponse } from "next/server";

export async function readMarkdown(slug: string) {
  try {
    const {
      post: {
        content: { markdown },
      },
    } = await useBlogSlug({ params: { slug: slug.replace(".md", "") } });

    return new NextResponse(markdown, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error reading markdown file:", error);
    return new NextResponse(JSON.stringify({ message: "Markdown file not found" }), { status: 404 });
  }
}
```

### **Step 4: Adding a Markdown Link to the Blog**

To make the Markdown file accessible, I added a link on each blog page:

```tsx
<Link href={`/api/${params.type}/${params.slug}.md`} passHref>
  View Markdown
</Link>
```

Now, every post has a **“View Markdown”** button that links to the raw `.md` version.

---

## **How This Boosts Agent Experience SEO (AX-SEO)**

* ✅ **AI-Optimized Content** – Markdown is **easier for AI bots to read** than HTML.
    
* ✅ **AX-SEO Ready** – AI-powered search engines **prefer structured text** for ranking and retrieval.
    
* ✅ **Faster AI Crawling** – Lightweight Markdown **improves indexing speed**.
    
* ✅ **Better Content Extraction** – LLMs can fetch raw text for **RAG-based applications**.
    
* ✅ **Scalable & Future-Proof** – Works for **blogs, docs, and AI knowledge bases**.
    

---

## **Final Thoughts**

With this approach, I made my **Next.js blog serve Markdown dynamically**, benefiting both **humans and AI bots**.

📂 **Source Code:** [GitHub Repository](https://github.com/smyaseen/smy)  
🌍 **Live Website:** [sm-y.dev](https://sm-y.dev/)

I hope this guide helps you **boost your blog’s AX-SEO and AI search visibility**! 🚀
