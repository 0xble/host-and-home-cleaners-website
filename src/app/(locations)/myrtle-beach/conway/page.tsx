import type { Metadata } from 'next'
import Link from 'next/link'

import TrackedLink from '@/components/analytics/facebook/PixelTrackedLink'
import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationLandingPage from '@/components/templates/LocationLandingPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, PRICING, SITE_IMAGE, TAGLINE } from '@/lib/constants'
import { PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'
import { getBaseUrl } from '@/lib/utils'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.MYRTLE_BEACH.name}`

export const metadata: Metadata = {
  title: `Professional House & Airbnb Cleaners in Conway | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Proudly serving Conway and the Grand Strand area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
  openGraph: {
    title: `Professional House & Airbnb Cleaners in Conway | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Proudly serving Conway and the Grand Strand area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
    url: `${getBaseUrl()}/conway`,
    type: 'website',
    images: [
      {
        url: `${getBaseUrl()}${SITE_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} in Conway`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Professional House & Airbnb Cleaners in Conway | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Proudly serving Conway and the Grand Strand area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
    images: [`${getBaseUrl()}${SITE_IMAGE}`],
  },
}

export default function Conway() {
  return (
    <LocationLandingPage
      location="MYRTLE_BEACH"
      googleMapsEmbedUrl={LOCATIONS.MYRTLE_BEACH.googleMapsEmbedUrl}
      photosFolder="myrtle-beach"
      pricing={PRICING.MYRTLE_BEACH}
      copy={{
        heroHeading: (
          <>
            Residential & Short-Term Rental
            <br />
            Cleaning Services in Conway
          </>
        ),
        heroDescription: 'Professional residential cleaning services with quick turnaround times and competitive rates — trusted by Conway homeowners, vacation rental hosts, and real estate professionals!',
        reviewsHeading: 'What Are Others Saying?',
        locationsSectionHeading: 'We\'re Close By!',
        locationsSectionDescription: 'Proudly serving all areas of Conway and the surrounding communities!',
        howItWorksHeading: 'What Should I Expect?',
        howItWorksSteps: [
          {
            title: 'Schedule Your Cleaning',
            description: (
              <ul>
                <li>
                  Easily book online or call us for a free, no-obligation quote.
                </li>
                <li>
                  Enjoy a hassle-free, straightforward booking experience.
                </li>
                <li>
                  Provide us with your specific needs and preferred schedule.
                </li>
              </ul>
            ),
          },
          {
            title: 'Let Us Handle It From Here',
            description: (
              <ul>
                <li>
                  Relax while our certified cleaners prepare to make your space spotless.
                </li>
                <li>
                  Our team arrives on time, equipped with a detailed cleaning plan.
                </li>
              </ul>
            ),
          },
          {
            title: 'Enjoy Your Clean Home',
            description: (
              <ul>
                <li>
                  Experience the joy of a thoroughly cleaned home that feels fresh and revitalized.
                </li>
                <li>
                  Benefit from the comfort and health advantages of a professionally cleaned living space.
                </li>
              </ul>
            ),
          },
        ],
        pricingHeading: 'Bookings',
        pricingDescription: (
          <>
            <p className="mb-4 text-left">
              We have it all! From meticulous oven scrubbing, comprehensive bathroom sanitation to full-scale kitchen deep cleans — our expert team delivers top-tier residential cleaning services. Specializing in end-of-lease cleanings, short-term accommodation refreshes, and detailed spring cleanings, we cater to all your cleaning needs in Conway.
            </p>
            <p className="text-left">
              Our tailored move-in and move-out cleaning solutions guarantee a flawless handover, while our intensive refrigerator cleaning services render your appliance spotlessly clean.
            </p>
          </>
        ),
        faqHeading: 'FAQs',
        faqDescription: 'Explore our frequently asked questions. Should you have any inquiries not covered here, please feel free to contact us via phone, chat, or email at any time.',
        faqs: [
          {
            question: 'What sets you apart from the others?',
            answer: (
              <>
                <p className="mb-6">
                  When it comes to selecting a cleaning company in Conway, our team at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  stands out for several compelling reasons.
                </p>
                <CompetitorComparisonTable />
              </>
            ),
          },
          {
            question: 'Do I need to provide cleaning supplies?',
            answer: (
              <p>
                No, we bring our own eco-friendly cleaning products and equipment to every job, ensuring optimal results without any hassle on your part.
              </p>
            ),
          },
          {
            question: 'Do you carry insurance and bonding to protect customers?',
            answer: (
              <>
                <p className="mb-2">
                  Absolutely!
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  holds full bonding and insurance coverage. This offers our clients reassurance that they are shielded from any liabilities, providing peace of mind both during and after our services in their spaces.
                </p>
                <p>
                  Our unwavering dedication to professionalism and customer safety is just one of the reasons our clients consistently choose us for their cleaning requirements.
                </p>
              </>
            ),
          },
          {
            question: 'How far in advance do I need to book your services?',
            answer: (
              <p>
                We recommend booking our services as far in advance as possible, especially during peak seasons, to secure your preferred cleaning schedule. However, we understand that life can be unpredictable and offer flexible scheduling to accommodate same-day appointments when possible at a $20 surcharge.
              </p>
            ),
          },
          {
            question: 'What frequency of cleaning service is recommended?',
            answer: (
              <p>
                For optimal cleanliness and maintenance, we suggest scheduling bi-weekly cleaning sessions. For those who prefer less frequent services, we offer monthly deep cleaning options to maintain a pristine environment.
              </p>
            ),
          },
          {
            question: 'Are cleaning services available on weekends or holidays?',
            answer: (
              <p className="mb-2">
                Yes, to accommodate your schedule, we provide cleaning services on weekends and selected holidays. Please note that these slots carry an additional surcharge and we advise early booking to ensure availability.
              </p>
            ),
          },
          {
            question: 'Can I request additional services or specific cleaning tasks?',
            answer: (
              <p>
                Absolutely! We are flexible and willing to accommodate special requests or additional services to meet your specific needs. Whether it's particular areas of focus, special cleaning agents, or extra tasks, just let us know your requirements.
              </p>
            ),
          },
          {
            question: 'What is the procedure for rescheduling or canceling a cleaning appointment?',
            answer: (
              <p>
                We understand that plans can change, which is why we offer easy rescheduling options. Please inform us at least 24 hours in advance if you need to cancel or reschedule to help us efficiently manage our staffing.
              </p>
            ),
          },
          {
            question: 'How will you make sure I\'m satisfied with the cleaning?',
            answer: (
              <p className="mb-2">
                Your satisfaction is paramount at
                {' '}
                {SPECIFIC_BUSINESS_NAME}
                . If the cleaning does not meet your expectations, please contact us within 24 hours. We will promptly address the issue and offer a complimentary redo of the service to ensure your satisfaction.
              </p>
            ),
          },
        ],
        ctaHeading: 'Reserve a time and get a price in 60 seconds!',
        ctaBody: (
          <>
            Get your
            {' '}
            <Link
              href={ROUTES.BOOKING.href}
              className="link"
            >
              instant quote online
            </Link>
            {' '}
            or
            {' '}
            <TrackedLink
              href={`tel:+${PHONE.MYRTLE_BEACH.plain}`}
              className="link"
              isExternal
              eventName={PixelEvent.CONTACT}
              eventParams={{ method: 'phone' }}
            >
              call our Conway team
            </TrackedLink>
            . As Conway's premier cleaning service, we deliver five-star results. With
            {' '}
            {(() => {
              const now = new Date()
              const seasons = [
                { name: 'summer', month: 5, day: 20 },
                { name: 'holiday', month: 11, day: 1 },
                { name: 'spring', month: 2, day: 20 },
              ]

              const year = now.getFullYear()
              const dates = seasons.map(({ name, month, day }) => {
                const date = new Date(year, month, day)
                if (date < now) {
                  date.setFullYear(year + 1)
                }
                return { name, date }
              })

              return dates.reduce((closest, curr) =>
                Math.abs(curr.date.getTime() - now.getTime()) < Math.abs(closest.date.getTime() - now.getTime())
                  ? curr
                  : closest,
              ).name
            })()}
            {' '}
            season approaching, book now through our 24/7 online system for immediate confirmation. Experience why we're Conway's most trusted cleaning service!
          </>
        ),
      }}
    />
  )
}
