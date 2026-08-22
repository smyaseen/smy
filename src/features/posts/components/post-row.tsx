import { PostCard } from "@/types/post-types";
import Link from "next/link";

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/**
 * The compact list row used on the home page. A short list of three scans far
 * faster as rows than as full cards.
 */
export default function PostRow({ post }: { post: PostCard }) {
  return (
    <li className="border-b last:border-b-0">
      <Link
        href={post.path}
        className="flex flex-col gap-1 rounded-lg px-2 py-4 transition-colors hover:bg-secondary/50 sm:flex-row sm:items-center sm:justify-between sm:gap-8"
      >
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="text-[15px] font-medium leading-snug">{post.title}</span>
          {post.tags.length > 0 && <span className="text-[13px] text-muted-foreground/70">{post.tags.slice(0, 3).join(" · ")}</span>}
        </div>
        <span className="whitespace-nowrap text-[13px] text-muted-foreground">
          {formatDate(post.publishedAt)} · {post.readTimeInMinutes} min
        </span>
      </Link>
    </li>
  );
}
