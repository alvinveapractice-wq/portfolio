import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { work } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified here on purpose. It is optional in the sitemap spec,
  // and a value of "now" would claim every page changed on every crawl.
  // changeFrequency and priority are the honest signals, and leaving the
  // date out keeps this route statically generated and served from the CDN.
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...work.map((item) => ({
      url: `${siteUrl}/work/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
