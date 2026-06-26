import { DENOMINATION_LABELS } from "@lib/calendar/filter-labels";
import { getDenominationCounts } from "@lib/calendar/holidays";

export type DenominationTile = {
  id: string;
  label: string;
  count: number;
  description: string;
  tradition: "catholic" | "orthodox" | "protestant" | "oriental";
};

const TILE_CONFIG: Omit<DenominationTile, "count">[] = [
  {
    id: "catholic",
    label: "Catholic",
    description: "The Roman Catholic calendar — solemnities, feasts, and memorials through the liturgical year.",
    tradition: "catholic",
  },
  {
    id: "eastern-orthodox",
    label: "Eastern Orthodox",
    description: "The Twelve Great Feasts, Pascha, and the rich traditions of Greek, Russian, and Slavic Christianity.",
    tradition: "orthodox",
  },
  {
    id: "coptic-orthodox",
    label: "Coptic Orthodox",
    description: "Ancient Egyptian Christianity — among the oldest continuous Christian communities in the world.",
    tradition: "oriental",
  },
  {
    id: "ethiopian-orthodox",
    label: "Ethiopian Orthodox",
    description: "Timkat, Meskel, and a distinctive church year with some of the world's most dramatic festivals.",
    tradition: "oriental",
  },
  {
    id: "armenian-apostolic",
    label: "Armenian Apostolic",
    description: "The first nation to adopt Christianity — with unique feasts like Vardavar and an ancient liturgy.",
    tradition: "oriental",
  },
  {
    id: "anglican",
    label: "Anglican",
    description: "Principal Feasts, Lesser Festivals, and the Church of England's rhythm of worship.",
    tradition: "protestant",
  },
  {
    id: "lutheran",
    label: "Lutheran",
    description: "Reformation heritage, hymn-filled worship, and a calendar shaped by the Gospel.",
    tradition: "protestant",
  },
  {
    id: "methodist",
    label: "Methodist",
    description: "Wesleyan traditions of preaching, revival, and structured Christian discipleship.",
    tradition: "protestant",
  },
  {
    id: "evangelical",
    label: "Evangelical",
    description: "Bible-centred observances, mission emphasis, and flexible approaches to the church year.",
    tradition: "protestant",
  },
  {
    id: "adventist",
    label: "Adventist",
    description: "Seventh-day Sabbath observance and distinctive emphases on health, mission, and the Second Coming.",
    tradition: "protestant",
  },
];

export const TRADITION_COLOURS: Record<DenominationTile["tradition"], string> = {
  catholic: "#722F37",
  orthodox: "#B8860B",
  protestant: "#1565C0",
  oriental: "#C75B39",
};

export function getDenominationTiles(): DenominationTile[] {
  const counts = getDenominationCounts();
  return TILE_CONFIG.map((tile) => ({
    ...tile,
    label: DENOMINATION_LABELS[tile.id] ?? tile.label,
    count: counts[tile.id] ?? 0,
  }));
}
