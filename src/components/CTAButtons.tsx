import { PhoneIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

import { ROUTES } from '@/lib/routes'
import type { Phone } from '@/lib/types'
import { cn } from '@/lib/utils'

type CTAButtonsProps = {
  className?: string
  phone?: Phone
}

export default function CTAButtons({ className, phone }: CTAButtonsProps) {
  return (
    <div className={cn('lg:flex-row flex items-center gap-6', className)}>
      <Link
        href={ROUTES.BOOKING.href}
        className='inline-flex items-center justify-center rounded-xl bg-primary-700 p-4 text-center font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 lg:mr-3 lg:px-6 lg:py-4 lg:text-xl'
      >
        Book Now
      </Link>
      {phone && (
        <a
          href={`tel:+${phone.plain}`}
          className='flex items-center justify-center gap-3'
        >
          <PhoneIcon className='h-7 text-primary-700 hover:text-primary-800 lg:h-10' />
          <div className='inline-flex flex-col rounded-lg text-start text-base font-medium text-gray-900'>
            <p className='text-base'>Or give us a call!</p>
            <div className='text-lg font-extralight hover:text-primary-700 lg:text-xl'>
              {phone.formatted}
            </div>
          </div>
        </a>
      )}
    </div>
  )
}
