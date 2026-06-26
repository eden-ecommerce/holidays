import { NsLink } from "@components/ns-link";
import { formatDisplayDate } from "@lib/calendar/dates";
import { getPrimarySeason, getSeasonColour } from "@lib/calendar/season-colours";
import type { CalendarHoliday } from "@lib/calendar/types";
import { NAMESPACE_PATH } from "@lib/config";
import { ArrowRight } from "lucide-react";

type Props = {
  holidays: CalendarHoliday[];
  year: number;
};

export function RelatedHolidayCards({ holidays, year }: Props) {
  return (
    <section aria-labelledby="related-heading" className="mt-12">
      <h2 id="related-heading" className="text-xl font-bold text-foreground">
        Related holidays
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {holidays.map((h) => {
          const season = getPrimarySeason(h.seasons);
          return (
            <li key={h.id}>
              <NsLink
                href={`${NAMESPACE_PATH}/calendar/${h.id}`}
                className="group flex flex-col rounded-xl border border-border bg-card p-4 transition-shadow hover:border-primary hover:shadow-md"
                style={{ borderTopWidth: 4, borderTopColor: getSeasonColour(season) }}
              >
                <span className="font-semibold text-foreground group-hover:text-primary">
                  {h.name.split("/")[0].trim()}
                </span>
                <span className="mt-1 text-sm text-muted-foreground">
                  {formatDisplayDate(h, year)}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Read guide
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </NsLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
