import type { CalendarHoliday } from "@lib/calendar/types";
import {
  getCurrentYear,
  resolveHolidayDate,
  toISODate,
} from "@lib/calendar/dates";

function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

function foldLine(line: string): string {
  const max = 73;
  if (line.length <= max) return line;
  const parts: string[] = [];
  let rest = line;
  parts.push(rest.slice(0, max));
  rest = rest.slice(max);
  while (rest.length > 0) {
    parts.push(" " + rest.slice(0, max - 1));
    rest = rest.slice(max - 1);
  }
  return parts.join("\r\n");
}

export function buildHolidayIcsEvent(
  holiday: CalendarHoliday,
  year: number,
  baseUrl: string,
): string | null {
  const start = resolveHolidayDate(holiday, year);
  if (!start) return null;

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  const uid = `${holiday.id}-${year}@eden.co.uk`;
  const url = `${baseUrl}/calendar/${holiday.id}`;
  const summary = escapeIcs(holiday.name.split("/")[0].trim());
  const description = escapeIcs(holiday.seoExcerpt || holiday.name);

  const lines = [
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toISODate(new Date()).replace(/-/g, "")}T000000Z`,
    `DTSTART;VALUE=DATE:${toISODate(start).replace(/-/g, "")}`,
    `DTEND;VALUE=DATE:${toISODate(end).replace(/-/g, "")}`,
    foldLine(`SUMMARY:${summary}`),
    foldLine(`DESCRIPTION:${description}`),
    foldLine(`URL:${url}`),
    "END:VEVENT",
  ];

  return lines.join("\r\n");
}

export function buildCalendarIcs(
  holidays: CalendarHoliday[],
  options?: { year?: number; baseUrl?: string },
): string {
  const year = options?.year ?? getCurrentYear();
  const baseUrl = options?.baseUrl ?? "https://www.eden.co.uk/christian-holidays";
  const events = holidays
    .map((h) => buildHolidayIcsEvent(h, year, baseUrl))
    .filter(Boolean);

  const nextYearEvents = holidays
    .map((h) => buildHolidayIcsEvent(h, year + 1, baseUrl))
    .filter(Boolean);

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Eden.co.uk//Christian Holidays Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:Christian Holidays Calendar",
    "X-WR-TIMEZONE:Europe/London",
    ...events,
    ...nextYearEvents,
    "END:VCALENDAR",
  ].join("\r\n");
}
