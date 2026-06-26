import type { WelshHolidayContent } from "@lib/calendar/welsh-content";

export function WelshHolidaySection({ content }: { content: WelshHolidayContent }) {
  return (
    <section
      aria-labelledby="welsh-heading"
      className="mt-10 rounded-xl border border-border bg-[#f5f5f0] p-5"
      lang="cy"
    >
      <h2 id="welsh-heading" className="text-lg font-bold text-foreground">
        {content.name}
      </h2>
      <p className="mt-1 text-xs text-muted-foreground" lang="en">
        Welsh (Cymraeg)
      </p>
      <p className="mt-3 text-base leading-relaxed text-foreground">{content.description}</p>
      {content.didYouKnow ? (
        <p className="mt-3 text-sm italic text-muted-foreground">{content.didYouKnow}</p>
      ) : null}
    </section>
  );
}
