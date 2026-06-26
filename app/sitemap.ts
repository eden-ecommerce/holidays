import type { MetadataRoute } from "next";
import { CALENDAR_HOLIDAYS } from "@lib/calendar/holidays";

const BASE = "https://www.eden.co.uk/christian-holidays";

export default function sitemap(): MetadataRoute.Sitemap {
  const holidayPages: MetadataRoute.Sitemap = CALENDAR_HOLIDAYS.map((h) => ({
    url: `${BASE}/calendar/${h.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${BASE}/calendar`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...holidayPages,
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];
}
