import { createPublicationJsonLd } from "@/lib/create-publication-json-ld";
import getAllBlogPosts from "@/server/get-all-blog-posts";
import getPublication from "@/server/get-publication";
import BlogPostList from "./blog-post-list";

type Props = {
  query?: string;
  sort?: string;
  tags?: string;
  first?: number;
};

async function AllBlogPostsList({ query, sort, tags, first }: Props) {
  const [posts, publication] = await Promise.all([getAllBlogPosts(), getPublication()]);
  const publicationJsonLd = createPublicationJsonLd(publication);

  return (
    <>
      <BlogPostList posts={posts} query={query} sort={sort} tags={tags} first={first} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(publicationJsonLd) }} />
    </>
  );
}

export default AllBlogPostsList;
