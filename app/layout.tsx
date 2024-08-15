import { Inter } from 'next/font/google'
import { Metadata } from 'next'
import { DOMAIN } from '@/lib/globals'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? new URL(`https://${DOMAIN}`)
      : undefined, // Defaults to localhost
  openGraph: {
    images: '/home/1.jpg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
        <script async src='dist/flowbite.min.js'></script>
        <Toaster />
      </body>
    </html>
  )
}
