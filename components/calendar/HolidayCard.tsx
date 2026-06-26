"use client";

import { useState } from "react";
import { NsLink } from "@components/ns-link";
import { formatDisplayDate } from "@lib/calendar/dates";
import { DENOMINATION_LABELS, labelFor } from "@lib/calendar/filter-labels";
import { getPrimarySeason, getSeasonColour } from "@lib/calendar/season-colours";
import { SEASON_LABELS } from "@lib/calendar/filter-labels";
import type { CalendarHoliday } from "@lib/calendar/types";
import { CalendarDays } from "lucide-react";

type Props = {
  holiday: CalendarHoliday;
  year: number;
};

export function HolidayCard({ holiday, year }: Props) {
  const [expanded, setExpanded] = useState(false);
  const season = getPrimarySeason(holiday.seasons);
  const seasonColour = getSeasonColour(season);
  const displayDate = formatDisplayDate(holiday, year);
  const description =
    holiday.phase1 && holiday.descriptionTeen
      ? holiday.descriptionTeen
      : holiday.descriptionTeen ||
        holiday.sourceDescription?.slice(0, 200) ||
        "Full guide coming soon.";

  const showReadMore = description.length > 160 && !expanded;
  const visibleDenoms = holiday.denominations.slice(0, 3);
  const extraDenoms = holiday.denominations.length - visibleDenoms.length;

  return (
    <article
      id={holiday.id}
      className="flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow duration-150 hover:border-primary hover:shadow-md focus-within:border-primary focus-within:shadow-md"
      style={{ borderTopWidth: 8, borderTopColor: seasonColour }}
    >
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          <span>{labelFor(SEASON_LABELS, season)}</span>
        </div>

        <h3 className="mt-2 text-lg font-bold text-[#1a3d2b] sm:text-xl">{holiday.name}</h3>

        {holiday.alsoKnownAs?.length ? (
          <p className="mt-1 text-xs italic text-muted-foreground">
            Also called: {holiday.alsoKnownAs.slice(0, 3).join(", ")}
          </p>
        ) : null}

        <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-[#2d7a27]">
          <CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />
          {displayDate}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {visibleDenoms.map((d) => (
            <span
              key={d}
              className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {labelFor(DENOMINATION_LABELS, d)}
            </span>
          ))}
          {extraDenoms > 0 ? (
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              +{extraDenoms} more
            </span>
          ) : null}
        </div>

        <p
          className={`mt-3 text-[15px] leading-relaxed text-foreground/85 ${expanded ? "" : "line-clamp-3"}`}
        >
          {description}
        </p>

        {showReadMore ? (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-1 text-left text-sm font-medium text-primary hover:underline"
          >
            Read more
          </button>
        ) : null}

        {holiday.phase1 && holiday.didYouKnow ? (
          <p className="mt-3 rounded-lg bg-teal-50 px-3 py-2 text-[13px] italic leading-snug text-teal-900 dark:bg-teal-950/40 dark:text-teal-100">
            <span className="font-semibold not-italic">Did you know?</span> {holiday.didYouKnow}
          </p>
        ) : null}

        {holiday.phase1 && holiday.edenCtaUrl ? (
          <NsLink
            href={holiday.edenCtaUrl}
            className="mt-4 text-sm font-semibold text-primary hover:underline"
          >
            {holiday.edenCtaLabel}
          </NsLink>
        ) : null}
      </div>
    </article>
  );
}

export function HolidayCardSkeleton() {
  return (
    <div className="h-[320px] animate-pulse rounded-xl border border-border bg-muted/40" aria-hidden="true" />
  );
}
