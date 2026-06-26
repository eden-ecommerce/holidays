"use client";

import { EdenLogo } from "@components/common/EdenLogo";
import { HeaderSearch } from "@components/common/HeaderSearch";
import { NsLink } from "@components/ns-link";
import { NAMESPACE_PATH } from "@lib/config";
import { HelpCircle, User, Phone, Cross } from "lucide-react";

const NAV_LINKS = [
  { text: "All Holidays", href: NAMESPACE_PATH, internal: true },
  { text: "The Christian Calendar", href: `${NAMESPACE_PATH}/calendar`, internal: true, badge: "New" },
  { text: "Retreats & Centres", href: `${NAMESPACE_PATH}/retreats`, internal: true },
  { text: "Tour Operators", href: `${NAMESPACE_PATH}/tours`, internal: true },
  { text: "Pilgrimages", href: `${NAMESPACE_PATH}/pilgrimages`, internal: true },
  { text: "Youth & Activity", href: `${NAMESPACE_PATH}/youth`, internal: true },
  { text: "Festivals", href: `${NAMESPACE_PATH}/festivals`, internal: true },
  { text: "Self-Catering & B&Bs", href: `${NAMESPACE_PATH}/self-catering`, internal: true },
  { text: "Christian Books", href: "https://www.eden.co.uk/books" },
  { text: "Christian Events", href: "https://www.eden.co.uk/events" },
];

const USP_ITEMS = [
  { text: "Trusted by UK Christians since 2002" },
  { text: "Faith-aligned holidays, retreats & pilgrimages" },
  { text: "Serving over 2 million Christians in the UK" },
];

export function EdenHeader() {
  return (
    <header className="bg-white">
      {/* USP strip — dark green */}
      <div className="bg-[#1a3d2b] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center divide-x divide-white/20 px-4">
          {USP_ITEMS.map((item) => (
            <p key={item.text} className="px-4 py-2 text-center text-[11px] font-medium sm:text-xs">
              {item.text}
            </p>
          ))}
        </div>
      </div>

      {/* Brand row */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:py-4">
          {/* Logo */}
          <a href="https://www.eden.co.uk" className="shrink-0" aria-label="Eden home">
            <EdenLogo className="h-12 w-auto sm:h-14" />
          </a>

          {/* Live instant search */}
          <HeaderSearch />

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-3">
            <a
              href="https://www.eden.co.uk/help"
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-foreground hover:text-primary"
            >
              <HelpCircle className="h-5 w-5" aria-hidden="true" />
              <span className="hidden text-[11px] font-medium sm:block">Help</span>
            </a>

            <a
              href="https://www.eden.co.uk/account"
              className="flex flex-col items-center gap-0.5 px-2 py-1 text-foreground hover:text-primary"
            >
              <User className="h-5 w-5" aria-hidden="true" />
              <span className="hidden text-[11px] font-medium sm:block">Account</span>
            </a>
          </div>
        </div>
      </div>

      {/* Primary green nav */}
      <nav className="bg-primary text-primary-foreground shadow-sm" aria-label="Main navigation">
        <div className="mx-auto flex max-w-7xl items-center overflow-x-auto px-2 sm:px-4">
          {NAV_LINKS.map((link) =>
            link.internal ? (
              <NsLink
                key={link.text}
                href={link.href}
                className="relative shrink-0 whitespace-nowrap px-3 py-3 text-sm font-medium underline-offset-2 hover:underline"
              >
                {link.text}
                {"badge" in link && link.badge ? (
                  <span className="ml-1.5 rounded bg-white/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                    {link.badge}
                  </span>
                ) : null}
              </NsLink>
            ) : (
              <a
                key={link.text}
                href={link.href}
                className="shrink-0 whitespace-nowrap px-3 py-3 text-sm font-medium underline-offset-2 hover:underline"
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
