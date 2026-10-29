import { site, siteUrl, services } from "@/content/site";

export type VideoSchema = {
  title: string;
  description: string;
  src: string;
  poster: string;
  /** ISO 8601 duration, e.g. PT3M31S */
  duration: string;
  uploadDate: string;
};

/**
 * Tells search engines who the site is about, in the vocabulary they read
 * directly. It repeats only what the page already says: no email or phone
 * number (those stay behind the copy button and the chat link), and no
 * reviews or ratings, because none exist.
 */
export function StructuredData({ video }: { video?: VideoSchema }) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      inLanguage: "en-PH",
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: site.name,
      url: siteUrl,
      jobTitle: "Virtual assistant",
      description: site.role,
      address: { "@type": "PostalAddress", addressCountry: "PH" },
      knowsAbout: [
        // pulled from the service list itself, so this can never drift
        // away from what the site actually offers
        ...services.map((service) => service.title),
        "Email management",
        "Standard operating procedures",
        "Content calendars",
        "Small business operations",
      ],
      sameAs: [site.github],
      mainEntityOfPage: { "@id": `${siteUrl}/#website` },
    },
  ];

  if (video) {
    graph.push({
      "@type": "VideoObject",
      "@id": `${siteUrl}/#walkthrough`,
      name: video.title,
      description: video.description,
      thumbnailUrl: [`${siteUrl}${video.poster}`],
      contentUrl: `${siteUrl}${video.src}`,
      uploadDate: video.uploadDate,
      duration: video.duration,
      inLanguage: "en",
      creator: { "@id": `${siteUrl}/#person` },
    });
  }

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so no string in the data can close the script tag early.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}
