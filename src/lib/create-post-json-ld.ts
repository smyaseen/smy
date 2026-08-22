import site from "@/lib/site";
import { Post } from "@/types/post-types";

export default function createPostJsonLd(post: Post) {
  return {
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
      image: {
        "@type": "ImageObject",
        url: `${site.url}${site.logo}`,
      },
    },
    blogPost: [
      {
        "@type": "BlogPosting",
        "@id": post.url,
        mainEntityOfPage: post.url,
        headline: post.title,
        name: post.title,
        description: post.seo.description || post.brief,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: {
          "@type": "Person",
          "@id": site.author.url,
          name: site.author.name,
          url: site.author.url,
        },
        image: {
          "@type": "ImageObject",
          url: post.coverImage?.url,
        },
        url: post.url,
        keywords: post.tags.map((tag) => tag.name),
      },
    ],
  };
}
