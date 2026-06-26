import type { CalendarHoliday } from "@lib/calendar/types";
import { buildHolidayFaqs, type HolidayFaq } from "@lib/calendar/teen-builder";
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

export function holidayDetailUrl(slug: string): string {
  return `${BASE_URL}/${slug}`;
}

export function buildHolidayBreadcrumbJsonLd(holiday: CalendarHoliday) {
  return buildBreadcrumbJsonLd([
    { name: "Home", url: "https://www.eden.co.uk" },
    { name: "Christian Holidays", url: "https://www.eden.co.uk/christian-holidays" },
    { name: "The Christian Calendar", url: BASE_URL },
    { name: holiday.name.split("/")[0].trim(), url: holidayDetailUrl(holiday.id) },
  ]);
}

export function buildHolidayEventJsonLd(holiday: CalendarHoliday, year = getCurrentYear()) {
  const start = resolveHolidayDate(holiday, year);
  if (!start) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: holiday.name,
    description: holiday.seoExcerpt,
    startDate: toISODate(start),
    url: holidayDetailUrl(holiday.id),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Worldwide",
      address: { "@type": "PostalAddress", addressCountry: "GB" },
    },
  };
}

export function buildHolidayFaqJsonLd(faqs: HolidayFaq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildHolidayArticleJsonLd(holiday: CalendarHoliday, dateModified: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: holiday.name,
    description: holiday.seoExcerpt,
    author: { "@type": "Organization", name: "Eden Editorial" },
    publisher: {
      "@type": "Organization",
      name: "Eden.co.uk",
      url: "https://www.eden.co.uk",
    },
    dateModified,
    url: holidayDetailUrl(holiday.id),
    mainEntityOfPage: holidayDetailUrl(holiday.id),
  };
}

export function getHolidayDetailJsonLdScripts(holiday: CalendarHoliday, dateModified: string) {
  const year = getCurrentYear();
  const faqs = buildHolidayFaqs(holiday, year);
  const scripts: Record<string, unknown>[] = [
    buildHolidayBreadcrumbJsonLd(holiday),
    buildHolidayFaqJsonLd(faqs),
    buildHolidayArticleJsonLd(holiday, dateModified),
  ];
  const event = buildHolidayEventJsonLd(holiday, year);
  if (event) scripts.push(event);
  return scripts.map((data) => jsonLdScriptProps(data));
}

export { formatDateLong, buildHolidayFaqs };
