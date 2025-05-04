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

  // Configure allowed image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.tally.so',
        pathname: '/private/**',
      },
      {
        protocol: 'https',
        hostname: 's3-media0.fl.yelpcdn.com',
        pathname: '/**',
      },
    ],
  },

  // PostHog rewrites
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
      {
        source: '/ingest/decide',
        destination: 'https://us.i.posthog.com/decide',
      },
    ]
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,

  // Add webpack configuration to fix the "name too long" caching errors
  webpack: (config, { dev }) => {
    // Add rule for video files
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      type: 'asset/resource',
    })

    // Only modify cache settings for production builds
    if (!dev && config.cache) {
      // For production builds, ensure we're using filesystem cache with proper type
      if (typeof config.cache === 'object') {
        // Ensure cache type is properly set
        config.cache = {
          type: 'memory',
          ...config.cache,
          // Use filesystem filtering instead of modifying cache predicate
        }
      }

      // Add a rule to the module rules to ignore problematic caniuse-lite paths
      config.module.rules.push({
        test: (resource) => {
          return resource
            && resource.includes('node_modules')
            && resource.includes('caniuse-lite')
            && resource.length > 150
        },
        // Use noop loader for these files
        use: 'null-loader',
        // Ensure this rule has lower priority
        sideEffects: false,
      })
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
