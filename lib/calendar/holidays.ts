import generated from "@lib/calendar/holidays.generated.json";
import { CalendarHolidayListSchema, type CalendarHoliday } from "@lib/calendar/types";
import { ORTHODOX_CHRISTMAS_ENTRY, PHASE1_OVERRIDES } from "@lib/calendar/phase1-content";
import { buildTeenDescription } from "@lib/calendar/teen-builder";
import { getCurrentYear } from "@lib/calendar/dates";

const CURRENT_YEAR = getCurrentYear();

function mergeHoliday(raw: CalendarHoliday): CalendarHoliday {
  const override = PHASE1_OVERRIDES[raw.id];
  const phase1 = override?.phase1 ?? raw.phase1;

  const base: CalendarHoliday = {
    ...raw,
    ...(override ?? {}),
    phase1,
    descriptionTeen:
      override?.descriptionTeen ??
      (raw.descriptionTeen?.length ? raw.descriptionTeen : ""),
    seoExcerpt:
      override?.seoExcerpt ??
      raw.seoExcerpt ??
      raw.sourceDescription?.slice(0, 155).replace(/\s+\S*$/, "…") ??
      raw.name,
  };

  if (!base.descriptionTeen || base.descriptionTeen.length < 80) {
    base.descriptionTeen = buildTeenDescription(base, CURRENT_YEAR);
  }

  return base;
}

const parsed = CalendarHolidayListSchema.parse(
  (generated as CalendarHoliday[]).map(mergeHoliday),
);

const hasOrthodoxChristmas = parsed.some((h) => h.id === "orthodox-christmas-january-7");

export const CALENDAR_HOLIDAYS: CalendarHoliday[] = hasOrthodoxChristmas
  ? parsed
  : [...parsed, CalendarHolidayListSchema.element.parse(ORTHODOX_CHRISTMAS_ENTRY)];

export const PHASE1_HOLIDAYS = CALENDAR_HOLIDAYS.filter((h) => h.phase1);

export function getHolidayById(id: string): CalendarHoliday | undefined {
  return CALENDAR_HOLIDAYS.find((h) => h.id === id);
}

export function getHolidayCount(): number {
  return CALENDAR_HOLIDAYS.length;
}

export function getDenominationCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const h of CALENDAR_HOLIDAYS) {
    for (const d of h.denominations) {
      counts[d] = (counts[d] ?? 0) + 1;
    }
  }
  return counts;
}
