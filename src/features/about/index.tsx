import { Button } from "@/components/ui/button";
import site from "@/lib/site";
import { cn, fadeIn } from "@/lib/utils";
import { FileTextIcon, GitHubLogoIcon, LinkedInLogoIcon, RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Bio from "./components/bio";

const AboutPage = () => (
  <main className="mb-16 grid items-start gap-14 lg:grid-cols-[240px_minmax(0,1fr)]">
    {/* identity rail */}
    <aside className={cn(fadeIn, "flex flex-col gap-4 lg:sticky lg:top-24")}>
      <div className="flex h-24 w-24 items-center justify-center rounded-xl border bg-secondary text-2xl font-semibold tracking-tight">SMY</div>
      <div className="flex flex-col gap-0.5">
        <span className="text-base font-semibold tracking-tight">{site.author.name}</span>
        <span className="text-[13px] text-muted-foreground">{site.author.role}</span>
      </div>
      <div className="flex flex-col gap-2 border-t pt-4 text-[13px]">
        <Link
          href={site.links.github}
          target="_blank"
          className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <GitHubLogoIcon className="h-3.5 w-3.5" />
          github.com/smyaseen
        </Link>
        <Link
          href={site.links.linkedin}
          target="_blank"
          className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <LinkedInLogoIcon className="h-3.5 w-3.5" />
          linkedin.com/in/sm-y
        </Link>
        
      </div>
      <Button asChild className="w-fit gap-2">
        <Link href={site.links.resume} target="_blank">
          <FileTextIcon className="h-[15px] w-[15px]" />
          Download resume
        </Link>
      </Button>
    </aside>

    {/* prose */}
    <section className={cn(fadeIn, "animation-delay-200 max-w-[660px]")}>
      <Bio />
    </section>
  </main>
);

export default AboutPage;
