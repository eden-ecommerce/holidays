import type { CalendarHoliday } from "@lib/calendar/types";

export type CalendarFilters = {
  denom?: string[];
  season?: string[];
  type?: string[];
  region?: string[];
  theme?: string[];
  q?: string;
};

function matchesList(values: string[], selected?: string[]): boolean {
  if (!selected?.length) return true;
  return selected.some((s) => values.includes(s));
}

export function filterHolidays(
  holidays: CalendarHoliday[],
  filters: CalendarFilters,
): CalendarHoliday[] {
  const q = filters.q?.trim().toLowerCase();

  return holidays.filter((h) => {
    if (!matchesList(h.denominations, filters.denom)) return false;
    if (!matchesList(h.seasons, filters.season)) return false;
    if (filters.type?.length && !filters.type.includes(h.dateType)) return false;
    if (!matchesList(h.regions, filters.region)) return false;
    if (!matchesList(h.themes, filters.theme)) return false;

    if (q) {
      const haystack = [
        h.name,
        h.descriptionTeen,
        h.seoExcerpt,
        h.dateRule ?? "",
        ...(h.alsoKnownAs ?? []),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}

export function parseFilterParam(value: string | null): string[] | undefined {
  if (!value) return undefined;
  const parts = value.split(",").map((s) => s.trim()).filter(Boolean);
  return parts.length ? parts : undefined;
}

export function serializeFilterParam(values: string[]): string | null {
  return values.length ? values.join(",") : null;
}
