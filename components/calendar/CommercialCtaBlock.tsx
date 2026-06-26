import { NsLink } from "@components/ns-link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  description: string;
  ctaLabel: string;
  ctaUrl: string;
};

export function CommercialCtaBlock({ title, description, ctaLabel, ctaUrl }: Props) {
  return (
    <aside className="my-10 rounded-2xl border border-primary/20 bg-secondary/60 px-6 py-8 sm:px-10">
      <h2 className="text-balance text-xl font-bold text-foreground sm:text-2xl">{title}</h2>
      <p className="mt-2 max-w-2xl text-base text-muted-foreground">{description}</p>
      <NsLink
        href={ctaUrl}
        className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-primary hover:underline"
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </NsLink>
    </aside>
  );
}
