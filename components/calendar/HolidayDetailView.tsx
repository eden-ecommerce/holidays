import { NsLink } from "@components/ns-link";
import { ShareButton } from "@components/events/ShareButton";
import { CalendarExportButton } from "@components/calendar/CalendarExportButton";
import { CommercialCtaBlock } from "@components/calendar/CommercialCtaBlock";
import { HolidayDetailMeta } from "@components/calendar/HolidayDetailMeta";
import { HolidayDetailFaq } from "@components/calendar/HolidayDetailFaq";
import { RelatedHolidayCards } from "@components/calendar/RelatedHolidayCards";
import { WelshHolidaySection } from "@components/calendar/WelshHolidaySection";
import { formatDisplayDate, getCurrentYear } from "@lib/calendar/dates";
import {
  DENOMINATION_LABELS,
  SEASON_LABELS,
  labelFor,
} from "@lib/calendar/filter-labels";
import { getPrimarySeason, getSeasonColour } from "@lib/calendar/season-colours";
import { getRelatedHolidays } from "@lib/calendar/related-holidays";
import { buildHolidayFaqs } from "@lib/calendar/teen-builder";
import { getWelshContent } from "@lib/calendar/welsh-content";
import type { CalendarHoliday } from "@lib/calendar/types";
import { NAMESPACE_PATH } from "@lib/config";
import { ArrowLeft, CalendarDays } from "lucide-react";

type Props = {
  holiday: CalendarHoliday;
  canonicalUrl: string;
};

export function HolidayDetailView({ holiday, canonicalUrl }: Props) {
  const year = getCurrentYear();
  const season = getPrimarySeason(holiday.seasons);
  const seasonColour = getSeasonColour(season);
  const displayDate = formatDisplayDate(holiday, year);
  const faqs = buildHolidayFaqs(holiday, year);
  const related = getRelatedHolidays(holiday);
  const welsh = getWelshContent(holiday.id);
  const shortName = holiday.name.split("/")[0].trim();

  return (
    <main>
      <div
        className="border-b border-[#1a5c1a] bg-[#2d7a27] text-white"
        style={{ borderTopWidth: 8, borderTopColor: seasonColour }}
      >
        <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
          <NsLink
            href={`${NAMESPACE_PATH}/calendar`}
            className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to the calendar
          </NsLink>

          <div className="mt-4 flex items-center gap-1.5 text-sm text-white/80">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            <span>{labelFor(SEASON_LABELS, season)}</span>
          </div>

          <h1 className="mt-3 text-balance text-3xl font-bold sm:text-4xl">{holiday.name}</h1>

          {holiday.alsoKnownAs?.length ? (
            <p className="mt-2 text-sm italic text-white/85">
              Also called: {holiday.alsoKnownAs.join(", ")}
            </p>
          ) : null}

          <p className="mt-3 flex items-center gap-2 text-lg font-medium text-white/95">
            <CalendarDays className="h-5 w-5" aria-hidden="true" />
            {displayDate}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <ShareButton
              url={canonicalUrl}
              title={shortName}
              className="rounded-lg border border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            />
            <CalendarExportButton
              href={`${NAMESPACE_PATH}/api/calendar/ics?slug=${holiday.id}`}
              label="Add to calendar"
              className="border-white/30 bg-white/10 text-white hover:border-white hover:text-white"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="flex flex-wrap gap-1.5">
          {holiday.denominations.slice(0, 5).map((d) => (
            <span
              key={d}
              className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {labelFor(DENOMINATION_LABELS, d)}
            </span>
          ))}
        </div>

        <div className="prose prose-neutral mt-8 max-w-none">
          {holiday.descriptionTeen.split(/(?<=[.!?])\s+/).reduce<string[][]>((acc, sentence, i) => {
            const para = Math.floor(i / 2);
            if (!acc[para]) acc[para] = [];
            acc[para].push(sentence);
            return acc;
          }, []).map((sentences, i) => (
            <p key={i} className="text-base leading-relaxed text-foreground">
              {sentences.join(" ")}
            </p>
          ))}
        </div>

        {holiday.didYouKnow ? (
          <aside className="mt-8 rounded-xl bg-teal-50 px-5 py-4 dark:bg-teal-950/40">
            <p className="text-sm font-semibold text-teal-900 dark:text-teal-100">Did you know?</p>
            <p className="mt-1 text-base italic leading-relaxed text-teal-900/90 dark:text-teal-100/90">
              {holiday.didYouKnow}
            </p>
          </aside>
        ) : null}

        <HolidayDetailMeta holiday={holiday} />

        {welsh ? <WelshHolidaySection content={welsh} /> : null}

        <HolidayDetailFaq faqs={faqs} />

        <CommercialCtaBlock
          title={`Experience ${shortName} with Eden`}
          description="Find retreats, pilgrimages, tours and festivals that connect faith with travel."
          ctaLabel={holiday.edenCtaLabel}
          ctaUrl={holiday.edenCtaUrl}
        />

        {related.length > 0 ? (
          <RelatedHolidayCards holidays={related} year={year} />
        ) : null}
      </div>
    </main>
  );
}
