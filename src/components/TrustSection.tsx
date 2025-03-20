'use client'

import Image, { type StaticImageData } from 'next/image'

import { cn } from '@/lib/utils'
import airbnbIcon from '@/public/icons/airbnb.svg'
import bookingIcon from '@/public/icons/booking.svg'
import homeawayIcon from '@/public/icons/homeaway.svg'
import vrboIcon from '@/public/icons/vrbo.svg'
import zillowIcon from '@/public/icons/zillow.svg'

const icons: { icon: StaticImageData, alt: string }[] = [
  { icon: airbnbIcon, alt: 'Airbnb icon' },
  { icon: zillowIcon, alt: 'Zillow icon' },
  { icon: vrboIcon, alt: 'VRBO icon' },
  { icon: homeawayIcon, alt: 'HomeAway icon' },
  { icon: bookingIcon, alt: 'Booking.com icon' },
]

type TrustSectionProps = {
  className?: string
}

export default function TrustSection({ className }: TrustSectionProps) {
  return (
    <section className={cn('bg-white ', className)}>
      <div className='mx-auto max-w-screen-xl p-4 lg:py-8'>
        <div className='mt-16 flex flex-col justify-between gap-12 text-gray-500 md:flex-row lg:mt-0'>
          {icons.map(({ icon, alt }) => (
            <div key={alt} className='flex items-center justify-center'>
              <div className='relative h-10 w-40'>
                <Image
                  src={icon}
                  alt={alt}
                  fill
                  className='object-contain'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
