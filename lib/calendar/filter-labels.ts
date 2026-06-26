export const DENOMINATION_LABELS: Record<string, string> = {
  "pan-christian": "All Christians",
  catholic: "Catholic",
  "eastern-orthodox": "Eastern Orthodox",
  "greek-orthodox": "Greek Orthodox",
  "russian-orthodox": "Russian Orthodox",
  "coptic-orthodox": "Coptic Orthodox",
  "ethiopian-orthodox": "Ethiopian Orthodox",
  "armenian-apostolic": "Armenian Apostolic",
  "syriac-orthodox": "Syriac Orthodox",
  maronite: "Maronite",
  anglican: "Anglican",
  episcopal: "Episcopal",
  lutheran: "Lutheran",
  methodist: "Methodist",
  presbyterian: "Presbyterian",
  baptist: "Baptist",
  evangelical: "Evangelical",
  pentecostal: "Pentecostal",
  adventist: "Adventist",
};

export const SEASON_LABELS: Record<string, string> = {
  advent: "Advent",
  christmas: "Christmas",
  epiphany: "Epiphany",
  "pre-lent": "Pre-Lent",
  lent: "Lent",
  "holy-week": "Holy Week",
  triduum: "Triduum",
  easter: "Easter",
  ascension: "Ascension",
  pentecost: "Pentecost",
  "ordinary-time": "Ordinary Time",
  "nativity-fast": "Nativity Fast",
  "apostles-fast": "Apostles Fast",
  "dormition-fast": "Dormition Fast",
  "year-round": "Year-round",
};

export const REGION_LABELS: Record<string, string> = {
  global: "Global",
  "western-christianity": "Western Christianity",
  "eastern-christianity": "Eastern Christianity",
  europe: "Europe",
  "western-europe": "UK & Ireland",
  "eastern-europe": "Eastern Europe",
  scandinavia: "Scandinavia",
  "north-america": "North America",
  "latin-america": "Latin America",
  africa: "Africa",
  egypt: "Egypt",
  ethiopia: "Ethiopia",
  armenia: "Armenia",
  "middle-east": "Middle East",
  asia: "Asia",
  philippines: "Philippines",
  india: "India",
  greece: "Greece",
  "russia-slavic": "Russia & Slavic",
};

export const THEME_LABELS: Record<string, string> = {
  incarnation: "Birth of Christ",
  "life-of-christ": "Life of Christ",
  "passion-death": "Passion & Death",
  resurrection: "Resurrection",
  ascension: "Ascension",
  "holy-spirit": "Holy Spirit",
  trinity: "Trinity",
  marian: "Mary",
  apostles: "Apostles",
  "martyrs-saints": "Saints & Martyrs",
  angels: "Angels",
  "holy-cross": "Holy Cross",
  penitence: "Penitence & Fasting",
  mission: "Mission",
  "church-history": "Church History",
  creation: "Creation",
  covenant: "Covenant",
  eschatology: "End Times & Hope",
};

export const DATE_TYPE_LABELS: Record<string, string> = {
  fixed: "Fixed (same date every year)",
  moveable: "Moveable (changes with Easter)",
  "semi-fixed": "Semi-fixed",
};

export function labelFor(
  map: Record<string, string>,
  slug: string,
): string {
  return map[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
