'use client'

import TrackedLink from '@/components/analytics/facebook/PixelTrackedLink'

import { PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'

interface BookNowButtonProps {
  className?: string
  preventNavigation?: boolean
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

    // If there are no search params, return the base URL
    if (!searchParams || searchParams.size === 0) {
      return baseUrl
    }

    // Check if the base URL already has query parameters
    const hasQueryParams = baseUrl.includes('?')

    // Start building the query string
    let queryString = hasQueryParams ? '&' : '?'

    // Add all search params to the query string
    searchParams.forEach((value, key) => {
      // We want to include all parameters, but UTM params are particularly important
      queryString += `${key}=${encodeURIComponent(value)}&`
    })

    // Remove the trailing ampersand
    queryString = queryString.slice(0, -1)

    // Return the full URL
    return `${baseUrl}${queryString}`
  }

  return (
    <TrackedLink
      href={constructBookingUrl()}
      className={cn(baseStyles, sizeStyles[size], className)}
      eventName={PixelEvent.SCHEDULE}
      preventNavigation={preventNavigation}
    >
      Book Now
    </TrackedLink>
  )
}
