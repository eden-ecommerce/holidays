import type { Metadata } from "next";
import { NsLink } from "@components/ns-link";
import { CalendarPrintActions } from "@components/calendar/CalendarPrintActions";
import { CALENDAR_HOLIDAYS } from "@lib/calendar/holidays";
import { formatDisplayDate, getCurrentYear } from "@lib/calendar/dates";
import { NAMESPACE_PATH } from "@lib/config";

export const metadata: Metadata = {
  title: "Printable Christian Holidays Calendar",
  robots: { index: false, follow: true },
};

export default function CalendarPrintPage() {
  const year = getCurrentYear();

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 print:px-0 print:py-0">
      <div className="mb-8 print:hidden">
        <NsLink href={`${NAMESPACE_PATH}/calendar`} className="text-sm text-primary hover:underline">
          ← Back to calendar
        </NsLink>
        <CalendarPrintActions />
      </div>

      <h1 className="text-2xl font-bold">Christian Holidays Calendar {year}</h1>
      <p className="mt-2 text-sm text-muted-foreground print:text-black">
        School-year reference — Eden.co.uk/christian-holidays/calendar
      </p>

      <table className="mt-8 w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="py-2 pr-4 font-semibold">Holiday</th>
            <th className="py-2 font-semibold">Date ({year})</th>
          </tr>
        </thead>
        <tbody>
          {CALENDAR_HOLIDAYS.map((h) => (
            <tr key={h.id} className="border-b border-border/60">
              <td className="py-2 pr-4 align-top">{h.name.split("/")[0].trim()}</td>
              <td className="py-2 align-top text-muted-foreground print:text-black">
                {formatDisplayDate(h, year)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
