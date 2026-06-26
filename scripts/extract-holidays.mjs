#!/usr/bin/env node
/**
 * One-off extractor: docs/christian_holidays.md → lib/calendar/holidays.generated.json
 * Run: node scripts/extract-holidays.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const MD_PATH = join(ROOT, "docs/christian_holidays.md");
const OUT_PATH = join(ROOT, "lib/calendar/holidays.generated.json");

const PHASE1_IDS = new Set([
  "advent",
  "christmas-day-nativity-of-jesus-christ",
  "orthodox-christmas-january-7",
  "epiphany",
  "ash-wednesday",
  "lent",
  "palm-sunday-passion-sunday",
  "good-friday",
  "easter-sunday-resurrection-of-our-lord",
  "ascension-day-ascension-of-our-lord",
  "pentecost-day-of-pentecost",
  "all-saints-day",
  "trinity-sunday",
  "corpus-christi-the-most-holy-body-and-blood-of-christ",
  "assumption-of-the-blessed-virgin-mary-dormition-of-the-theotokos",
  "immaculate-conception-of-the-blessed-virgin-mary",
  "pascha-orthodox-easter",
  "theophany-epiphany-orthodox",
  "transfiguration-of-the-lord",
  "transfiguration-vardavar",
  "reformation-day-reformation-sunday",
  "all-souls-day-commemoration-of-the-faithful-departed",
  "presentation-of-the-lord-candlemas",
  "annunciation-of-the-lord",
  "nativity-of-st-john-the-baptist",
  "sts-peter-and-paul",
  "timkat-ethiopian-epiphany",
  "meskel-finding-of-the-true-cross",
  "coptic-christmas-nativity-eid-al-milad",
  "our-lady-of-guadalupe",
  "our-lady-of-fatima",
  "st-patrick-bishop-of-ireland",
  "st-george-martyr",
  "simbang-gabi-philippines",
  "las-posadas-mexico-latin-america",
  "holy-saturday-great-and-holy-saturday",
  "maundy-thursday-holy-thursday",
  "christ-the-king-our-lord-jesus-christ-king-of-the-universe",
  "feast-of-st-francis-of-assisi",
]);

function slugify(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\*[^*]*\*/g, "")
    .replace(/\(see [^)]+\)/gi, "")
    .trim()
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function parseAlsoKnownAs(line) {
  const m = line.match(/^\*Also called:\s*(.+)\*$/i);
  if (!m) return [];
  return m[1]
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function normDenom(s) {
  const lower = s.toLowerCase();
  if (lower.includes("pan-christian") || lower.includes("pan christian")) return "pan-christian";
  if (lower.includes("catholic") && !lower.includes("mari")) return "catholic";
  if (lower.includes("eastern orthodox") || lower === "orthodox") return "eastern-orthodox";
  if (lower.includes("greek orthodox")) return "greek-orthodox";
  if (lower.includes("russian orthodox")) return "russian-orthodox";
  if (lower.includes("coptic")) return "coptic-orthodox";
  if (lower.includes("ethiopian")) return "ethiopian-orthodox";
  if (lower.includes("armenian")) return "armenian-apostolic";
  if (lower.includes("syriac")) return "syriac-orthodox";
  if (lower.includes("maronite")) return "maronite";
  if (lower.includes("anglican") || lower.includes("church of england")) return "anglican";
  if (lower.includes("episcopal")) return "episcopal";
  if (lower.includes("lutheran")) return "lutheran";
  if (lower.includes("methodist") || lower.includes("wesleyan")) return "methodist";
  if (lower.includes("presbyterian") || lower.includes("reformed")) return "presbyterian";
  if (lower.includes("baptist")) return "baptist";
  if (lower.includes("evangelical") || lower.includes("non-denominational")) return "evangelical";
  if (lower.includes("pentecostal") || lower.includes("charismatic")) return "pentecostal";
  if (lower.includes("adventist")) return "adventist";
  return null;
}

function parseDenominations(raw) {
  const parts = raw.split(/[,;]/).map((p) => p.trim());
  const out = new Set();
  for (const p of parts) {
    const d = normDenom(p);
    if (d) out.add(d);
    else if (p.toLowerCase().includes("most") || p.toLowerCase().includes("many"))
      out.add("pan-christian");
  }
  if (out.size === 0) out.add("pan-christian");
  return [...out];
}

function normSeason(s) {
  const lower = s.toLowerCase().trim();
  const map = {
    advent: "advent",
    christmas: "christmas",
    epiphany: "epiphany",
    "pre-lent": "pre-lent",
    lent: "lent",
    "holy week": "holy-week",
    triduum: "triduum",
    easter: "easter",
    ascension: "ascension",
    pentecost: "pentecost",
    "ordinary time": "ordinary-time",
    "nativity-fast": "nativity-fast",
    "apostles-fast": "apostles-fast",
    "dormition-fast": "dormition-fast",
    "year-round": "year-round",
  };
  for (const [k, v] of Object.entries(map)) {
    if (lower.includes(k)) return v;
  }
  return lower.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "year-round";
}

function parseSeasons(raw) {
  return [...new Set(raw.split(/[,;/]/).map((s) => normSeason(s.trim())).filter(Boolean))];
}

function normRegion(s) {
  const lower = s.toLowerCase();
  if (lower.includes("global")) return "global";
  if (lower.includes("western christianity") || lower.includes("western europe"))
    return lower.includes("europe") ? "western-europe" : "western-christianity";
  if (lower.includes("eastern christianity") || lower.includes("eastern europe"))
    return lower.includes("europe") ? "eastern-europe" : "eastern-christianity";
  if (lower.includes("scandinavia")) return "scandinavia";
  if (lower.includes("north america") || lower.includes("usa") || lower.includes("canada"))
    return "north-america";
  if (lower.includes("latin america")) return "latin-america";
  if (lower.includes("africa") && !lower.includes("north")) return "africa";
  if (lower.includes("egypt")) return "egypt";
  if (lower.includes("ethiopia")) return "ethiopia";
  if (lower.includes("armenia")) return "armenia";
  if (lower.includes("middle east") || lower.includes("israel") || lower.includes("palestine"))
    return "middle-east";
  if (lower.includes("philippines") || lower.includes("filipino")) return "philippines";
  if (lower.includes("india")) return "india";
  if (lower.includes("greece") || lower.includes("greek")) return "greece";
  if (lower.includes("russia") || lower.includes("slavic") || lower.includes("ukrainian"))
    return "russia-slavic";
  if (lower.includes("europe")) return "europe";
  if (lower.includes("asia")) return "asia";
  return "global";
}

function parseRegions(raw) {
  return [...new Set(raw.split(/[,;]/).map((r) => normRegion(r.trim())).filter(Boolean))];
}

function normTheme(s) {
  const lower = s.toLowerCase().trim();
  const map = {
    incarnation: "incarnation",
    "birth of christ": "incarnation",
    "life of christ": "life-of-christ",
    "passion-death": "passion-death",
    passion: "passion-death",
    resurrection: "resurrection",
    ascension: "ascension",
    "holy spirit": "holy-spirit",
    trinity: "trinity",
    marian: "marian",
    apostles: "apostles",
    "martyrs-saints": "martyrs-saints",
    saints: "martyrs-saints",
    angels: "angels",
    "holy-cross": "holy-cross",
    penitence: "penitence",
    mission: "mission",
    "church-history": "church-history",
    creation: "creation",
    covenant: "covenant",
    eschatology: "eschatology",
    joy: "incarnation",
    revelation: "life-of-christ",
  };
  for (const [k, v] of Object.entries(map)) {
    if (lower.includes(k)) return v;
  }
  return lower.replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || "life-of-christ";
}

function parseThemes(raw) {
  return [...new Set(raw.split(/[,;]/).map((t) => normTheme(t.trim())).filter(Boolean))];
}

function normDateType(raw) {
  const lower = raw.toLowerCase();
  if (lower.includes("semi")) return "semi-fixed";
  if (lower.includes("moveable") || lower.includes("movable")) return "moveable";
  return "fixed";
}

function normType(raw) {
  const lower = raw.toLowerCase();
  if (lower.includes("solemnity")) return "solemnity";
  if (lower.includes("major feast") || lower.includes("principal holy")) return "major-feast";
  if (lower.includes("liturgical season") || lower.includes("season")) return "liturgical-season";
  if (lower.includes("fasting period") || lower.includes("great fast")) return "fasting-period";
  if (lower.includes("fast day") || lower.includes("fast-day")) return "fast-day";
  if (lower.includes("holy day of obligation")) return "holy-day-of-obligation";
  if (lower.includes("memorial")) return "memorial";
  if (lower.includes("observance")) return "observance";
  if (lower.includes("commemoration")) return "commemoration";
  if (lower.includes("regional")) return "regional-tradition";
  if (lower.includes("national")) return "national-feast";
  if (lower.includes("feast")) return "feast";
  return "observance";
}

function inferMoveableRule(name, dateCell, dateRule) {
  const n = name.toLowerCase();
  const d = dateCell.toLowerCase();
  if (n.includes("ash wednesday") || d.includes("46 days before easter")) return "ash-wednesday";
  if (n.includes("palm sunday") || d.includes("sunday before easter")) return "palm-sunday";
  if (n.includes("maundy thursday") || n.includes("holy thursday")) return "maundy-thursday";
  if (n.includes("good friday")) return "good-friday";
  if (n.includes("holy saturday")) return "holy-saturday";
  if (n.includes("easter monday")) return "easter-monday";
  if (n.includes("whit monday")) return "whit-monday";
  if (n.includes("ascension")) return "ascension-thursday";
  if (n.includes("pentecost") && !n.includes("whit")) return "pentecost";
  if (n.includes("trinity sunday")) return "trinity-sunday";
  if (n.includes("corpus christi")) return "corpus-christi-thursday";
  if (n.includes("christ the king")) return "christ-the-king";
  if (n.includes("advent") && n.includes("season")) return "first-advent-sunday";
  if (n.includes("vardavar")) return "vardavar";
  if (n.includes("clean monday")) return "clean-monday";
  if (n.includes("orthodox easter") || n.includes("pascha") && n.includes("orthodox"))
    return "orthodox-pascha";
  if (n.includes("easter") && !n.includes("monday") && !n.includes("vigil")) return "western-easter";
  if (d.includes("orthodox") && d.includes("pascha")) return "orthodox-pascha";
  if (d.includes("easter") || d.includes("pascha")) return "western-easter";
  return undefined;
}

function inferDateFixed(dateCell) {
  const months = {
    january: "01",
    february: "02",
    march: "03",
    april: "04",
    may: "05",
    june: "06",
    july: "07",
    august: "08",
    september: "09",
    october: "10",
    november: "11",
    december: "12",
  };
  for (const [month, mm] of Object.entries(months)) {
    const re = new RegExp(`${month}\\s+(\\d{1,2})`, "i");
    const m = dateCell.match(re);
    if (m && !dateCell.toLowerCase().includes("after") && !dateCell.toLowerCase().includes("before")) {
      const dd = m[1].padStart(2, "0");
      if (!dateCell.match(/january\s+6.*january\s+7/i)) return `${mm}-${dd}`;
    }
  }
  return undefined;
}

function inferPublicHoliday(name, dateCell, regions) {
  const n = name.toLowerCase();
  if (
    n.includes("good friday") ||
    n.includes("christmas") ||
    n.includes("easter monday") ||
    n.includes("boxing day")
  )
    return { isPublicHoliday: true, countries: ["GB"] };
  if (regions.includes("global") || regions.includes("europe")) {
    if (n.includes("all saints")) return { isPublicHoliday: true, countries: ["PL", "ES"] };
  }
  return { isPublicHoliday: false, countries: [] };
}

function defaultCta(seasons, themes, regions) {
  if (themes.includes("resurrection") || themes.includes("passion-death") || themes.includes("life-of-christ"))
    return { category: "pilgrimages", label: "Explore pilgrimage holidays →", url: "/pilgrimages" };
  if (seasons.includes("advent") || seasons.includes("lent"))
    return { category: "retreats", label: "Find a retreat →", url: "/retreats" };
  if (seasons.includes("pentecost"))
    return { category: "festivals", label: "Browse Christian festivals →", url: "/festivals" };
  if (regions.includes("ethiopia") || regions.includes("egypt"))
    return { category: "missions", label: "Explore mission trips →", url: "/missions" };
  return { category: "retreats", label: "Browse Christian holidays →", url: "/retreats" };
}

function parseEntries(md) {
  const lines = md.split("\n");
  const entries = [];
  let i = 0;
  const appendixStart = md.indexOf("## Appendix");

  while (i < lines.length) {
    const line = lines[i];
    if (appendixStart > 0 && md.indexOf(line) >= appendixStart) break;

    if (!line.startsWith("### ")) {
      i++;
      continue;
    }

    const rawName = line.slice(4).trim();
    if (rawName.startsWith("4A:") || rawName.startsWith("4B:") || rawName.startsWith("4C:")) {
      i++;
      continue;
    }
    if (/\(see [^)]+\)/i.test(rawName) && rawName.length < 80) {
      i++;
      continue;
    }

    let name = rawName.replace(/\s*\(see [^)]+\)\s*/gi, "").replace(/\*[^*]*\*/g, "").trim();
    if (!name) {
      i++;
      continue;
    }

    i++;
    let alsoKnownAs = [];
    if (i < lines.length && lines[i].startsWith("*Also called:")) {
      alsoKnownAs = parseAlsoKnownAs(lines[i]);
      i++;
    }

    while (i < lines.length && lines[i].trim() === "") i++;

    if (i >= lines.length || !lines[i].startsWith("| Date |")) {
      continue;
    }

    i += 2;
    if (i >= lines.length) continue;
    const row = lines[i].split("|").map((c) => c.trim()).filter(Boolean);
    i++;

    if (row.length < 7) continue;

    const [dateCell, typeCell, dateTypeCell, denomCell, seasonCell, regionCell, colorCell, themeCell] =
      row;

    const id = slugify(name);
    if (!id) continue;

    const dateType = normDateType(dateTypeCell);
    const seasons = parseSeasons(seasonCell);
    const regions = parseRegions(regionCell);
    const themes = parseThemes(themeCell || "");
    const denominations = parseDenominations(denomCell);
    const dateRule = dateCell;
    const moveableRule =
      dateType !== "fixed" ? inferMoveableRule(name, dateCell, dateRule) : undefined;
    const dateFixed = dateType === "fixed" ? inferDateFixed(dateCell) : undefined;
    const ph = inferPublicHoliday(name, dateCell, regions);
    const cta = defaultCta(seasons, themes, regions);

    while (i < lines.length && lines[i].trim() === "") i++;
    let sourceDescription = "";
    if (i < lines.length && !lines[i].startsWith("#") && !lines[i].startsWith("|") && !lines[i].startsWith("---")) {
      sourceDescription = lines[i].trim();
      i++;
    }

    const seoExcerpt = sourceDescription.slice(0, 155).replace(/\s+\S*$/, "…") || name;
    const phase1 = PHASE1_IDS.has(id);

    entries.push({
      id,
      name,
      alsoKnownAs: alsoKnownAs.length ? alsoKnownAs : undefined,
      dateType,
      dateFixed,
      dateRule,
      moveableRule,
      type: normType(typeCell),
      denominations,
      seasons,
      regions,
      themes,
      liturgicalColor: colorCell
        ? colorCell.split(/[,;]/).map((c) => c.trim()).filter(Boolean)
        : undefined,
      isPublicHoliday: ph.isPublicHoliday,
      publicHolidayCountries: ph.countries.length ? ph.countries : undefined,
      isObligation: typeCell.toLowerCase().includes("holy day of obligation") || undefined,
      sourceDescription: sourceDescription || undefined,
      descriptionTeen: "",
      edenCtaCategory: cta.category,
      edenCtaLabel: cta.label,
      edenCtaUrl: cta.url,
      imageAlt: `${name} — Christian holiday illustration`,
      seoExcerpt,
      phase1,
    });

    while (i < lines.length && lines[i].trim() !== "---") i++;
    i++;
  }

  const seen = new Set();
  return entries.filter((e) => {
    if (seen.has(e.id)) return false;
    seen.add(e.id);
    return true;
  });
}

const md = readFileSync(MD_PATH, "utf8");
const holidays = parseEntries(md);
writeFileSync(OUT_PATH, JSON.stringify(holidays, null, 2));
console.log(`Extracted ${holidays.length} holidays to ${OUT_PATH}`);
console.log(`Phase 1 matches: ${holidays.filter((h) => h.phase1).length}`);

process.exit(0);
