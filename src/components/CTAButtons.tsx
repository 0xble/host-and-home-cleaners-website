'use client'

import { PhoneIcon } from '@heroicons/react/24/solid'

import TrackedLink from '@/components/analytics/facebook/PixelTrackedLink'
import BookNowButton from '@/components/BookNowButton'
import { PixelEvent } from '@/lib/pixel'
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
      <BookNowButton
        className='text-sm xs:p-4 xs:text-base lg:mr-3'
        preventNavigation={preventNavigation}
      />

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
            <div className='text-base font-extralight hover:text-primary-700 xs:text-lg lg:text-xl'>
              {phone.formatted}
            </div>
          </div>
        </TrackedLink>
      )}
    </div>
  )
}
