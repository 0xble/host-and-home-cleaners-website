'use client'

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  if (typeof gaId !== 'string' || gaId.length === 0) {
    return null
  }

  return (
    <>
      <NextGoogleAnalytics gaId={gaId} />
      <Script
        id="ga-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];

            // Store the original gtag function
            window.originalGtag = window.gtag;

            // Override gtag to add logging
            window.gtag = function() {
              const args = Array.from(arguments);
              const [command, action, params] = args;

              // Get URL parameters
              const urlParams = new URLSearchParams(window.location.search);
              const utmParams = {
                utm_source: urlParams.get('utm_source'),
                utm_medium: urlParams.get('utm_medium'),
                utm_campaign: urlParams.get('utm_campaign'),
                utm_term: urlParams.get('utm_term'),
                utm_content: urlParams.get('utm_content')
              };

              // Log the event details to console in development
              if (process.env.NODE_ENV !== 'production') {
                console.debug('Google Analytics Event:', {
                  command,
                  action,
                  params,
                  utmParams: Object.fromEntries(
                    Object.entries(utmParams).filter(([_, v]) => v != null)
                  ),
                  url: window.location.href
                });
              }

              // Call the original gtag function
              return window.originalGtag.apply(this, args);
            };
          `,
        }}
      />
    </>
  )
}
