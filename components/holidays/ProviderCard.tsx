import { NsLink } from "@components/ns-link";
import { NAMESPACE_PATH } from "@lib/config";
import { MapPin, ExternalLink } from "lucide-react";
import type { Provider } from "@lib/holidays/types";

const CATEGORY_LABEL: Record<Provider["category"], string> = {
  retreats: "Retreat",
  tours: "Tour Operator",
  pilgrimages: "Pilgrimage",
  youth: "Youth Camp",
  festivals: "Festival",
  "self-catering": "Self-Catering",
  missions: "Mission Trip",
};

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md">
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Category badge + denomination */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
            {CATEGORY_LABEL[provider.category]}
          </span>
          <span className="text-xs text-muted-foreground">{provider.denominationFocus}</span>
        </div>

        {/* Name */}
        <h3 className="text-balance text-base font-bold leading-snug text-foreground group-hover:text-primary">
          {provider.name}
        </h3>

        {/* Location */}
        {(provider.location || provider.region) && (
          <p className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
            <span className="truncate">
              {provider.location}
              {provider.region && provider.region !== provider.location
                ? `, ${provider.region}`
                : ""}
            </span>
          </p>
        )}

        {/* Description */}
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground line-clamp-3">
          {provider.description}
        </p>

        {/* Key features */}
        {provider.keyFeatures.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {provider.keyFeatures.slice(0, 3).map((f) => (
              <span
                key={f}
                className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs text-foreground"
              >
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Link */}
        <div className="mt-auto flex items-center justify-between border-t border-border pt-3">
          <NsLink
            href={`${NAMESPACE_PATH}/${provider.category}/${provider.id}`}
            className="text-sm font-semibold text-primary hover:underline"
          >
            View details
          </NsLink>
          <a
            href={provider.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary"
            aria-label={`Visit ${provider.name} website`}
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            Website
          </a>
        </div>
      </div>
    </article>
  );
}
