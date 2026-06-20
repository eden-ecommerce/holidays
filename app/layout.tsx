import { EdenHeader } from "@components/common/EdenHeader";
import { Footer } from "@components/common/Footer";
import { QueryProvider } from "@providers/query-provider";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Default OG image used when a page doesn't supply its own.
// Absolute URL required by the OG spec — metadataBase resolves relative paths.
const DEFAULT_OG_IMAGE = "https://www.eden.co.uk/events/og-default.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.eden.co.uk"),
  title: {
    default: "Christian Holidays | Faith-Based Breaks & Retreats | Eden.co.uk",
    template: "%s | Christian Holidays",
  },
  description:
    "Discover Christian holidays, retreats, pilgrimages, youth camps and festivals across the UK. Find faith-aligned accommodation and tour operators trusted by UK Christians.",
  openGraph: {
    siteName: "Christian Holidays — Eden.co.uk",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Christian Holidays — Eden.co.uk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@edencouk",
    images: [DEFAULT_OG_IMAGE],
  },
  icons: {
    icon: "https://www.eden.co.uk/favicon.ico",
    shortcut: "https://www.eden.co.uk/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#1a3d2b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <QueryProvider>
          <EdenHeader />
          <div className="flex-1">{children}</div>
          <Footer />
        </QueryProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
