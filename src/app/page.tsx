import { CatSpinner } from "@/components/cat-spinner";
import { Button } from "@/components/ui/button";
import AllPostsList from "@/features/posts/components/all-post-list";
import { cn, fadeIn } from "@/lib/utils";
import { ArrowRightIcon, EnvelopeOpenIcon, FileTextIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 0; //Make page dynamic

const selectedProjectsSlug: Array<string> = [
  "building-and-publishing-a-shopify-typescript-app-with-remix-for-mergn",
  "developing-mergn-web-sdk-transforming-customer-engagement",
  "mergn-customer-engagement-platform",
  "revolutionizing-clinical-trials-my-journey-with-science37",
];

export const metadata: Metadata = {
  title: "SMY - Syed Muhammad Yaseen",
  description: "Welcome to the personal website of Syed Muhammad Yaseen.",
  openGraph: {
    title: "SMY - Syed Muhammad Yaseen",
    description: "Welcome to the personal website of Syed Muhammad Yaseen.",
    type: "article",
    siteName: "Syed Muhammad Yaseen | SMY",
    images: "/main-cover.jpeg",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMY - Syed Muhammad Yaseen",
    description: "Welcome to the personal website of Syed Muhammad Yaseen.",
    images: "/main-cover.jpeg",
  },
  other: {
    "og:title": "SMY - Syed Muhammad Yaseen",
    "og:description": "Welcome to the personal website of Syed Muhammad Yaseen.",
    "og:image": "/main-cover.jpeg",
    "og:url": "https://sm-y.dev",
    "og:type": "article",
    "twitter:card": "summary_large_image",
    "twitter:title": "SMY - Syed Muhammad Yaseen",
    "twitter:description": "Welcome to the personal website of Syed Muhammad Yaseen.",
    "twitter:image": "/main-cover.jpeg",
  },
};

export default async function Page() {
  return (
    <main className="flex flex-col gap-4 text-center items-center sm:gap-8">
      <section className="text-center max-w-xl space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight leading-tight">SMY</h1>
        <h2 className="text-sm font-light text-muted-foreground sm:text-lg">Syed Muhammad Yaseen</h2>
        <p className="text-gray-500 dark:text-gray-200 text-lg sm:text-xl max-w-md mx-auto leading-relaxed">
          Full Stack Engineer experienced in Customer Engagement & Health Tech
        </p>

        <p>JavaScript / TypeScript ecosystem, React, Next.js, NestJS, AWS</p>
      </section>

      <section className={cn(fadeIn, "grid grid-cols-2 md:grid-cols-4 gap-8 animation-delay-600")}>
        <Button asChild size="lg">
          <Link href="https://docs.google.com/document/d/1ukQWNh2V1B5g9lDYLS0mno0kWYb0FqMHi8JQxa8Dx5I/edit?usp=sharing" target="_blank">
            <FileTextIcon className="mr-2 h-4 w-4" /> Resume
          </Link>
        </Button>

        <Button asChild size="lg" variant="secondary">
          <Link href="https://github.com/smyaseen" target="_blank">
            <GitHubLogoIcon className="mr-2 h-4 w-4" /> GitHub
          </Link>
        </Button>

        <Button asChild size="lg">
          <Link href="https://www.linkedin.com/in/sm-y/" target="_blank">
            <LinkedInLogoIcon className="mr-2 h-4 w-4" /> LinkedIn
          </Link>
        </Button>

        <Button asChild size="lg" variant="secondary">
          <Link href="mailto:smyaseen164@gmail.com" target="_blank">
            <EnvelopeOpenIcon className="mr-2 h-4 w-4" /> Email
          </Link>
        </Button>
      </section>

      <section className={cn(fadeIn, "animation-delay-800", "flex flex-col gap-4")}>
        <span className="flex flex-row items-center">
          <h2 className="text-2xl text-muted-foreground sm:text-3xl">Blogs</h2>
          <Button asChild size="sm" variant="secondary" className="bg-transparent shadow-none">
            <Link href="/blog?sort=date">
              <ArrowRightIcon className="mr-2 h-4 w-4" /> Read More
            </Link>
          </Button>
        </span>

        <Suspense fallback={<CatSpinner />}>
          <section className="text-left">
            <AllPostsList type="blog" first={3} />
          </section>
        </Suspense>
      </section>

      <section className={cn(fadeIn, "animation-delay-800", "flex flex-col gap-4")}>
        <span className="flex flex-row items-center">
          <h2 className="text-2xl text-muted-foreground sm:text-3xl">Projects</h2>
          <Button asChild size="sm" variant="secondary" className="bg-transparent shadow-none">
            <Link href="/projects">
              <ArrowRightIcon className="mr-2 h-4 w-4" /> Read More
            </Link>
          </Button>
        </span>

        <Suspense fallback={<CatSpinner />}>
          <section className="text-left">
            <AllPostsList type="project" selectedProjectsSlug={selectedProjectsSlug} />
          </section>
        </Suspense>
      </section>
    </main>
  );
}
