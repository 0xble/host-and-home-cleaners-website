'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'

import type { PixelEvent } from '@/lib/pixel'
import { useEventTracking } from '@/lib/pixel'

type TrackedLinkProps = {
  href: string
  children: ReactNode
  className?: string
  eventName: string | typeof PixelEvent[keyof typeof PixelEvent]
  eventParams?: Record<string, any>
  preventNavigation?: boolean
  isExternal?: boolean
  onClick?: (_e: React.MouseEvent) => void
}

// Default empty object for event params to avoid infinite render loop
const DEFAULT_EVENT_PARAMS = {}

/**
 * A component that wraps links with Facebook Pixel event tracking
 *
 * @example
 * // Basic usage with Next.js Link
 * <TrackedLink href="/booking" eventName={PixelEvent.SCHEDULE}>
 *   Book Now
 * </TrackedLink>
 *
 * @example
 * // External link (like phone number)
 * <TrackedLink
 *   href="tel:+1234567890"
 *   eventName={PixelEvent.CONTACT}
 *   eventParams={{ method: 'phone' }}
 *   isExternal
 * >
 *   Call Us
 * </TrackedLink>
 */
export default function TrackedLink({
  href,
  children,
  className,
  eventName,
  eventParams = DEFAULT_EVENT_PARAMS,
  preventNavigation = false,
  isExternal = false,
  onClick,
}: TrackedLinkProps) {
  const trackEvent = useEventTracking()

  const handleClick = (e: React.MouseEvent) => {
    // Track the event
    trackEvent(eventName, eventParams)

    // Prevent navigation if requested (useful for testing)
    if (preventNavigation) {
      e.preventDefault()
    }

    // Call the original onClick if provided
    if (onClick) {
      onClick(e)
    }
  }

  // Use regular anchor tag for external links
  if (isExternal) {
    return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
    )
  }

  // Use Next.js Link for internal navigation
  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}
