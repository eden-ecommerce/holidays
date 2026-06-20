import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";
import { ALLOWED_ORIGIN, CORS_HEADERS } from "@lib/cors";

const nextConfig: NextConfig = {
  // Mount the entire app under /christian-holidays. Next.js automatically
  // prepends this to all routes, _next/static assets, and <Link> hrefs — no
  // assetPrefix or manual path juggling required. The Cloudflare Worker that
  // proxies www.eden.co.uk/christian-holidays/* to this Vercel deployment
  // works correctly with basePath out of the box.
  basePath: "/christian-holidays",
  // Expose SENTRY_DATASET to client bundles at build time (not a secret).
  env: {
    SENTRY_DATASET: process.env.SENTRY_DATASET ?? "",
  },
  experimental: {
    optimizePackageImports: ["@sentry/nextjs"],
  },
  transpilePackages: [
    "@algolia/client-common",
    // TEMPORARILY DISABLED: private @christian-360/* packages (unreachable
    // registry). Re-enable when the packages are wired back in.
    // "@christian-360/next-design",
    // "@christian-360/sanity",
  ],
  // v0 iterates quickly — builds tolerate TS errors during dev.
  // Before deploy: run `pnpm predeploy` (ts-check + lint + build) and fix all errors.
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "*.amazonaws.com" },
    ],
  },
  async headers() {
    return [
      {
        // With basePath, Next.js source patterns are relative to the basePath.
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: ALLOWED_ORIGIN },
          {
            key: "Access-Control-Allow-Methods",
            value: CORS_HEADERS["Access-Control-Allow-Methods"],
          },
          {
            key: "Access-Control-Allow-Headers",
            value: CORS_HEADERS["Access-Control-Allow-Headers"],
          },
        ],
      },
    ];
  },
};

const hasSentryBuildCredentials =
  process.env.SENTRY_ORG &&
  process.env.SENTRY_PROJECT &&
  process.env.SENTRY_AUTH_TOKEN;

export default hasSentryBuildCredentials
  ? withSentryConfig(nextConfig, {
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      widenClientFileUpload: true,
      disableLogger: true,
      reactComponentAnnotation: {
        enabled: false,
      },
      bundleSizeOptimizations: {
        excludeDebugStatements: true,
        excludeTracing: true,
        excludeReplayIframe: true,
        excludeReplayShadowDom: true,
        excludeReplayWorker: true,
      },
    })
  : nextConfig;
