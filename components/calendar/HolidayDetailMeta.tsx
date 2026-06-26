import {
  DATE_TYPE_LABELS,
  REGION_LABELS,
  THEME_LABELS,
  labelFor,
} from "@lib/calendar/filter-labels";
import type { CalendarHoliday } from "@lib/calendar/types";

export function HolidayDetailMeta({ holiday }: { holiday: CalendarHoliday }) {
  const rows: { label: string; value: string }[] = [
    { label: "Type", value: holiday.type.replace(/-/g, " ") },
    {
      label: "Date type",
      value: labelFor(DATE_TYPE_LABELS, holiday.dateType),
    },
    {
      label: "Regions",
      value: holiday.regions.map((r) => labelFor(REGION_LABELS, r)).join(", "),
    },
    {
      label: "Themes",
      value: holiday.themes.map((t) => labelFor(THEME_LABELS, t)).join(", "),
    },
  ];

  if (holiday.liturgicalColor?.length) {
    rows.push({ label: "Liturgical colour", value: holiday.liturgicalColor.join(", ") });
  }

  if (holiday.isPublicHoliday) {
    rows.push({ label: "Public holiday", value: "Yes — in at least one country" });
  }

  if (holiday.isObligation) {
    rows.push({ label: "Holy Day of Obligation", value: "Yes (Catholic)" });
  }

  return (
    <section aria-labelledby="meta-heading" className="mt-10 rounded-xl border border-border bg-secondary/30 p-5">
      <h2 id="meta-heading" className="text-lg font-bold text-foreground">
        At a glance
      </h2>
      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {row.label}
            </dt>
            <dd className="mt-0.5 text-sm capitalize text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
