import type { CalendarHoliday } from "@lib/calendar/types";
import { formatDisplayDate } from "@lib/calendar/dates";
import {
  DENOMINATION_LABELS,
  SEASON_LABELS,
  labelFor,
} from "@lib/calendar/filter-labels";

const JARGON: [RegExp, string][] = [
  [/\bliturgical\b/gi, "church calendar"],
  [/\bsolemnity\b/gi, "major feast"],
  [/\becumenical\b/gi, "across different churches"],
  [/\btheotokos\b/gi, "Mother of God (Theotokos)"],
  [/\bpenitential\b/gi, "focused on saying sorry and preparing"],
  [/\bcommemoration\b/gi, "remembrance"],
  [/\bobligatory\b/gi, "required"],
  [/\bvespers\b/gi, "evening prayer"],
  [/\bmatins\b/gi, "morning prayer"],
  [/\bPascha\b/g, "Pascha (Orthodox Easter)"],
];

export type HolidayFaq = {
  question: string;
  answer: string;
};

function simplify(text: string): string {
  let out = text;
  for (const [pattern, replacement] of JARGON) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

function firstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  return match ? match[0].trim() : text.slice(0, 120).trim();
}

/** Build a teen-friendly description from catalogue prose when no Phase 1 override exists. */
export function buildTeenDescription(holiday: CalendarHoliday, year: number): string {
  if (holiday.descriptionTeen?.length > 80) {
    return holiday.descriptionTeen;
  }

  const src = holiday.sourceDescription ?? "";
  const name = holiday.name.split("/")[0].trim();
  const when = formatDisplayDate(holiday, year);
  const hook = src
    ? simplify(firstSentence(src))
    : `${name} is an important date on the Christian calendar.`;

  const what =
    src.length > hook.length
      ? simplify(src.slice(hook.length).trim().split(/(?<=[.!?])\s+/).slice(0, 2).join(" "))
      : `${name} is observed by Christians around the world.`;

  const denoms = holiday.denominations
    .slice(0, 4)
    .map((d) => labelFor(DENOMINATION_LABELS, d))
    .join(", ");

  const celebrate = `It usually falls on or around ${when}. ${denoms ? `It is especially important in ${denoms} traditions.` : ""}`.trim();

  const eden = holiday.edenCtaLabel
    ? holiday.edenCtaLabel.replace(/→$/, "").trim() + " — browse options on Eden."
    : "Explore faith-based travel and retreats on Eden.";

  return [hook, what, celebrate, eden].filter(Boolean).join(" ");
}

export function buildHolidayFaqs(holiday: CalendarHoliday, year: number): HolidayFaq[] {
  const name = holiday.name.split("/")[0].trim();
  const when = formatDisplayDate(holiday, year);
  const denoms = holiday.denominations
    .map((d) => labelFor(DENOMINATION_LABELS, d))
    .join(", ");
  const seasons = holiday.seasons.map((s) => labelFor(SEASON_LABELS, s)).join(", ");

  const faqs: HolidayFaq[] = [
    {
      question: `When is ${name}?`,
      answer: `${name} is observed on ${when}. Moveable feasts shift each year; fixed feasts stay on the same calendar date.`,
    },
    {
      question: `What is ${name}?`,
      answer: simplify(
        holiday.sourceDescription?.slice(0, 400) ??
          `${name} is a significant observance in the Christian year.`,
      ),
    },
    {
      question: `Who celebrates ${name}?`,
      answer: `It is associated with ${denoms || "many Christian traditions"}. It falls in the ${seasons || "church"} season of the liturgical year.`,
    },
  ];

  if (holiday.isPublicHoliday) {
    faqs.push({
      question: `Is ${name} a public holiday?`,
      answer: `Yes — ${name} is a public holiday in at least one country${holiday.publicHolidayCountries?.length ? ` (including ${holiday.publicHolidayCountries.join(", ")})` : ""}. In the UK, check whether your nation marks it as a bank holiday.`,
    });
  }

  return faqs;
}

export function getDisplayDescription(holiday: CalendarHoliday, year: number): string {
  return buildTeenDescription(holiday, year);
}
