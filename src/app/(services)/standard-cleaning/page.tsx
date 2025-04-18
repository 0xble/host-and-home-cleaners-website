import type { Metadata } from 'next'
import WhoAreWeSection from '@/app/(services)/components/WhoAreWeSection'
import { ContentViewTracker } from '@/components/analytics/facebook/Pixel'
import CTASection from '@/components/CTASection'

import Page from '@/components/templates/Page'
import { BUSINESS_NAME, SERVICES } from '@/lib/constants'
import homeImage from '@/public/home3.jpeg'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

const title = `Host & Home ${SERVICES.STANDARD}`

export const metadata: Metadata = {
  title,
  description: 'Experience our professional standard cleaning service - perfect for maintaining a spotless home with regular visits. Book your recurring cleaning today!',
}

export default function StandardCleaning() {
  return (
    <Page location="CACHED" className="mx-4 pb-24">
      {/* Track content view */}
      <ContentViewTracker contentType="service" contentName={title} contentId={title} />

      <section className="px-4 text-center">
        <Image
          className="mx-auto mb-24 h-[300px] w-full max-w-screen-lg md:h-[450px] lg:rounded-b"
          src={homeImage}
          alt="cleaner walking with supplies"
          style={{ objectFit: 'cover' }}
          placeholder="blur"
        />
        <h1 className="mb-8 text-4xl sm:text-[45px]">
          {SERVICES.STANDARD}
          {' '}
          Services
        </h1>
        <p className="mb-20">
          Recommended as a recurring service for maintaining the cleanliness of
          a home after a
          {' '}
          <Link href="/deep-cleaning" className="link">deep clean</Link>
          .
        </p>
      </section>

      <section className="prose mx-auto mb-24 max-w-screen-md">
        <p>
          At
          {' '}
          {BUSINESS_NAME}
          , we offer professional standard cleaning services that maintain your home's cleanliness
          on a regular basis. Our team of skilled professionals uses eco-friendly products and
          industry best practices to ensure consistent, high-quality results.
        </p>

        <h2>
          Why Choose
          {' '}
          {SERVICES.STANDARD}
          ?
        </h2>

        <p>
          Our standard cleaning service is designed for regular maintenance, offering a perfect balance
          of thoroughness and efficiency. We focus on essential cleaning tasks that keep your home
          looking its best between
          {' '}
          <Link href="/deep-cleaning" className="link">deep cleanings</Link>
          .
          Our team arrives on time, brings their own supplies, and works efficiently to minimize
          disruption to your daily routine.
        </p>

        <h2>What's Included in Standard Cleaning?</h2>
        <p>
          Our standard cleaning service includes comprehensive cleaning of all living spaces, including dusting, vacuuming, mopping, bathroom cleaning, kitchen cleaning, and more. We focus on maintaining a clean and healthy environment with attention to detail in all areas. For a complete list of inclusions, please refer to our
          {' '}
          <Link href="/checklist" className="link">comprehensive cleaning checklist</Link>
          .
        </p>

        <h2>Perfect for Regular Maintenance</h2>
        <p>
          Standard cleaning is ideal for maintaining a clean home after a
          {' '}
          <Link href="/deep-cleaning" className="link">deep clean</Link>
          . We recommend scheduling
          standard cleanings on a regular basis (weekly, bi-weekly, or monthly) to maintain optimal
          cleanliness and prevent buildup.
        </p>

        <h2>Eco-Friendly Cleaning</h2>
        <p>
          We prioritize sustainability by using eco-friendly cleaning products that are gentle on
          surfaces and safe for both your health and the environment. Our cleaning methods are
          designed to be effective while minimizing environmental impact.
        </p>

        <h2>Professional and Reliable Service</h2>
        <p>
          Our team of professional cleaners is trained to deliver consistent, high-quality results
          every time. We understand the importance of reliability and punctuality, ensuring your
          cleaning schedule runs smoothly.
        </p>

        <h2>Additional Services Available</h2>
        <p>
          Need more thorough cleaning? We also offer
          {' '}
          <Link href="/deep-cleaning" className="text-primary hover:underline">
            deep cleaning
          </Link>
          ,
          {' '}
          <Link href="/move-in-out-cleaning" className="text-primary hover:underline">
            move-in/out cleaning
          </Link>
          , and
          {' '}
          <Link href="/vacation-rental-cleaning" className="text-primary hover:underline">
            vacation rental cleaning
          </Link>
          .
        </p>
      </section>

      <WhoAreWeSection className="mb-16" />

      <Suspense>
        <CTASection
          heading="Looking For A Standard Cleaning?"
          body={`Book your standard cleaning service with ${BUSINESS_NAME} today and experience the difference of professional cleaning. Our team is ready to transform your home into a spotless sanctuary.`}
          location="CACHED"
          showImage={false}
        />
      </Suspense>
    </Page>
  )
}
