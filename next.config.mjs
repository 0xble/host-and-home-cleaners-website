import withBundleAnalyzer from '@next/bundle-analyzer'
import { withSentryConfig } from '@sentry/nextjs'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = bundleAnalyzer({
  // Your Next.js config options here if needed
  sentry: {
    hideSourceMaps: true,
  },

  // Add webpack configuration to fix the "name too long" caching errors
  webpack: (config, { dev }) => {
    // Only modify cache settings for production builds
    // In development, Next.js requires memory caching
    if (config.cache && !dev) {
      // Make sure we don't override critical properties
      const originalCachePredicate = config.cache.cachePredicate

      // Add a filter to exclude problematic caniuse-lite paths
      config.cache.cachePredicate = (module) => {
        // Run original predicate first if it exists
        if (originalCachePredicate && !originalCachePredicate(module)) {
          return false
        }

        // Skip caching for deeply nested caniuse-lite paths
        if (module && module.resource
          && module.resource.includes('node_modules')
          && module.resource.includes('caniuse-lite')
          && module.resource.length > 150) {
          return false
        }

        return true
      }
    }

    // Disable caching warnings in webpack
    if (dev) {
      // Suppress the specific name-too-long warning
      config.infrastructureLogging = {
        ...config.infrastructureLogging,
        level: 'error', // Only show errors, not warnings
      }
    }

    return config
  },
})

// Sentry webpack plugin options
const sentryWebpackPluginOptions = {
  silent: true,
}

// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const sentryOptions = {
  org: 'great-expectations-llc',
  project: 'host-and-home-cleaners-website',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,

  // Disable Sentry telemetry
  telemetry: false,
}

// Make sure to add withSentryConfig as the last wrapper
export default withSentryConfig(
  nextConfig,
  sentryWebpackPluginOptions,
  sentryOptions,
)
