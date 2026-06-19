"use client";

import { IntegrationEnvError } from "@components/common/IntegrationEnvError";
import { InstantSearch, Configure } from "react-instantsearch";
import { AlgoliaHierarchicalFilter } from "@components/search/filters/AlgoliaHierarchicalFilter";
import { getAlgoliaSearchClient } from "@lib/algolia/client";
import { algoliaIndexPresets } from "@lib/algolia/constants";
import { isAlgoliaEnvConfigured } from "@lib/env-configured";

export function CategoriesHierarchicalFilter() {
  if (!isAlgoliaEnvConfigured()) {
    return null;
  }

  const searchClient = getAlgoliaSearchClient();
  if (!searchClient) {
    return <IntegrationEnvError integration="algolia" />;
  }

  const indexPreset = algoliaIndexPresets.organisationHubEvents;

  if (!indexPreset.hierarchicalFacet) return null;

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indexPreset.indexName}
      future={{ preserveSharedStateOnUnmount: true }}
    >
      <Configure filters={indexPreset.baseFilter} hitsPerPage={0} />

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-5 text-lg font-bold text-foreground">
          Event Categories
        </h2>
        <AlgoliaHierarchicalFilter
          hierarchicalFacet={indexPreset.hierarchicalFacet}
          label=""
          showCount={true}
        />
      </div>
    </InstantSearch>
  );
}
