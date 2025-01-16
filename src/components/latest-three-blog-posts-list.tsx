import { Button } from "@/components/ui/button";
import { createPublicationJsonLd } from "@/lib/create-publication-json-ld";
import getPublication from "@/server/get-publication";
import getRecentThreeBlogPosts from "@/server/get-recent-3-blog-posts";
import { ReaderIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import BlogPostList from "./blog-post-list";

async function LatestThreeBlogPostsList() {
  const [posts, publication] = await Promise.all([getRecentThreeBlogPosts(), getPublication()]);
  const publicationJsonLd = createPublicationJsonLd(publication);

  return (
    <div className="flex flex-col gap-4">
      <BlogPostList posts={posts} first={3} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(publicationJsonLd) }} />
      <Button asChild size="lg" variant="secondary">
        <Link href="/blog?sort=date">
          <ReaderIcon className="mr-2 h-4 w-4" /> Read More
        </Link>
      </Button>
    </div>
  );
}

export default LatestThreeBlogPostsList;
