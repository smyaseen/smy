export enum PostType {
  BLOG = "blog",
  PROJECT = "projects",
}

export type IPostType = `${PostType}`;

export type Tag = {
  name: string;
  slug: string;
};

export type TagWithCount = Tag & {
  postsCount: number;
};

export type Series = {
  name: string;
  slug: string;
};

export type CoverImage = {
  url: string;
  attribution: string | null;
};

export type Seo = {
  title: string | null;
  description: string | null;
};

export type TableOfContentsItem = {
  id: string;
  level: number;
  slug: string;
  title: string;
  parentId: string | null;
};

export type TableOfContents = {
  enabled: boolean;
  items: TableOfContentsItem[];
};

/** The YAML frontmatter block of a file in `content/posts`. */
export type PostFrontmatter = {
  title: string;
  subtitle: string | null;
  slug: string;
  brief: string | null;
  publishedAt: string;
  updatedAt: string | null;
  readTimeInMinutes: number;
  canonicalUrl: string | null;
  coverImage: CoverImage | null;
  seo: Seo;
  series: Series | null;
  tags: Tag[];
  tableOfContents: TableOfContents;
};

export type Post = PostFrontmatter & {
  content: {
    /** The raw markdown body, exactly as written in the file. */
    markdown: string;
    /** Plain text derived from the markdown, used for search. */
    text: string;
  };
  /** Site-relative path, e.g. `/blog/my-post`. */
  path: string;
  /** Absolute canonical URL on this site. */
  url: string;
};

/** The trimmed-down shape the client post browser renders and filters over. */
export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  path: string;
  publishedAt: string;
  readTimeInMinutes: number;
  coverImage: { url: string; alt: string } | null;
  tags: string[];
  /** Lowercased title + excerpt + tags + body, used for client-side search. */
  search: string;
};
