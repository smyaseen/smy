import { postDescription, postUrl, type Post } from "./posts";
import site from "./site";

export const publicationJsonLd = () => ({
  "@context": "https://schema.org/",
  "@type": "Blog",
  "@id": site.url,
  mainEntityOfPage: site.url,
  name: site.title,
  description: site.descriptionSEO,
  publisher: {
    "@type": "Person",
    "@id": site.url,
    name: site.displayTitle,
    image: { "@type": "ImageObject", url: `${site.url}${site.logo}` },
  },
});

export const postJsonLd = (post: Post) => {
  const url = postUrl(post);
  return {
    ...publicationJsonLd(),
    blogPost: [
      {
        "@type": "BlogPosting",
        "@id": url,
        mainEntityOfPage: url,
        headline: post.data.title,
        name: post.data.title,
        description: postDescription(post),
        datePublished: post.data.publishedAt.toISOString(),
        dateModified: (post.data.updatedAt ?? post.data.publishedAt).toISOString(),
        author: { "@type": "Person", "@id": site.author.url, name: site.author.name, url: site.author.url },
        image: post.data.coverImage ? { "@type": "ImageObject", url: post.data.coverImage.url } : undefined,
        url,
        keywords: post.data.tags.map((tag) => tag.name),
      },
    ],
  };
};
