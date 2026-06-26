import type { CalendarHoliday } from "@lib/calendar/types";

export type WelshHolidayContent = {
  name: string;
  description: string;
  didYouKnow?: string;
};

/** Welsh-language content for Wales-focused feasts (Phase 2). */
export const WELSH_HOLIDAY_CONTENT: Record<string, WelshHolidayContent> = {
  "st-david-of-wales": {
    name: "Dydd Gŵyl Dewi Sant",
    description:
      "Mae Dydd Gŵyl Dewi Sant ar 1 Mawrth — diwrnod cenedlaethol Cymru a gwyl y nawddsant Dewi Sant. Mae pobl yn gwisgo cenhinen Bedr neu gennin Pedr, yn mynd i gorymdaith, ac yn dathlu mewn gwasanaethau Cymraeg. Dywedir mai geiriau olaf Dewi oedd: \"Gwnewch y pethau bychain\" — \"Do the little things.\"",
    didYouKnow:
      "Dewi Sant yw nawddsant Cymru yn unig — nid yw'n gwyl bublic swyddogol yn Lloegr, ond mae'n arbennig o bwysig yng Nghymru.",
  },
};

export function getWelshContent(holidayId: string): WelshHolidayContent | undefined {
  return WELSH_HOLIDAY_CONTENT[holidayId];
}
