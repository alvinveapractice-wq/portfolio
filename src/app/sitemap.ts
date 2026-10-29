import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { work } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    ...work.map((item) => ({
      url: `${siteUrl}/work/${item.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
