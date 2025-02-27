'use client'

import { PhoneIcon } from '@heroicons/react/24/solid'

import TrackedLink from '@/components/TrackedLink'
import { PixelEvent } from '@/lib/pixelEvents'
import { ROUTES } from '@/lib/routes'
import type { Phone } from '@/lib/types'
import { cn } from '@/lib/utils'

type CTAButtonsProps = {
  className?: string
  phone?: Phone
  preventNavigation?: boolean
}

export default function CTAButtons({ className, phone, preventNavigation = false }: CTAButtonsProps) {
  return (
    <div className={cn('lg:flex-row flex items-center gap-6', className)}>
      <TrackedLink
        href={ROUTES.BOOKING.href}
        className='inline-flex items-center justify-center rounded-xl bg-primary-700 p-4 text-center font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 lg:mr-3 lg:px-6 lg:py-4 lg:text-xl'
        eventName={PixelEvent.SCHEDULE}
        preventNavigation={preventNavigation}
      >
        Book Now
      </TrackedLink>

      {phone && (
        <TrackedLink
          href={`tel:+${phone.plain}`}
          className='flex items-center justify-center gap-3'
          eventName={PixelEvent.CONTACT}
          eventParams={{ method: 'phone' }}
          isExternal
          preventNavigation={preventNavigation}
        >
          <PhoneIcon className='h-7 text-primary-700 hover:text-primary-800 lg:h-10' />
          <div className='inline-flex flex-col rounded-lg text-start text-base font-medium text-gray-900'>
            <p className='text-base'>Or give us a call!</p>
            <div className='text-lg font-extralight hover:text-primary-700 lg:text-xl'>
              {phone.formatted}
            </div>
          </div>
        </TrackedLink>
      )}
    </div>
  )
}
