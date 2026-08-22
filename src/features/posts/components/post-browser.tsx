"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { PostCard } from "@/types/post-types";
import { SortTypes } from "@/types/sort-types";
import { ChevronDown, Search as SearchIcon, X } from "lucide-react";
import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState, useTransition } from "react";
import filterPosts from "../domain/service/filter-posts";
import PostCardItem from "./post-card-item";

type Props = {
  posts: PostCard[];
  initialQuery?: string;
  initialSort?: string;
  initialTags?: string[];
  emptyLabel?: string;
};

const SORT_LABELS: Record<string, string> = {
  [SortTypes.Date]: "Newest",
  [SortTypes.ReadTime]: "Shortest read",
};

/**
 * Search, tag filtering and sorting all run in the browser over a prebuilt
 * index, so a keystroke never costs a round trip. Typing updates `query`
 * immediately (the input stays responsive) while the grid re-renders from
 * `deferredQuery` at lower priority; tag and sort changes go through
 * `startTransition` for the same reason. The URL is kept in step with
 * `history.replaceState` rather than a router navigation, so it stays shareable with no
 * server render per character.
 */
export default function PostBrowser({ posts, initialQuery = "", initialSort = SortTypes.Date, initialTags = [], emptyLabel = "posts" }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState(initialSort);
  const [tags, setTags] = useState<string[]>(initialTags);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery || isPending;

  const tagCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      for (const tag of new Set(post.tags)) counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [posts]);

  const visible = useMemo(() => filterPosts({ posts, query: deferredQuery, sort, tags }), [posts, deferredQuery, sort, tags]);

  // Keep the address bar in step without a navigation. `replaceState` updates
  // the URL that Next reads from, and never refetches the server component.
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (sort && sort !== SortTypes.Date) params.set("sort", sort);
    if (tags.length) params.set("tags", tags.join(","));

    const search = params.toString();
    window.history.replaceState(null, "", search ? `${window.location.pathname}?${search}` : window.location.pathname);
  }, [query, sort, tags]);

  // ⌘K / Ctrl-K focuses search.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const toggleTag = useCallback((tag: string, checked: boolean) => {
    startTransition(() => setTags((current) => (checked ? [...current, tag] : current.filter((t) => t !== tag))));
  }, []);

  const clearAll = useCallback(() => {
    setQuery("");
    startTransition(() => {
      setTags([]);
      setSort(SortTypes.Date);
    });
  }, []);

  const isFiltered = Boolean(query) || tags.length > 0;

  return (
    <div className="flex flex-col gap-4">
      {/* toolbar */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex grow items-center">
          <SearchIcon className="pointer-events-none absolute left-3 h-[15px] w-[15px] text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`Search ${emptyLabel}…`}
            aria-label={`Search ${emptyLabel}`}
            className="pl-[34px] pr-20"
          />
          <div className="absolute right-2.5 flex items-center gap-1.5">
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="cursor-pointer text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : (
              <kbd className="rounded border px-1.5 py-px text-[11px] font-medium text-muted-foreground/70">⌘K</kbd>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-1.5 font-medium">
                Tags
                {tags.length > 0 && <Badge className="h-[18px] min-w-[18px] justify-center rounded-full px-1.5 text-[11px]">{tags.length}</Badge>}
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Filter by tag</span>
                {tags.length > 0 && (
                  <button
                    type="button"
                    onClick={() => startTransition(() => setTags([]))}
                    className="cursor-pointer text-xs font-normal underline underline-offset-2"
                  >
                    Clear
                  </button>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <ScrollArea className="h-64">
                {tagCounts.map(([tag, count]) => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={tags.includes(tag)}
                    onCheckedChange={(checked) => toggleTag(tag, Boolean(checked))}
                    onSelect={(event) => event.preventDefault()}
                  >
                    <span className="grow">{tag}</span>
                    <span className="text-xs text-muted-foreground">{count}</span>
                  </DropdownMenuCheckboxItem>
                ))}
              </ScrollArea>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select value={sort} onValueChange={(value) => startTransition(() => setSort(value))}>
            <SelectTrigger className="w-[168px]" aria-label="Sort posts">
              <span className="text-muted-foreground">Sort</span>
              <SelectValue>{SORT_LABELS[sort]}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={SortTypes.Date}>{SORT_LABELS[SortTypes.Date]}</SelectItem>
              <SelectItem value={SortTypes.ReadTime}>{SORT_LABELS[SortTypes.ReadTime]}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* result count + active filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[13px] text-muted-foreground">
            {isFiltered ? `${visible.length} of ${posts.length} ${emptyLabel}` : `${posts.length} ${emptyLabel}`}
          </span>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag, false)}
              className="flex cursor-pointer items-center gap-1.5 rounded-md bg-secondary py-1 pl-2.5 pr-1.5 text-xs font-medium"
            >
              {tag}
              <X className="h-3 w-3 text-muted-foreground" />
            </button>
          ))}
        </div>
        {isFiltered && (
          <button
            type="button"
            onClick={clearAll}
            className="cursor-pointer text-[13px] text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            Clear all
          </button>
        )}
      </div>

      {/* results */}
      {visible.length > 0 ? (
        <ul className={cn("grid grid-cols-1 gap-6 transition-opacity sm:grid-cols-2 xl:grid-cols-3", isStale && "opacity-50")}>
          {visible.map((post, index) => (
            <li key={post.slug}>
              <PostCardItem post={post} priority={index < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-3.5 rounded-xl border border-dashed px-6 py-14 text-center">
          <SearchIcon className="h-6 w-6 text-muted-foreground/70" />
          <div className="flex flex-col gap-1">
            <p className="text-[15px] font-medium">{query ? `No ${emptyLabel} match “${query}”` : `No ${emptyLabel} with those tags`}</p>
            <p className="text-[13px] text-muted-foreground">Try a different word, or clear the filters.</p>
          </div>
          <Button variant="outline" size="sm" onClick={clearAll}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}
