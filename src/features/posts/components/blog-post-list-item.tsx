import ImageRounded from "@/components/image-rounded";
import { Post } from "@/hashnode/generated/graphql";
import { IPostType } from "@/types/post-types";
import { Image as PlaceHolderImage } from "lucide-react";
import Link from "next/link";
import BlogTags from "./blog-tags";

type Props = {
  post: Post;
  type: IPostType;
};

const HASHNODE_PROJECT_SERIES_SLUG = process.env.NEXT_PUBLIC_HASHNODE_PROJECT_SERIES_SLUG;

export default function BlogPostListItem({ post, type }: Props) {
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
          <Link href={`/${type === "blog" ? "blog" : HASHNODE_PROJECT_SERIES_SLUG}/${post.slug}`}>
            <span className="text-lg">{post.title}</span>
          </Link>
          <div className="flex items-center text-sm ">
            <span>{new Date(post.publishedAt).toLocaleDateString("en-GB")}</span>
            <span className="mx-1">•</span>
            <span>{post.views.toLocaleString()} views</span>
            <span className="mx-1">•</span>
            <span>{post.readTimeInMinutes} min read</span>
            <span className="mx-1">•</span>
            <span>{post.reactionCount} likes</span>
          </div>
        </div>
        <BlogTags type={type} tags={post.tags} />
        <span className="leading-tight text-sm text-muted-foreground  overflow-x-hidden">{post.seo?.description || post.brief}</span>
      </div>
    </li>
  );
}
