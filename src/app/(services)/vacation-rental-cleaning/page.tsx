import type { Metadata } from 'next'
import WhoAreWeSection from '@/app/(services)/components/WhoAreWeSection'
import { ContentViewTracker } from '@/components/analytics/facebook/Pixel'
import CTASection from '@/components/CTASection'

import Page from '@/components/templates/Page'
import { BUSINESS_NAME, SERVICES } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

const title = `${BUSINESS_NAME} ${SERVICES.VACATION_RENTAL}`

export const metadata: Metadata = {
  title,
  description:
    'Professional Airbnb cleaning services that keep your property guest-ready. We handle scheduling, cleaning, and restocking for total peace of mind.',
}

export default function AirbnbCleaning() {
  return (
    <Page location='CACHED' className='mx-4 pb-24'>
      <ContentViewTracker
        contentType='service'
        contentName={title}
        contentId={`service-${SERVICES.VACATION_RENTAL.toLowerCase().replace(/\s+/g, '-')}`}
      />
      <section className='px-4 text-center'>
        <Image
          className='mx-auto mb-24 h-[300px] w-full max-w-screen-lg md:h-[450px] lg:rounded-b'
          src='/rental.jpg'
          alt='cleaner walking with supplies'
          style={{ objectFit: 'cover' }}
          width={724}
          height={483}
        />
        <h1 className='mb-8 text-4xl sm:text-[45px]'>
          Vacation Rental Cleaning Services
        </h1>
        <p className='mx-auto mb-20'>
          Expert Airbnb/VRBO cleaning services: We ensure your property is
          guest-ready. Giving you peace of mind in everything we do.
        </p>
      </section>

      <section className='prose mx-auto mb-24 max-w-screen-md'>
        <p>
          At
          {' '}
          {BUSINESS_NAME}
          , we understand the unique demands of maintaining a vacation rental. Our specialized vacation rental cleaning services are designed to
          synchronize with your guest check-in/out calendar, ensuring your
          property is always spotless and ready for the next guest without you
          having to lift a finger.
        </p>

        <h2>What's Included in Our Vacation Rental Cleaning Service?</h2>
        <p>
          Our vacation rental cleaning service includes comprehensive cleaning of all areas, including thorough bathroom cleaning, kitchen cleaning, linen changes, and more. We ensure your property is guest-ready with attention to detail in every room. For a complete list of inclusions, please refer to our
          {' '}
          <Link href='/checklist' className='link'>comprehensive cleaning checklist</Link>
          .
        </p>

        <h2>Why Choose Our Vacation Rental Cleaning Services?</h2>
        <p>
          Our team goes the extra mile to provide exceptional service. From
          replacing Ring doorbell batteries to notifying you when inventory is
          low and helping restock, we handle the details that make a difference.
          We even deliver items requested by your tenants, such as extra
          toiletries and blankets.
        </p>

        <ul>
          <li>
            <strong>Automatic Scheduling:</strong>
            {' '}
            We synchronize with your guest check-in/out calendar to manage
            cleanings seamlessly. Avoid having to call to arrange cleanings; we
            will automatically schedule a cleaning after a guest checks out.
          </li>
          <li>
            <strong>Customized Cleaning Checklist:</strong>
            {' '}
            We work with you to create a customized cleaning checklist tailored to
            your specific needs. This ensures that every cleaning covers
            everything you want, and nothing is missed.
          </li>
          <li>
            <strong>Post-Cleaning Photos:</strong>
            {' '}
            After every cleaning, we provide photos of your property, giving you
            peace of mind that everything is in perfect order.
          </li>
          <li>
            <strong>Flexible Hours and Emergency Service:</strong>
            {' '}
            Our standard hours are 8AM-8PM, but we also offer availability for
            emergency cleanings outside these hours. With 8 dedicated cleaners, we
            ensure there&apos;s always someone ready for a turnover.
          </li>
        </ul>

        <h2>Additional Services Available</h2>
        <p>
          While Airbnb cleaning is perfect for vacation rentals, we also offer
          specialized services for other needs:
        </p>
        <p>
          Need regular maintenance? We also offer
          {' '}
          <Link href='/standard-cleaning' className='text-primary hover:underline'>
            standard cleaning
          </Link>
          ,
          {' '}
          <Link href='/deep-cleaning' className='text-primary hover:underline'>
            deep cleaning
          </Link>
          , and
          {' '}
          <Link href='/move-in-out-cleaning' className='text-primary hover:underline'>
            move-in/out cleaning
          </Link>
          .
        </p>
      </section>

      <WhoAreWeSection className='mb-16' />

      <Suspense>
        <CTASection
          heading='Have a Vacation Rental?'
          body='Partner with us to ensure your property is always ready for the next guest. We handle scheduling, cleaning, and restocking for total peace of mind. Contact us!'
          location='MYRTLE_BEACH'
          showImage={false}
        />
      </Suspense>
    </Page>
  )
}
