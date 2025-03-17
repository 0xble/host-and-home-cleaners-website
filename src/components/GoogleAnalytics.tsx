'use client'

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import { useEffect } from 'react'

import { trackPageView } from '@/lib/analytics'

export default function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

  useEffect(() => {
    // Track initial page view
    trackPageView({
      content_type: 'page',
      content_name: document.title,
      content_id: window.location.pathname,
    })
  }, [])

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
            console.log('Initializing Google Analytics');

            // Store the original gtag function
            const originalGtag = window.gtag;

            // Function to get URL parameters
            function getUrlParams() {
              const params = new URLSearchParams(window.location.search);
              return {
                utm_source: params.get('utm_source'),
                utm_medium: params.get('utm_medium'),
                utm_campaign: params.get('utm_campaign'),
                utm_content: params.get('utm_content'),
                utm_term: params.get('utm_term')
              };
            }

            // Create our debug wrapper
            window.gtag = function() {
              const [command, action, params] = arguments;
              const urlParams = getUrlParams();
              const utmParams = {
                utm_source: params?.utm_source || urlParams.utm_source,
                utm_medium: params?.utm_medium || urlParams.utm_medium,
                utm_campaign: params?.utm_campaign || urlParams.utm_campaign,
                utm_content: params?.utm_content || urlParams.utm_content,
                utm_term: params?.utm_term || urlParams.utm_term
              };

              // Log all events with more detail
              console.log('Google Analytics Event:', {
                command,
                action,
                params,
                utm: Object.fromEntries(
                  Object.entries(utmParams).filter(([_, value]) => value !== undefined)
                ),
                url: window.location.href
              });

              // Call the original gtag function
              if (originalGtag) {
                originalGtag.apply(this, arguments);
              }

              // Push to dataLayer
              dataLayer.push(arguments);
            };

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

            // Log when the script is loaded
            console.log('Google Analytics script initialized');
          `,
        }}
      />
      <NextGoogleAnalytics gaId={gaId} />
    </>
  )
}
