import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { work } from "@/content/work";

export default function sitemap(): MetadataRoute.Sitemap {
  // No lastModified here on purpose. It is optional in the sitemap spec,
  // and a value of "now" would claim every page changed on every crawl.
  // changeFrequency and priority are the honest signals, and leaving the
  // date out keeps this route statically generated and served from the CDN.
  const flagship = work.find((item) => item.video);

  // The video extension tells Google there is a video on these pages, so it
  // can index it for video search instead of leaving it as an anonymous file.
  const videos = flagship?.video
    ? [
        {
          title: flagship.video.title,
          description: flagship.video.description,
          thumbnail_loc: `${siteUrl}${flagship.video.poster}`,
          content_loc: `${siteUrl}${flagship.video.src}`,
          player_loc: `${siteUrl}${flagship.video.src}`,
          duration: flagship.video.durationSeconds,
        },
      ]
    : [];

  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1, videos },
    ...work.map((item) => ({
      url: `${siteUrl}/work/${item.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      // only the page that actually carries the video declares it
      ...(item.video ? { videos } : {}),
    })),
  ];
}
