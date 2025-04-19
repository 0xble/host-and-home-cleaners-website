'use client'

import type { Phone } from '@/lib/types'
import TrackedLink from '@/components/analytics/facebook/PixelTrackedLink'
import { PixelEvent } from '@/lib/pixel'
import { cn } from '@/lib/utils'

interface PhoneLinkProps {
  className?: string
  phone: Phone
  children?: React.ReactNode
}

/**
 * A component for phone links that tracks clicks with Facebook Pixel
 *
 * @example
 * // Basic usage
 * <PhoneLink phone={PHONE.MYRTLE_BEACH} />
 *
 * @example
 * // With custom text
 * <PhoneLink phone={PHONE.HONOLULU}>
 *   Call us today
 * </PhoneLink>
 */
export default function PhoneLink({ className, phone, children }: PhoneLinkProps) {
  return (
    <TrackedLink
      className={cn(
        'text-base font-extralight hover:text-primary lg:text-lg whitespace-nowrap',
        className,
      )}
      href={`tel:+${phone.plain}`}
      isExternal
      eventName={PixelEvent.CONTACT}
      eventParams={{ method: 'phone' }}
    >
      {children || phone.formatted}
    </TrackedLink>
  )
}
