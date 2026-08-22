import { Mdx } from "@/components/mdx";
import PostShareWidget from "@/components/post-share-widget";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, fadeIn } from "@/lib/utils";
import { IPostType, PostType } from "@/types/post-types";
import { ArrowLeft, FileText, Image as PlaceHolderImage } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useBlogSlug, { IUseBlogSlug } from "../hooks/useBlogSlug";
import PostTocRail from "./post-toc-rail";

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function BlogSlug({
  params,
}: IUseBlogSlug & {
  params: {
    type: IPostType;
  };
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { post, jsonLd, previous, next } = useBlogSlug({ params });
  const {
    publishedAt,
    readTimeInMinutes,
    title,
    subtitle,
    content: { markdown },
    coverImage,
    seo,
    tableOfContents,
  } = post;

  const description = seo.description || subtitle;
  const hasToc = tableOfContents.enabled && tableOfContents.items.length > 0;
  const indexPath = params.type === PostType.PROJECT ? "/projects" : "/blog";

  return (
    <main className="mb-16 flex flex-col">
      <Link href={indexPath} className="mb-7 flex w-fit items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-3.5 w-3.5" />
        {params.type === PostType.PROJECT ? "All projects" : "All posts"}
      </Link>

      <div className={cn("grid items-start gap-14", hasToc && "lg:grid-cols-[minmax(0,1fr)_244px]")}>
        <article className={cn(fadeIn, "flex min-w-0 flex-col gap-7")}>
          <header className="flex flex-col gap-3.5">
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <Link key={tag.slug} href={`${indexPath}?tags=${tag.name.toLocaleLowerCase()}`}>
                    <Badge variant="outline" className="px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {tag.name.toLocaleLowerCase()}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}

            <h1 className="text-pretty text-3xl font-semibold leading-[1.18] tracking-tight sm:text-[38px]">{title}</h1>
            {description && <p className="text-pretty text-[17px] leading-[1.55] text-muted-foreground">{description}</p>}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                <span>{formatDate(publishedAt)}</span>
                <span aria-hidden>·</span>
                <span>{readTimeInMinutes} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm" className="gap-1.5">
                  <Link href={`/api/${params.type}/${post.slug}.md`}>
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    Markdown
                  </Link>
                </Button>
                <PostShareWidget post={post} type={params.type} />
              </div>
            </div>
          </header>

          {coverImage?.url ? (
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl bg-muted">
              <Image
                src={coverImage.url}
                alt={coverImage.attribution || description || title}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
                priority
              />
            </AspectRatio>
          ) : (
            <AspectRatio ratio={16 / 9} className="flex items-center justify-center rounded-xl bg-muted">
              <PlaceHolderImage className="h-10 w-10 text-muted-foreground/50" />
            </AspectRatio>
          )}

          {hasToc && (
            <div className="lg:hidden">
              <PostTocRail items={tableOfContents.items} collapsible />
            </div>
          )}

          <Mdx code={markdown} />
        </article>

        {hasToc && (
          <aside className="sticky top-20 hidden lg:block">
            <PostTocRail items={tableOfContents.items} />
          </aside>
        )}
      </div>

      {(previous || next) && (
        <nav className="mt-14 grid gap-4 border-t pt-8 sm:grid-cols-2">
          {previous ? (
            <Link
              href={previous.path}
              className="flex flex-col gap-1.5 rounded-xl border p-[18px] transition-colors hover:border-muted-foreground/30"
            >
              <span className="text-xs text-muted-foreground">← Previous</span>
              <span className="text-sm font-medium leading-snug">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={next.path}
              className="flex flex-col items-end gap-1.5 rounded-xl border p-[18px] text-right transition-colors hover:border-muted-foreground/30"
            >
              <span className="text-xs text-muted-foreground">Next →</span>
              <span className="text-sm font-medium leading-snug">{next.title}</span>
            </Link>
          )}
        </nav>
      )}

      <script id="jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  );
}
