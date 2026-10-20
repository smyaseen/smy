/**
 * Static site metadata. This replaces what used to be fetched from Hashnode's
 * `publication` GraphQL query. The blog is now served entirely from `content/`.
 */

const isProd = process.env.NEXT_PUBLIC_MODE === "production";

export const site = {
  title: "SMY",
  displayTitle: "Syed Muhammad Yaseen",
  description: "Senior Software Engineer working on AI backends, LLM integration and scalable APIs.",
  descriptionSEO: "Senior Software Engineer building backend services and REST APIs for AI-enabled SaaS platforms.",
  url: "https://sm-y.dev",
  logo: "/profile-pic.png",
  author: {
    name: "Syed Muhammad Yaseen",
    role: "Senior Software Engineer",
    url: "https://sm-y.dev/about",
    image: "/profile-pic.png",
  },
  links: {
    github: "https://github.com/smyaseen",
    linkedin: "https://www.linkedin.com/in/sm-y/",
    resume: "https://docs.google.com/document/d/1Gfblx5hEvYp0RBA_2QP_6nZRwrl1GGncW23-BhExUuc/edit?usp=sharing"
  },
  /** Posts whose frontmatter `series.slug` matches this are served under /projects. */
  projectsSeries: {
    name: "Projects",
    slug: "projects",
  },
} as const;

/** Base URL used for absolute links and Next's `metadataBase`. */
export const baseUrl = isProd ? site.url : "http://localhost:3000";

export default site;
