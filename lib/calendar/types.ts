import { z } from "zod";

export const DateTypeSchema = z.enum(["fixed", "moveable", "semi-fixed"]);
export type DateType = z.infer<typeof DateTypeSchema>;

export const MoveableRuleSchema = z.enum([
  "western-easter",
  "orthodox-pascha",
  "ash-wednesday",
  "palm-sunday",
  "maundy-thursday",
  "good-friday",
  "holy-saturday",
  "ascension-thursday",
  "pentecost",
  "trinity-sunday",
  "corpus-christi-thursday",
  "christ-the-king",
  "first-advent-sunday",
  "vardavar",
  "easter-monday",
  "whit-monday",
  "clean-monday",
]);
export type MoveableRule = z.infer<typeof MoveableRuleSchema>;

export const CalendarHolidaySchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  alsoKnownAs: z.array(z.string()).optional(),
  dateType: DateTypeSchema,
  dateFixed: z.string().optional(),
  dateRule: z.string().optional(),
  moveableRule: MoveableRuleSchema.optional(),
  type: z.string(),
  denominations: z.array(z.string()).min(1),
  seasons: z.array(z.string()).min(1),
  regions: z.array(z.string()).min(1),
  themes: z.array(z.string()).min(1),
  liturgicalColor: z.array(z.string()).optional(),
  isPublicHoliday: z.boolean(),
  publicHolidayCountries: z.array(z.string()).optional(),
  isObligation: z.boolean().optional(),
  sourceDescription: z.string().optional(),
  descriptionTeen: z.string(),
  didYouKnow: z.string().optional(),
  edenCtaCategory: z.string(),
  edenCtaLabel: z.string(),
  edenCtaUrl: z.string(),
  imageAlt: z.string(),
  seoExcerpt: z.string(),
  phase1: z.boolean(),
});

export type CalendarHoliday = z.infer<typeof CalendarHolidaySchema>;

export const CalendarHolidayListSchema = z.array(CalendarHolidaySchema);
