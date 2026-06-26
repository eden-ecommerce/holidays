import type { MetadataRoute } from "next";

const BASE = "https://www.eden.co.uk/christian-holidays";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/calendar`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
