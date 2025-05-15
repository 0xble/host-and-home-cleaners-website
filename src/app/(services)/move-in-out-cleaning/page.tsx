import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import WhoAreWeSection from '@/app/(services)/components/WhoAreWeSection'
import { ContentViewTracker } from '@/components/analytics/facebook/Pixel'
import Page from '@/components/templates/Page'
import CTASection from '@/components/templates/sections/CTASection'
import { BUSINESS_NAME, SERVICES } from '@/lib/constants'

const title = `${BUSINESS_NAME} ${SERVICES.MOVE_IN_OUT}`

export const metadata: Metadata = {
  title,
  description: 'Move in/out cleaning services provide deep cleaning, sanitization and detailed attention to every surface. Professional cleaners ensure a pristine space for your transition. Book now!',
}

export default function MoveCleaning() {
  return (
    <Page location="CACHED" className="mx-4 pb-24">
      <ContentViewTracker
        contentType="service"
        contentName={title}
        contentId={`service-${SERVICES.MOVE_IN_OUT.toLowerCase().replace(/\s+/g, '-')}`}
      />
      <section className="px-4 text-center">
        <Image
          className="mx-auto mb-24 h-[300px] w-full max-w-screen-lg md:h-[450px] lg:rounded-b"
          src="/assets/home1.jpeg"
          alt="cleaner preparing for move out"
          style={{ objectFit: 'cover' }}
          width={1280}
          height={850}
        />
        <h1 className="mb-8 text-4xl sm:text-[45px]">
          Move In / Move Out Cleaning Services
        </h1>
        <p className="mx-auto mb-20">
          Recommended for a thorough cleaning of spaces before moving in or out.
        </p>
      </section>

      <section className="prose mx-auto mb-24 max-w-screen-md">
        <p>
          At
          {' '}
          {BUSINESS_NAME}
          , we understand the importance of having a clean space when moving in or out.
          Our move-in/move-out cleaning service provides comprehensive cleaning that
          ensures your space is spotless and ready for the next occupants.
        </p>

        <h2>What's Included in Move-In/Move-Out Cleaning?</h2>
        <p>
          Our move-in/move-out cleaning service provides comprehensive cleaning of all areas, including deep cleaning of appliances, thorough bathroom cleaning, window cleaning, and more. We ensure every surface is spotless and ready for the next occupants. For a complete list of inclusions, please refer to our
          {' '}
          <Link href="/checklist" className="link">comprehensive cleaning checklist</Link>
          .
        </p>

        <h2>Move-In Cleaning</h2>
        <p>
          Our move-in cleaning service ensures your new home is spotless and ready for
          you to move in. We thoroughly clean all areas, including those that might
          have been overlooked by previous occupants. This service is perfect for:
        </p>
        <ul>
          <li>New homeowners moving into their first home</li>
          <li>Renters moving into a new apartment or house</li>
          <li>Anyone wanting a fresh start in their new space</li>
        </ul>

        <h2>Move-Out Cleaning</h2>
        <p>
          Our move-out cleaning service helps you leave your space in perfect condition
          for the next occupants. This service is ideal for:
        </p>
        <ul>
          <li>Homeowners preparing their house for sale</li>
          <li>Renters fulfilling their lease cleaning requirements</li>
          <li>Anyone wanting to ensure they receive their full security deposit</li>
        </ul>

        <h2>Why Choose Our Move-In/Move-Out Cleaning Service?</h2>
        <p>
          Our move-in/move-out cleaning service is perfect for ensuring your property is spotless
          for the next occupants or ready for your new home. We use eco-friendly products and
          follow a comprehensive checklist to ensure no area is overlooked.
        </p>

        <h2>Additional Services Available</h2>
        <p>
          Need regular maintenance? We also offer
          {' '}
          <Link href="/standard-cleaning" className="link">
            standard cleaning
          </Link>
          ,
          {' '}
          <Link href="/deep-cleaning" className="link">
            deep cleaning
          </Link>
          , and
          {' '}
          <Link href="/vacation-rental-cleaning" className="link">
            vacation rental cleaning
          </Link>
          .
        </p>
      </section>

      <WhoAreWeSection className="mb-16" />

      <Suspense>
        <CTASection
          heading="Got A Move Coming Up?"
          body={`Book your move-in/move-out cleaning service with ${BUSINESS_NAME} today and experience the difference of professional cleaning. Our team is ready to transform your property into a spotless sanctuary.`}
          location="CACHED"
          showImage={false}
        />
      </Suspense>
    </Page>
  )
}
