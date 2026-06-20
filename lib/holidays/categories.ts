import type { CategoryMeta } from "./types";
import { ALL_PROVIDERS } from "./providers";

export const CATEGORIES: CategoryMeta[] = [
  {
    slug: "retreats",
    label: "Retreats & Centres",
    description:
      "Escape to peaceful Christian retreat houses, conference centres and monasteries across the UK for renewal, rest and spiritual growth.",
    icon: "🏡",
    count: ALL_PROVIDERS.filter((p) => p.category === "retreats").length,
  },
  {
    slug: "tours",
    label: "Tour Operators",
    description:
      "Specialist Christian holiday companies offering beach, ski, walking and activity breaks with ministry staff, worship and fellowship.",
    icon: "✈️",
    count: ALL_PROVIDERS.filter((p) => p.category === "tours").length,
  },
  {
    slug: "pilgrimages",
    label: "Pilgrimages",
    description:
      "Guided pilgrimage tours to the Holy Land, Rome, Lourdes, the Camino and other significant biblical and historic sites worldwide.",
    icon: "🗺️",
    count: ALL_PROVIDERS.filter((p) => p.category === "pilgrimages").length,
  },
  {
    slug: "youth",
    label: "Youth & Activity",
    description:
      "Adventure camps, residential holidays and outdoor activity breaks for children and young people rooted in Christian faith.",
    icon: "⛺",
    count: ALL_PROVIDERS.filter((p) => p.category === "youth").length,
  },
  {
    slug: "festivals",
    label: "Festivals",
    description:
      "Major UK Christian festivals including Spring Harvest, Keswick Convention, Big Church Festival and more for the whole family.",
    icon: "🎶",
    count: ALL_PROVIDERS.filter((p) => p.category === "festivals").length,
  },
  {
    slug: "self-catering",
    label: "Self-Catering & B&Bs",
    description:
      "Christian-owned self-catering properties, B&Bs and home swap networks across the UK and beyond — many offering clergy discounts.",
    icon: "🏠",
    count: ALL_PROVIDERS.filter((p) => p.category === "self-catering").length,
  },
];
