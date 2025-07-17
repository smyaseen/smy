import { Badge } from "@/components/ui/badge";
import { Maybe, Tag } from "@/hashnode/generated/graphql";
import { IPostType } from "@/types/post-types";
import Link from "next/link";

const HASHNODE_PROJECT_SERIES_SLUG = process.env.NEXT_PUBLIC_HASHNODE_PROJECT_SERIES_SLUG;

const BlogTags = ({ type, tags }: { type: IPostType; tags: Maybe<Tag[]> | undefined }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags?.map((tag) => (
        <Link key={tag.name} href={`/${type === "blog" ? "blog" : HASHNODE_PROJECT_SERIES_SLUG}?tags=${tag.name.toLocaleLowerCase()}`}>
          <Badge>{tag.name.toLocaleLowerCase()}</Badge>
        </Link>
      ))}
    </div>
  );
};

export default BlogTags;
