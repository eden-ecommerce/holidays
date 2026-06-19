"use client";

import { Heart } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "eden_favourite_events";

function readFavourites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function writeFavourites(ids: Set<string>): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

type Props = {
  eventId: string;
  /** "icon" = small icon only (card), "full" = icon + label (detail page) */
  variant?: "icon" | "full";
  className?: string;
};

export function FavouriteButton({ eventId, variant = "icon", className = "" }: Props) {
  const [isFav, setIsFav] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIsFav(readFavourites().has(eventId));
    setHydrated(true);
  }, [eventId]);

  const toggle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const favs = readFavourites();
      if (favs.has(eventId)) {
        favs.delete(eventId);
      } else {
        favs.add(eventId);
      }
      writeFavourites(favs);
      setIsFav(favs.has(eventId));
    },
    [eventId],
  );

  // Don't render until hydrated to avoid SSR mismatch
  if (!hydrated) return null;

  if (variant === "full") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={isFav ? "Remove from favourites" : "Save to favourites"}
        aria-pressed={isFav}
        className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
          isFav
            ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
            : "border border-border bg-card text-foreground hover:border-rose-300 hover:text-rose-500"
        } ${className}`}
      >
        <Heart
          className="h-4 w-4"
          fill={isFav ? "currentColor" : "none"}
          aria-hidden="true"
        />
        {isFav ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isFav ? "Remove from favourites" : "Save to favourites"}
      aria-pressed={isFav}
      className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
        isFav
          ? "bg-rose-500 text-white"
          : "bg-white/80 text-foreground backdrop-blur-sm hover:bg-white hover:text-rose-500"
      } ${className}`}
    >
      <Heart
        className="h-4 w-4"
        fill={isFav ? "currentColor" : "none"}
        aria-hidden="true"
      />
    </button>
  );
}
