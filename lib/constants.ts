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

/** REPLACE: asset + `_next/static` origin */
export const ASSET_PRODUCTION_ORIGIN =
  "https://events-snowy-phi.vercel.app/events";
export const ASSET_DEV_ORIGIN = "http://localhost:3000";

/** REPLACE: API origin (may differ from assets) */
export const API_PRODUCTION_ORIGIN =
  "https://events-snowy-phi.vercel.app/events";
export const API_DEV_ORIGIN = "http://localhost:3000";

// When running on Vercel (preview or production), use the deployment's own
// URL so that assetPrefix resolves correctly regardless of which preview URL
// is assigned. This fixes the v0 preview iframe ("content blocked") which
// receives a different hostname on every deployment.
const vercelUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

export const ASSET_BASE_URL =
  process.env.NODE_ENV === "production"
    ? (vercelUrl ?? ASSET_PRODUCTION_ORIGIN)
    : ASSET_DEV_ORIGIN;

export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? (vercelUrl ?? API_PRODUCTION_ORIGIN)
    : API_DEV_ORIGIN;
