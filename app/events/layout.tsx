import { EventsLocationProvider } from "@components/events/EventsLocationProvider";
import { FavouritesLink } from "@components/events/FavouritesLink";
import { getCloudflareLocation } from "@lib/location/get-cloudflare-location.server";
import { NAMESPACE_PATH } from "@lib/config";

export const dynamic = "force-dynamic";

export default async function EventsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const serverLocation = await getCloudflareLocation();

  return (
    <EventsLocationProvider serverLocation={serverLocation}>
      {/* Favourites bar — only visible when the user has saved events */}
      <div className="border-b border-border bg-rose-50">
        <div className="mx-auto flex max-w-7xl items-center justify-end px-4 py-2 sm:px-6 lg:px-8">
          <FavouritesLink href={`${NAMESPACE_PATH}/favourites`} />
        </div>
      </div>
      {children}
    </EventsLocationProvider>
  );
}
