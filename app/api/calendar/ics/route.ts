import { NextResponse } from "next/server";
import { buildCalendarIcs, buildHolidayIcsEvent } from "@lib/calendar/ics";
import { CALENDAR_HOLIDAYS, getHolidayById } from "@lib/calendar/holidays";
import { getCurrentYear } from "@lib/calendar/dates";

const BASE_URL = "https://www.eden.co.uk/christian-holidays";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const year = Number(searchParams.get("year")) || getCurrentYear();

  if (slug) {
    const holiday = getHolidayById(slug);
    if (!holiday) {
      return NextResponse.json({ error: "Holiday not found" }, { status: 404 });
    }
    const event = buildHolidayIcsEvent(holiday, year, BASE_URL);
    if (!event) {
      return NextResponse.json({ error: "Could not resolve holiday date" }, { status: 400 });
    }
    const body = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Eden.co.uk//Christian Holidays Calendar//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      event,
      "END:VCALENDAR",
    ].join("\r\n");

    return new NextResponse(body, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="${slug}.ics"`,
      },
    });
  }

  const body = buildCalendarIcs(CALENDAR_HOLIDAYS, { year, baseUrl: BASE_URL });

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="christian-holidays-calendar.ics"',
    },
  });
}
