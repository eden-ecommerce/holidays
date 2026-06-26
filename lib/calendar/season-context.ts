import { CALENDAR_HOLIDAYS } from "@lib/calendar/holidays";
import {
  formatDateLong,
  getCurrentYear,
  resolveHolidayDate,
  toISODate,
} from "@lib/calendar/dates";
import type { CalendarHoliday } from "@lib/calendar/types";

export type SeasonContext = {
  currentSeason: { id: string; label: string; message: string };
  nextHoliday: { holiday: CalendarHoliday; date: Date; daysUntil: number };
  ctaUrl: string;
  ctaLabel: string;
};

const SEASON_WINDOWS: {
  id: string;
  label: string;
  match: (month: number, day: number) => boolean;
  message: string;
  ctaUrl: string;
  ctaLabel: string;
}[] = [
  {
    id: "advent",
    label: "Advent",
    match: (m, d) => (m === 11 && d >= 27) || (m === 0 && d <= 24),
    message: "It's Advent — the 4-week run-up to Christmas.",
    ctaUrl: "/retreats",
    ctaLabel: "Explore Advent retreats →",
  },
  {
    id: "christmas",
    label: "Christmas",
    match: (m, d) => (m === 11 && d >= 25) || (m === 0 && d <= 5),
    message: "It's Christmastide — the twelve days of Christmas.",
    ctaUrl: "/pilgrimages",
    ctaLabel: "Christmas pilgrimages →",
  },
  {
    id: "epiphany",
    label: "Epiphany",
    match: (m, d) => m === 0 && d >= 6 && d <= 13,
    message: "It's the Epiphany season — celebrating Christ revealed to the world.",
    ctaUrl: "/pilgrimages",
    ctaLabel: "Explore pilgrimages →",
  },
  {
    id: "lent",
    label: "Lent",
    match: (m) => m === 1 || m === 2,
    message: "It's Lent — a season of reflection before Easter.",
    ctaUrl: "/retreats",
    ctaLabel: "Find a Lent retreat →",
  },
];

function daysBetween(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

const PRIORITY_HOLIDAY_IDS = [
  "advent",
  "ash-wednesday",
  "palm-sunday-passion-sunday",
  "good-friday",
  "easter-sunday-resurrection-of-our-lord",
  "pascha-orthodox-easter",
  "pentecost-day-of-pentecost",
  "christmas-day-nativity-of-jesus-christ",
  "orthodox-christmas-january-7",
  "all-saints-day",
];

export function getSeasonContext(now = new Date()): SeasonContext {
  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const today = new Date(year, month, day);

  const window = SEASON_WINDOWS.find((w) => w.match(month, day));

  const upcoming: { holiday: CalendarHoliday; date: Date }[] = [];

  for (const h of CALENDAR_HOLIDAYS) {
    if (!PRIORITY_HOLIDAY_IDS.includes(h.id) && !h.phase1) continue;
    const d = resolveHolidayDate(h, year);
    if (!d) continue;
    let target = d;
    if (target < today) {
      const nextYear = resolveHolidayDate(h, year + 1);
      if (nextYear) target = nextYear;
    }
    if (target >= today) upcoming.push({ holiday: h, date: target });
  }

  upcoming.sort((a, b) => a.date.getTime() - b.date.getTime());
  const next = upcoming[0] ?? {
    holiday: CALENDAR_HOLIDAYS[0],
    date: new Date(year, 11, 25),
  };

  const daysUntil = daysBetween(today, next.date);

  if (window) {
    return {
      currentSeason: {
        id: window.id,
        label: window.label,
        message: window.message,
      },
      nextHoliday: {
        holiday: next.holiday,
        date: next.date,
        daysUntil,
      },
      ctaUrl: window.ctaUrl,
      ctaLabel: window.ctaLabel,
    };
  }

  const isAshWednesday =
    next.holiday.id === "ash-wednesday" && daysUntil === 0;

  return {
    currentSeason: {
      id: "ordinary-time",
      label: "Ordinary Time",
      message: isAshWednesday
        ? "Ash Wednesday is today — the start of Lent."
        : `Next up: ${next.holiday.name.split("/")[0].trim()}`,
    },
    nextHoliday: {
      holiday: next.holiday,
      date: next.date,
      daysUntil,
    },
    ctaUrl: next.holiday.edenCtaUrl || "/retreats",
    ctaLabel: isAshWednesday
      ? "Find a Lent retreat →"
      : next.holiday.edenCtaLabel || "Browse Christian holidays →",
  };
}

export function formatSeasonBannerText(ctx: SeasonContext): string {
  const { currentSeason, nextHoliday } = ctx;
  const name = nextHoliday.holiday.name.split("/")[0].trim();
  if (nextHoliday.daysUntil === 0) {
    return `${currentSeason.message} | ${name} is today.`;
  }
  if (currentSeason.id !== "ordinary-time") {
    return `${currentSeason.message} Next up: ${name} (${nextHoliday.daysUntil} days).`;
  }
  return `${currentSeason.message} (${nextHoliday.daysUntil} days).`;
}

export { toISODate, formatDateLong, getCurrentYear };
