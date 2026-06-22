import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  MapPin,
  ExternalLink,
  ArrowLeft,
  Phone,
  Mail,
  Users,
  Accessibility,
  Tag,
} from "lucide-react";
import { NsLink } from "@components/ns-link";
import { ProviderCard } from "@components/holidays/ProviderCard";
import { ListWithUsBanner } from "@components/holidays/ListWithUsBanner";
import { NAMESPACE_PATH } from "@lib/config";
import { ALL_PROVIDERS, getProviderById, getRelatedProviders } from "@lib/holidays/providers";
import { CATEGORIES } from "@lib/holidays/categories";

interface Props {
  params: Promise<{ category: string; id: string }>;
}

export async function generateStaticParams() {
  return ALL_PROVIDERS.map((p) => ({ category: p.category, id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const provider = getProviderById(id);
  if (!provider) return { title: "Provider not found" };
  return {
    title: `${provider.name} | Christian Holidays`,
    description: provider.description,
  };
}

const CATEGORY_LABEL: Record<string, string> = {
  retreats: "Retreats & Centres",
  tours: "Tour Operators",
  pilgrimages: "Pilgrimages",
  youth: "Youth & Activity",
  festivals: "Festivals",
  "self-catering": "Self-Catering & B&Bs",
  missions: "Missions & Voluntourism",
};

export default async function ProviderDetailPage({ params }: Props) {
  const { category, id } = await params;
  const provider = getProviderById(id);

  // 404 if provider not found, or if the category segment doesn't match
  if (!provider || provider.category !== category) {
    notFound();
  }

  const categoryLabel = CATEGORY_LABEL[provider.category] ?? provider.category;
  const categoryMeta = CATEGORIES.find((c) => c.slug === provider.category);
  const related = getRelatedProviders(provider, 3);

  return (
    <main>
      {/* Breadcrumb + page header */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <NsLink href={NAMESPACE_PATH} className="hover:text-primary">
                  Christian Holidays
                </NsLink>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <NsLink
                  href={`${NAMESPACE_PATH}/${provider.category}`}
                  className="hover:text-primary"
                >
                  {categoryLabel}
                </NsLink>
              </li>
              <li aria-hidden="true">/</li>
              <li className="truncate font-medium text-foreground">{provider.name}</li>
            </ol>
          </nav>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wide text-primary">
                  {categoryMeta?.label ?? categoryLabel}
                </span>
                {provider.featured && (
                  <span className="rounded-full bg-amber-100 px-3 py-0.5 text-xs font-semibold text-amber-800">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="mt-3 text-balance text-3xl font-bold text-foreground">
                {provider.name}
              </h1>
              {(provider.location || provider.region) && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {provider.location}
                  {provider.region && provider.region !== provider.location
                    ? `, ${provider.region}`
                    : ""}
                  {provider.country ? `, ${provider.country}` : ""}
                </p>
              )}
            </div>

            <a
              href={provider.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Visit website
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">

          {/* Main content */}
          <div className="space-y-8">
            <section>
              <h2 className="mb-3 text-xl font-bold text-foreground">About</h2>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                {provider.description}
              </p>
            </section>

            {provider.keyFeatures.length > 0 && (
              <section className="border-t border-border pt-8">
                <h2 className="mb-4 text-xl font-bold text-foreground">Key features</h2>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {provider.keyFeatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-foreground"
                    >
                      <span
                        className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {provider.tags.length > 0 && (
              <section className="border-t border-border pt-8">
                <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-foreground">
                  <Tag className="h-4 w-4 text-primary" aria-hidden="true" />
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {provider.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-sm text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="mb-4 text-base font-semibold text-foreground">
                Provider details
              </h2>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Category
                  </dt>
                  <dd className="mt-0.5 font-medium text-foreground">{categoryLabel}</dd>
                </div>

                {provider.subCategory && (
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Type
                    </dt>
                    <dd className="mt-0.5 font-medium text-foreground">{provider.subCategory}</dd>
                  </div>
                )}

                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Denomination
                  </dt>
                  <dd className="mt-0.5 font-medium text-foreground">
                    {provider.denominationFocus}
                  </dd>
                </div>

                {provider.targetAudience && (
                  <div className="flex items-start gap-2">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Suitable for
                      </dt>
                      <dd className="mt-0.5 text-foreground">{provider.targetAudience}</dd>
                    </div>
                  </div>
                )}

                {provider.ageRange && (
                  <div className="flex items-start gap-2">
                    <Users className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Age range
                      </dt>
                      <dd className="mt-0.5 text-foreground">{provider.ageRange}</dd>
                    </div>
                  </div>
                )}

                {provider.accessibility && (
                  <div className="flex items-start gap-2">
                    <Accessibility
                      className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        Accessibility
                      </dt>
                      <dd className="mt-0.5 text-foreground">{provider.accessibility}</dd>
                    </div>
                  </div>
                )}

                {provider.contactPhone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <a
                      href={`tel:${provider.contactPhone}`}
                      className="font-medium text-foreground hover:text-primary"
                    >
                      {provider.contactPhone}
                    </a>
                  </div>
                )}

                {provider.contactEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    <a
                      href={`mailto:${provider.contactEmail}`}
                      className="truncate font-medium text-foreground hover:text-primary"
                    >
                      {provider.contactEmail}
                    </a>
                  </div>
                )}
              </dl>

              <a
                href={provider.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                Visit {provider.name}
              </a>
            </div>

            <NsLink
              href={`${NAMESPACE_PATH}/${provider.category}`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to {categoryLabel}
            </NsLink>
          </aside>
        </div>

        {/* Related providers */}
        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <h2 className="mb-6 text-xl font-bold text-foreground">
              More {categoryLabel.toLowerCase()}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-12">
          <ListWithUsBanner />
        </div>
      </div>
    </main>
  );
}
