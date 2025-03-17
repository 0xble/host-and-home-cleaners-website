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
      {/* Set default consent state before anything else */}
      <Script
        id='google-analytics-consent-default'
        strategy='beforeInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Set default consent state before any other scripts run
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'functionality_storage': 'denied',
              'personalization_storage': 'denied',
              'security_storage': 'denied'
            });
          `,
        }}
      />
      <NextGoogleAnalytics gaId={gaId} />
    </>
  )
}
