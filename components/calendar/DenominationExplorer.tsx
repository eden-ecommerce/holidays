"use client";

import { useRouter } from "next/navigation";
import { getDenominationTiles, TRADITION_COLOURS } from "@lib/calendar/denominations";
import { NAMESPACE_PATH } from "@lib/config";
import { ArrowRight } from "lucide-react";

export function DenominationExplorer() {
  const router = useRouter();
  const tiles = getDenominationTiles();

  const explore = (denomId: string) => {
    router.push(`${NAMESPACE_PATH}/calendar?denom=${denomId}`, { scroll: false });
    const el = document.getElementById("calendar-filter-heading");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section aria-labelledby="denom-heading" className="mt-16">
      <h2 id="denom-heading" className="text-2xl font-bold text-foreground">
        Explore by denomination
      </h2>
      <p className="mt-1 text-base text-muted-foreground">
        See how different Christian traditions mark the church year.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            onClick={() => explore(tile.id)}
            className="group flex flex-col rounded-xl border border-border bg-card p-5 text-left transition-shadow hover:border-primary hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            style={{ borderTopWidth: 4, borderTopColor: TRADITION_COLOURS[tile.tradition] }}
          >
            <span className="text-lg font-bold text-foreground">{tile.label}</span>
            <span className="mt-1 text-sm text-muted-foreground">
              {tile.count} {tile.count === 1 ? "holiday" : "holidays"}
            </span>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {tile.description}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:underline">
              Explore
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
