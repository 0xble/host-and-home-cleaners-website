import type { Metadata } from 'next'
import Link from 'next/link'

import TrackedLink from '@/components/analytics/facebook/PixelTrackedLink'
import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocalBusinessSchemaMarkup from '@/components/schema/LocalBusinessSchemaMarkup'
import LocationLandingPage from '@/components/templates/LocationLandingPage'
import { BUSINESS_NAME, DOMAIN, EMAIL, LOCATIONS, PHONE, PRICING, SITE_IMAGE, TAGLINE } from '@/lib/constants'
import { PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'
import { getBaseUrl } from '@/lib/utils'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.MYRTLE_BEACH.name}`
const SPECIFIC_URL = `https://${DOMAIN}${ROUTES.LOCATIONS.MYRTLE_BEACH.href}`

export const metadata: Metadata = {
  title: `Professional House & Airbnb Cleaners in Myrtle Beach | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Proudly serving the Myrtle Beach and Grand Strand area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
  openGraph: {
    title: `Professional House & Airbnb Cleaners in Myrtle Beach | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Proudly serving the Myrtle Beach and Grand Strand area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
    url: `${getBaseUrl()}/myrtle-beach`,
    type: 'website',
    images: [
      {
        url: `${getBaseUrl()}${SITE_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} in Myrtle Beach`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Professional House & Airbnb Cleaners in Myrtle Beach | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Proudly serving the Myrtle Beach and Grand Strand area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
    images: [`${getBaseUrl()}${SITE_IMAGE}`],
  },
}

export default function MyrtleBeach() {
  return (
    <>
      <LocalBusinessSchemaMarkup
        locationName={LOCATIONS.MYRTLE_BEACH.name}
        description={`${TAGLINE}. Proudly serving the Myrtle Beach and Grand Strand area.`}
        url={SPECIFIC_URL}
        telephone={PHONE.MYRTLE_BEACH.formatted}
        email={EMAIL.MYRTLE_BEACH}
        address={{
          streetAddress: '1344 Poole St',
          addressLocality: 'North Myrtle Beach',
          addressRegion: 'SC',
          postalCode: '29582',
          addressCountry: 'US',
        }}
      />
      <LocationLandingPage
        location="MYRTLE_BEACH"
        googleMapsEmbedUrl="{LOCATIONS.MYRTLE_BEACH.googleMapsEmbedUrl}"
        photosFolder="myrtle-beach"
        pricing={PRICING.MYRTLE_BEACH}
        copy={{
          heroHeading: (
            <>
              Myrtle Beach&apos;s #1 Local
              <br />
              Home & Vacation Rental Cleaning Service
            </>
          ),
          heroDescription: 'High-quality residential cleaning services, fast turnaround, at affordable prices — this is why home owners, Airbnb short-term vacation rentals, and realtors all go with us!',
          reviewsHeading: 'Hear From Your Neighbors!',
          locationsSectionHeading: 'We\'re In Your Neighborhood!',
          locationsSectionDescription: 'Proudly serving all areas of Myrtle Beach and the Grand Strand!',
          howItWorksHeading: 'So, What Does It Look Like?',
          howItWorksSteps: [
            {
              title: 'Schedule your cleaning session',
              description: (
                <ul>
                  <li>
                    Secure your booking online swiftly or call us for a
                    complimentary quote without any commitment.
                  </li>
                  <li>
                    Experience a streamlined, straightforward booking process.
                  </li>
                  <li>
                    Share your specific requirements and preferred timings with
                    us.
                  </li>
                </ul>
              ),
            },
            {
              title: 'Let us take it from here',
              description: (
                <ul>
                  <li>
                    Relax after scheduling as our certified cleaners prepare to
                    transform your space.
                  </li>
                  <li>
                    Expect our team, equipped with a comprehensive cleaning
                    plan, to arrive punctually at your residence.
                  </li>
                </ul>
              ),
            },
            {
              title: 'Walk into a newly cleaned space',
              description: (
                <ul>
                  <li>
                    Discover the delight of a meticulously cleaned home that
                    feels fresh and revitalized.
                  </li>
                  <li>
                    Enjoy the comfort and health benefits of a professionally
                    cleaned living space.
                  </li>
                </ul>
              ),
            },
          ],
          pricingHeading: 'Bookings',
          pricingDescription: (
            <>
              <p className="mb-4 text-left">
                We have it all! From meticulous oven scrubbing, comprehensive
                bathroom sanitation to full-scale kitchen deep cleans — our expert
                team delivers top-tier residential cleaning services. Specializing
                in end-of-lease cleanings, short-term accommodation refreshes, and
                detailed spring cleanings, we cater to all your cleaning needs.
              </p>
              <p className="text-left">
                Our tailored move-in and move-out cleaning solutions guarantee a
                flawless handover, while our intensive refrigerator cleaning
                services render your appliance spotlessly clean.
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
                    When it comes to selecting a cleaning company in Myrtle
                    Beach, our team at
                    {' '}
                    {SPECIFIC_BUSINESS_NAME}
                    {' '}
                    stands out for several
                    compelling reasons.
                  </p>
                  <CompetitorComparisonTable />
                </>
              ),
            },
            {
              question: 'Do I need to provide cleaning supplies?',
              answer: (
                <p>
                  No, we bring our own eco-friendly cleaning products and
                  equipment to every job, ensuring optimal results without
                  any hassle on your part.
                </p>
              ),
            },
            {
              question:
            'Do you carry insurance and bonding to protect customers?',
              answer: (
                <>
                  <p className="mb-2">
                    Absolutely!
                    {' '}
                    {SPECIFIC_BUSINESS_NAME}
                    {' '}
                    holds full bonding and insurance
                    coverage. This offers our clients reassurance that they
                    are shielded from any liabilities, providing peace of
                    mind both during and after our services in their spaces
                  </p>
                  <p>
                    Our unwavering dedication to professionalism and
                    customer safety is just one of the reasons our clients
                    consistently choose us for their cleaning requirements.
                  </p>
                </>
              ),
            },
            {
              question:
            'How far in advance do I need to book your services?',
              answer: (
                <p>
                  We recommend booking our services as far in advance as
                  possible, especially during peak seasons, to secure your
                  preferred cleaning schedule. However, we understand that
                  life can be unpredictable and offer flexible scheduling to
                  accommodate same-day appointments when possible at $20
                  surcharge.
                </p>
              ),
            },
            {
              question:
            'What frequency of cleaning service is recommended?',
              answer: (
                <p>
                  For optimal cleanliness and maintenance, we suggest
                  scheduling bi-weekly cleaning sessions. For those who
                  prefer less frequent services, we offer monthly deep
                  cleaning options to maintain a pristine environment.
                </p>
              ),
            },
            {
              question:
            'Are cleaning services available on weekends or holidays?',
              answer: (
                <p className="mb-2">
                  Yes, to accommodate your schedule, we provide cleaning
                  services on weekends and selected holidays. Please note
                  that these slots carry an additional surcharge and we
                  advise early booking to ensure availability.
                </p>
              ),
            },
            {
              question:
            'Can I request additional services or specific cleaning tasks?',
              answer: (
                <p>
                  Absolutely! We are flexible and willing to accommodate
                  special requests or additional services to meet your
                  specific needs. Whether it&apos;s particular areas of
                  focus, special cleaning agents, or extra tasks, just let
                  us know your requirements.
                </p>
              ),
            },
            {
              question:
            'What is the procedure for rescheduling or canceling a cleaning appointment?',
              answer: (
                <p>
                  We understand that plans can change, which is why we offer
                  easy rescheduling options. Please inform us at least 24
                  hours in advance if you need to cancel or reschedule to
                  help us efficiently manage our staffing.
                </p>
              ),
            },
            {
              question:
            'How will you make sure I\'m satisfied with the cleaning?',
              answer: (
                <p className="mb-2">
                  Your satisfaction is paramount at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  . If the cleaning
                  does not meet your expectations, please contact us within
                  24 hours. We will promptly address the issue and offer a
                  complimentary redo of the service to ensure your
                  satisfaction.
                </p>
              ),
            },
          ],
          ctaHeading: 'Ready to get a price and reserve a time in 60 seconds?',
          ctaBody: (
            <>
              Get an
              {' '}
              <Link
                href={ROUTES.BOOKING.href}
                className="link"
              >
                instant, no-obligation quote online
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
                give us a call today
              </TrackedLink>
              . If you call and the line is busy, don&apos;t worry — try again at
              a later time or leave a voicemail and we&apos;ll get back to you as
              soon as we can!
            </>
          ),
        }}
      />
    </>
  )
}
