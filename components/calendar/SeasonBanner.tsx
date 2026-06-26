import { NsLink } from "@components/ns-link";
import type { SeasonContext } from "@lib/calendar/season-context";
import { formatSeasonBannerText } from "@lib/calendar/season-context";
import { Calendar, Flame, Cross, Star, Sparkles } from "lucide-react";

const SEASON_ICONS: Record<string, React.ReactNode> = {
  advent: <Calendar className="h-5 w-5 shrink-0" aria-hidden="true" />,
  christmas: <Star className="h-5 w-5 shrink-0" aria-hidden="true" />,
  epiphany: <Sparkles className="h-5 w-5 shrink-0" aria-hidden="true" />,
  lent: <Cross className="h-5 w-5 shrink-0" aria-hidden="true" />,
  "holy-week": <Cross className="h-5 w-5 shrink-0" aria-hidden="true" />,
  easter: <Star className="h-5 w-5 shrink-0" aria-hidden="true" />,
  pentecost: <Flame className="h-5 w-5 shrink-0" aria-hidden="true" />,
};

export function SeasonBanner({ context }: { context: SeasonContext }) {
  const text = formatSeasonBannerText(context);
  const icon = SEASON_ICONS[context.currentSeason.id] ?? (
    <Calendar className="h-5 w-5 shrink-0" aria-hidden="true" />
  );

  return (
    <div className="sticky top-0 z-20 hidden border-b border-[#4aad24] bg-[#5bbf2a] text-white md:block">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <p className="flex items-center gap-2 text-base">
          {icon}
          <span>
            <span className="font-bold">{context.currentSeason.label}</span>
            {" — "}
            {text.replace(`${context.currentSeason.label} — `, "").replace(/^It's /, "")}
          </span>
        </p>
        <NsLink
          href={context.ctaUrl}
          className="shrink-0 text-sm font-semibold text-white underline-offset-2 hover:underline"
        >
          {context.ctaLabel}
        </NsLink>
      </div>
    </div>
  );
}

/** Mobile version — not sticky per spec */
export function SeasonBannerMobile({ context }: { context: SeasonContext }) {
  const text = formatSeasonBannerText(context);

  return (
    <div className="border-b border-[#4aad24] bg-[#5bbf2a] text-white md:hidden">
      <div className="mx-auto max-w-6xl px-4 py-3">
        <p className="text-sm font-medium">{text}</p>
        <NsLink
          href={context.ctaUrl}
          className="mt-1 inline-block text-sm font-semibold underline-offset-2 hover:underline"
        >
          {context.ctaLabel}
        </NsLink>
      </div>
    </div>
  );
}
