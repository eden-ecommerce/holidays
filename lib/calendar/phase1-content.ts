import type { CalendarHoliday } from "@lib/calendar/types";

/** Phase 1 editorial overrides: teen copy, CTAs, and Did You Know hooks. */
export type Phase1Override = Pick<
  CalendarHoliday,
  | "descriptionTeen"
  | "didYouKnow"
  | "edenCtaCategory"
  | "edenCtaLabel"
  | "edenCtaUrl"
  | "seoExcerpt"
  | "phase1"
>;

export const PHASE1_OVERRIDES: Record<string, Phase1Override> = {
  advent: {
    phase1: true,
    descriptionTeen:
      "For four weeks before Christmas, millions of Christians light a new candle each Sunday and count down to the big day. Advent is the start of the church year in many traditions — a season of waiting, hope, and getting ready for Christmas. Families use Advent calendars, churches hang purple or blue decorations, and carol services build through December. If you want a quiet place to reflect before the Christmas rush, Eden lists dozens of UK retreat centres that run special Advent programmes.",
    didYouKnow:
      "The word 'Advent' comes from the Latin for 'coming' — Christians look back to Jesus's birth and forward to his promised return.",
    edenCtaCategory: "retreats",
    edenCtaLabel: "Find a quiet Advent retreat in the UK →",
    edenCtaUrl: "/retreats",
    seoExcerpt:
      "Advent explained for teens — the four-week season before Christmas, when Christians prepare with candles, carols, and hope.",
  },
  "christmas-day-nativity-of-jesus-christ": {
    phase1: true,
    descriptionTeen:
      "On Christmas Day, churches worldwide celebrate the birth of Jesus in Bethlehem — with midnight Mass, carol services, nativity plays, and family feasts. Western Christians mark 25 December; many Orthodox, Coptic, and Ethiopian Christians celebrate on 7 January because they still use an older calendar. Streets fill with lights, choirs sing 'Silent Night', and children perform nativity plays in schools and churches. If you've ever wanted to spend Christmas where the story began, Eden lists pilgrimages to Bethlehem and the Holy Land every winter.",
    didYouKnow:
      "Armenian Christians are unique — they celebrate Christmas and Epiphany together on 6 January, a tradition older than the split between the two feasts.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Spend Christmas in Bethlehem →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Christmas Day explained — when Christians celebrate Jesus's birth, how traditions differ worldwide, and why dates vary.",
  },
  "orthodox-christmas-january-7": {
    phase1: true,
    descriptionTeen:
      "While most UK shops pack away decorations on Boxing Day, millions of Orthodox Christians are only just getting started — their Christmas falls on 7 January. Russian, Serbian, Ethiopian, and many other Orthodox communities follow a calendar introduced in Roman times that runs 13 days behind the modern one. Christmas Eve often means a long church service, fasting until the first star appears, then a feast with family. Eden lists pilgrimages and tours to Greece, Eastern Europe, and Ethiopia where you can experience Orthodox Christmas firsthand.",
    didYouKnow:
      "Russian Orthodox Christmas is on 7 January because Russia still uses a calendar introduced by Julius Caesar in 46 BC — 13 days behind the modern one.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Explore Orthodox Christmas pilgrimages →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Why Orthodox Christians celebrate Christmas on 7 January — the Julian calendar explained for teens.",
  },
  epiphany: {
    phase1: true,
    descriptionTeen:
      "Epiphany marks the moment Jesus was revealed to the wider world — whether as the visit of the Wise Men (in the West) or his baptism in the River Jordan (in the East). It falls on 6 January and closes the 'Twelve Days of Christmas'. In Spain and Latin America, children receive gifts on Three Kings Day; in Greece, priests throw a cross into icy water for swimmers to retrieve. Churches bless chalk, water, or homes for the year ahead. Eden lists Holy Land pilgrimages where you can walk the routes of the Magi and visit the Jordan River.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Explore Epiphany pilgrimages →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "What is Epiphany? The feast of the Three Kings and Christ's baptism — explained for teens.",
  },
  "ash-wednesday": {
    phase1: true,
    descriptionTeen:
      "Ash Wednesday is the startling start of Lent — you may see people with a grey cross on their foreheads heading to church on a random Wednesday in February or March. The ashes come from burned palm branches from the previous year's Palm Sunday, and the words remind us that life is short. Catholics, Anglicans, Lutherans, and others use the day to begin 40 days of prayer, fasting, or giving something up before Easter. Eden's directory includes retreat centres across the UK that run Lent courses and quiet days.",
    edenCtaCategory: "retreats",
    edenCtaLabel: "Find a Lent retreat →",
    edenCtaUrl: "/retreats",
    seoExcerpt:
      "Ash Wednesday explained — why Christians wear ashes and how Lent begins.",
  },
  lent: {
    phase1: true,
    descriptionTeen:
      "Lent is a bit like a 40-day New Year's resolution — except it's about getting closer to God, not going to the gym. Starting on Ash Wednesday (or Clean Monday in Orthodox churches), Christians pray more, give to charity, or give up chocolate, social media, or meat. Orthodox Lent is stricter and longer; Ethiopian Lent can last 55 days. The season remembers Jesus's 40 days in the wilderness. If you want space to take Lent seriously away from everyday distractions, Eden lists quiet UK retreat centres.",
    edenCtaCategory: "retreats",
    edenCtaLabel: "Find a quiet Lent retreat →",
    edenCtaUrl: "/retreats",
    seoExcerpt:
      "What is Lent? The 40-day season before Easter — fasting, prayer, and preparation explained.",
  },
  "palm-sunday-passion-sunday": {
    phase1: true,
    descriptionTeen:
      "Palm Sunday opens Holy Week with a paradox — crowds wave palm branches and shout 'Hosanna!' as Jesus enters Jerusalem, but the same week ends with his crucifixion. Children often receive blessed palm crosses to take home; in the Philippines, families weave elaborate palm decorations. The Passion story is read in full during the service. Eden lists Easter pilgrimages to Jerusalem where you can walk the Palm Sunday route down the Mount of Olives.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Walk the Palm Sunday route in Jerusalem →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Palm Sunday explained — Jesus's entry into Jerusalem and the start of Holy Week.",
  },
  "maundy-thursday-holy-thursday": {
    phase1: true,
    descriptionTeen:
      "Maundy Thursday remembers the Last Supper — the night Jesus shared bread and wine with his friends and washed their feet. 'Maundy' comes from the Latin for 'commandment', because Jesus told his followers to love one another. Churches hold foot-washing ceremonies, special communion services, and sometimes all-night prayer vigils. In Jerusalem, pilgrims pack the Upper Room and Garden of Gethsemane. Eden lists Holy Week pilgrimages that include these sacred sites.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Holy Week pilgrimages to Jerusalem →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Maundy Thursday — the Last Supper, foot washing, and the start of the Easter Triduum.",
  },
  "good-friday": {
    phase1: true,
    descriptionTeen:
      "Good Friday is the most solemn day in Christianity — the day Jesus was crucified and died on a cross outside Jerusalem. Churches hold stripped-back services with hymns like 'When I Survey the Wondrous Cross'; some communities walk the Stations of the Cross through city streets. It is a public holiday in the UK, though shops and entertainment often stay open. If you want to stand at Calvary itself, Eden's partners run Good Friday pilgrimages to the Holy Land every spring.",
    didYouKnow:
      "Good Friday is a UK bank holiday, but England and Wales do not have a public holiday on Easter Monday — Scotland and Northern Ireland do.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Walk where it happened — Good Friday pilgrimages →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Good Friday explained — why Christians remember the crucifixion and whether it is a UK bank holiday.",
  },
  "holy-saturday-great-and-holy-saturday": {
    phase1: true,
    descriptionTeen:
      "Holy Saturday is the quiet day between Good Friday and Easter — Jesus is in the tomb and churches feel strangely empty until nightfall. Catholics hold no daytime Mass; the grand Easter Vigil after dark is one of the longest and most dramatic services of the year, with fire, candles, baptisms, and bells. Orthodox Christians venerate the embroidered burial shroud of Christ in moving night processions. Eden lists retreat centres that offer Holy Saturday vigils and quiet reflection.",
    edenCtaCategory: "retreats",
    edenCtaLabel: "Find an Easter retreat →",
    edenCtaUrl: "/retreats",
    seoExcerpt:
      "Holy Saturday — the day of waiting between crucifixion and resurrection.",
  },
  "easter-sunday-resurrection-of-our-lord": {
    phase1: true,
    descriptionTeen:
      "Every year, millions of Christians in Greece light candles at midnight and shout 'Christ is Risen!' before the fireworks start. Easter Sunday celebrates Jesus rising from the dead — the central event of the Christian faith. Western and Orthodox dates often differ by a week or more because they use different calendars to calculate the date. Churches fill with flowers, chocolate eggs appear, and families feast together. If you want to experience Easter where it actually happened, Eden lists pilgrimages to Jerusalem every spring.",
    didYouKnow:
      "In Poland, Easter Monday is called Śmigus-Dyngus — boys chase girls through the streets throwing buckets of water. It has been happening since the 1400s.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Walk where it happened — Easter pilgrimages to the Holy Land →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Easter Sunday explained — the resurrection of Jesus, traditions worldwide, and why dates differ.",
  },
  "ascension-day-ascension-of-our-lord": {
    phase1: true,
    descriptionTeen:
      "Forty days after Easter, Christians remember Jesus ascending into heaven — seen by his disciples on a hill outside Jerusalem before he disappeared into the clouds. Catholic churches traditionally mark it on a Thursday; many UK churches now celebrate on the following Sunday. Orthodox Christians process around church buildings. The feast bridges Easter and Pentecost, pointing forward to the gift of the Holy Spirit. Eden lists Holy Land tours that include the Mount of Olives.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Explore Ascension pilgrimages →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Ascension Day — when Christians remember Jesus returning to heaven, 40 days after Easter.",
  },
  "pentecost-day-of-pentecost": {
    phase1: true,
    descriptionTeen:
      "Pentecost is the 'birthday of the Church' — fifty days after Easter, when the Holy Spirit descended on Jesus's followers like tongues of fire and they spoke in many languages. Churches wear red, hold confirmations, and in England it was once called Whit Sunday because of white baptism robes. Pentecostal churches take their name from this day. UK Christian summer festivals often launch around Pentecost weekend. Eden lists festivals and youth camps where you can celebrate with thousands of other Christians.",
    edenCtaCategory: "festivals",
    edenCtaLabel: "Celebrate Pentecost at a UK Christian festival →",
    edenCtaUrl: "/festivals",
    seoExcerpt:
      "What is Pentecost? The day of the Holy Spirit — explained for teens.",
  },
  "all-saints-day": {
    phase1: true,
    descriptionTeen:
      "On 1 November, Christians honour every saint who has ever lived — famous ones like Francis and Joan of Arc, and ordinary faithful people whose names we will never know. Catholics treat it as a Holy Day of Obligation; Anglicans call it a Principal Feast. In Mexico it blends into Día de Muertos; in Poland families cover cemeteries with candles. It is a day to remember that holiness is not just for the past. Eden lists retreat centres that run All Saints' quiet days and remembrance services.",
    edenCtaCategory: "retreats",
    edenCtaLabel: "Find a retreat for All Saints' →",
    edenCtaUrl: "/retreats",
    seoExcerpt:
      "All Saints' Day — honouring every Christian saint, known and unknown.",
  },
  "trinity-sunday": {
    phase1: true,
    descriptionTeen:
      "Trinity Sunday is the Sunday after Pentecost when churches focus on one of Christianity's biggest ideas — that God is three persons (Father, Son, and Holy Spirit) in one God. It sounds confusing, and theologians have debated it for centuries, but the feast celebrates the mystery at the heart of Christian faith. Hymns like 'Holy, Holy, Holy' are sung everywhere. Eden lists retreat centres that offer theology weekends and summer quiet days.",
    edenCtaCategory: "retreats",
    edenCtaLabel: "Browse UK retreat centres →",
    edenCtaUrl: "/retreats",
    seoExcerpt:
      "Trinity Sunday — celebrating God as Father, Son, and Holy Spirit.",
  },
  "corpus-christi-the-most-holy-body-and-blood-of-christ": {
    phase1: true,
    descriptionTeen:
      "Corpus Christi is a Catholic feast celebrating the bread and wine of communion as the real presence of Jesus. In Spain and Latin America, streets fill with flower carpets and processions carrying the Blessed Sacrament under golden canopies — some of the most spectacular sights in world Christianity. In England it often falls on a Sunday. Eden lists pilgrimages to Rome and Catholic shrines where Corpus Christi processions draw huge crowds.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Experience Corpus Christi at the Vatican →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Corpus Christi — the Catholic feast of the Eucharist with processions worldwide.",
  },
  "assumption-of-the-blessed-virgin-mary-dormition-of-the-theotokos": {
    phase1: true,
    descriptionTeen:
      "On 15 August, Catholics and Orthodox Christians remember Mary, the mother of Jesus — Catholics celebrate her being taken up to heaven; Orthodox call it the Dormition (her 'falling asleep'). Mediterranean countries shut down for beach holidays; in Poland it is a public holiday called the Feast of the Assumption. Pilgrims flock to Lourdes and Knock. Eden lists Marian pilgrimages to Lourdes, Fatima, and other shrines across Europe.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Pilgrimages to Lourdes and Marian shrines →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "The Assumption of Mary — 15 August feast explained for teens.",
  },
  "immaculate-conception-of-the-blessed-virgin-mary": {
    phase1: true,
    descriptionTeen:
      "Catholics celebrate 8 December as the day Mary was conceived without original sin — nine months before her birthday on 8 September. It is a Holy Day of Obligation in many countries and marks the start of serious Christmas preparation. In the USA it is a public holiday; in the UK it is a normal working day but churches hold special Masses. Pilgrims visit Lourdes, where Mary appeared to St Bernadette. Eden lists Catholic pilgrimages across Europe.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Pilgrimages to Lourdes and Catholic shrines →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Immaculate Conception — what Catholics celebrate on 8 December.",
  },
  "pascha-orthodox-easter": {
    phase1: true,
    descriptionTeen:
      "Orthodox Easter — called Pascha — is often a week or two after the Easter you get off school, because Orthodox churches calculate the date using the older Julian calendar. At midnight, churches go dark, then a single candle lights thousands more as the priest shouts 'Christ is Risen!' Feasting follows weeks of strict fasting; in Greece and Russia it is the biggest celebration of the year. Same event as Western Easter — different calendar, just like families celebrating New Year on different dates.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Orthodox Easter pilgrimages to Greece and Jerusalem →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Orthodox Easter (Pascha) — why the date differs from Western Easter.",
  },
  "theophany-epiphany-orthodox": {
    phase1: true,
    descriptionTeen:
      "For Orthodox Christians, 6 January (or 19 January in some traditions) is Theophany — when God appeared at Jesus's baptism in the Jordan River. Priests bless water by throwing a cross into rivers; brave swimmers dive in to retrieve it. Houses are blessed with holy water for the year. It is as big as Christmas in many Eastern countries. Eden lists pilgrimages to Greece, the Holy Land, and Eastern Europe for Theophany.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Explore Theophany pilgrimages →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Orthodox Theophany — baptism of Christ and the blessing of waters.",
  },
  "transfiguration-of-the-lord": {
    phase1: true,
    descriptionTeen:
      "The Transfiguration remembers the day Jesus glowed with divine light on a mountain before three disciples — Moses and Elijah appeared beside him. Orthodox and Catholic churches celebrate it on 6 August with outdoor liturgies and blessings of grapes and honey. Mount Tabor in Israel is the traditional site. Armenian Christians celebrate a separate water festival called Vardavar on a different date. Eden lists Holy Land pilgrimages that include Mount Tabor.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Holy Land pilgrimages including Mount Tabor →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "The Transfiguration — when Jesus appeared in glory on the mountain.",
  },
  "transfiguration-vardavar": {
    phase1: true,
    descriptionTeen:
      "Vardavar is Armenia's most fun church holiday — officially the Transfiguration, but everyone knows it as the day you soak strangers with water and nobody minds. Rose-water is blessed in church; then water fights break out in streets and parks across the country. The tradition comes from an ancient summer festival that the church baptised into Christianity. If you want to experience one of the world's most joyful Christian holidays, Eden lists tours to Armenia.",
    didYouKnow:
      "In Armenia, it is completely acceptable — and considered good luck — to drench total strangers with water on Vardavar Sunday. Priests bless rose-water during the service; the rest goes in water guns.",
    edenCtaCategory: "tours",
    edenCtaLabel: "Plan a trip to Armenia for Vardavar →",
    edenCtaUrl: "/tours",
    seoExcerpt:
      "Vardavar — Armenia's water-fight Transfiguration festival explained.",
  },
  "reformation-day-reformation-sunday": {
    phase1: true,
    descriptionTeen:
      "On 31 October 1517, Martin Luther nailed a list of 95 complaints about the church to a door in Germany — and accidentally started one of the biggest religious upheavals in history. Lutherans and many Protestants still celebrate Reformation Day with red vestments, Luther hymns, and thanksgiving for the Bible in ordinary language. It shares a date with Halloween, but the focus is church history, not ghosts. Eden lists tours along the Reformation trail in Germany.",
    didYouKnow:
      "On Halloween 1517, Martin Luther nailed his 95 Theses to a church door in Wittenberg — the event that sparked the Protestant Reformation.",
    edenCtaCategory: "tours",
    edenCtaLabel: "Follow the Reformation trail in Germany →",
    edenCtaUrl: "/tours",
    seoExcerpt:
      "Reformation Day — Martin Luther, 31 October, and the birth of Protestantism.",
  },
  "all-souls-day-commemoration-of-the-faithful-departed": {
    phase1: true,
    descriptionTeen:
      "The day after All Saints', Catholics and others pray for everyone who has died — especially those still on a journey to heaven in Catholic teaching. Cemeteries fill with candles and chrysanthemums across Europe; in Mexico it merges with the colourful Día de Muertos. It is quieter than All Saints' but deeply personal — families visit graves and remember loved ones. Eden lists retreat centres that offer remembrance services and grief support.",
    edenCtaCategory: "retreats",
    edenCtaLabel: "Find a remembrance retreat →",
    edenCtaUrl: "/retreats",
    seoExcerpt:
      "All Souls' Day — praying for the dead on 2 November.",
  },
  "presentation-of-the-lord-candlemas": {
    phase1: true,
    descriptionTeen:
      "Candlemas on 2 February marks 40 days after Christmas, when Mary and Joseph brought baby Jesus to the Temple in Jerusalem. Churches bless candles that families keep all year for storms and emergencies. In the UK it was once the day to pack away Christmas decorations — 'If Candlemas be fair and bright, winter has another flight.' Snowdrops are called Candlemas bells. Eden lists quiet February retreats when Christmas is over but Lent has not yet begun.",
    edenCtaCategory: "retreats",
    edenCtaLabel: "Browse UK retreat centres →",
    edenCtaUrl: "/retreats",
    seoExcerpt:
      "Candlemas — 2 February, blessed candles, and the end of Christmas.",
  },
  "annunciation-of-the-lord": {
    phase1: true,
    descriptionTeen:
      "Nine months before Christmas, Christians remember the day the angel Gabriel told Mary she would become the mother of Jesus — celebrated on 25 March. It is a major feast in Catholic and Orthodox calendars and a public holiday in some countries. Artists from Leonardo da Vinci to countless school nativity plays have depicted the scene. Pilgrims visit Nazareth, where tradition says the announcement took place. Eden lists Holy Land tours that include Nazareth.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Holy Land pilgrimages to Nazareth →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "The Annunciation — when Mary learned she would have Jesus, on 25 March.",
  },
  "nativity-of-st-john-the-baptist": {
    phase1: true,
    descriptionTeen:
      "John the Baptist — the wild preacher who baptised Jesus in the Jordan — gets one of only three birthdays celebrated in the church calendar (along with Jesus and Mary). His feast is 24 June, near the summer solstice, with bonfires in some countries echoing older midsummer traditions. Orthodox churches often celebrate in July on the Julian calendar. Eden lists Jordan River pilgrimages where you can visit baptism sites linked to John.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Jordan River and Holy Land pilgrimages →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Nativity of John the Baptist — 24 June feast of Jesus's cousin.",
  },
  "sts-peter-and-paul": {
    phase1: true,
    descriptionTeen:
      "Peter and Paul were the two giants of the early church — a fisherman who denied Jesus then became the first Pope, and a persecutor who became Christianity's greatest missionary. Catholics celebrate them together on 29 June with special Mass at St Peter's Basilica in Rome. It is a public holiday in Rome; fireworks light the Tiber. Both were martyred in Rome under Emperor Nero. Eden lists pilgrimages to Rome and the Vatican.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Pilgrimages to Rome and the Vatican →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Saints Peter and Paul — 29 June feast of the apostles of Rome.",
  },
  "timkat-ethiopian-epiphany": {
    phase1: true,
    descriptionTeen:
      "Timkat is Ethiopia's most spectacular festival — a three-day celebration of Jesus's baptism with processions, chanting, and holy water everywhere. Priests carry a replica of the Ark of the Covenant (called a Tabot) under embroidered cloth so holy that no one may look directly at it. Pilgrims dress in white and follow through the streets all night. Gondar's royal baths host the most famous celebration. Eden lists mission and voluntourism trips to Ethiopia.",
    didYouKnow:
      "At Timkat in Ethiopia, priests carry a replica of the Ark of the Covenant through the streets all night, covered in embroidered cloth so holy that no one can look directly at it.",
    edenCtaCategory: "missions",
    edenCtaLabel: "See the real Timkat festival — mission trips to Ethiopia →",
    edenCtaUrl: "/missions",
    seoExcerpt:
      "Timkat — Ethiopia's Epiphany festival with the Ark of the Covenant.",
  },
  "meskel-finding-of-the-true-cross": {
    phase1: true,
    descriptionTeen:
      "Every year in September, huge bonfires called Demera light up Ethiopia to remember when St Helena supposedly found the cross Jesus died on. The bonfire at Meskel Square in Addis Ababa is enormous — tradition says the direction the smoke blows predicts the coming year. After the fire dies, people mark their foreheads with ash. UNESCO lists Meskel as world cultural heritage. Eden lists mission trips where you can witness Meskel firsthand.",
    didYouKnow:
      "The bonfire lit at Meskel in Addis Ababa is so large it is visible from space — and tradition says the direction the smoke blows tells you if the coming year will be good.",
    edenCtaCategory: "missions",
    edenCtaLabel: "Mission trips to Ethiopia for Meskel →",
    edenCtaUrl: "/missions",
    seoExcerpt:
      "Meskel — Ethiopia's bonfire festival and the True Cross.",
  },
  "coptic-christmas-nativity-eid-al-milad": {
    phase1: true,
    descriptionTeen:
      "Egypt's Coptic Christians celebrate Christmas on 7 January after 43 days of fasting — one of the oldest Christian communities in the world. Midnight liturgies last for hours; families break the fast with feasts of fata and kahk biscuits. About 10–15 million Copts live in Egypt today. The date follows the same ancient calendar as Orthodox Christmas. Eden lists pilgrimages and mission trips to Egypt.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Pilgrimages and missions to Egypt →",
    edenCtaUrl: "/missions",
    seoExcerpt:
      "Coptic Christmas on 7 January — Egypt's ancient Christian celebration.",
  },
  "our-lady-of-guadalupe": {
    phase1: true,
    descriptionTeen:
      "On 12 December, millions of Mexicans celebrate Our Lady of Guadalupe — when Mary appeared to an indigenous convert named Juan Diego in 1531, leaving her image on his cloak. Pilgrims crawl for miles to her basilica in Mexico City; the shrine is the most visited Catholic site in the Americas. The image is a symbol of Mexican identity as much as faith. Eden lists tours to Mexico and Latin American pilgrimage sites.",
    edenCtaCategory: "tours",
    edenCtaLabel: "Tours to Mexico and Latin America →",
    edenCtaUrl: "/tours",
    seoExcerpt:
      "Our Lady of Guadalupe — Mexico's 12 December Marian feast.",
  },
  "our-lady-of-fatima": {
    phase1: true,
    descriptionTeen:
      "On 13 May 1917, three shepherd children in Portugal said the Virgin Mary appeared to them with messages of prayer and peace — and 70,000 people later claimed to see the sun dance in the sky. Fátima is now one of the world's most visited shrines, drawing millions of pilgrims each year, especially on the 13th of each month from May to October. Eden lists pilgrimages to Fátima, Lourdes, and Catholic shrines across Europe.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Pilgrimages to Fátima and Lourdes →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Our Lady of Fátima — the 1917 apparitions and Portugal's great shrine.",
  },
  "our-lady-of-f-tima": {
    phase1: true,
    descriptionTeen:
      "On 13 May 1917, three shepherd children in Portugal said the Virgin Mary appeared to them with messages of prayer and peace — and 70,000 people later claimed to see the sun dance in the sky. Fátima is now one of the world's most visited shrines, drawing millions of pilgrims each year, especially on the 13th of each month from May to October. Eden lists pilgrimages to Fátima, Lourdes, and Catholic shrines across Europe.",
    edenCtaCategory: "pilgrimages",
    edenCtaLabel: "Pilgrimages to Fátima and Lourdes →",
    edenCtaUrl: "/pilgrimages",
    seoExcerpt:
      "Our Lady of Fátima — the 1917 apparitions and Portugal's great shrine.",
  },
  "st-patrick-bishop-of-ireland": {
    phase1: true,
    descriptionTeen:
      "St Patrick's Day on 17 March celebrates the missionary who brought Christianity to Ireland — famously explaining the Trinity with a shamrock. What started as a church feast is now a global party with parades, green everything, and Irish culture on display from Dublin to New York. Lent fasting rules are traditionally relaxed in Ireland for the day. Eden lists pilgrimages to Ireland, Iona, and Celtic Christian sites across the UK.",
    edenCtaCategory: "tours",
    edenCtaLabel: "Pilgrimages to Ireland and Iona →",
    edenCtaUrl: "/tours",
    seoExcerpt:
      "St Patrick's Day — Ireland's patron saint and 17 March celebrations.",
  },
  "st-george-martyr": {
    phase1: true,
    descriptionTeen:
      "St George — the soldier saint who slayed a dragon in legend — is patron saint of England, Georgia, Ethiopia, and many other places. His feast on 23 April is England's national day, with flags, morris dancing, and church services, though it is not a bank holiday. The red cross on England's flag is St George's Cross. Eden lists UK pilgrimage routes including St George's Way and Celtic Christian trails.",
    edenCtaCategory: "tours",
    edenCtaLabel: "UK pilgrimage and heritage tours →",
    edenCtaUrl: "/tours",
    seoExcerpt:
      "St George's Day — 23 April, England's patron saint.",
  },
  "simbang-gabi-philippines": {
    phase1: true,
    descriptionTeen:
      "From 16 December, Filipino Catholics attend pre-dawn Mass for nine straight days — starting as early as 4am — called Simbang Gabi. Outside churches, vendors sell rice cakes and hot chocolate to worshippers who have walked there in the dark. Completing all nine Masses is said to bring a special blessing. The Philippines arguably has the world's longest Christmas season — it unofficially starts in September. Eden lists cultural tours and self-catering stays in the Philippines.",
    didYouKnow:
      "The Philippines arguably has the longest Christmas in the world — it unofficially starts in September when the 'ber months' begin. The most dedicated Simbang Gabi attendees start going to 4am Masses on December 16.",
    edenCtaCategory: "self-catering",
    edenCtaLabel: "Browse faith-aligned travel →",
    edenCtaUrl: "/self-catering",
    seoExcerpt:
      "Simbang Gabi — the Philippines' nine-day pre-dawn Christmas Masses.",
  },
  "las-posadas-mexico-latin-america": {
    phase1: true,
    descriptionTeen:
      "For nine nights before Christmas, Mexican communities re-enact Mary and Joseph searching for a room in Bethlehem — singing call-and-response songs from house to house until someone lets them in. Piñatas, hot ponche, and tamales follow. The tradition dates to colonial Mexico and blends Catholic story with local culture. Las Posadas is one of the warmest, most community-focused Christmas customs in the world. Eden lists tours to Mexico and Latin America.",
    edenCtaCategory: "tours",
    edenCtaLabel: "Tours to Mexico and Latin America →",
    edenCtaUrl: "/tours",
    seoExcerpt:
      "Las Posadas — Mexico's nine-night Christmas journey tradition.",
  },
  "christ-the-king-our-lord-jesus-christ-king-of-the-universe": {
    phase1: true,
    descriptionTeen:
      "Christ the King Sunday closes the church year on the last Sunday before Advent — celebrating Jesus as ruler over all creation, politics, and history. It was started in 1925 when fascism was rising in Europe. Churches crown statues of Christ and preach about justice and hope. It is a modern feast but now observed across Catholic, Anglican, and Lutheran churches worldwide. Eden lists Advent retreats that begin the following week.",
    edenCtaCategory: "retreats",
    edenCtaLabel: "Find an Advent retreat →",
    edenCtaUrl: "/retreats",
    seoExcerpt:
      "Christ the King — the final Sunday of the church year before Advent.",
  },
  "feast-of-st-francis-of-assisi": {
    phase1: true,
    descriptionTeen:
      "On 4 October, Christians remember St Francis of Assisi — the saint who talked to birds, embraced poverty, and created the first Christmas crib scene in a cave in 1223. Churches hold pet blessings; environmental groups mark it as a day for creation care. Francis is one of the most loved figures in Christianity across all denominations. Eden lists retreats in nature-focused centres inspired by Franciscan spirituality.",
    edenCtaCategory: "retreats",
    edenCtaLabel: "Find a nature retreat →",
    edenCtaUrl: "/retreats",
    seoExcerpt:
      "St Francis of Assisi — 4 October feast, pet blessings, and care for creation.",
  },
};

/** Synthetic entry not in catalogue as standalone. */
export const ORTHODOX_CHRISTMAS_ENTRY = {
  id: "orthodox-christmas-january-7",
  name: "Orthodox Christmas (January 7)",
  alsoKnownAs: ["Julian Calendar Christmas", "Russian Christmas", "Рождество"],
  dateType: "fixed" as const,
  dateFixed: "01-07",
  dateRule: "January 7 (Gregorian calendar)",
  type: "major-feast",
  denominations: ["eastern-orthodox", "russian-orthodox", "ethiopian-orthodox", "coptic-orthodox"],
  seasons: ["christmas"],
  regions: ["eastern-europe", "russia-slavic", "ethiopia", "global"],
  themes: ["incarnation"],
  liturgicalColor: ["White", "Gold"],
  isPublicHoliday: true,
  publicHolidayCountries: ["RU", "RS", "UA"],
  descriptionTeen: PHASE1_OVERRIDES["orthodox-christmas-january-7"].descriptionTeen,
  didYouKnow: PHASE1_OVERRIDES["orthodox-christmas-january-7"].didYouKnow,
  edenCtaCategory: "pilgrimages",
  edenCtaLabel: PHASE1_OVERRIDES["orthodox-christmas-january-7"].edenCtaLabel,
  edenCtaUrl: "/pilgrimages",
  imageAlt: "Orthodox Christmas celebration with candles and icons",
  seoExcerpt: PHASE1_OVERRIDES["orthodox-christmas-january-7"].seoExcerpt,
  phase1: true,
};
