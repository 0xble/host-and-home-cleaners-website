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
