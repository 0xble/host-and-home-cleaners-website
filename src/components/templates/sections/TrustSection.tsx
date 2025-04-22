'use client'

import type { StaticImageData } from 'next/image'

import { cn } from '@/lib/utils'
import airbnbIcon from '@/public/icons/brands/airbnb.svg'
import bookingIcon from '@/public/icons/brands/booking.svg'
import homeawayIcon from '@/public/icons/brands/homeaway.svg'
import vrboIcon from '@/public/icons/brands/vrbo.svg'
import zillowIcon from '@/public/icons/brands/zillow.svg'
import Image from 'next/image'

const icons: { icon: StaticImageData, alt: string }[] = [
  { icon: airbnbIcon as StaticImageData, alt: 'Airbnb icon' },
  { icon: zillowIcon as StaticImageData, alt: 'Zillow icon' },
  { icon: vrboIcon as StaticImageData, alt: 'VRBO icon' },
  { icon: homeawayIcon as StaticImageData, alt: 'HomeAway icon' },
  { icon: bookingIcon as StaticImageData, alt: 'Booking.com icon' },
]

interface TrustSectionProps {
  className?: string
}

export default function TrustSection({ className }: TrustSectionProps) {
  return (
    <section className={cn('bg-white ', className)}>
      <div className="mx-auto max-w-screen-xl p-4 lg:py-8">
        <div className="mt-16 flex flex-col justify-between gap-12 text-muted-foreground md:flex-row lg:mt-0">
          {icons.map(({ icon, alt }) => (
            <div key={alt} className="flex items-center justify-center">
              <div className="relative h-10 w-40">
                <Image
                  src={icon}
                  alt={alt}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
