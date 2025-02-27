'use client'
import Image from 'next/image'
import { Suspense } from 'react'

import TrackedLink from '@/components/TrackedLink'
import { PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'
import type { Location } from '@/lib/types'
import { getPhone } from '@/lib/utils'
import flamingoRingImage from '@/public/flamingo-ring.jpeg'
import { useLocationStore } from '@/store/useLocationStore'

import CTAButtons from './CTAButtons'
import FindLocationInput from './FindLocationInput'

export type CTASectionProps = {
  heading: string | JSX.Element
  body: React.ReactNode
  location: Location | 'CACHED' | null
}

export default function CTASection(props: CTASectionProps) {
  const { heading, body } = props
  const { location: cachedLocation } = useLocationStore()
  const location = props.location !== 'CACHED'
    ? props.location
    : cachedLocation
  return (
    <section className='mx-auto max-w-screen-xl items-center gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-2 lg:px-6 xl:gap-16'>
      <Image
        className='h-96 rounded-lg lg:h-[600px]'
        alt='professional house cleaning'
        src={flamingoRingImage}
        style={{ objectFit: 'cover' }}
        placeholder='blur'
      />
      <div className='mt-4 flex flex-col gap-6 md:mt-0'>
        <h2 className='tracking-tight text-gray-900 sm:text-[58px]'>{heading}</h2>
        <p>{body}</p>
        {
          location === null
            ? (
                <div className='flex items-center gap-6 lg:flex-row'>
                  <TrackedLink
                    href={ROUTES.BOOKING.href}
                    className='inline-flex items-center justify-center rounded-xl bg-primary-700 p-4 text-center font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 lg:mr-3 lg:px-6 lg:py-4 lg:text-xl'
                    eventName={PixelEvent.SCHEDULE}
                  >
                    Book Now
                  </TrackedLink>
                  <Suspense>
                    <FindLocationInput className='hidden sm:flex' />
                  </Suspense>
                </div>
              )
            : (
                <CTAButtons className='mt-12 lg:mt-8' phone={getPhone(location)} />
              )
        }
      </div>
    </section>
  )
}
