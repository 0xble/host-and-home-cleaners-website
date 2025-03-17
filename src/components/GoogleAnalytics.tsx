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
              'security_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });

            // Enable debug mode in development
            if (window.location.hostname === 'localhost') {
              window.gtag = function() {
                console.log('Google Analytics Debug:', arguments);
                dataLayer.push(arguments);
              }
            }
          `,
        }}
      />
      <NextGoogleAnalytics gaId={gaId} />
    </>
  )
}
