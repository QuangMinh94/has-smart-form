/** @type {import('next').NextConfig} */
const nextConfig = {
    output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
    reactStrictMode: false,
    async redirects() {
        return [
            {
                source: "/",
                destination: "/bu",
                permanent: true
            },
            {
                source: "/users/bu",
                destination: "/users/bu/mywork",
                permanent: true
            },

            {
                source: "/users/teller",
                destination: "/users/teller/mywork",
                permanent: true
            },
            /*  {
        source: '/mywork',
        destination: '/teller/mywork',
        permanent: true,
      }, */

            {
                source: "/users/ksvteller",
                destination: "/users/ksvteller/mywork",
                permanent: true
            },
            {
                source: "/users/ba",
                destination: "/users/ba/block",
                permanent: true
            },
            {
                source: "/users/administrator",
                destination: "/users/administrator/user",
                permanent: true
            }
        ]
    }
}

module.exports = nextConfig

// Injected content via Sentry wizard below

/* const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "hpt-hl",
    project: "has-smart-form",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
); */
