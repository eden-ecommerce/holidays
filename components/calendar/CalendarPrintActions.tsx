"use client";

export function CalendarPrintActions() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
    >
      Print / Save as PDF
    </button>
  );
}
