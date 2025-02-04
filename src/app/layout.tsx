import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'

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
      <body className={inter.className} suppressHydrationWarning>
        {/* Facebook Meta Pixel - Tracks website visitors for ad targeting and conversion tracking */}
        <Script id='fb-pixel' strategy='afterInteractive'>
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '474741372185904');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* Fallback for users with JavaScript disabled */}
        <noscript>
          <img
            height='1'
            width='1'
            style={{ display: 'none' }}
            src='https://www.facebook.com/tr?id=474741372185904&ev=PageView&noscript=1'
            alt=''
          />
        </noscript>

        {/* Main Content */}
        {children}

        {/* Third-party Scripts */}
        <Script src='dist/flowbite.min.js' />
        <Script src='https://tally.so/widgets/embed.js' strategy='lazyOnload' />

        {/* UI Components */}
        <Toaster />
      </body>
    </html>
  )
}
