import assert from "node:assert/strict";
import { test } from "node:test";
import {
  formatDisplayDate,
  getOrthodoxPascha,
  getWesternEaster,
  resolveMoveableDate,
  toISODate,
} from "@lib/calendar/dates";
import type { CalendarHoliday } from "@lib/calendar/types";

test("Western Easter dates 2025–2027", () => {
  assert.equal(toISODate(getWesternEaster(2025)), "2025-04-20");
  assert.equal(toISODate(getWesternEaster(2026)), "2026-04-05");
  assert.equal(toISODate(getWesternEaster(2027)), "2027-03-28");
});

test("Orthodox Pascha dates 2025–2027", () => {
  assert.equal(toISODate(getOrthodoxPascha(2025)), "2025-04-20");
  assert.equal(toISODate(getOrthodoxPascha(2026)), "2026-04-12");
  assert.equal(toISODate(getOrthodoxPascha(2027)), "2027-05-02");
});

test("Ash Wednesday is 46 days before Easter", () => {
  const ash = resolveMoveableDate("ash-wednesday", 2026);
  assert.equal(toISODate(ash), "2026-02-18");
});

test("Pentecost is 49 days after Easter", () => {
  const pent = resolveMoveableDate("pentecost", 2026);
  assert.equal(toISODate(pent), "2026-05-24");
});

test("formatDisplayDate for fixed feast", () => {
  const christmas: Pick<CalendarHoliday, "dateType" | "dateFixed" | "dateRule"> = {
    dateType: "fixed",
    dateFixed: "12-25",
  };
  assert.equal(
    formatDisplayDate(christmas as CalendarHoliday, 2026),
    "December 25 (fixed)",
  );
});
