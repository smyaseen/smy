import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PostCard } from "@/types/post-types";
import { Image as PlaceHolderImage } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MAX_TAGS = 3;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/**
 * Cover art is locked to 16/9 and the title and excerpt each reserve two lines,
 * so cards in a row keep a common height regardless of how the copy wraps.
 */
export default function PostCardItem({ post, priority = false }: { post: PostCard; priority?: boolean }) {
  const overflow = post.tags.length - MAX_TAGS;

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-colors hover:border-muted-foreground/30">
      <Link href={post.path} className="flex flex-col" aria-label={post.title}>
        <AspectRatio ratio={16 / 9} className="bg-muted">
          {post.coverImage ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <PlaceHolderImage className="h-7 w-7 text-muted-foreground/50" />
            </div>
          )}
        </AspectRatio>

        <div className="flex flex-col gap-2.5 p-[18px] pb-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatDate(post.publishedAt)}</span>
            <span aria-hidden>·</span>
            <span>{post.readTimeInMinutes} min read</span>
          </div>

          <h3 className="line-clamp-2 min-h-[45px] text-base font-semibold leading-[1.4] tracking-tight">{post.title}</h3>

          {post.excerpt && <p className="line-clamp-2 min-h-[40px] text-[13px] leading-[1.55] text-muted-foreground">{post.excerpt}</p>}
        </div>
      </Link>

      <div className="mt-auto flex flex-wrap items-center gap-1.5 px-[18px] pb-5">
        {post.tags.slice(0, MAX_TAGS).map((tag) => (
          <Badge key={tag} variant="outline" className="px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
            {tag}
          </Badge>
        ))}
        {overflow > 0 && <span className="px-1 text-[11px] font-medium text-muted-foreground/70">+{overflow}</span>}
      </div>
    </Card>
  );
}
