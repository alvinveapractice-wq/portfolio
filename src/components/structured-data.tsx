import { site, siteUrl } from "@/content/site";

/**
 * Tells search engines who the site is about, in the vocabulary they read
 * directly. It repeats only what the page already says: no email or phone
 * number (those stay behind the copy button and the chat link), and no
 * reviews or ratings, because none exist.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
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
          "Inbox management",
          "Email management",
          "Business process templates",
          "Content calendars",
          "Standard operating procedures",
        ],
        sameAs: [site.github],
        mainEntityOfPage: { "@id": `${siteUrl}/#website` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // "<" is escaped so no string in the data can close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
