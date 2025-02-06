import useAllPostsList, { IUseAllPostsList } from "../hooks/useAllPostsList";
import PostList from "./post-list";

async function AllPostsList({ query, sort, tags, first, type, selectedProjectsSlug }: IUseAllPostsList) {
  const { posts, publicationJsonLd } = await useAllPostsList({ query, sort, tags, first, type, selectedProjectsSlug });

  return (
    <>
      <PostList posts={posts} query={query} sort={sort} tags={tags} first={first} type={type} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(publicationJsonLd) }} />
    </>
  );
}

export default AllPostsList;
