import { EdenHeader } from "@components/common/EdenHeader";
import { Footer } from "@components/common/Footer";
import { QueryProvider } from "@providers/query-provider";
import { EventsLocationProvider } from "@components/events/EventsLocationProvider";
import { getCloudflareLocation } from "@lib/location/get-cloudflare-location.server";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@app/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DEFAULT_OG_IMAGE = "https://www.eden.co.uk/christian-holidays/og-default.png";

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

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serverLocation = await getCloudflareLocation();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} bg-background`}
    >
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <QueryProvider>
          <EventsLocationProvider serverLocation={serverLocation}>
            <EdenHeader />
            <div className="flex-1">{children}</div>
            <Footer />
          </EventsLocationProvider>
        </QueryProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
