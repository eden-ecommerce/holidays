/**
 * Liturgical date calculations for the Christian calendar tool.
 * Western Easter: Anonymous Gregorian algorithm (RFC 5545).
 */

import type { CalendarHoliday, MoveableRule } from "@lib/calendar/types";

export function getWesternEaster(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

/** Julian-calendar Easter converted to Gregorian (add 13 days). */
export function getJulianEasterGregorian(year: number): Date {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  const julian = new Date(year, month - 1, day);
  julian.setDate(julian.getDate() + 13);
  return julian;
}

export function getOrthodoxPascha(year: number): Date {
  const western = getWesternEaster(year);
  let orthodox = getJulianEasterGregorian(year);
  if (orthodox.getTime() < western.getTime()) {
    orthodox = new Date(orthodox);
    orthodox.setDate(orthodox.getDate() + 7);
  }
  return orthodox;
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function getFirstAdventSunday(year: number): Date {
  const nov30 = new Date(year, 10, 30);
  const day = nov30.getDay();
  const diff = day === 0 ? 0 : 7 - day;
  return addDays(nov30, diff === 7 ? -1 : diff - (day > 3 ? 7 : 0));
}

/** Nearest Sunday to 30 November (Advent begins between Nov 27–Dec 3). */
export function getAdventStart(year: number): Date {
  const target = new Date(year, 10, 30);
  const dow = target.getDay();
  const offsets = [0, -1, -2, 3, 2, 1, 0];
  return addDays(target, offsets[dow] ?? 0);
}

export function getChristTheKingSunday(year: number): Date {
  const advent = getAdventStart(year);
  return addDays(advent, -7);
}

export function resolveMoveableDate(rule: MoveableRule, year: number, orthodox = false): Date {
  const easter = orthodox ? getOrthodoxPascha(year) : getWesternEaster(year);
  switch (rule) {
    case "western-easter":
      return getWesternEaster(year);
    case "orthodox-pascha":
      return getOrthodoxPascha(year);
    case "ash-wednesday":
      return addDays(getWesternEaster(year), -46);
    case "palm-sunday":
      return addDays(getWesternEaster(year), -7);
    case "maundy-thursday":
      return addDays(getWesternEaster(year), -3);
    case "good-friday":
      return addDays(getWesternEaster(year), -2);
    case "holy-saturday":
      return addDays(getWesternEaster(year), -1);
    case "easter-monday":
      return addDays(getWesternEaster(year), 1);
    case "ascension-thursday":
      return addDays(easter, 39);
    case "pentecost":
      return addDays(easter, 49);
    case "whit-monday":
      return addDays(easter, 50);
    case "trinity-sunday":
      return addDays(easter, 56);
    case "corpus-christi-thursday":
      return addDays(easter, 60);
    case "christ-the-king":
      return getChristTheKingSunday(year);
    case "first-advent-sunday":
      return getAdventStart(year);
    case "vardavar":
      return addDays(getWesternEaster(year), 98);
    case "clean-monday":
      return addDays(getOrthodoxPascha(year), -48);
    default:
      return easter;
  }
}

export function resolveHolidayDate(
  holiday: CalendarHoliday,
  year: number,
  options?: { orthodox?: boolean },
): Date | null {
  const orthodox = options?.orthodox ?? false;

  if (holiday.id === "orthodox-christmas-january-7") {
    return new Date(year, 0, 7);
  }

  if (holiday.dateFixed) {
    const [mm, dd] = holiday.dateFixed.split("-").map(Number);
    return new Date(year, mm - 1, dd);
  }

  if (holiday.moveableRule) {
    return resolveMoveableDate(holiday.moveableRule, year, orthodox);
  }

  if (holiday.dateType === "moveable" && holiday.dateRule?.toLowerCase().includes("easter")) {
    return resolveMoveableDate("western-easter", year, orthodox);
  }

  return null;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function formatDateLong(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatDisplayDate(
  holiday: CalendarHoliday,
  year: number,
  options?: { orthodox?: boolean },
): string {
  if (holiday.dateType === "fixed" && holiday.dateFixed) {
    const [mm, dd] = holiday.dateFixed.split("-").map(Number);
    return `${MONTHS[mm - 1]} ${dd} (fixed)`;
  }

  const resolved = resolveHolidayDate(holiday, year, options);
  if (resolved) {
    const suffix = holiday.dateType === "moveable" ? "" : " (semi-fixed)";
    return `${formatDateLong(resolved)}${suffix}`;
  }

  return holiday.dateRule ?? "Date varies";
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function getCurrentYear(): number {
  return new Date().getFullYear();
}
