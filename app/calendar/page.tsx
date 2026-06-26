import { Suspense } from "react";
import type { Metadata } from "next";
import { CalendarHero } from "@components/calendar/CalendarHero";
import { SeasonBanner, SeasonBannerMobile } from "@components/calendar/SeasonBanner";
import { CommercialCtaBlock } from "@components/calendar/CommercialCtaBlock";
import { CalendarFilterTool } from "@components/calendar/CalendarFilterTool";
import { QuickAnswersFaq } from "@components/calendar/QuickAnswersFaq";
import { YearTimeline } from "@components/calendar/YearTimeline";
import { DenominationExplorer } from "@components/calendar/DenominationExplorer";
import { HolidayCardSkeleton } from "@components/calendar/HolidayCard";
import { CALENDAR_HOLIDAYS } from "@lib/calendar/holidays";
import { getSeasonContext } from "@lib/calendar/season-context";
import { getCalendarJsonLdScripts } from "@lib/seo/calendar-jsonld";

const CANONICAL = "https://www.eden.co.uk/christian-holidays/calendar";
const OG_IMAGE = "https://www.eden.co.uk/christian-holidays/calendar/og-image.svg";

export const metadata: Metadata = {
  title: "The Complete Christian Holidays Guide",
  description:
    "Explore 200+ Christian holidays from Christmas and Easter to Timkat and Vardavar. Filter by denomination, season and region. Updated annually.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "The Complete Christian Holidays Guide | Eden",
    description:
      "Every Christian holiday explained — across 15 denominations. Filter, explore and discover the full Christian calendar.",
    url: CANONICAL,
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "The Christian Holidays Calendar" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Complete Christian Holidays Guide | Eden",
    description: "Every Christian holiday explained — filter by denomination, season and region.",
    images: [OG_IMAGE],
  },
};

function FilterFallback() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <HolidayCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default function CalendarPage() {
  const seasonContext = getSeasonContext();
  const dateModified = new Date().toISOString().split("T")[0];
  const jsonLdScripts = getCalendarJsonLdScripts(dateModified);

  return (
    <main>
      {jsonLdScripts.map((props, i) => (
        <script key={i} {...props} />
      ))}

      <CalendarHero />
      <SeasonBannerMobile context={seasonContext} />
      <SeasonBanner context={seasonContext} />

      <div className="mx-auto max-w-6xl px-4 py-10">
        <CommercialCtaBlock
          title="This Easter, walk where it happened"
          description="Eden's pilgrimage partners offer guided tours to Jerusalem, Bethlehem and Galilee."
          ctaLabel="Find an Easter pilgrimage →"
          ctaUrl="/pilgrimages"
        />

        <Suspense fallback={<FilterFallback />}>
          <CalendarFilterTool holidays={CALENDAR_HOLIDAYS} />
        </Suspense>

        <CommercialCtaBlock
          title="Looking for a quiet place to observe Lent or Advent?"
          description="Eden's directory includes dozens of UK Christian retreat centres for reflection and rest."
          ctaLabel="Find a retreat →"
          ctaUrl="/retreats"
        />

        <DenominationExplorer />
        <YearTimeline holidays={CALENDAR_HOLIDAYS} />
        <QuickAnswersFaq />

        <CommercialCtaBlock
          title="Ready to experience a Christian holiday somewhere in the world?"
          description="Browse Eden's full directory of faith-based travel — retreats, pilgrimages, festivals and more."
          ctaLabel="Start exploring →"
          ctaUrl="/"
        />
      </div>
    </main>
  );
}
