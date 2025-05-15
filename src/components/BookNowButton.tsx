'use client'

import type { Location } from '@/lib/types'

import { useSearchParams } from 'next/navigation'
import TrackedLink from '@/components/analytics/facebook/PixelTrackedLink'
import { PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'
import { cn } from '@/lib/utils'

interface BookNowButtonProps {
  className?: string
  preventNavigation?: boolean
  location: Location | null
  size?: 'sm' | 'md' | 'lg'
}

/**
 * A standardized "Book Now" button component used throughout the site
 * Forwards any UTM parameters and other query parameters to the booking URL
 */
export default function BookNowButton({
  className,
  preventNavigation = false,
  size = 'md',
  location,
}: BookNowButtonProps) {
  // Get search params to forward them to BookingKoala
  const searchParams = useSearchParams()

  // Base styles for the button
  const baseStyles = 'inline-flex items-center justify-center rounded-xl bg-primary text-center font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300'

  // Size-specific styles
  const sizeStyles = {
    sm: 'px-2 py-3 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-xl',
  }

  // Create booking URL that forwards all search params
  const constructBookingUrl = () => {
    // Start with the base booking URL
    const baseUrl = ROUTES.BOOKING.href

    // Initialize query parameters array
    const queryParams: string[] = []

    // Add location if provided
    if (location) {
      queryParams.push(`location=${location.toLowerCase()}`)
    }

    // Add existing search params
    if (searchParams != null) {
      searchParams.forEach((value, key) => {
        // Skip location if we already added it
        if (key !== 'location') {
          queryParams.push(`${key}=${encodeURIComponent(value)}`)
        }
      })
    }

    // If there are no query params, return the base URL
    if (queryParams.length === 0) {
      return baseUrl
    }

    // Join all query parameters and return the full URL
    return `${baseUrl}?${queryParams.join('&')}`
  }

  return (
    <TrackedLink
      href={constructBookingUrl()}
      className={cn(baseStyles, sizeStyles[size], className)}
      eventName={PixelEvent.INITIATE_CHECKOUT}
      preventNavigation={preventNavigation}
    >
      Book Now
    </TrackedLink>
  )
}
