import { NsLink } from "@components/ns-link";
import { NAMESPACE_PATH } from "@lib/config";
import { ArrowRight } from "lucide-react";
import type { CategoryMeta } from "@lib/holidays/types";

export function HolidayCategoryCard({ category }: { category: CategoryMeta }) {
  return (
    <NsLink
      href={`${NAMESPACE_PATH}/${category.slug}`}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-muted-foreground">
          {category.count} {category.count === 1 ? "listing" : "listings"}
        </span>
        <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-balance text-base font-bold text-foreground group-hover:text-primary sm:text-lg">
          {category.label}
        </h3>
        <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {category.description}
        </p>
      </div>
    </NsLink>
  );
}
