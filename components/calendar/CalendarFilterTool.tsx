"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { HolidayCard } from "@components/calendar/HolidayCard";
import { CalendarFilterDrawer } from "@components/calendar/CalendarFilterDrawer";
import {
  DATE_TYPE_LABELS,
  DENOMINATION_LABELS,
  REGION_LABELS,
  SEASON_LABELS,
  THEME_LABELS,
  labelFor,
} from "@lib/calendar/filter-labels";
import {
  filterHolidays,
  parseFilterParam,
  serializeFilterParam,
  type CalendarFilters,
} from "@lib/calendar/filter-holidays";
import { getCurrentYear } from "@lib/calendar/dates";
import type { CalendarHoliday } from "@lib/calendar/types";
import { NAMESPACE_PATH } from "@lib/config";
import { Filter, X } from "lucide-react";

type Props = {
  holidays: CalendarHoliday[];
};

const FILTER_OPTIONS = {
  denom: Object.keys(DENOMINATION_LABELS),
  season: Object.keys(SEASON_LABELS),
  region: Object.keys(REGION_LABELS),
  theme: Object.keys(THEME_LABELS),
  type: ["fixed", "moveable", "semi-fixed"] as const,
};

function readFilters(params: URLSearchParams): CalendarFilters {
  return {
    denom: parseFilterParam(params.get("denom")),
    season: parseFilterParam(params.get("season")),
    type: parseFilterParam(params.get("type")),
    region: parseFilterParam(params.get("region")),
    theme: parseFilterParam(params.get("theme")),
    q: params.get("q") ?? undefined,
  };
}

export function CalendarFilterTool({ holidays }: Props) {
  const router = useRouter();
  const params = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(params.get("q") ?? "");
  const year = getCurrentYear();

  const filters = useMemo(() => readFilters(params), [params]);

  const filtered = useMemo(
    () => filterHolidays(holidays, filters),
    [holidays, filters],
  );

  const applyParams = useCallback(
    (changes: Record<string, string | null>) => {
      const next = new URLSearchParams(params.toString());
      for (const [key, value] of Object.entries(changes)) {
        if (value === null || value === "") next.delete(key);
        else next.set(key, value);
      }
      router.replace(`${NAMESPACE_PATH}/calendar?${next.toString()}`, { scroll: false });
    },
    [params, router],
  );

  const toggleMulti = useCallback(
    (key: "denom" | "season" | "region" | "theme", value: string) => {
      const current = filters[key] ?? [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      applyParams({ [key]: serializeFilterParam(next) });
    },
    [applyParams, filters],
  );

  const debouncedSearch = useDebouncedCallback((value: string) => {
    applyParams({ q: value || null });
  }, 200);

  const clearAll = () => {
    setSearchInput("");
    router.replace(`${NAMESPACE_PATH}/calendar`, { scroll: false });
  };

  const hasActiveFilters =
    Boolean(filters.denom?.length) ||
    Boolean(filters.season?.length) ||
    Boolean(filters.type?.length) ||
    Boolean(filters.region?.length) ||
    Boolean(filters.theme?.length) ||
    Boolean(filters.q);

  const filterPanel = (
    <div className="space-y-4">
      <div>
        <label htmlFor="calendar-search" className="sr-only">
          Search holidays
        </label>
        <input
          id="calendar-search"
          type="search"
          placeholder="Search holidays…"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            debouncedSearch(e.target.value);
          }}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-base"
        />
      </div>

      <FilterGroup
        label="Season"
        options={FILTER_OPTIONS.season}
        selected={filters.season ?? []}
        labelMap={SEASON_LABELS}
        onToggle={(v) => toggleMulti("season", v)}
        pills
      />

      <FilterGroup
        label="Denomination"
        options={FILTER_OPTIONS.denom}
        selected={filters.denom ?? []}
        labelMap={DENOMINATION_LABELS}
        onToggle={(v) => toggleMulti("denom", v)}
      />

      <FilterGroup
        label="Region"
        options={FILTER_OPTIONS.region}
        selected={filters.region ?? []}
        labelMap={REGION_LABELS}
        onToggle={(v) => toggleMulti("region", v)}
      />

      <FilterGroup
        label="Theme"
        options={FILTER_OPTIONS.theme}
        selected={filters.theme ?? []}
        labelMap={THEME_LABELS}
        onToggle={(v) => toggleMulti("theme", v)}
      />

      <fieldset>
        <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Date type
        </legend>
        <div className="flex flex-wrap gap-2">
          {FILTER_OPTIONS.type.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() =>
                applyParams({
                  type: filters.type?.includes(t) ? null : t,
                })
              }
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                filters.type?.includes(t)
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              aria-pressed={filters.type?.includes(t) ?? false}
            >
              {labelFor(DATE_TYPE_LABELS, t)}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );

  return (
    <section aria-labelledby="calendar-filter-heading">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 id="calendar-filter-heading" className="text-2xl font-bold text-foreground">
            Christian holidays calendar
          </h2>
          <p className="mt-1 text-base text-muted-foreground" aria-live="polite">
            Showing {filtered.length} of {holidays.length} holidays
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium md:hidden"
          onClick={() => setDrawerOpen(true)}
          aria-expanded={drawerOpen}
        >
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filter
        </button>
      </div>

      <div className="hidden rounded-xl border border-border bg-card p-4 md:block">
        {filterPanel}
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearAll}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Clear all filters
          </button>
        ) : null}
      </div>

      <CalendarFilterDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {filterPanel}
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={() => {
              clearAll();
              setDrawerOpen(false);
            }}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Clear all filters
          </button>
        ) : null}
      </CalendarFilterDrawer>

      <div className="mt-6 min-h-[400px]">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((h) => (
            <HolidayCard key={h.id} holiday={h} year={year} />
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            No holidays match your filters.{" "}
            <button type="button" onClick={clearAll} className="text-primary hover:underline">
              Clear filters
            </button>
          </p>
        ) : null}
      </div>
    </section>
  );
}

function FilterGroup({
  label,
  options,
  selected,
  labelMap,
  onToggle,
  pills = false,
}: {
  label: string;
  options: readonly string[];
  selected: string[];
  labelMap: Record<string, string>;
  onToggle: (value: string) => void;
  pills?: boolean;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </legend>
      <div className={`flex flex-wrap gap-2 ${pills ? "" : "max-h-32 overflow-y-auto"}`}>
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onToggle(opt)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              aria-pressed={active}
            >
              {labelFor(labelMap, opt)}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
