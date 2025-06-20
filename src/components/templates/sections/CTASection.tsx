'use client'
import type { Location } from '@/lib/types'
import Image from 'next/image'
import { Suspense } from 'react'
import BookNowButton from '@/components/BookNowButton'
import CTAButtons from '@/components/CTAButtons'
import FindLocationInput from '@/components/FindLocationInput'
import { cn, getPhone } from '@/lib/utils'
import flamingoRingImage from '@/public/assets/flamingo-ring.jpeg'
import { useLocationStore } from '@/store/useLocationStore'

export interface CTASectionProps {
  heading: string | JSX.Element
  body: React.ReactNode
  location: Location | 'CACHED' | null
  showImage?: boolean
}

export default function CTASection(props: CTASectionProps) {
  const { heading, body, showImage = true } = props
  const { location: cachedLocation } = useLocationStore()
  const location = props.location === 'CACHED'
    ? cachedLocation
    : props.location
  return (
    <section className={`mx-auto max-w-screen-xl items-center gap-8 px-4 py-8 sm:py-16 md:grid lg:px-6 xl:gap-16 ${showImage ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
      {showImage && (
        <Image
          className="h-96 rounded-lg lg:h-[600px]"
          alt="professional house cleaning"
          src={flamingoRingImage}
          style={{ objectFit: 'cover' }}
          placeholder="blur"
        />
      )}
      <div className={cn('mt-4 flex flex-col gap-6 md:mt-0', !showImage ? 'md:max-w-2xl md:mx-auto md:text-center' : '')}>
        <h2 className="tracking-tight text-shade sm:text-5xl">{heading}</h2>
        <p className="text-left">{body}</p>
        {
          location === null
            ? (
                <div className={cn('flex items-center gap-6', !showImage ? 'justify-center' : '', 'lg:flex-row')}>
                  <BookNowButton
                    className="lg:mr-3"
                    size="lg"
                    location={location}
                  />
                  <Suspense>
                    <FindLocationInput className={cn('hidden sm:flex', !showImage ? 'w-auto' : '')} />
                  </Suspense>
                </div>
              )
            : (
                <CTAButtons
                  className={cn('mt-12 lg:mt-8', !showImage ? 'flex justify-center' : '')}
                  phone={getPhone(location)}
                  location={location}
                />
              )
        }
      </div>
    </section>
  )
}
