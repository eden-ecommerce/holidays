/**
 * Per-project deploy origins.
 *
 * Public config — safe in the client bundle. Hardcode production URLs before deploy.
 * Private secrets (API keys, tokens, etc.) belong in `.env` — see `@lib/env-server`.
 *
 * The app uses Next.js `basePath: "/christian-holidays"` so assets and routes
 * resolve correctly on every environment without assetPrefix juggling.
 *
 * Origin strategy:
 *  - Production (VERCEL_ENV === "production"): served via the Cloudflare Worker
 *    at https://www.eden.co.uk/christian-holidays. The Vercel origin for this
 *    project is https://holidays-khaki.vercel.app — used for server-side API
 *    calls that must not go through the Worker.
 *  - Preview (VERCEL_ENV === "preview"): direct Vercel preview URL.
 *  - Development: localhost.
 */

/** The Cloudflare-proxied production domain (for metadata / OG URLs only). */
export const PRODUCTION_ORIGIN = "https://www.eden.co.uk";

/** The canonical Vercel project URL (used for server-side API calls in production). */
export const VERCEL_PRODUCTION_ORIGIN = "https://holidays-khaki.vercel.app";

/** Dev origin for absolute URL construction outside Next.js context. */
export const DEV_ORIGIN = "http://localhost:3000";

// Kept for any legacy callers that still import these names.
export const ASSET_PRODUCTION_ORIGIN = PRODUCTION_ORIGIN;
export const ASSET_DEV_ORIGIN = DEV_ORIGIN;
export const API_PRODUCTION_ORIGIN = VERCEL_PRODUCTION_ORIGIN;
export const API_DEV_ORIGIN = DEV_ORIGIN;

/**
 * Base URL for static asset references (metadata, OG images).
 * Uses the Cloudflare-proxied domain in production so OG image URLs are
 * absolute to www.eden.co.uk as expected by crawlers.
 */
export const ASSET_BASE_URL =
  process.env.VERCEL_ENV === "production"
    ? PRODUCTION_ORIGIN
    : process.env.VERCEL_ENV === "preview"
      ? `https://${process.env.VERCEL_URL}`
      : DEV_ORIGIN;

/**
 * Base URL for this app's own API routes.
 * Uses the direct Vercel origin (not the Worker proxy) so server-side fetch
 * calls resolve correctly without going through Cloudflare.
 */
export const API_BASE_URL =
  process.env.VERCEL_ENV === "production"
    ? VERCEL_PRODUCTION_ORIGIN
    : process.env.VERCEL_ENV === "preview"
      ? `https://${process.env.VERCEL_URL}`
      : DEV_ORIGIN;
