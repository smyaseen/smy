import LatestThreeBlogPostsList from "@/components/latest-three-blog-posts-list";
import ParagraphSkeleton from "@/components/paragraph-skeleton";
import { Button } from "@/components/ui/button";
import { cn, fadeIn } from "@/lib/utils";
import { EnvelopeOpenIcon, FileTextIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function Page() {
  return (
    <main className="flex flex-col gap-4 pb-4 pt-4 text-center items-center sm:gap-8 sm:pt-20">
      <section className={cn(fadeIn, "animation-delay-200 px-40 flex flex-row w-full justify-start items-center")}>
        <div className="w-1/3">
          <Image src="/profile-pic.png" width={200} height={200} alt="profile-pic" />
        </div>
        <div className="w-2/3 flex flex-col items-start justify-center">
          <div>
            <h1 className="text-4xl font-bold sm:text-7xl">SMY</h1>
            <h2 className="text-lg font-light text-muted-foreground sm:text-xl">Syed Muhammad Yaseen</h2>
          </div>
        </div>
      </section>
      <section className={cn(fadeIn, "animation-delay-400", "px-40")}>
        <span className="text-lg sm:text-xl">
          <div>
            Full Stack ❯ Customer Engagement / Health Tech ❯ JavaScript / TypeScript Ecosystem ❯ React, NextJS, NestJS, NodeJS, Microservices, AWS ❯
            BS Computer Science 🎓 ❯ Passionate about Quality Software Engineering ❯ Sharing Insights & Experiences
          </div>
        </span>
      </section>
      <section className={cn(fadeIn, "flex items-center gap-8 animation-delay-600")}>
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

      <section className={cn(fadeIn, "animation-delay-400", "text-left")}>
        <Suspense fallback={<ParagraphSkeleton />}>
          <LatestThreeBlogPostsList />
        </Suspense>
      </section>
    </main>
  );
}
