import Link from "next/link";
import type { ComponentProps } from "react";
import { CalendarPlus } from "lucide-react";

type Props = {
  href: ComponentProps<typeof Link>["href"];
  label?: string;
  className?: string;
};

export function CalendarExportButton({
  href,
  label = "Add to Google Calendar (.ics)",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary ${className}`}
    >
      <CalendarPlus className="h-4 w-4" aria-hidden="true" />
      {label}
    </Link>
  );
}
