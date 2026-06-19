"use client";

import { AdvancedFilters, type Facet } from "@components/events/AdvancedFilters";
import { CategoriesHierarchicalFilter } from "@components/events/CategoriesHierarchicalFilter";

type EventSearchFiltersProps = {
  organisationTypes: Facet[];
  hasGeo: boolean;
};

export function EventSearchFilters({
  organisationTypes,
  hasGeo,
}: EventSearchFiltersProps) {
  return (
    <aside className="flex flex-col gap-5" aria-label="Advanced filters">
      <CategoriesHierarchicalFilter />
      <AdvancedFilters organisationTypes={organisationTypes} hasGeo={hasGeo} />
    </aside>
  );
}
