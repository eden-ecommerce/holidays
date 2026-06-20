import { Globe, MapPin } from "lucide-react";
import type { Destination } from "@lib/holidays/types";

export function DestinationCard({ destination }: { destination: Destination }) {
  const content = (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1.5">
        {destination.type === "international" ? (
          <Globe className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
        ) : (
          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
        )}
        <span className="text-xs font-medium text-muted-foreground">
          {destination.type === "domestic" ? destination.region ?? destination.country : destination.country}
        </span>
      </div>
      <h3 className="text-balance text-sm font-bold text-foreground group-hover:text-primary">
        {destination.name}
      </h3>
      <p className="text-pretty text-xs leading-relaxed text-muted-foreground line-clamp-2">
        {destination.description}
      </p>
      {destination.highlights.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1">
          {destination.highlights.slice(0, 3).map((h) => (
            <span key={h} className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
              {h}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  if (destination.website) {
    return (
      <a
        href={destination.website}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-sm"
        aria-label={`Learn more about ${destination.name}`}
      >
        {content}
      </a>
    );
  }

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card p-4">
      {content}
    </div>
  );
}
