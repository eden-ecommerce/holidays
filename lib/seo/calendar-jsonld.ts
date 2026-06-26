import type { CalendarHoliday } from "@lib/calendar/types";
import { CALENDAR_FAQS } from "@lib/calendar/faqs";
import { CALENDAR_HOLIDAYS, PHASE1_HOLIDAYS } from "@lib/calendar/holidays";
import {
  formatDateLong,
  getCurrentYear,
  resolveHolidayDate,
  toISODate,
} from "@lib/calendar/dates";
import {
  buildBreadcrumbJsonLd,
  jsonLdScriptProps,
} from "@lib/seo/jsonld";

const BASE_URL = "https://www.eden.co.uk/christian-holidays/calendar";
const HUB_URL = "https://www.eden.co.uk/christian-holidays";

export function buildCalendarBreadcrumbJsonLd() {
  return buildBreadcrumbJsonLd([
    { name: "Home", url: "https://www.eden.co.uk" },
    { name: "Christian Holidays", url: HUB_URL },
    { name: "The Christian Calendar", url: BASE_URL },
  ]);
}

export function buildCalendarItemListJsonLd(holidays: CalendarHoliday[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Christian Holidays Calendar",
    url: BASE_URL,
    numberOfItems: holidays.length,
    itemListElement: holidays.map((h, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: h.name,
      description: h.descriptionTeen || h.seoExcerpt,
      url: `${BASE_URL}/${h.id}`,
    })),
  };
}

export function buildCalendarFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CALENDAR_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

const TOP_EVENT_IDS = new Set([
  "easter-sunday-resurrection-of-our-lord",
  "christmas-day-nativity-of-jesus-christ",
  "good-friday",
  "pentecost-day-of-pentecost",
  "ash-wednesday",
  "advent",
  "epiphany",
  "pascha-orthodox-easter",
  "orthodox-christmas-january-7",
  "all-saints-day",
  "palm-sunday-passion-sunday",
  "ascension-day-ascension-of-our-lord",
  "assumption-of-the-blessed-virgin-mary-dormition-of-the-theotokos",
  "immaculate-conception-of-the-blessed-virgin-mary",
  "annunciation-of-the-lord",
  "presentation-of-the-lord-candlemas",
  "maundy-thursday-holy-thursday",
  "holy-saturday-great-and-holy-saturday",
  "trinity-sunday",
  "corpus-christi-the-most-holy-body-and-blood-of-christ",
]);

export function buildCalendarEventJsonLd(year = getCurrentYear()) {
  const events = CALENDAR_HOLIDAYS.filter((h) => TOP_EVENT_IDS.has(h.id))
    .map((h) => {
      const start = resolveHolidayDate(h, year);
      if (!start) return null;
      return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: h.name,
        description: h.seoExcerpt,
        startDate: toISODate(start),
        url: `${BASE_URL}/${h.id}`,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: "Worldwide",
          address: { "@type": "PostalAddress", addressCountry: "GB" },
        },
      };
    })
    .filter(Boolean);

  return events;
}

export function buildCalendarArticleJsonLd(dateModified: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "The Complete Christian Holidays Guide",
    description:
      "Explore 200+ Christian holidays from Christmas and Easter to Timkat and Vardavar. Filter by denomination, season and region.",
    author: {
      "@type": "Organization",
      name: "Eden Editorial",
    },
    publisher: {
      "@type": "Organization",
      name: "Eden.co.uk",
      url: "https://www.eden.co.uk",
    },
    dateModified,
    url: BASE_URL,
    mainEntityOfPage: BASE_URL,
  };
}

export function getCalendarJsonLdScripts(dateModified: string) {
  return [
    buildCalendarBreadcrumbJsonLd(),
    buildCalendarItemListJsonLd(CALENDAR_HOLIDAYS),
    buildCalendarFaqJsonLd(),
    ...buildCalendarEventJsonLd(),
    buildCalendarArticleJsonLd(dateModified),
  ].map((data) => jsonLdScriptProps(data as Record<string, unknown>));
}

export { formatDateLong, PHASE1_HOLIDAYS };
