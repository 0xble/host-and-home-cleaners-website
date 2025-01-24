import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'
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
      {/* The `suppressHydrationWarning` attribute in <body> is used to prevent hydration errors caused by Sentry Overlay,
      which dynamically adds a `style` attribute to the body tag. */}
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <script async src='dist/flowbite.min.js' />
        <Toaster />
      </body>
    </html>
  )
}
