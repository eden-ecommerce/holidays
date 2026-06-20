export type HolidayCategory =
  | "retreats"
  | "tours"
  | "pilgrimages"
  | "youth"
  | "festivals"
  | "self-catering";

export interface Provider {
  id: string;
  name: string;
  website: string;
  category: HolidayCategory;
  subCategory: string;
  location: string;
  region?: string;
  country?: string;
  description: string;
  denominationFocus: string;
  keyFeatures: string[];
  /** Used for display badges — e.g. "Anglican", "Catholic", "Interdenominational" */
  tags: string[];
  featured?: boolean;
  contactEmail?: string;
  contactPhone?: string;
  accessibility?: string;
  targetAudience?: string;
  ageRange?: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  region?: string;
  type: "domestic" | "international";
  description: string;
  highlights: string[];
  website?: string;
}

export interface CategoryMeta {
  slug: HolidayCategory;
  label: string;
  description: string;
  icon: string;
  count: number;
}
