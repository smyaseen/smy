import { CatSpinner } from "@/components/cat-spinner";
import { Button } from "@/components/ui/button";
import AllPostsList from "@/features/posts/components/all-post-list";
import { cn, fadeIn } from "@/lib/utils";
import { ArrowRightIcon, EnvelopeOpenIcon, FileTextIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

const selectedProjectsSlug: Array<string> = [
  "building-and-publishing-a-shopify-typescript-app-with-remix-for-mergn",
  "developing-mergn-web-sdk-transforming-customer-engagement",
  "mergn-customer-engagement-platform",
  "revolutionizing-clinical-trials-my-journey-with-science37",
];

export const revalidate = 0; //Make page dynamic

export default async function Page() {
  return (
    <main className="flex flex-col gap-4 text-center items-center sm:gap-8">
      <section className={cn(fadeIn, "animation-delay-200")}>
        <Image className="hidden dark:block object-scale-down" src={"/bg-dark.png"} alt="dark-mode-image" width={850} height={850} />
        <Image className="block dark:hidden object-scale-down" src={"/bg-light.png"} alt="light-mode-image" width={850} height={850} />
      </section>
      <section
        className={cn(fadeIn, "animation-delay-400 px-4 md:px-40 flex flex-col md:flex-row w-full justify-start items-center gap-4 md:gap-12")}
      >
        <div className="text-center w-full">
          <h1 className="text-xl font-bold sm:text-4xl">SMY</h1>
          <h2 className="text-sm font-light text-muted-foreground sm:text-lg">Syed Muhammad Yaseen</h2>
        </div>
      </section>
      <section className={cn(fadeIn, "animation-delay-600", "px-4")}>
        <span className="text-lg sm:text-xl">
          <div>
            Full Stack ❯ Customer Engagement / Health Tech ❯ JavaScript / TypeScript Ecosystem ❯ React, NextJS, NestJS, NodeJS, Microservices, AWS ❯
            BS Computer Science 🎓 ❯ Passionate about Quality Software Engineering ❯ Sharing Insights & Experiences
          </div>
        </span>
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
