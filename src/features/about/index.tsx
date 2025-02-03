import BadgeList from "@/components/badge-list";
import Bio from "@/components/bio";
import { CatSpinner } from "@/components/cat-spinner";
import { cn, fadeIn } from "@/lib/utils";
import { Suspense } from "react";

const AboutPage = () => (
  <main className="flex flex-col gap-2">
    <Suspense fallback={<CatSpinner />}>
      <section className={cn(fadeIn, "animation-delay-200")}>
        <Bio />
      </section>
      <section className={cn(fadeIn, "animation-delay-400 flex flex-col gap-2")}>
        <span>Here are some Hashnode badges that I&apos;ve earned</span>
        <BadgeList />
      </section>
    </Suspense>
  </main>
);

export default AboutPage;
