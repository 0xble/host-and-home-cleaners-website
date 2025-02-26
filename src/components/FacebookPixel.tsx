'use client'

import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { useEffect, useState } from 'react'

import * as pixel from '@/lib/fpixel'

// Custom hook to track CTA button clicks
const useTrackCTAClicks = (loaded: boolean) => {
  useEffect(() => {
    if (!loaded) {
      return
    }

    // Function to set up event listeners
    const setupEventListeners = () => {
      // Track "Book Now" button clicks
      const bookNowButtons = document.querySelectorAll('a[href*="bookings.hostandhomecleaners.com/booknow"]')
      bookNowButtons.forEach((button) => {
        button.addEventListener('click', () => {
          pixel.event('BookNow')
        })
      })

      // Track phone call clicks
      const phoneButtons = document.querySelectorAll('a[href^="tel:"]')
      phoneButtons.forEach((button) => {
        button.addEventListener('click', () => {
          pixel.event('Contact', { method: 'phone' })
        })
      })
    }

    // Set up the event listeners
    setupEventListeners()

    // Also set up a mutation observer to handle dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          setupEventListeners()
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    // Cleanup
    return () => {
      observer.disconnect()
    }
  }, [loaded])
}

const FacebookPixel = () => {
  const [loaded, setLoaded] = useState(false)
  const pathname = usePathname()

  // Use the custom hook to track CTA button clicks
  useTrackCTAClicks(loaded)

  useEffect(() => {
    if (!loaded) {
      return
    }

    // Track PageView for all pages
    pixel.pageview()

    // Track specific events based on the URL path
    if (pathname) {
      // Track when users view specific service pages
      if (pathname.includes('/standard-cleaning')) {
        pixel.event('ViewContent', {
          content_type: 'service',
          content_name: 'Standard Cleaning',
        })
      }

      if (pathname.includes('/deep-cleaning')) {
        pixel.event('ViewContent', {
          content_type: 'service',
          content_name: 'Deep Cleaning',
        })
      }

      if (pathname.includes('/move-in-out-cleaning')) {
        pixel.event('ViewContent', {
          content_type: 'service',
          content_name: 'Move In/Out Cleaning',
        })
      }

      if (pathname.includes('/vacation-rental-cleaning')) {
        pixel.event('ViewContent', {
          content_type: 'service',
          content_name: 'Vacation Rental Cleaning',
        })
      }

      // Track when users view location-specific pages
      if (pathname.includes('/myrtle-beach')) {
        pixel.event('ViewContent', {
          content_type: 'location',
          content_name: 'Myrtle Beach',
        })
      }

      if (pathname.includes('/honolulu')) {
        pixel.event('ViewContent', {
          content_type: 'location',
          content_name: 'Honolulu',
        })
      }

      // Track when users view pricing information
      if (pathname.includes('/pricing') || pathname.includes('/packages')) {
        pixel.event('ViewContent', {
          content_type: 'pricing',
          content_name: 'Pricing Information',
        })
      }
    }
  }, [pathname, loaded])

  return (
    <>
      <Script
        id='fb-pixel'
        src='/scripts/pixel.js'
        strategy='afterInteractive'
        onLoad={() => setLoaded(true)}
        data-pixel-id={pixel.FB_PIXEL_ID}
      />
      <noscript>
        <img
          height='1'
          width='1'
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixel.FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=''
        />
      </noscript>
    </>
  )
}

export default FacebookPixel
