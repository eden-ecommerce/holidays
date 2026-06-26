import { NsLink } from "@components/ns-link";
import { NAMESPACE_PATH } from "@lib/config";
import { getHolidayCount } from "@lib/calendar/holidays";
import { ChevronRight } from "lucide-react";

export function CalendarBreadcrumb() {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-white/70">
      <ol className="flex flex-wrap items-center gap-1">
        <li>
          <a href="https://www.eden.co.uk" className="hover:text-white hover:underline">
            Home
          </a>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="inline h-3.5 w-3.5" />
        </li>
        <li>
          <NsLink href={NAMESPACE_PATH} className="hover:text-white hover:underline">
            Christian Holidays
          </NsLink>
        </li>
        <li aria-hidden="true">
          <ChevronRight className="inline h-3.5 w-3.5" />
        </li>
        <li className="text-white" aria-current="page">
          The Christian Calendar
        </li>
      </ol>
    </nav>
  );
}

export function CalendarHero() {
  const count = getHolidayCount();

  return (
    <section className="relative overflow-hidden border-b border-[#1a5c1a] bg-[#2d7a27] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, #5bbf2a 0%, transparent 50%), radial-gradient(circle at 80% 20%, #1a3d2b 0%, transparent 40%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <CalendarBreadcrumb />
        <span className="mt-4 inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white">
          {count}+ holidays across 15+ denominations
        </span>
        <h1 className="mt-4 text-balance text-[32px] font-bold leading-tight tracking-tight sm:text-[52px]">
          The Complete Christian Holidays Guide
        </h1>
        <p className="mt-4 max-w-[640px] text-base text-white/90 sm:text-xl">
          From Christmas and Easter to Timkat and Vardavar — every Christian holiday, explained
          for everyone
        </p>
      </div>
    </section>
  );
}
