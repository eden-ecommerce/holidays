"use client";

import { useMemo, useState } from "react";
import { NAMESPACE_PATH } from "@lib/config";
import { getCurrentYear, resolveHolidayDate, toISODate } from "@lib/calendar/dates";
import { getSeasonColour } from "@lib/calendar/season-colours";
import { getPrimarySeason } from "@lib/calendar/season-colours";
import type { CalendarHoliday } from "@lib/calendar/types";

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

type TimelineEntry = {
  holiday: CalendarHoliday;
  date: Date;
  iso: string;
};

type Props = {
  holidays: CalendarHoliday[];
};

export function YearTimeline({ holidays }: Props) {
  const [orthodox, setOrthodox] = useState(false);
  const year = getCurrentYear();
  const monthAnchor = useMemo(() => {
    const d = new Date();
    return { year: d.getFullYear(), month: d.getMonth() };
  }, []);

  const entries = useMemo(() => {
    const now = new Date();
    const items: TimelineEntry[] = [];
    for (const h of holidays) {
      if (!h.phase1 && h.dateType === "moveable") continue;
      const date = resolveHolidayDate(h, year, { orthodox });
      if (!date) continue;
      if (date < now && date.getMonth() < now.getMonth()) {
        const nextYear = resolveHolidayDate(h, year + 1, { orthodox });
        if (nextYear) {
          items.push({ holiday: h, date: nextYear, iso: toISODate(nextYear) });
        }
      } else {
        items.push({ holiday: h, date, iso: toISODate(date) });
      }
    }
    items.sort((a, b) => a.date.getTime() - b.date.getTime());
    return items.slice(0, 60);
  }, [holidays, orthodox, year]);

  const months = useMemo(() => {
    const result: { label: string; year: number; month: number; items: TimelineEntry[] }[] = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(monthAnchor.year, monthAnchor.month + i, 1);
      result.push({
        label: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`,
        year: d.getFullYear(),
        month: d.getMonth(),
        items: entries.filter(
          (e) => e.date.getFullYear() === d.getFullYear() && e.date.getMonth() === d.getMonth(),
        ),
      });
    }
    return result;
  }, [entries, monthAnchor]);

  return (
    <section aria-labelledby="timeline-heading" className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="timeline-heading" className="text-2xl font-bold text-foreground">
            This year&apos;s Christian calendar
          </h2>
          <p className="mt-1 text-base text-muted-foreground">
            Major holidays for the next 12 months — tap a dot to jump to its card.
          </p>
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={orthodox}
            onChange={(e) => setOrthodox(e.target.checked)}
            className="h-4 w-4 rounded border-border"
          />
          Show Orthodox dates
        </label>
      </div>

      <div className="mt-6 overflow-x-auto pb-4">
        <div className="flex min-w-max gap-4">
          {months.map((col) => (
            <div
              key={`${col.year}-${col.month}`}
              className="w-36 shrink-0 rounded-xl border border-border bg-card p-3"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {col.label}
              </p>
              <ul className="mt-3 space-y-2">
                {col.items.length === 0 ? (
                  <li className="text-xs text-muted-foreground">—</li>
                ) : (
                  col.items.map(({ holiday, date, iso }) => {
                    const season = getPrimarySeason(holiday.seasons);
                    const colour = getSeasonColour(season);
                    return (
                      <li key={`${holiday.id}-${iso}`}>
                        <a
                          href={`${NAMESPACE_PATH}/calendar#${holiday.id}`}
                          className="group flex items-start gap-2 text-left"
                          title={`${holiday.name} — ${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`}
                        >
                          <span
                            className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: colour }}
                            aria-hidden="true"
                          />
                          <span className="text-xs leading-snug text-foreground group-hover:text-primary group-hover:underline">
                            {holiday.name.split("/")[0].trim().slice(0, 28)}
                            {holiday.name.length > 28 ? "…" : ""}
                          </span>
                        </a>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
