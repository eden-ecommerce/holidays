import { NsLink } from "@components/ns-link";
import { NAMESPACE_PATH } from "@lib/config";
import { Search, ShoppingBag, User } from "lucide-react";

const PRIMARY_LINKS = [
  { text: "Bibles", href: "https://www.eden.co.uk/bibles" },
  { text: "Books", href: "https://www.eden.co.uk/books" },
  { text: "Music", href: "https://www.eden.co.uk/music-and-film" },
  { text: "Gifts", href: "https://www.eden.co.uk/gifts" },
  { text: "Church Supplies", href: "https://www.eden.co.uk/church-supplies" },
  { text: "Events", href: NAMESPACE_PATH, internal: true },
];

/** Eden.co.uk-style chrome: promo strip + brand row + green primary nav. */
export function EdenHeader() {
  return (
    <header className="bg-background">
      {/* Promo strip */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-1.5 text-center text-xs font-medium sm:text-sm">
          Free UK delivery on orders over £25 — supporting churches and charities since 1989
        </div>
      </div>

      {/* Brand row */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4">
          <a
            href="https://www.eden.co.uk"
            className="shrink-0 text-2xl font-bold tracking-tight text-primary"
            aria-label="Eden home"
          >
            eden
            <span className="text-foreground">.co.uk</span>
          </a>

          <form
            action={`${NAMESPACE_PATH}/search`}
            className="relative ml-2 hidden flex-1 items-center md:flex"
            role="search"
          >
            <input
              type="search"
              name="q"
              placeholder="Search Christian events near you…"
              aria-label="Search events"
              className="h-10 w-full rounded-full border border-border bg-card pl-4 pr-10 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
            <button
              type="submit"
              aria-label="Submit search"
              className="absolute right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          <div className="ml-auto flex items-center gap-5 md:ml-0">
            <a
              href="https://www.eden.co.uk/account"
              className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary"
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Account</span>
            </a>
            <a
              href="https://www.eden.co.uk/shop/basket.php"
              className="flex items-center gap-1.5 text-sm text-foreground hover:text-primary"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:inline">Basket</span>
            </a>
          </div>
        </div>
      </div>

      {/* Primary green nav */}
      <nav className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-2 sm:px-4">
          {PRIMARY_LINKS.map((link) =>
            link.internal ? (
              <NsLink
                key={link.text}
                href={link.href}
                className="whitespace-nowrap px-3 py-2.5 text-sm font-medium underline-offset-4 hover:underline"
              >
                {link.text}
              </NsLink>
            ) : (
              <a
                key={link.text}
                href={link.href}
                className="whitespace-nowrap px-3 py-2.5 text-sm font-medium underline-offset-4 hover:underline"
              >
                {link.text}
              </a>
            ),
          )}
        </div>
      </nav>
    </header>
  );
}
