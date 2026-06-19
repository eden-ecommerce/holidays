"use client";

import { AdvancedFilters, type Facet } from "@components/events/AdvancedFilters";
import { CategoriesHierarchicalFilter } from "@components/events/CategoriesHierarchicalFilter";
import type { EventFacet } from "@lib/algolia/events";

type EventSearchFiltersProps = {
  categories: EventFacet[];
  categoryLvl1: EventFacet[];
  categoryLvl2: EventFacet[];
  organisationTypes: Facet[];
  hasGeo: boolean;
};

export function EventSearchFilters({
  categories,
  categoryLvl1,
  categoryLvl2,
  organisationTypes,
  hasGeo,
}: EventSearchFiltersProps) {
  return (
    <aside
      className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5"
      aria-label="Filters"
    >
      <CategoriesHierarchicalFilter
        lvl0={categories}
        lvl1={categoryLvl1}
        lvl2={categoryLvl2}
      />
      <AdvancedFilters organisationTypes={organisationTypes} hasGeo={hasGeo} />
    </aside>
  );
}
