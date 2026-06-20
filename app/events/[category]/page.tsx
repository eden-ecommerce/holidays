import { ProviderCard } from "@components/holidays/ProviderCard";
import { DestinationCard } from "@components/holidays/DestinationCard";
import { ListWithUsBanner } from "@components/holidays/ListWithUsBanner";
import { NsLink } from "@components/ns-link";
import { NAMESPACE_PATH } from "@lib/config";
import { CATEGORIES } from "@lib/holidays/categories";
import { getProvidersByCategory } from "@lib/holidays/providers";
import { DESTINATIONS } from "@lib/holidays/destinations";
import type { HolidayCategory } from "@lib/holidays/types";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

const VALID_CATEGORIES = ["retreats", "tours", "pilgrimages", "youth", "festivals", "self-catering", "all"] as const;

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return VALID_CATEGORIES.map((c) => ({ category: c }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const meta = CATEGORIES.find((c) => c.slug === category);
  if (!meta && category !== "all") return {};
  const label = category === "all" ? "All Holidays" : meta?.label ?? category;
  return {
    title: `${label} | Christian Holidays`,
    description: meta?.description ?? "Browse Christian holidays and faith-aligned accommodation on Eden.co.uk.",
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category as (typeof VALID_CATEGORIES)[number])) {
    notFound();
  }

  const isAll = category === "all";
  const isPilgrimages = category === "pilgrimages";

  const categoryMeta = CATEGORIES.find((c) => c.slug === category);
  const heading = isAll ? "All Holiday Providers" : categoryMeta?.label ?? category;
  const description = isAll
    ? "Every Christian holiday provider, retreat, tour operator and festival on Eden.co.uk."
    : categoryMeta?.description ?? "";

  const providers = isAll
    ? (await import("@lib/holidays/providers")).ALL_PROVIDERS
    : category !== "pilgrimages"
    ? getProvidersByCategory(category as HolidayCategory)
    : getProvidersByCategory("pilgrimages");

  const destinations = isPilgrimages || isAll ? DESTINATIONS : [];

  return (
    <main>
      {/* Page header */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <NsLink
            href={NAMESPACE_PATH}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Christian Holidays
          </NsLink>
          <h1 className="mt-3 text-balance text-3xl font-bold text-foreground">{heading}</h1>
          {description && (
            <p className="mt-2 max-w-2xl text-pretty text-base text-muted-foreground">{description}</p>
          )}
          {providers.length > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              {providers.length} {providers.length === 1 ? "provider" : "providers"} listed
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12">

        {/* Provider grid */}
        {providers.length > 0 && (
          <section className="mb-12">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {providers.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))}
            </div>
          </section>
        )}

        {/* Pilgrimage destinations */}
        {destinations.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-5 text-xl font-bold text-foreground">Pilgrimage destinations</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {destinations.map((dest) => (
                <DestinationCard key={dest.id} destination={dest} />
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {providers.length === 0 && destinations.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center">
            <p className="text-base text-muted-foreground">No listings available yet. Check back soon.</p>
            <NsLink
              href={NAMESPACE_PATH}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to all holidays
            </NsLink>
          </div>
        )}

        {/* Category navigation */}
        <section className="mb-12">
          <h2 className="mb-4 text-base font-semibold text-foreground">Browse other categories</h2>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <NsLink
                key={cat.slug}
                href={`${NAMESPACE_PATH}/${cat.slug}`}
                className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  cat.slug === category
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat.label}
              </NsLink>
            ))}
          </div>
        </section>

        {/* List with us CTA */}
        <ListWithUsBanner />

      </div>
    </main>
  );
}
