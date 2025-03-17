'use client'

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

  if (!gaId) {
    return null
  }

  return (
    <>
      <NextGoogleAnalytics gaId={gaId} />
      <Script
        id='google-analytics-consent'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Default consent state - deny all by default
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'denied'
            });
          `,
        }}
      />
    </>
  )
}
