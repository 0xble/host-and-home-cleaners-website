// src/app/layout.tsx
import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import { PostHogProvider } from '@/components/PostHogProvider'

import CookieConsent from '@/components/CookieConsent'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { Toaster } from '@/components/ui/toaster'
import { PixelInitializer } from '@/lib/pixel'
import { getBaseUrl } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  manifest: '/site.webmanifest',
  appleWebApp: {
    title: 'Host & Home Cleaners',
    capable: true,
    statusBarStyle: 'default',
  },
  icons: {
    icon: [
      { url: '/favicons/favicon.ico' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicons/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'web-app-manifest',
        url: '/favicons/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        rel: 'web-app-manifest',
        url: '/favicons/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  },
  openGraph: {
    type: 'website',
    images: '/home/1.jpg',
    url: './',
  },
}

export type LayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <PostHogProvider>
          {/* Main Content */}
          {children}

          {/* Third-party Scripts */}
          <Script
            src='dist/flowbite.min.js'
            strategy='lazyOnload'
            crossOrigin='anonymous'
          />
          <Script src='https://tally.so/widgets/embed.js' strategy='lazyOnload' />

          {/* Analytics */}
          {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && <GoogleAnalytics />}
          {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && <PixelInitializer />}

          {/* UI Components */}
          <Toaster />
          <CookieConsent />
        </PostHogProvider>
      </body>
    </html>
  )
}
