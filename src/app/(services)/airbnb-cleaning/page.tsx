import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import CTASection from '@/components/CTASection'
import Page from '@/components/Page'
import { BUSINESS_NAME } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Airbnb Cleaning Services',
  description:
    'Professional Airbnb cleaning services that keep your property guest-ready. We handle scheduling, cleaning, and restocking for total peace of mind.',
}

export default function AirbnbCleaning() {
  return (
    <Page location='CACHED' className='mx-4 pb-24'>
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
          Airbnb Cleaning Services
        </h1>
        <p className='mx-auto mb-20'>
          Expert Airbnb cleaning services: We ensure your property is
          guest-ready. Giving you peace of mind in everything we do.
        </p>
      </section>

      <section className='prose mx-auto mb-24 max-w-screen-md'>
        <p>
          At
          {' '}
          {BUSINESS_NAME}
          , we understand the unique demands of maintaining an Airbnb
          property. Our specialized Airbnb cleaning services are designed to
          synchronize with your guest check-in/out calendar, ensuring your
          property is always spotless and ready for the next guest without you
          having to lift a finger.
        </p>

        <h2>Why Choose Our Airbnb Cleaning Services?</h2>
        <p>
          Our team goes the extra mile to provide exceptional service. From
          replacing Ring doorbell batteries to notifying you when inventory is
          low and helping restock, we handle the details that make a difference.
          We even deliver items requested by your tenants, such as extra
          toiletries and blankets.
        </p>

        <h2>Automatic Scheduling, No Need to Call</h2>
        <p>
          We synchronize with your guest check-in/out calendar to manage
          cleanings seamlessly. Avoid having to call to arrange cleanings; we
          will automatically schedule a cleaning after a guest checks out.
        </p>

        <h2>Customized Cleaning Checklist</h2>
        <p>
          We work with you to create a customized cleaning checklist tailored to
          your specific needs. This ensures that every cleaning covers
          everything you want, and nothing is missed.
        </p>

        <h2>Post-Cleaning Photos</h2>
        <p>
          After every cleaning, we provide photos of your property, giving you
          peace of mind that everything is in perfect order.
        </p>

        <h2>Flexible Hours and Emergency Cleanings</h2>
        <p>
          Our standard hours are 8AM-8PM, but we also offer availability for
          emergency cleanings outside these hours. With 8 dedicated cleaners, we
          ensure there&apos;s always someone ready for a turnover.
        </p>

        <h2>Peace of Mind</h2>
        <p>
          We strive to give our clients peace of mind in everything we do. From
          seamless scheduling to thorough cleanings, our goal is to make
          managing your Airbnb property as stress-free as possible.
        </p>

        <h2>
          Experience the
          {BUSINESS_NAME}
          {' '}
          Difference
        </h2>
        <p>
          Experience the difference today and elevate your Airbnb property with
          our professional cleaning services. Let us handle the cleaning, so you
          can focus on providing an exceptional experience for your guests.
        </p>
      </section>

      <Suspense>
        <CTASection
          heading='Get a Quote and Book in <1 Minute!'
          body={(
            <>
              Receive an
              {' '}
              <Link
                href={ROUTES.BOOKING.href}
                className='link'
              >
                instant, no-obligation quote online
              </Link>
              . If the line is busy, we will return your call as soon as possible!
            </>
          )}
          location='MYRTLE_BEACH'
        />
      </Suspense>
    </Page>
  )
}
