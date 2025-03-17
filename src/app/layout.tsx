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
      <body className={inter.className} suppressHydrationWarning>
        {/* Main Content */}
        {children}

        {/* Third-party Scripts */}
        <Script src='dist/flowbite.min.js' strategy='afterInteractive' />
        <Script src='https://tally.so/widgets/embed.js' strategy='lazyOnload' />

        {/* Analytics */}
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID} />
        )}
        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
          <PixelInitializer />
        )}

        {/* UI Components */}
        <Toaster />
      </body>
    </html>
  )
}
