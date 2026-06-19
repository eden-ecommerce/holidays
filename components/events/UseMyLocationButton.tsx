"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LocateFixed, Loader2 } from "lucide-react";
import { NAMESPACE_PATH } from "@lib/config";
import { LONDON_COORDINATES, LONDON_LABEL } from "@lib/location/constants";

/**
 * "Use my location" button.
 * Priority: browser geolocation → London fallback.
 * The server has already read CF headers and pre-seeded cfLat/cfLng.
 */
export function UseMyLocationButton({
  cfLat,
  cfLng,
  cfLabel,
}: {
  cfLat?: number | null;
  cfLng?: number | null;
  cfLabel?: string | null;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function navigateWithGeo(lat: number, lng: number, label: string) {
    const params = new URLSearchParams({
      lat: String(lat),
      lng: String(lng),
      place: label,
    });
    router.push(`${NAMESPACE_PATH}/search?${params.toString()}`);
  }

  function handleClick() {
    if (!navigator?.geolocation) {
      // No geolocation support — use CF header or London
      const lat = cfLat ?? LONDON_COORDINATES.latitude;
      const lng = cfLng ?? LONDON_COORDINATES.longitude;
      const label = cfLabel ?? LONDON_LABEL;
      navigateWithGeo(lat, lng, label);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoading(false);
        navigateWithGeo(
          pos.coords.latitude,
          pos.coords.longitude,
          "your location",
        );
      },
      () => {
        setLoading(false);
        // Denied/failed — fall back to CF headers or London
        const lat = cfLat ?? LONDON_COORDINATES.latitude;
        const lng = cfLng ?? LONDON_COORDINATES.longitude;
        const label = cfLabel ?? LONDON_LABEL;
        navigateWithGeo(lat, lng, label);
      },
      { timeout: 8000, maximumAge: 60000 },
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        <LocateFixed className="h-4 w-4" aria-hidden="true" />
      )}
      {loading ? "Locating…" : "Use my location"}
    </button>
  );
}
