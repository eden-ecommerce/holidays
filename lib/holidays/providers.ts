import type { Provider } from "./types";

/** Featured tour operators */
export const TOUR_OPERATORS: Provider[] = [
  {
    id: "TO001",
    name: "Richmond Holidays",
    website: "https://www.richmond-holidays.com/",
    category: "tours",
    subCategory: "Beach / Ski / Activity",
    location: "UK",
    description:
      "Quality Christian holidays offering ski weeks, beach resorts, walking weeks, and solo traveller programmes with dedicated ministry staff, worship and prayer.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Solo traveller weeks", "Walking holidays", "Ski holidays", "Ministry staff on site"],
    tags: ["Interdenominational", "Beach", "Ski", "Walking"],
    targetAudience: "Families, Singles, Couples, Walking enthusiasts",
    featured: true,
  },
  {
    id: "TO002",
    name: "Oak Hall Expeditions",
    website: "https://www.oakhall.co.uk/",
    category: "tours",
    subCategory: "Activity / Adventure",
    location: "Otford, Kent",
    description:
      "Affordable community-focused Christian holidays including ski trips, summer expeditions and adventure travel with Bible teaching and fellowship.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Bible sessions", "Affordable pricing", "Community focus", "Adventure travel"],
    tags: ["Interdenominational", "Adventure", "Young Adults"],
    targetAudience: "Young adults, Families, Groups",
    featured: true,
  },
  {
    id: "TO003",
    name: "McCabe Pilgrimages",
    website: "https://www.mccabe-travel.co.uk/",
    category: "pilgrimages",
    subCategory: "Pilgrimage",
    location: "UK",
    description:
      "UK's leading operator of tours and pilgrimages to the Holy Land and other biblical and historical sites. Also offers fellowship tours.",
    denominationFocus: "Anglican / Interdenominational",
    keyFeatures: ["Expert guides", "Holy Land specialists", "Fellowship tours", "Cultural immersion"],
    tags: ["Anglican", "Holy Land", "Pilgrimage"],
    targetAudience: "Church groups, Individuals, Couples",
    featured: true,
  },
  {
    id: "TO004",
    name: "Tangney Tours",
    website: "https://www.tangney-tours.com/",
    category: "pilgrimages",
    subCategory: "Catholic Pilgrimage",
    location: "UK",
    description:
      "UK's leading Catholic pilgrimage operator specialising in group pilgrimages to Lourdes, Fatima, Rome, the Holy Land and other major Catholic shrines.",
    denominationFocus: "Catholic",
    keyFeatures: ["Lourdes specialists", "Assisted pilgrimage", "Group organisers travel free"],
    tags: ["Catholic", "Lourdes", "Rome", "Holy Land"],
    targetAudience: "Catholic parishes, Groups, Individuals",
    featured: true,
  },
  {
    id: "TO005",
    name: "Inspiration Travel",
    website: "https://www.inspiration-travel.co.uk/",
    category: "tours",
    subCategory: "Coach Tours",
    location: "UK",
    description:
      "A well-established Christian coach tour operator offering European holidays and UK breaks with a strong community ethos and a programme of optional Christian activities.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Coach tours", "European breaks", "Community ethos", "Optional Christian programme"],
    tags: ["Interdenominational", "Coach", "Europe"],
    targetAudience: "Seniors, Couples, Individuals",
  },
  {
    id: "TO006",
    name: "Holy Land Experience Tours",
    website: "https://www.holyland-tours.co.uk/",
    category: "pilgrimages",
    subCategory: "Pilgrimage",
    location: "UK",
    description:
      "Specialist tours to Israel and the Holy Land, offering tailored group pilgrimages with expert Christian guides and flexible itineraries.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Holy Land specialists", "Tailored itineraries", "Expert Christian guides"],
    tags: ["Interdenominational", "Holy Land", "Israel"],
    targetAudience: "Church groups, Individuals",
  },
];

/** Featured retreats & accommodation */
export const RETREATS: Provider[] = [
  {
    id: "RA001",
    name: "Lee Abbey Devon",
    website: "https://leeabbeydevon.org.uk/",
    category: "retreats",
    subCategory: "Conference / Retreat",
    location: "Lynton, Devon",
    region: "South West",
    country: "UK",
    description:
      "Retreat and conference centre in North Devon run by an international Christian community. Offers themed weeks, outdoor/walking holidays, and a community living experience.",
    denominationFocus: "Anglican / Interdenominational",
    keyFeatures: ["International community", "Coastal location", "Walking weeks", "Youth programmes"],
    tags: ["Anglican", "Coastal", "Walking", "Community"],
    accessibility: "Partial",
    contactEmail: "bookings@leeabbey.org.uk",
    contactPhone: "01598 752621",
    featured: true,
  },
  {
    id: "RA002",
    name: "Capernwray Hall",
    website: "https://capernwray.org/holidays/",
    category: "retreats",
    subCategory: "Holiday Centre",
    location: "Carnforth, Lancashire",
    region: "North West",
    country: "UK",
    description:
      "Christ-centred holiday centre in stunning Lancashire countryside near the Lake District and Yorkshire Dales.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Bible teaching", "Beautiful grounds", "Near Lake District", "Seasonal holidays"],
    tags: ["Interdenominational", "Lake District", "Bible Teaching"],
    featured: true,
  },
  {
    id: "RA003",
    name: "CEHC Beechwood Court",
    website: "https://www.cehc.org.uk/",
    category: "retreats",
    subCategory: "Holiday Centre",
    location: "Conwy, North Wales",
    region: "Wales",
    country: "UK",
    description:
      "Holiday centre on the North Wales coast offering themed weeks, family holidays, and seniors breaks, including a Holiday Support Fund for those needing financial help.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Seniors programme", "Holiday Support Fund", "Themed weeks", "North Wales coast"],
    tags: ["Interdenominational", "Seniors", "Wales", "Family"],
    contactPhone: "01492 593405",
    featured: true,
  },
  {
    id: "RA005",
    name: "The Wellspring Ledbury",
    website: "https://www.thewellspring.uk/",
    category: "retreats",
    subCategory: "Day Retreat / Events",
    location: "Ledbury, Herefordshire",
    region: "West Midlands",
    country: "UK",
    description:
      "Christian day retreat and events centre on the southern edge of the Malvern Hills AONB. Also offers Wellspring Cottage for self-catering retreats.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Malvern Hills AONB", "Day retreats", "Self-catering cottage", "Events"],
    tags: ["Interdenominational", "AONB", "Self-catering"],
    contactEmail: "info@thewellspring.uk",
    contactPhone: "01531 635727",
    featured: true,
  },
  {
    id: "RA006",
    name: "Scargill House",
    website: "https://www.scargillmovement.org/",
    category: "retreats",
    subCategory: "Conference / Retreat",
    location: "Skipton, North Yorkshire",
    region: "Yorkshire",
    country: "UK",
    description:
      "Christian retreat and conference centre in the Yorkshire Dales offering themed breaks, community living, and quiet days.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Yorkshire Dales", "Community living", "Themed breaks", "Quiet days"],
    tags: ["Interdenominational", "Yorkshire Dales", "Retreat"],
  },
  {
    id: "RA007",
    name: "Ashburnham Place",
    website: "https://www.ashburnham.org.uk/",
    category: "retreats",
    subCategory: "Conference / Retreat",
    location: "Battle, East Sussex",
    region: "South East",
    country: "UK",
    description:
      "Christian conference and retreat centre set in 220 acres of parkland and gardens in East Sussex.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["220 acres", "Conference facilities", "Prayer ministry"],
    tags: ["Interdenominational", "East Sussex", "Conference"],
  },
  {
    id: "RA009",
    name: "Ampleforth Abbey",
    website: "https://www.ampleforth.org.uk/",
    category: "retreats",
    subCategory: "Monastery",
    location: "York, North Yorkshire",
    region: "Yorkshire",
    country: "UK",
    description:
      "Benedictine monastery offering hospitality and retreats for individuals and groups seeking peace and prayer.",
    denominationFocus: "Catholic / Benedictine",
    keyFeatures: ["Benedictine community", "Historic monastery", "Peaceful setting"],
    tags: ["Catholic", "Benedictine", "Monastery"],
  },
];

/** Youth & activity camps */
export const YOUTH_CAMPS: Provider[] = [
  {
    id: "YA001",
    name: "Scripture Union Holidays",
    website: "https://www.scriptureunion.org.uk/",
    category: "youth",
    subCategory: "Residential Holidays",
    location: "Various UK locations",
    description:
      "A great range of Christian holidays each Summer and Easter for children and young people aged 8–18.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Residential camps", "Beach missions", "Outdoor activities", "Faith programmes"],
    tags: ["Interdenominational", "Children", "Summer"],
    ageRange: "8–18",
    featured: true,
  },
  {
    id: "YA002",
    name: "CPAS Ventures",
    website: "https://www.cpas.org.uk/ventures",
    category: "youth",
    subCategory: "Adventure Camps",
    location: "Various UK locations",
    description:
      "Christian adventure camps for young people combining outdoor activities with Bible teaching and Christian community.",
    denominationFocus: "Anglican",
    keyFeatures: ["Adventure activities", "Bible teaching", "Team building"],
    tags: ["Anglican", "Adventure", "Teens"],
    ageRange: "11–18",
    featured: true,
  },
  {
    id: "YA003",
    name: "Rock UK",
    website: "https://www.rockuk.org/",
    category: "youth",
    subCategory: "Outdoor Adventure",
    location: "Multiple UK centres",
    description:
      "Christian outdoor education and activity centre charity offering residential and day visits to a wide range of groups.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Outdoor education", "Activity centres", "Group bookings", "Residential visits"],
    tags: ["Interdenominational", "Outdoor", "Groups"],
    ageRange: "5+",
  },
  {
    id: "YA004",
    name: "Through the Roof",
    website: "https://www.throughtheroof.org/",
    category: "youth",
    subCategory: "Accessible Holidays",
    location: "UK",
    description:
      "Charity organising full-board accessible holidays combining Christian worship with tailored support for disabled individuals.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Accessible facilities", "Tailored support", "Christian worship", "Full board"],
    tags: ["Interdenominational", "Accessible", "Disabled"],
    accessibility: "Full",
  },
];

/** Festivals & events */
export const FESTIVALS: Provider[] = [
  {
    id: "FE001",
    name: "Spring Harvest",
    website: "https://www.springharvest.org/",
    category: "festivals",
    subCategory: "Major Festival",
    location: "Minehead / Skegness",
    region: "National",
    country: "UK",
    description:
      "One of the UK's largest Christian festivals bringing tens of thousands of Christians together each Easter for worship, teaching and community.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Easter festival", "Worship", "Bible teaching", "Family programme"],
    tags: ["Interdenominational", "Easter", "Major Festival"],
    featured: true,
  },
  {
    id: "FE002",
    name: "Keswick Convention",
    website: "https://www.keswickministries.org/",
    category: "festivals",
    subCategory: "Bible Convention",
    location: "Keswick, Cumbria",
    region: "North West",
    country: "UK",
    description:
      "Historic annual Bible convention in the Lake District, drawing Christians from across the UK for three weeks of teaching, prayer and fellowship each July.",
    denominationFocus: "Interdenominational / Evangelical",
    keyFeatures: ["Bible teaching", "Three weeks", "Lake District", "Historic convention"],
    tags: ["Evangelical", "Bible Teaching", "Lake District"],
    featured: true,
  },
  {
    id: "FE003",
    name: "Big Church Festival",
    website: "https://www.bigchurchfestival.com/",
    category: "festivals",
    subCategory: "Music Festival",
    location: "Wiston Estate, West Sussex",
    region: "South East",
    country: "UK",
    description:
      "A major annual outdoor Christian music festival featuring world-class worship artists, camping, and family activities.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Camping", "Worship music", "Family activities", "World-class artists"],
    tags: ["Interdenominational", "Music", "Family", "Camping"],
    featured: true,
  },
  {
    id: "FE004",
    name: "New Wine",
    website: "https://www.new-wine.org/",
    category: "festivals",
    subCategory: "Summer Festival",
    location: "Multiple UK venues",
    region: "National",
    country: "UK",
    description:
      "Annual summer conference with a charismatic flavour, featuring worship, teaching and ministry for all ages.",
    denominationFocus: "Charismatic / Interdenominational",
    keyFeatures: ["Summer conference", "Ministry", "All ages", "Worship"],
    tags: ["Charismatic", "Summer", "All Ages"],
    featured: true,
  },
  {
    id: "FE005",
    name: "Greenbelt Festival",
    website: "https://www.greenbelt.org.uk/",
    category: "festivals",
    subCategory: "Arts Festival",
    location: "Boughton Estate, Northamptonshire",
    region: "East Midlands",
    country: "UK",
    description:
      "Annual festival celebrating arts, faith and justice in a stunning outdoor setting, combining music, art and Christian thought.",
    denominationFocus: "Progressive / Interdenominational",
    keyFeatures: ["Arts & music", "Justice themes", "Outdoor", "Camping"],
    tags: ["Progressive", "Arts", "Music"],
  },
];

/** Self-catering, B&Bs and home swap */
export const SELF_CATERING: Provider[] = [
  {
    id: "SC001",
    name: "HolyHols",
    website: "https://www.holyhols.com/",
    category: "self-catering",
    subCategory: "Directory",
    location: "UK-wide",
    description:
      "Online directory connecting Christian property owners with holidaymakers, offering clergy discounts and faith-aligned self-catering accommodation.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Clergy discounts", "Self-catering", "Christian owners", "UK-wide"],
    tags: ["Interdenominational", "Self-catering", "Clergy Discount"],
    featured: true,
  },
  {
    id: "SC002",
    name: "Christian House & Church Swap (CHACS)",
    website: "https://www.chacs.co.uk/",
    category: "self-catering",
    subCategory: "Home Swap",
    location: "UK & Worldwide",
    description:
      "Affordable home exchange platform for Christians, facilitating house swaps between believers globally — ideal for budget-conscious families.",
    denominationFocus: "Interdenominational",
    keyFeatures: ["Home exchange", "Affordable", "Family-friendly", "International"],
    tags: ["Interdenominational", "Home Swap", "Budget"],
    featured: true,
  },
];

/** All providers combined */
export const ALL_PROVIDERS: Provider[] = [
  ...TOUR_OPERATORS,
  ...RETREATS,
  ...YOUTH_CAMPS,
  ...FESTIVALS,
  ...SELF_CATERING,
];

export function getProvidersByCategory(category: Provider["category"]): Provider[] {
  return ALL_PROVIDERS.filter((p) => p.category === category);
}

export function getFeaturedProviders(): Provider[] {
  return ALL_PROVIDERS.filter((p) => p.featured);
}
