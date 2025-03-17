import './globals.css'

import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

import { Toaster } from '@/components/ui/toaster'
import { PixelInitializer } from '@/lib/pixel'
import { getBaseUrl } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
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
    <html lang='en' className='light' suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID && (
          <Script
            id='usercentrics-cmp'
            src='https://web.cmp.usercentrics.eu/ui/loader.js'
            strategy='beforeInteractive'
            data-settings-id={process.env.NEXT_PUBLIC_USERCENTRICS_SETTINGS_ID}
            type='text/javascript'
            async
          />
        )}
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* Main Content */}
        {children}

        {/* Third-party Scripts */}
        <Script src='dist/flowbite.min.js' strategy='afterInteractive' />
        <Script src='https://tally.so/widgets/embed.js' strategy='lazyOnload' />

        {/* Analytics */}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />}
        <PixelInitializer />

        {/* UI Components */}
        <Toaster />
      </body>
    </html>
  )
}
