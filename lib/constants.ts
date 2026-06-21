/**
 * Per-project deploy origins.
 *
 * Public config — safe in the client bundle. Hardcode production URLs before deploy.
 * Private secrets (API keys, tokens, etc.) belong in `.env` — see `@lib/env-server`.
 *
 * The app uses Next.js `basePath: "/christian-holidays"` so assets, routes,
 * and API calls all resolve correctly on every environment (local, preview,
 * production) without any assetPrefix or origin-switching logic.
 */

/** Canonical production origin (used for absolute URLs in metadata/OG only). */
export const PRODUCTION_ORIGIN = "https://www.eden.co.uk";

/** Dev origin for absolute URL construction outside Next.js context. */
export const DEV_ORIGIN = "http://localhost:3000";

// Kept for any legacy callers that still import these names.
export const ASSET_PRODUCTION_ORIGIN = PRODUCTION_ORIGIN;
export const ASSET_DEV_ORIGIN = DEV_ORIGIN;
export const API_PRODUCTION_ORIGIN = PRODUCTION_ORIGIN;
export const API_DEV_ORIGIN = DEV_ORIGIN;

export const ASSET_BASE_URL =
  process.env.NODE_ENV === "production" ? PRODUCTION_ORIGIN : DEV_ORIGIN;

export const API_BASE_URL =
  process.env.NODE_ENV === "production" ? PRODUCTION_ORIGIN : DEV_ORIGIN;
