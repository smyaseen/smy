"use client";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import { TableOfContentsItem } from "@/types/post-types";
import { ChevronDown, List } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Replaces the old boxed table-of-contents block and the floating menu that
 * duplicated it. On wide screens it is a sticky rail beside the prose; below
 * `lg` it collapses to a single disclosure above the article.
 */
export default function PostTocRail({ items, collapsible = false }: { items: TableOfContentsItem[]; collapsible?: boolean }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    if (collapsible) return;

    const headings = items.map((item) => document.getElementById(item.slug)).filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSlug(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px" },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [items, collapsible]);

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    const target = document.getElementById(slug);
    if (!target) return;

    event.preventDefault();
    const header = document.querySelector("header");
    const offset = (header instanceof HTMLElement ? header.offsetHeight : 0) + 16;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  };

  const list = (
    <ul className="flex flex-col gap-0.5 border-l">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.slug}`}
            onClick={(event) => handleClick(event, item.slug)}
            className={cn(
              "block py-[5px] pr-2 text-[13px] leading-snug text-muted-foreground transition-colors hover:text-foreground",
              item.level > 2 ? "pl-[26px]" : "pl-[13px]",
              activeSlug === item.slug && "font-medium text-foreground shadow-[inset_1px_0_0_currentColor]",
            )}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );

  if (collapsible) {
    return (
      <Collapsible className="rounded-xl border">
        <CollapsibleTrigger className="group flex w-full cursor-pointer items-center justify-between gap-2 p-4 text-sm font-medium">
          <span className="flex items-center gap-2">
            <List className="h-4 w-4 text-muted-foreground" />
            On this page
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="px-4 pb-4">{list}</CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <nav className="flex flex-col gap-2.5" aria-label="On this page">
      <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-muted-foreground/70">On this page</span>
      {list}
    </nav>
  );
}
