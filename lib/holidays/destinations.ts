import type { Destination } from "./types";

export const DESTINATIONS: Destination[] = [
  {
    id: "DP001",
    name: "St Cuthbert's Way",
    country: "UK",
    region: "Northumberland / Scottish Borders",
    type: "domestic",
    description:
      "A 62-mile walking pilgrimage from Melrose to Lindisfarne (Holy Island), tracing the footsteps of St Cuthbert through some of northern England's most dramatic landscapes.",
    highlights: ["Holy Island", "Northumberland coast", "Historic route", "Self-guided"],
    website: "https://www.stcuthbertsway.info/",
  },
  {
    id: "DP002",
    name: "Iona",
    country: "UK",
    region: "Scotland",
    type: "domestic",
    description:
      "A remote Scottish island with a rich spiritual heritage as the birthplace of Celtic Christianity. Home to the Iona Community and a popular pilgrimage destination.",
    highlights: ["Celtic Christianity", "Iona Community", "Abbey ruins", "Remote island"],
    website: "https://www.iona.org.uk/",
  },
  {
    id: "DP003",
    name: "Lindisfarne (Holy Island)",
    country: "UK",
    region: "Northumberland",
    type: "domestic",
    description:
      "A tidal island off the Northumberland coast with extraordinary early Christian heritage, including Lindisfarne Priory and the Lindisfarne Gospels.",
    highlights: ["Tidal island", "Lindisfarne Priory", "Celtic heritage", "Coastal walks"],
  },
  {
    id: "DP004",
    name: "Canterbury",
    country: "UK",
    region: "Kent",
    type: "domestic",
    description:
      "England's oldest Christian city and the seat of the Archbishop of Canterbury, with the magnificent Canterbury Cathedral at its heart — a UNESCO World Heritage Site.",
    highlights: ["Canterbury Cathedral", "UNESCO site", "Anglican heritage", "St Augustine"],
  },
  {
    id: "DP005",
    name: "Walsingham",
    country: "UK",
    region: "Norfolk",
    type: "domestic",
    description:
      "England's national shrine, drawing both Anglican and Catholic pilgrims to the site of a medieval Marian apparition. Known as 'England's Nazareth'.",
    highlights: ["National shrine", "Anglican & Catholic", "Medieval history", "England's Nazareth"],
    website: "https://www.walsingham.org.uk/",
  },
  {
    id: "DP006",
    name: "The Holy Land (Israel & Palestine)",
    country: "Israel",
    type: "international",
    description:
      "The most significant pilgrimage destination for Christians worldwide, encompassing Jerusalem, Bethlehem, Nazareth, the Sea of Galilee, and the River Jordan.",
    highlights: ["Jerusalem", "Bethlehem", "Sea of Galilee", "River Jordan"],
  },
  {
    id: "DP007",
    name: "Rome & Vatican City",
    country: "Italy",
    type: "international",
    description:
      "The Eternal City and heart of the Catholic world, home to St Peter's Basilica, the Vatican Museums and the Sistine Chapel, as well as countless early Christian churches.",
    highlights: ["St Peter's Basilica", "Vatican Museums", "Sistine Chapel", "Catacombs"],
  },
  {
    id: "DP008",
    name: "Lourdes",
    country: "France",
    type: "international",
    description:
      "The world's most visited Catholic pilgrimage site, drawing millions annually to the Marian shrine where St Bernadette received apparitions in 1858.",
    highlights: ["Marian shrine", "Healing baths", "Torchlit processions", "Mass attendance"],
  },
  {
    id: "DP009",
    name: "Camino de Santiago",
    country: "Spain",
    type: "international",
    description:
      "The famous network of pilgrimage routes leading to the Cathedral of Santiago de Compostela, with the Camino Francés being the most popular for UK pilgrims.",
    highlights: ["Walking pilgrimage", "Camino Francés", "Cathedral of Santiago", "Compostela certificate"],
  },
  {
    id: "DP010",
    name: "Fatima",
    country: "Portugal",
    type: "international",
    description:
      "Major Catholic pilgrimage site in central Portugal, where three shepherd children reported apparitions of the Virgin Mary in 1917.",
    highlights: ["Marian apparitions", "Sanctuary of Fatima", "Candlelight processions", "Chapel of Apparitions"],
  },
  {
    id: "DP011",
    name: "Pilgrims' Way (North Downs Way)",
    country: "UK",
    region: "South East England",
    type: "domestic",
    description:
      "Historic route from Winchester to Canterbury following the North Downs. Medieval pilgrimage to Thomas Becket's shrine at Canterbury Cathedral.",
    highlights: ["Canterbury Cathedral", "Medieval history", "Chaucer connection", "120 miles"],
    website: "https://www.nationaltrail.co.uk/en_GB/trails/north-downs-way/",
  },
  {
    id: "DP012",
    name: "Augustine Camino",
    country: "UK",
    region: "Kent",
    type: "domestic",
    description:
      "Route following St Augustine's journey from his landing at Ramsgate to Canterbury, where he established Christianity in England.",
    highlights: ["Augustine's landing site", "Canterbury Cathedral", "Anglo-Saxon Christianity"],
    website: "https://www.augustinecamino.co.uk/",
  },
  {
    id: "DP013",
    name: "St Columba's Way",
    country: "UK",
    region: "Western Scotland",
    type: "domestic",
    description:
      "Route following St Columba's journey from Glasgow through the Scottish Highlands to the sacred island of Iona.",
    highlights: ["Iona Abbey", "Celtic Christianity", "Scottish Highlands", "Island hopping"],
  },
  {
    id: "DP014",
    name: "Glastonbury",
    country: "UK",
    region: "Somerset",
    type: "domestic",
    description:
      "Ancient Christian site associated with Joseph of Arimathea and King Arthur. Home to Glastonbury Abbey and the Tor.",
    highlights: ["Glastonbury Abbey", "The Tor", "Joseph of Arimathea legend", "Celtic connections"],
  },
  {
    id: "DP015",
    name: "Durham",
    country: "UK",
    region: "North East",
    type: "domestic",
    description:
      "Durham Cathedral houses the shrine of St Cuthbert and the tomb of the Venerable Bede. A UNESCO World Heritage Site.",
    highlights: ["Durham Cathedral", "St Cuthbert's shrine", "Bede's tomb", "UNESCO"],
    website: "https://www.durhamcathedral.co.uk/",
  },
  {
    id: "DP016",
    name: "Assisi",
    country: "Italy",
    type: "international",
    description:
      "Birthplace of St Francis. Home to the Basilica of San Francesco, a medieval hill town and centre of Franciscan spirituality.",
    highlights: ["Basilica of San Francesco", "Franciscan heritage", "Medieval town"],
  },
  {
    id: "DP017",
    name: "Oberammergau",
    country: "Germany",
    region: "Bavaria",
    type: "international",
    description:
      "Bavarian village famous for its Passion Play performed every ten years (next 2030). Popular with Christian tour groups.",
    highlights: ["Passion Play", "Bavarian Alps", "Wood carving tradition", "Decennial event"],
  },
  {
    id: "DP018",
    name: "Taizé",
    country: "France",
    region: "Burgundy",
    type: "international",
    description:
      "Ecumenical monastic community attracting thousands of young people weekly for prayer, worship and community.",
    highlights: ["Ecumenical community", "Youth focus", "Contemplative worship", "International"],
    website: "https://www.taize.fr/",
  },
  {
    id: "DP019",
    name: "London Christian Heritage Trail",
    country: "UK",
    region: "London",
    type: "domestic",
    description:
      "Walking tours exploring London's Christian heritage including Wilberforce, Wesley, Whitefield, Spurgeon and more.",
    highlights: ["Multiple walking routes", "Reformation sites", "Missionary history", "Free churches"],
    website: "https://christianheritagelondon.org/",
  },
  {
    id: "DP020",
    name: "Christian Heritage Cambridge",
    country: "UK",
    region: "East of England",
    type: "domestic",
    description:
      "The Round Church and associated tours exploring Christianity's role in Cambridge history. Over 20,000 visitors annually.",
    highlights: ["Round Church", "University connections", "Reformation history", "12th century"],
    website: "https://www.christianheritage.org.uk/",
  },
];

export function getDomesticDestinations(): Destination[] {
  return DESTINATIONS.filter((d) => d.type === "domestic");
}

export function getInternationalDestinations(): Destination[] {
  return DESTINATIONS.filter((d) => d.type === "international");
}
