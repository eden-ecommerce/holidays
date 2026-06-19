"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const ALGOLIA_APP_ID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "";
const ALGOLIA_SEARCH_KEY = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY ?? "";
const PRODUCTS_INDEX = "products";
const STORE_FILTER = "stores:eden";

type ProductHit = {
  objectID: string;
  product_name: string;
  price: number;
  saving_percent: number;
  image: string;
  imageFallback: string;
  url: string;
  authorAlgolia: string;
  topcategory_name: string;
};

type AlgoliaResponse = {
  results: Array<{ hits: ProductHit[] }>;
};

async function searchProducts(query: string): Promise<ProductHit[]> {
  if (!ALGOLIA_APP_ID || !ALGOLIA_SEARCH_KEY || !query.trim()) return [];

  const body = {
    requests: [
      {
        indexName: PRODUCTS_INDEX,
        query: query.trim(),
        params: `filters=${encodeURIComponent(STORE_FILTER)}&hitsPerPage=6&attributesToRetrieve=objectID,product_name,price,saving_percent,image,imageFallback,url,authorAlgolia,topcategory_name`,
      },
    ],
  };

  const res = await fetch(
    `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/*/queries`,
    {
      method: "POST",
      headers: {
        "X-Algolia-Application-Id": ALGOLIA_APP_ID,
        "X-Algolia-API-Key": ALGOLIA_SEARCH_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );

  if (!res.ok) return [];
  const data = (await res.json()) as AlgoliaResponse;
  return data.results[0]?.hits ?? [];
}

function formatPrice(price: number): string {
  return `£${price.toFixed(2)}`;
}

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<ProductHit[]>([]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const runSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setHits([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    const results = await searchProducts(q);
    setHits(results);
    setOpen(results.length > 0);
    setActiveIndex(-1);
    setLoading(false);
  }, []);

  // Debounce input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(val), 200);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      const hit = hits[activeIndex];
      if (hit) window.location.href = hit.url;
    } else if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    if (query.trim()) {
      // Let the native form submit navigate to eden.co.uk/search
      return;
    }
    e.preventDefault();
  };

  return (
    <div ref={containerRef} className="relative mx-4 hidden flex-1 md:block">
      <form
        action="https://www.eden.co.uk/search"
        method="get"
        role="search"
        onSubmit={handleSubmit}
      >
        <div
          className={`flex w-full overflow-hidden border-2 border-primary bg-white transition-all ${
            open ? "rounded-t-full rounded-b-none border-b-transparent" : "rounded-full"
          }`}
        >
          <input
            ref={inputRef}
            type="search"
            name="q"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => hits.length > 0 && setOpen(true)}
            placeholder="Search Eden.co.uk"
            className="flex-1 bg-transparent px-5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            aria-label="Search Eden.co.uk"
            aria-autocomplete="list"
            aria-controls="header-search-listbox"
            aria-expanded={open}
            autoComplete="off"
            role="combobox"
          />
          {loading && (
            <span className="flex items-center pr-2" aria-hidden="true">
              <svg className="h-4 w-4 animate-spin text-muted-foreground" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            </span>
          )}
          <button
            type="submit"
            className="shrink-0 bg-primary px-4 text-primary-foreground hover:bg-primary/90"
            aria-label="Search"
          >
            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </form>

      {/* Dropdown */}
      {open && hits.length > 0 && (
        <ul
          id="header-search-listbox"
          role="listbox"
          aria-label="Search suggestions"
          className="absolute left-0 right-0 z-50 overflow-hidden rounded-b-2xl border-2 border-t-0 border-primary bg-white shadow-xl"
        >
          {hits.map((hit, i) => {
            const isActive = i === activeIndex;
            const salePrice = hit.saving_percent > 0
              ? hit.price * (1 - hit.saving_percent / 100)
              : null;

            return (
              <li key={hit.objectID} role="option" aria-selected={isActive}>
                <a
                  href={hit.url}
                  className={`flex items-center gap-3 px-4 py-2.5 transition-colors ${
                    isActive ? "bg-primary/10" : "hover:bg-muted"
                  }`}
                  onMouseEnter={() => setActiveIndex(i)}
                >
                  {/* Product image */}
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-gray-50">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={hit.image || hit.imageFallback}
                      alt=""
                      className="h-full w-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (hit.imageFallback && img.src !== hit.imageFallback) {
                          img.src = hit.imageFallback;
                        }
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {hit.product_name}
                    </p>
                    {hit.authorAlgolia && (
                      <p className="truncate text-xs text-muted-foreground">
                        {hit.authorAlgolia}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="shrink-0 text-right">
                    {salePrice ? (
                      <>
                        <p className="text-sm font-semibold text-primary">
                          {formatPrice(salePrice)}
                        </p>
                        <p className="text-xs text-muted-foreground line-through">
                          {formatPrice(hit.price)}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm font-semibold text-foreground">
                        {formatPrice(hit.price)}
                      </p>
                    )}
                  </div>
                </a>
              </li>
            );
          })}

          {/* View all results footer */}
          <li role="option" aria-selected={false}>
            <a
              href={`https://www.eden.co.uk/search?q=${encodeURIComponent(query)}`}
              className="flex items-center justify-center gap-2 border-t border-border bg-muted/50 px-4 py-2.5 text-sm font-medium text-primary hover:bg-muted"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              See all results for &ldquo;{query}&rdquo;
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}
