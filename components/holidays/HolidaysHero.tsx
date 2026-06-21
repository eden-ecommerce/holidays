import { NsLink } from "@components/ns-link";
import { NAMESPACE_PATH } from "@lib/config";
import { Search, ArrowRight } from "lucide-react";

// basePath is "/christian-holidays" — public assets must include it manually
// when used in raw <img> or CSS url() since only next/image with a static
// import gets it prepended automatically.
const BASE = "/christian-holidays";

export function HolidaysHero() {
  return (
    <section className="relative min-h-[420px] overflow-hidden border-b border-border sm:min-h-[520px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${BASE}/holidays-hero.png`}
        alt="Peaceful English countryside with a historic church"
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0d2218]/65" aria-hidden="true" />

      {/* Content */}
      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:py-28">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          The UK&apos;s Christian Holiday Directory
        </span>

        <h1 className="mt-5 text-balance text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Find your perfect<br className="hidden sm:block" /> faith-filled holiday
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-white/85 sm:text-lg">
          Retreats, pilgrimages, tour operators, youth camps and festivals — all
          curated for UK Christians seeking to rest, grow and connect.
        </p>

        <div className="mx-auto mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <NsLink
            href={`${NAMESPACE_PATH}/retreats`}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#1a3d2b] shadow-sm transition-opacity hover:opacity-90"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Find a Retreat
          </NsLink>
          <NsLink
            href={`${NAMESPACE_PATH}/pilgrimages`}
            className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Explore Pilgrimages
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </NsLink>
        </div>

        <p className="mt-6 text-sm text-white/60">
          80+ vetted providers &middot; Retreats, tours &amp; pilgrimages &middot; UK &amp; worldwide
        </p>
      </div>
    </section>
  );
}
