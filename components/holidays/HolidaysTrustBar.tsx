const TRUST_ITEMS = [
  { value: "80+", label: "Vetted providers" },
  { value: "6", label: "Holiday categories" },
  { value: "20+", label: "Pilgrimage destinations" },
  { value: "27M+", label: "UK Christians served" },
];

export function HolidaysTrustBar() {
  return (
    <div className="border-b border-border bg-secondary/50">
      <ul className="mx-auto flex max-w-5xl flex-wrap items-center justify-center divide-x divide-border px-4 py-3">
        {TRUST_ITEMS.map((item) => (
          <li key={item.label} className="flex items-baseline gap-1.5 px-5 py-2">
            <span className="text-lg font-bold text-primary">{item.value}</span>
            <span className="text-sm text-muted-foreground">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
