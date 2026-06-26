import { EdenLogo } from "@components/common/EdenLogo";

const FOOTER_COLUMNS = [
  {
    heading: "Find a Holiday",
    links: [
      { text: "The Christian Calendar", href: "https://www.eden.co.uk/christian-holidays/calendar" },
      { text: "Retreat Centres", href: "https://www.eden.co.uk/christian-holidays/retreats" },
      { text: "Tour Operators", href: "https://www.eden.co.uk/christian-holidays/tours" },
      { text: "Pilgrimages", href: "https://www.eden.co.uk/christian-holidays/pilgrimages" },
      { text: "Youth Camps", href: "https://www.eden.co.uk/christian-holidays/youth" },
      { text: "Festivals & Events", href: "https://www.eden.co.uk/christian-holidays/festivals" },
    ],
  },
  {
    heading: "Help & Info",
    links: [
      { text: "About Eden", href: "https://www.eden.co.uk/about" },
      { text: "Help & support", href: "https://www.eden.co.uk/help" },
      { text: "Privacy policy", href: "https://www.eden.co.uk/privacy" },
      { text: "Modern slavery", href: "https://www.eden.co.uk/modern-slavery" },
    ],
  },
  {
    heading: "Explore Eden",
    links: [
      { text: "Eden blog", href: "https://www.eden.co.uk/blog" },
      { text: "Christian Books", href: "https://www.eden.co.uk/books" },
      { text: "Christian Events", href: "https://www.eden.co.uk/events" },
      { text: "Christian Jobs", href: "https://www.eden.co.uk/jobs" },
      { text: "Contact us", href: "https://www.eden.co.uk/contact" },
    ],
  },
  {
    heading: "List with Us",
    links: [
      { text: "List your accommodation", href: "https://hub.eden.co.uk/dashboard/event-journey" },
      { text: "List your tour", href: "https://hub.eden.co.uk/dashboard/event-journey" },
      { text: "Christian360.com", href: "https://christian360.com" },
      { text: "Christian.events", href: "https://christian.events" },
    ],
  },
];

const STATS = [
  { value: "22 years", label: "Serving UK Church" },
  { value: "80+", label: "Holiday Providers" },
  { value: "3,500,000+", label: "Visitors / year" },
  { value: "27.5M", label: "UK Christians" },
  { value: "20+", label: "Pilgrimage routes" },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-[#f5f5f0] text-foreground">
      {/* Main link grid */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1">
            <a href="https://www.eden.co.uk" aria-label="Eden home">
              <EdenLogo className="h-12 w-auto" />
            </a>
            <p className="mt-3 max-w-[180px] text-xs leading-relaxed text-muted-foreground">
              The UK&apos;s trusted directory for Christian holidays, retreats, pilgrimages and faith-aligned breaks.
            </p>
          </div>

          {/* Four link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-sm font-semibold text-foreground">{col.heading}</h2>
              <ul className="mt-3 flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <ul className="flex flex-wrap justify-center gap-x-10 gap-y-4 sm:justify-between">
            {STATS.map((s) => (
              <li key={s.label} className="text-center">
                <p className="text-lg font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-gray-200 bg-[#1a3d2b] px-4 py-4 text-center">
        <p className="text-xs text-white/70">
          &copy; {new Date().getFullYear()} Eden.co.uk. Holiday and accommodation details are provided for information only. Always confirm directly with the provider before booking.
        </p>
      </div>
    </footer>
  );
}
