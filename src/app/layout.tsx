import './globals.css'

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
  verification: {
    google: 'bgJM5TTuCUrBRo7Yx7jI7n30ZSPeOLpZcISX9mZLcDI',
  },
}

export type LayoutProps = Readonly<{
  children: React.ReactNode
}>

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang='en'>
      <body className={inter.className} suppressHydrationWarning>
        {/* Main Content */}
        {children}

        {/* Third-party Scripts */}
        <Script src='dist/flowbite.min.js' />
        <Script src='https://tally.so/widgets/embed.js' strategy='lazyOnload' />

        {/* Analytics */}
        <PixelInitializer />

        {/* UI Components */}
        <Toaster />
      </body>
    </html>
  )
}
