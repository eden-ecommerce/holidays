import { ArrowRight, Building2 } from "lucide-react";

export function ListWithUsBanner() {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 px-6 py-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Building2
            className="mt-0.5 h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-semibold text-foreground">
              List your holiday or accommodation — it&apos;s free
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Reach thousands of UK Christians planning their next faith-filled break. Add your retreat, tour or camp to the Eden directory.
            </p>
          </div>
        </div>
        <a
          href="https://hub.eden.co.uk/dashboard/event-journey"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Get listed
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
