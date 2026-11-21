Hi there 👋 I'm SMY, a Senior Software Engineer who builds backend services and REST APIs for AI-enabled SaaS platforms.

About five years in, most of my work has lived in the middle of the stack: the APIs that keep ten million users in sync, and the services and pipelines that carry them. Lately a lot of that has involved LLMs, both inside the product and inside the engineering workflow itself.

Based in Karachi, Pakistan.

## Now

**Senior Software Engineer at Securiti AI / Veeam** (Securiti was acquired by Veeam), Feb 2026 to present.

I work across the product, and on LLM agent tooling for production engineering workflows.

One of those is veeam-improve, a self-improving agent tooling plugin for Claude Code with 60 skills and 13 agents. Its learning-loop architecture came from a leading open-source agent, which I evaluated at source level before porting the approach. Blind re-implementation of 22 merged Jira tickets, diffed against the code that actually shipped, took its implementation-mechanism accuracy from 50% to 90%. A SQLite FTS5 index over 4,600+ session messages cut prior-decision lookup from roughly ten minutes to 65ms. Sixteen versioned releases went out in eight days through a zero-setup internal plugin marketplace with command-approval guards and full audit logging.

## Previously

**Founding Engineer at Mergn**, Oct 2023 to Feb 2026.

[Mergn](https://mergn.com) is a customer retention platform for Shopify stores: brands build segments of their customers, then reach them through campaigns and journeys across email, SMS, WhatsApp, web and app push, popups and content cards. I joined at the start as a founding engineer and stayed until it was supporting 50+ brands, among them KFC, McDonald's, Domino's, Aldo, Pierre Cardin, Naheed, Highfy and Jenpharm.

Being early meant doing a bit of everything. We got the MVP out fast, cutting time to market about tenfold, on Next.js, NestJS in an Nx monorepo, PostgreSQL, Elasticsearch and AWS. As the product grew I led the frontend and a small team, and moving to clean architecture, TDD and proper CI/CD made us about 60% faster at shipping.

On the frontend I owned most of what brands actually used to run their marketing: the campaign builder and journey builder, the builders for email, app push and popup messages, merge tags for personalising them, and voucher support with dynamic code generation. Underneath those builders sat a custom text editor I built on Meta's Lexical framework. Typing @ opened a merge tag picker right at the cursor, where you could pick a field or enter a custom value, and the editor checked copy for spam triggers and highlighted errors as you wrote. I also built the auth flows and a one-click onboarding setup, so a new brand could connect their Shopify store, sync their customers and start sending without waiting on us.

Getting Mergn into a brand's own systems was the other half of the job, and I cared about making that easy for their developers. I built the [Shopify app](https://apps.shopify.com/mergn) and the [web SDK on npm](https://www.npmjs.com/package/mergn-webapp-sdk), which together handle 10M+ events a month. The SDK tracks events, properties and user attributes intelligently, syncs anonymous IDs, runs web push notifications through a service worker, and shows content cards, custom popups and gamified popups on the brand's site. Those lifted engagement by 60% and conversions by 75% for the brands using them.

Behind that, I wrote the backend for the Segment Builder and the campaign engine, then the journey orchestration that triggers email, SMS, push, Meta Ads and WhatsApp messages from customer events, which cut campaign rollout time by over 90%. Along the way I integrated Meta CAPI and Shopify webhooks for real-time retargeting, built multi-tenant auth with AWS Cognito and NextAuth, set up real-time analytics on Elasticsearch, and brought in LLMs for segment creation and content moderation.

I also built Mergn's whole website, [mergn.com](https://mergn.com), on my own: multilingual, on Next.js with Sanity as the CMS, so the team could publish blog posts, case studies and page changes themselves without a developer. And like anyone at a startup, I spent plenty of time on support, helping brands get set up and fixing whatever got in their way. That still leaves out a lot: dozens of smaller features, integrations with other systems, and the ETL pipelines that kept brand data flowing into the platform.

In Aug 2024 Mergn won Gold at the PASHA ICT Awards, and it took second place at Allied Bank's startup competition in Lahore. You can read more about the work in [my Mergn write-ups](/projects?tags=mergn).

**Full Stack Engineer on Science37 at Nisum**, Jul 2021 to Oct 2023.

I automated 90% of data archival with AWS Fargate, S3 and a NestJS cron, which took it from an hour to a minute. Notification load times went from a minute to six seconds. Patient record retrieval got 30% faster, and clinical trial data export and import got 83% faster through algorithm work.

## Education

**Master of Computer Science**, FAST NUCES Karachi. Started Aug 2025, expected 2027.

**Bachelor of Computer Science**, SZABIST Karachi. 3.72 CGPA, finished Jul 2023. I ranked in the top 10 of 200+ students, held four merit semester scholarships, and led ACM SZABIST.

## Recognition

Microsoft certified me on Azure Fundamentals in Jun 2023. Mergn took the Gold Award at the PASHA ICT Awards in Aug 2024, in Business Services and Marketing Solutions. SZABIST gave me the University Chancellor's Certificate in Jul 2023 for placing in the top 10.

## Writing

I publish engineering articles here and on HackerNoon, covering caching and technical debt, browser tab coordination, and Shadow DOM embedding. The collection lives on [the blog](/blog).

If you are working on something in this space, [say hello](https://www.linkedin.com/in/sm-y/).
