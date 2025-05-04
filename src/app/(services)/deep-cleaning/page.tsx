import type { Metadata } from 'next'
import WhoAreWeSection from '@/app/(services)/components/WhoAreWeSection'
import { ContentViewTracker } from '@/components/analytics/facebook/Pixel'
import Page from '@/components/templates/Page'

import CTASection from '@/components/templates/sections/CTASection'
import { BUSINESS_NAME, SERVICES } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

const title = `${BUSINESS_NAME} ${SERVICES.DEEP}`

export const metadata: Metadata = {
  title,
  description:
    'Recommended as an initial cleaning to get your home to a high standard of cleanliness to maintain with recurring standard cleanings.',
}

export default function DeepCleaning() {
  return (
    <Page location="CACHED" className="mx-4 pb-24">
      <ContentViewTracker
        contentType="service"
        contentName={title}
        contentId={`service-${SERVICES.DEEP.toLowerCase().replace(/\s+/g, '-')}`}
      />
      <section className="px-4 text-center">
        <Image
          className="mx-auto mb-24 h-[300px] w-full max-w-screen-lg md:h-[450px] lg:rounded-b"
          src="/assets/home2.jpeg"
          alt="cleaner walking with supplies"
          style={{ objectFit: 'cover' }}
          width={1280}
          height={853}
        />
        <h1 className="mb-8 text-4xl sm:text-[45px]">Deep Cleaning Services</h1>
        <p className="mx-auto mb-20">
          Recommended as an initial cleaning to get your home to a high standard
          of cleanliness to maintain with recurring
          {' '}
          <Link href="/standard-cleaning" className="link">standard cleanings</Link>
          .
        </p>
      </section>

      <section className="prose mx-auto mb-24 max-w-screen-md">
        <p>
          At
          {' '}
          {BUSINESS_NAME}
          , we offer comprehensive deep cleaning services that go beyond regular
          maintenance to ensure your home is thoroughly cleaned from top to bottom.
          Our deep cleaning service is perfect for getting your home to a high
          standard of cleanliness, which can then be maintained with regular
          {' '}
          <Link href="/standard-cleaning" className="link">standard cleanings</Link>
          .
        </p>

        <h2>What's Included in Deep Cleaning?</h2>
        <p>
          Our deep cleaning service goes beyond standard cleaning to provide thorough cleaning of all areas, including inside cabinets, behind furniture, baseboards, and more. We pay special attention to hard-to-reach areas and accumulated dirt. For a complete list of inclusions, please refer to our
          {' '}
          <Link href="/checklist" className="link">comprehensive cleaning checklist</Link>
          .
        </p>

        <h2>When to Choose Deep Cleaning</h2>
        <p>
          Deep cleaning is recommended in several situations:
        </p>
        <ul>
          <li>
            Before starting regular
            {' '}
            <Link href="/standard-cleaning" className="link">standard cleaning</Link>
            {' '}
            service
          </li>
          <li>After renovations or construction work</li>
          <li>When moving into a new home</li>
          <li>When your home needs a thorough, comprehensive cleaning</li>
        </ul>

        <h2>Benefits of Deep Cleaning</h2>
        <ul>
          <li>
            <strong>Improved Indoor Air Quality:</strong>
            {' '}
            Deep cleaning removes accumulated dust, allergens, and pollutants from
            hard-to-reach areas, improving the air quality in your home.
          </li>
          <li>
            <strong>Healthier Living Environment:</strong>
            {' '}
            By thoroughly cleaning and sanitizing all surfaces, deep cleaning helps
            reduce the spread of germs and bacteria.
          </li>
          <li>
            <strong>Longer-Lasting Clean:</strong>
            {' '}
            Deep cleaning provides a solid foundation for maintaining cleanliness
            with regular
            {' '}
            <Link href="/standard-cleaning" className="link">standard cleanings</Link>
            .
          </li>
        </ul>

        <h2>Professional Deep Cleaning Process</h2>
        <p>
          Our professional deep cleaning process is systematic and thorough. We start
          from the top of each room and work our way down, ensuring no area is missed.
          Our team uses specialized cleaning products and techniques to achieve the
          best results while protecting your surfaces and belongings.
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
          <Link href="/move-in-out-cleaning" className="link">
            move-in/out cleaning
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
          heading="Looking For A Deep Cleaning?"
          body={`Book your deep cleaning service with ${BUSINESS_NAME} today and experience the difference of professional cleaning. Our team is ready to transform your home into a spotless sanctuary.`}
          location="CACHED"
          showImage={false}
        />
      </Suspense>
    </Page>
  )
}
