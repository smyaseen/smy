import { Post } from "@/hashnode/generated/graphql";
import { Image as PlaceHolderImage } from "lucide-react";
import Link from "next/link";
import ImageRounded from "./image-rounded";
import { Badge } from "./ui/badge";

type Props = {
  post: Post;
};

export default function BlogPostListItem({ post }: Props) {
  return (
    <li>
      <div className="flex flex-col prose prose-neutral dark:prose-invert gap-2">
        {post.coverImage?.url ? (
          <ImageRounded
            className="object-fill rounded-xl"
            src={post.coverImage?.url}
            alt={post.coverImage?.attribution || post.seo?.description || post.title}
            width={600}
            height={500}
          />
        ) : (
          <PlaceHolderImage width={600} height={500} />
        )}
        <div>
          <Link href={`/blog/${post.slug}`}>
            <span className="text-lg">{post.title}</span>
          </Link>
          <div className="flex items-center text-sm ">
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            <span className="mx-1">•</span>
            <span>{post.views.toLocaleString()} views</span>
            <span className="mx-1">•</span>
            <span>{post.readTimeInMinutes} min read</span>
            <span className="mx-1">•</span>
            <span>{post.reactionCount} likes</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1">
          {post.tags?.map((tag) => (
            <Link key={tag.name} href={`/blog?tags=${tag.name.toLocaleLowerCase()}`}>
              <Badge>{tag.name.toLocaleLowerCase()}</Badge>
            </Link>
          ))}
        </div>
        <span className="leading-tight text-sm text-muted-foreground  overflow-x-hidden">{post.seo?.description || post.brief}</span>
      </div>
    </li>
  );
}
