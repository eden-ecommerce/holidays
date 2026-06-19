/**
 * REPLACE: Per-project deploy origins.
 *
 * Public config — safe in the client bundle. Hardcode production URLs before deploy.
 * API and asset origins may differ. Dev always uses localhost:3000.
 *
 * Private secrets (API keys, tokens, etc.) belong in `.env` — see `@lib/env-server`.
 *
 * ASSET_BASE_URL drives `assetPrefix` in `next.config.ts` so `/_next/static/*`
 * and imported `@public/*` assets resolve correctly behind the Eden Cloudflare Worker.
 */

/**
 * The canonical public origin the app is served from behind the Cloudflare
 * Worker proxy.  All _next/static/* assets must be fetched relative to this
 * origin so the browser can reach them whether the user is on the proxied
 * domain or a Vercel preview URL.
 *
 * assetPrefix = ASSET_BASE_URL in next.config.ts, so every chunk URL becomes:
 *   https://www.eden.co.uk/events/_next/static/css/…
 * The Cloudflare Worker forwards /events/* to the Vercel deployment, so this
 * works both on the canonical domain and on preview URLs (the browser just
 * fetches assets through the proxy instead of directly from Vercel).
 *
 * DO NOT use VERCEL_URL here — that bypasses the proxy and breaks eden.co.uk.
 */
export const ASSET_PRODUCTION_ORIGIN = "https://www.eden.co.uk";
export const ASSET_DEV_ORIGIN = "";          // empty = same-origin in dev

export const API_PRODUCTION_ORIGIN = "https://www.eden.co.uk";
export const API_DEV_ORIGIN = "";

export const ASSET_BASE_URL =
  process.env.NODE_ENV === "production" ? ASSET_PRODUCTION_ORIGIN : ASSET_DEV_ORIGIN;

export const API_BASE_URL =
  process.env.NODE_ENV === "production" ? API_PRODUCTION_ORIGIN : API_DEV_ORIGIN;
