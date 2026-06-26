import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HolidayDetailView } from "@components/calendar/HolidayDetailView";
import { CALENDAR_HOLIDAYS, getHolidayById } from "@lib/calendar/holidays";
import { getPrimarySeason, getSeasonColour } from "@lib/calendar/season-colours";
import { getHolidayDetailJsonLdScripts } from "@lib/seo/holiday-detail-jsonld";

const BASE = "https://www.eden.co.uk/christian-holidays/calendar";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CALENDAR_HOLIDAYS.map((h) => ({ slug: h.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const holiday = getHolidayById(slug);
  if (!holiday) return { title: "Holiday not found" };

  const title = `${holiday.name.split("/")[0].trim()} | Christian Holidays Calendar`;
  const description = holiday.seoExcerpt.slice(0, 155);
  const canonicalUrl = `${BASE}/${holiday.id}`;
  const season = getPrimarySeason(holiday.seasons);
  const colour = getSeasonColour(season).replace("#", "");

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: [
        {
          url: `${BASE}/og-image.svg?title=${encodeURIComponent(holiday.name.split("/")[0].trim())}&colour=${colour}`,
          width: 1200,
          height: 630,
          alt: holiday.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${BASE}/og-image.svg`],
    },
  };
}

export default async function HolidayDetailPage({ params }: Props) {
  const { slug } = await params;
  const holiday = getHolidayById(slug);
  if (!holiday) notFound();

  const canonicalUrl = `${BASE}/${holiday.id}`;
  const dateModified = new Date().toISOString().split("T")[0];
  const jsonLdScripts = getHolidayDetailJsonLdScripts(holiday, dateModified);

  return (
    <>
      {jsonLdScripts.map((props, i) => (
        <script key={i} {...props} />
      ))}
      <HolidayDetailView holiday={holiday} canonicalUrl={canonicalUrl} />
    </>
  );
}
