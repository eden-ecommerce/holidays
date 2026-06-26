import type { CalendarHoliday } from "@lib/calendar/types";
import { CALENDAR_HOLIDAYS } from "@lib/calendar/holidays";

function scoreRelated(a: CalendarHoliday, b: CalendarHoliday): number {
  if (a.id === b.id) return -1;
  let score = 0;
  for (const s of a.seasons) {
    if (b.seasons.includes(s)) score += 3;
  }
  for (const d of a.denominations) {
    if (b.denominations.includes(d)) score += 2;
  }
  for (const t of a.themes) {
    if (b.themes.includes(t)) score += 1;
  }
  if (a.type === b.type) score += 1;
  return score;
}

export function getRelatedHolidays(
  holiday: CalendarHoliday,
  limit = 4,
): CalendarHoliday[] {
  return CALENDAR_HOLIDAYS.filter((h) => h.id !== holiday.id)
    .map((h) => ({ h, score: scoreRelated(holiday, h) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.h);
}
