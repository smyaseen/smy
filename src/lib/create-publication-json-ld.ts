import site from "@/lib/site";

export const createPublicationJsonLd = () => ({
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
});
