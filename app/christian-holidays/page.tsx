import { HolidaysHero } from "@components/holidays/HolidaysHero";
import { HolidaysTrustBar } from "@components/holidays/HolidaysTrustBar";
import { HolidayCategoryCard } from "@components/holidays/HolidayCategoryCard";
import { ProviderCard } from "@components/holidays/ProviderCard";
import { DestinationCard } from "@components/holidays/DestinationCard";
import { ListWithUsBanner } from "@components/holidays/ListWithUsBanner";
import { NsLink } from "@components/ns-link";
import { NAMESPACE_PATH } from "@lib/config";
import { CATEGORIES } from "@lib/holidays/categories";
import { getFeaturedProviders } from "@lib/holidays/providers";
import { getDomesticDestinations, getInternationalDestinations } from "@lib/holidays/destinations";
import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Christian Holidays | Faith-Based Retreats, Tours & Pilgrimages | Eden.co.uk",
  description:
    "Discover Christian holidays, retreats, pilgrimages, youth camps and festivals across the UK. Find faith-aligned accommodation and tour operators trusted by UK Christians.",
  alternates: { canonical: "https://www.eden.co.uk/holidays" },
  openGraph: {
    title: "Christian Holidays | Faith-Based Retreats, Tours & Pilgrimages",
    description:
      "Retreats, pilgrimages, tour operators, youth camps and festivals — curated for UK Christians.",
    url: "https://www.eden.co.uk/holidays",
    type: "website",
  },
};

export default function HolidaysHomePage() {
  const featuredProviders = getFeaturedProviders();
  const domestic = getDomesticDestinations();
  const international = getInternationalDestinations();

  return (
    <main>
      {/* ── Hero ── */}
      <HolidaysHero />

      {/* ── Trust bar ── */}
      <HolidaysTrustBar />

      <div className="mx-auto max-w-6xl px-4 py-14">

        {/* ── Browse by category ── */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Browse by holiday type</h2>
            <p className="mt-1 text-base text-muted-foreground">
              Whether you&apos;re seeking stillness, adventure or community — we have a holiday for you.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat) => (
              <HolidayCategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </section>

        {/* ── Featured providers ── */}
        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Featured providers</h2>
              <p className="mt-1 text-base text-muted-foreground">
                Trusted UK Christian holiday operators and retreat centres.
              </p>
            </div>
            <NsLink
              href={`${NAMESPACE_PATH}/retreats`}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </NsLink>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProviders.slice(0, 6).map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </section>

        {/* ── Domestic pilgrimages ── */}
        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">UK pilgrimage routes</h2>
              <p className="mt-1 text-base text-muted-foreground">
                Walk in the footsteps of the saints — sacred sites across Britain.
              </p>
            </div>
            <NsLink
              href={`${NAMESPACE_PATH}/pilgrimages`}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              All destinations <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </NsLink>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {domestic.slice(0, 3).map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </section>

        {/* ── List with us CTA ── */}
        <section className="mb-16">
          <ListWithUsBanner />
        </section>

        {/* ── International destinations ── */}
        <section className="mb-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">International pilgrimages</h2>
              <p className="mt-1 text-base text-muted-foreground">
                The Holy Land, Lourdes, Rome, Santiago and beyond.
              </p>
            </div>
            <NsLink
              href={`${NAMESPACE_PATH}/pilgrimages`}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              All routes <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </NsLink>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {international.slice(0, 4).map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </section>

        {/* ── Image feature strip ── */}
        <section className="mb-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Retreats */}
            <div className="group relative overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/holidays-retreat.png"
                alt="Peaceful retreat centre surrounded by gardens"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0d2218]/50" aria-hidden="true" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Retreats</p>
                <h3 className="mt-1 text-balance text-lg font-bold text-white">
                  Peaceful UK retreat centres
                </h3>
                <NsLink
                  href={`${NAMESPACE_PATH}/retreats`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-2 hover:underline"
                >
                  Find a retreat <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </NsLink>
              </div>
            </div>
            {/* Pilgrimages */}
            <div className="group relative overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/holidays-pilgrimage.png"
                alt="Pilgrims walking towards an ancient church"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0d2218]/50" aria-hidden="true" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Pilgrimages</p>
                <h3 className="mt-1 text-balance text-lg font-bold text-white">
                  Guided pilgrimage tours
                </h3>
                <NsLink
                  href={`${NAMESPACE_PATH}/pilgrimages`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-2 hover:underline"
                >
                  Explore tours <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </NsLink>
              </div>
            </div>
            {/* Festivals */}
            <div className="group relative overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/holidays-festival.png"
                alt="Christians worshipping at an outdoor festival"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#0d2218]/50" aria-hidden="true" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/70">Festivals</p>
                <h3 className="mt-1 text-balance text-lg font-bold text-white">
                  UK Christian festivals
                </h3>
                <NsLink
                  href={`${NAMESPACE_PATH}/festivals`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white underline-offset-2 hover:underline"
                >
                  View festivals <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </NsLink>
              </div>
            </div>
          </div>
        </section>

        {/* ── Niche categories callout ── */}
        <section>
          <div className="rounded-2xl bg-secondary p-8 text-center">
            <MapPin className="mx-auto h-8 w-8 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold text-foreground">
              Looking for something specific?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-base text-muted-foreground">
              From accessible holidays and clergy breaks to home swaps and youth adventures — our directory covers every kind of faith-filled break.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Accessible holidays", "Clergy discounts", "Solo travellers", "Seniors", "Youth camps", "Home swap"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-foreground"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
            <NsLink
              href={`${NAMESPACE_PATH}/all`}
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Browse all providers <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </NsLink>
          </div>
        </section>

      </div>
    </main>
  );
}
