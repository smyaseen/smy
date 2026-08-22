import { Button } from "@/components/ui/button";
import PostCardItem from "@/features/posts/components/post-card-item";
import PostRow from "@/features/posts/components/post-row";
import getAllBlogPosts from "@/features/posts/domain/repository/get-all-blog-posts";
import getAllProjects from "@/features/posts/domain/repository/get-all-projects";
import toPostCard from "@/features/posts/domain/service/to-post-card";
import site from "@/lib/site";
import { cn, fadeIn } from "@/lib/utils";
import { isProject } from "@/server/content/posts";
import { EnvelopeOpenIcon, FileTextIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";

const selectedProjectsSlug: Array<string> = [
  "building-and-publishing-a-shopify-typescript-app-with-remix-for-mergn",
  "developing-mergn-web-sdk-transforming-customer-engagement",
  "mergn-customer-engagement-platform",
  "revolutionizing-clinical-trials-my-journey-with-science37",
];

export const metadata: Metadata = {
  title: "SMY - Syed Muhammad Yaseen",
  description: "Senior Software Engineer building backend services and REST APIs for AI-enabled SaaS platforms.",
  openGraph: {
    title: "SMY - Syed Muhammad Yaseen",
    description: "Senior Software Engineer building backend services and REST APIs for AI-enabled SaaS platforms.",
    type: "article",
    siteName: "Syed Muhammad Yaseen | SMY",
    images: "/main-cover.jpeg",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMY - Syed Muhammad Yaseen",
    description: "Senior Software Engineer building backend services and REST APIs for AI-enabled SaaS platforms.",
    images: "/main-cover.jpeg",
  },
};

const socials = [
  {
    href: site.links.resume,
    label: "Resume",
    icon: FileTextIcon,
    primary: true,
  },
  { href: "https://github.com/smyaseen", label: "GitHub", icon: GitHubLogoIcon },
  { href: "https://www.linkedin.com/in/sm-y/", label: "LinkedIn", icon: LinkedInLogoIcon },
  { href: "mailto:smyaseen164@gmail.com", label: "Email", icon: EnvelopeOpenIcon },
];

export default function Page() {
  const recentPosts = getAllBlogPosts()
    .filter((post) => !isProject(post))
    .slice(0, 3)
    .map(toPostCard);

  const projects = getAllProjects(selectedProjectsSlug).slice(0, 2).map(toPostCard);

  return (
    <main className="flex flex-col">
      {/* hero */}
      <section className={cn(fadeIn, "flex max-w-[660px] flex-col gap-5 pb-16 pt-10 sm:pt-16")}>
        <div className="flex flex-col gap-3.5">
          <h1 className="text-pretty text-[2.5rem] font-semibold leading-[1.12] tracking-tight sm:text-[44px]">Syed Muhammad Yaseen</h1>
          <p className="text-pretty text-[17px] leading-relaxed text-muted-foreground sm:text-lg">
            Senior Software Engineer building backend services and REST APIs for AI-enabled SaaS platforms. Node.js, NestJS, TypeScript, AWS and LLM
            integration.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {socials.map(({ href, label, icon: Icon, primary }) => (
            <Button key={label} asChild variant={primary ? "default" : "outline"} className="gap-2">
              <Link href={href} target="_blank">
                <Icon className="h-[15px] w-[15px]" />
                {label}
              </Link>
            </Button>
          ))}
        </div>
      </section>

      {/* recent writing */}
      <section className={cn(fadeIn, "animation-delay-200 flex flex-col gap-2 pb-16")}>
        <div className="flex items-baseline justify-between border-b pb-3.5">
          <h2 className="text-[15px] font-semibold tracking-tight">Recent writing</h2>
          <Link href="/blog" className="text-[13px] text-muted-foreground hover:text-foreground">
            All posts →
          </Link>
        </div>
        <ul className="flex flex-col">
          {recentPosts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </ul>
      </section>

      {/* selected projects */}
      <section className={cn(fadeIn, "animation-delay-400 flex flex-col gap-4 pb-20")}>
        <div className="flex items-baseline justify-between border-b pb-3.5">
          <h2 className="text-[15px] font-semibold tracking-tight">Selected projects</h2>
          <Link href="/projects" className="text-[13px] text-muted-foreground hover:text-foreground">
            All projects →
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <li key={project.slug}>
              <PostCardItem post={project} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
