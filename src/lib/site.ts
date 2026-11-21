export const site = {
  title: "SMY",
  displayTitle: "Syed Muhammad Yaseen",
  description: "Senior Software Engineer working on AI backends, LLM integration and scalable APIs.",
  descriptionSEO: "Senior Software Engineer building backend services and REST APIs for AI-enabled SaaS platforms.",
  url: "https://sm-y.dev",
  logo: "/profile-pic.jpg",
  email: "smyaseen164@gmail.com",
  author: {
    name: "Syed Muhammad Yaseen",
    role: "Senior Software Engineer",
    url: "https://sm-y.dev/about",
  },
  links: {
    github: "https://github.com/smyaseen",
    linkedin: "https://www.linkedin.com/in/sm-y/",
    resume: "https://docs.google.com/document/d/1Gfblx5hEvYp0RBA_2QP_6nZRwrl1GGncW23-BhExUuc/edit?usp=sharing",
  },
  /** Posts whose frontmatter `series.slug` matches this are served under /projects. */
  projectsSeriesSlug: "projects",
} as const;

export default site;
