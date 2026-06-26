/** Season colour palette — spec Section 5.3.3 */
export const SEASON_COLOURS: Record<string, string> = {
  advent: "#5C2D91",
  christmas: "#B8860B",
  epiphany: "#1565C0",
  "pre-lent": "#7B4F8A",
  lent: "#7B4F8A",
  "holy-week": "#8B0000",
  triduum: "#8B0000",
  easter: "#E8A000",
  ascension: "#E8A000",
  pentecost: "#D32F2F",
  "ordinary-time": "#2d7a27",
  "nativity-fast": "#37474F",
  "apostles-fast": "#37474F",
  "dormition-fast": "#37474F",
  "year-round": "#607D8B",
};

export function getSeasonColour(season: string): string {
  return SEASON_COLOURS[season] ?? SEASON_COLOURS["year-round"];
}

export const PRIMARY_SEASON_ORDER = [
  "advent",
  "christmas",
  "epiphany",
  "lent",
  "holy-week",
  "easter",
  "pentecost",
  "ordinary-time",
] as const;

export function getPrimarySeason(seasons: string[]): string {
  for (const s of PRIMARY_SEASON_ORDER) {
    if (seasons.includes(s)) return s;
  }
  return seasons[0] ?? "year-round";
}
