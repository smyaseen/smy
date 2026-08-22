import { createPublicationJsonLd } from "@/lib/create-publication-json-ld";
import { cn, fadeIn } from "@/lib/utils";
import { isProject } from "@/server/content/posts";
import { IPostType, PostType } from "@/types/post-types";
import { SortTypes } from "@/types/sort-types";
import PostBrowser from "../components/post-browser";
import getAllBlogPosts from "../domain/repository/get-all-blog-posts";
import getAllProjects from "../domain/repository/get-all-projects";
import toPostCard from "../domain/service/to-post-card";

type Props = {
  searchParams?: {
    query?: string;
    sort?: string;
    tags?: string;
  };
  type: IPostType;
};

const COPY = {
  [PostType.BLOG]: {
    title: "Blog",
    lead: "Notes on backends, AI tooling and the things I ship.",
    noun: "posts",
  },
  [PostType.PROJECT]: {
    title: "Projects",
    lead: "Products and platforms I have built and shipped.",
    noun: "projects",
  },
};

const PostsPage = ({ searchParams = {}, type }: Props) => {
  const posts = type === PostType.BLOG ? getAllBlogPosts().filter((post) => !isProject(post)) : getAllProjects();
  const copy = COPY[type];

  const initialTags = (searchParams.tags ?? "")
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);

  return (
    <main className="mb-8 flex flex-col gap-7">
      <header className={cn(fadeIn, "flex flex-col gap-1.5")}>
        <h1 className="text-3xl font-semibold tracking-tight">{copy.title}</h1>
        <p className="text-sm text-muted-foreground">{copy.lead}</p>
      </header>

      <div className={cn(fadeIn, "animation-delay-200")}>
        <PostBrowser
          posts={posts.map(toPostCard)}
          initialQuery={searchParams.query ?? ""}
          initialSort={searchParams.sort === SortTypes.ReadTime ? SortTypes.ReadTime : SortTypes.Date}
          initialTags={initialTags}
          emptyLabel={copy.noun}
        />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(createPublicationJsonLd()) }} />
    </main>
  );
};

export default PostsPage;
