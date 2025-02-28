'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { PixelEvent, type PixelEventName } from './pixelEvents'

/* //////////////////////////////////////////////////////////////////////////////
//                                CONFIGURATION
////////////////////////////////////////////////////////////////////////////// */

const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID

/* //////////////////////////////////////////////////////////////////////////////
//                              CORE FUNCTIONALITY
////////////////////////////////////////////////////////////////////////////// */

// Helper function to safely check if we're in a browser environment
const isBrowser = typeof window !== 'undefined'

// Track if pixel has been initialized
let pixelInstance: any = null

/**
 * Initialize Facebook Pixel
 */
export async function initializePixel() {
  // Only run on the client side
  if (!isBrowser) {
    return null
  }

  // Return existing instance if already initialized
  if (pixelInstance) {
    return pixelInstance
  }

  // Check for pixel ID
  if (!PIXEL_ID) {
    console.warn('Facebook Pixel ID is not defined')
    return null
  }

  try {
    // Import the pixel library dynamically
    // This is safe because we've already checked for browser environment
    const ReactPixelModule = await import('react-facebook-pixel')
    const ReactPixel = ReactPixelModule.default

    // Initialize with options
    const options = {
      autoConfig: true,
      debug: process.env.NODE_ENV !== 'production',
    }

    ReactPixel.init(PIXEL_ID, undefined, options)
    pixelInstance = ReactPixel
    return pixelInstance
  } catch (error) {
    console.error('Error initializing Facebook Pixel:', error)
    return null
  }
}

/* //////////////////////////////////////////////////////////////////////////////
//                                    HOOKS
////////////////////////////////////////////////////////////////////////////// */

/**
 * Hook to track Facebook Pixel events
 *
 * @example
 * const trackEvent = useEventTracking();
 * <button onClick={() => trackEvent(PixelEvent.SCHEDULE)}>Book Now</button>
 */
export function useEventTracking() {
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    // Initialize pixel on component mount
    if (isBrowser) {
      initializePixel().then((instance) => {
        if (instance) {
          setPixel(instance)
        }
      })
    }
  }, [])

  const trackEvent = useCallback((eventName: string | PixelEventName, params = {}) => {
    if (pixel) {
      pixel.track(eventName, params)
    }
  }, [pixel])

  return trackEvent
}

/**
 * Hook to track content views with Facebook Pixel
 * Use this in individual page components to track specific content views
 *
 * @example
 * // In a service page component
 * useContentViewTracking('service', 'Standard Cleaning');
 *
 * @param contentType The type of content being viewed (e.g., 'service', 'location')
 * @param contentName The name of the content being viewed (e.g., 'Standard Cleaning', 'Myrtle Beach')
 */
export function useContentViewTracking(contentType: string, contentName: string) {
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    // Initialize pixel on component mount
    if (isBrowser) {
      initializePixel().then((instance) => {
        if (instance) {
          setPixel(instance)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (pixel && contentType && contentName) {
      pixel.track(PixelEvent.VIEW_CONTENT, {
        content_type: contentType,
        content_name: contentName,
      })
    }
  }, [contentType, contentName, pixel])
}

/**
 * Hook to track page views
 * This is used internally by the PixelInitializer component
 */
export function usePageViewTracking() {
  const pathname = usePathname()
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    // Initialize pixel on component mount
    if (isBrowser) {
      initializePixel().then((instance) => {
        if (instance) {
          setPixel(instance)
        }
      })
    }
  }, [])

  useEffect(() => {
    if (pathname && pixel) {
      pixel.pageView()
    }
  }, [pathname, pixel])
}

/* //////////////////////////////////////////////////////////////////////////////
//                                 COMPONENTS
////////////////////////////////////////////////////////////////////////////// */

/**
 * Component that initializes Facebook Pixel and tracks page views
 * This should be included in your app's layout
 *
 * @example
 * // In your layout.tsx
 * import { PixelInitializer } from '@/lib/pixel';
 *
 * export default function Layout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <PixelInitializer />
 *       </body>
 *     </html>
 *   );
 * }
 */
export function PixelInitializer() {
  const [isMounted, setIsMounted] = useState(false)

  // Only run after component is mounted on client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Initialize Facebook Pixel on component mount
  useEffect(() => {
    if (isMounted && isBrowser) {
      initializePixel()
    }
  }, [isMounted])

  // Track page views when pathname changes
  const pathname = usePathname()
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    if (isMounted && isBrowser) {
      initializePixel().then((instance) => {
        if (instance) {
          setPixel(instance)
        }
      })
    }
  }, [isMounted])

  useEffect(() => {
    if (pathname && pixel) {
      pixel.pageView()
    }
  }, [pathname, pixel])

  return null
}

/**
 * Component that tracks content views with Facebook Pixel
 * Use this in server components to track specific content views
 *
 * @example
 * // In a server component
 * <ContentViewTracker contentType="service" contentName="Standard Cleaning" />
 */
export function ContentViewTracker({ contentType, contentName }: { contentType: string, contentName: string }) {
  const [isMounted, setIsMounted] = useState(false)

  // Only run after component is mounted on client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Use the hook for tracking with conditional inside
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    // Initialize pixel on component mount, but only if mounted
    if (isMounted && isBrowser) {
      initializePixel().then((instance) => {
        if (instance) {
          setPixel(instance)
        }
      })
    }
  }, [isMounted])

  useEffect(() => {
    if (pixel && contentType && contentName && isMounted) {
      pixel.track(PixelEvent.VIEW_CONTENT, {
        content_type: contentType,
        content_name: contentName,
      })
    }
  }, [contentType, contentName, pixel, isMounted])

  return null
}
