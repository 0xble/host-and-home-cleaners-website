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

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House & Airbnb Cleaners in Honolulu | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Proudly serving the Honolulu and Oahu area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
  openGraph: {
    title: `Professional House & Airbnb Cleaners in Honolulu | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Proudly serving the Honolulu and Oahu area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
    url: `${getBaseUrl()}/honolulu`,
    type: 'website',
    images: [
      {
        url: `${getBaseUrl()}${SITE_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} in Honolulu`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Professional House & Airbnb Cleaners in Honolulu | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Proudly serving the Honolulu and Oahu area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
    images: [`${getBaseUrl()}${SITE_IMAGE}`],
  },
}

export default function Honolulu() {
  return (
    <>
      <LocalBusinessSchemaMarkup
        locationName={LOCATIONS.HONOLULU.name}
        description={`${TAGLINE}. Proudly serving the Honolulu and Oahu area.`}
        url={`https://${DOMAIN}${ROUTES.LOCATIONS.HONOLULU.href}`}
        telephone={PHONE.HONOLULU.formatted}
        email={EMAIL.HONOLULU}
        address={{
          streetAddress: '200 N Vineyard Blvd Ste A325 - 351',
          addressLocality: 'Honolulu',
          addressRegion: 'HI',
          postalCode: '96817',
          addressCountry: 'US',
        }}
      />
      <LocationLandingPage
        location="HONOLULU"
        googleMapsEmbedUrl={LOCATIONS.HONOLULU.googleMapsEmbedUrl}
        photosFolder="honolulu"
        pricing={PRICING.HONOLULU}
        copy={{
          heroHeading: (
            <>
              #1 Top-Rated & Trusted Cleaners
              <br />
              Proudly serving
              {' '}
              {`${LOCATIONS.HONOLULU.name}, ${LOCATIONS.HONOLULU.stateAbbrev}`}
            </>
          ),
          heroDescription: 'Experience top-rated residential cleaning services in Honolulu, HI. Fast, reliable, and affordable — the preferred choice for Airbnb/VRBO hosts, homeowners, property managers, and realtors!',
          reviewsHeading: 'Hear From Your Neighbors',
          locationsSectionHeading: 'We\'re Here to Serve You!',
          locationsSectionDescription: 'Proudly serving all areas of beautiful Oahu and Honolulu!',
          howItWorksHeading: 'So, What Will Happen?',
          howItWorksSteps: [
            {
              title: 'Set Up Your Cleaning Appointment',
              description: (
                <ul>
                  <li>
                    Secure your slot online effortlessly or give us a call for a
                    free, no-obligation estimate.
                  </li>
                  <li>Experience a hassle-free, simple booking process.</li>
                  <li>Let us know your specific needs and ideal schedule.</li>
                </ul>
              ),
            },
            {
              title: 'Leave the Rest to Us',
              description: (
                <ul>
                  <li>
                    Sit back after booking while our certified cleaners get
                    ready to revitalize your space.
                  </li>
                  <li>
                    Expect our team, equipped with a thorough cleaning plan, to
                    arrive promptly at your home.
                  </li>
                </ul>
              ),
            },
            {
              title: 'Step Into a Freshly Cleaned Home',
              description: (
                <ul>
                  <li>
                    Enjoy the satisfaction of a perfectly cleaned home that
                    feels rejuvenated and renewed.
                  </li>
                  <li>
                    Take pleasure in the comfort and health benefits of a
                    professionally maintained living environment.
                  </li>
                </ul>
              ),
            },
          ],
          pricingHeading: 'Our Services',
          pricingDescription: (
            <>
              <p className="mb-4 text-left">
                Discover our comprehensive cleaning services! From detailed oven cleaning to thorough bathroom sanitation and complete kitchen deep cleans, our skilled team provides exceptional residential cleaning solutions. We specialize in end-of-tenancy cleanings, short-term rental turnovers, and meticulous spring cleanings to meet all your cleaning needs.
              </p>
              <p className="text-left">
                Our customized move-in and move-out cleaning packages ensure a seamless transition, while our intensive fridge cleaning services leave your appliance spotless.
              </p>
            </>
          ),
          faqHeading: 'FAQ',
          faqDescription: 'Browse through our common questions. If you have any queries not addressed here, don\'t hesitate to reach out to us by phone, chat, or email at any time.',
          faqs: [
            {
              question: 'What makes you different from the competition?',
              answer: (
                <>
                  <p className="mb-6">
                    When it comes to choosing a cleaning service in
                    Honolulu,
                    {' '}
                    {SPECIFIC_BUSINESS_NAME}
                    {' '}
                    stands out for
                    several key reasons.
                  </p>
                  <CompetitorComparisonTable />
                </>
              ),
            },
            {
              question: 'Do I need to supply my own cleaning products?',
              answer: (
                <p>
                  No need to worry about supplies — we bring our own
                  eco-friendly products and equipment, ensuring exceptional
                  results with zero inconvenience to you.
                </p>
              ),
            },
            {
              question: 'Are you insured and bonded to safeguard clients?',
              answer: (
                <>
                  <p className="mb-2">
                    Absolutely!
                    {' '}
                    {SPECIFIC_BUSINESS_NAME}
                    {' '}
                    is fully
                    bonded and insured. This provides our clients with peace
                    of mind, knowing they are protected from any liabilities
                    during and after our services.
                  </p>
                  <p>
                    Our unwavering commitment to professionalism and client
                    safety is one of the main reasons why our customers
                    trust us for their cleaning needs.
                  </p>
                </>
              ),
            },
            {
              question: 'How early should I schedule your services?',
              answer: (
                <p>
                  We suggest booking as far in advance as possible,
                  particularly during busy seasons, to secure your preferred
                  time slot. However, we understand that life happens, so we
                  offer flexible scheduling, including same-day appointments
                  when available for a $20 surcharge.
                </p>
              ),
            },
            {
              question: 'What cleaning frequency is suggested?',
              answer: (
                <p>
                  For consistent cleanliness, we recommend scheduling
                  bi-weekly cleaning sessions. For those needing less
                  frequent cleanings, we offer monthly deep cleaning options
                  to maintain a spotless environment.
                </p>
              ),
            },
            {
              question: 'Do you offer services on weekends or holidays?',
              answer: (
                <p className="mb-2">
                  Yes, to fit your busy life, we offer cleaning services on
                  weekends and select holidays. These times may come with an
                  additional fee, so we recommend booking early to ensure
                  availability.
                </p>
              ),
            },
            {
              question: 'Can I ask for extra services or specific tasks?',
              answer: (
                <p>
                  Absolutely! We are flexible and open to special requests
                  or extra services to meet your unique needs. Whether it's
                  specific areas, specialized products, or additional tasks,
                  just let us know what you require.
                </p>
              ),
            },
            {
              question: 'What is the process for changing or canceling a cleaning appointment?',
              answer: (
                <p>
                  We understand that plans change, so we offer easy
                  rescheduling options. Please notify us at least 24 hours
                  in advance if you need to cancel or reschedule, allowing
                  us to manage our team effectively.
                </p>
              ),
            },
            {
              question: 'How do you ensure I\'m happy with the cleaning?',
              answer: (
                <p className="mb-2">
                  Your happiness is our priority at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  . If you&apos;re not completely satisfied, contact us
                  within 24 hours, and we&apos;ll promptly address the issue with
                  a complimentary redo to ensure you&apos;re pleased with the
                  service.
                </p>
              ),
            },
          ],
          ctaHeading: 'Get a quote and booking in just 60 seconds!',
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
                href={`tel:+${PHONE.HONOLULU.plain}`}
                className="link"
                isExternal
                eventName={PixelEvent.CONTACT}
                eventParams={{ method: 'phone' }}
              >
                give us a call today
              </TrackedLink>
              . If you call and the line is busy, don&apos;t worry — try again at
              a later time or leave a voicemail and we&apos;ll get back to you as
              soon as possible. With
              {' '}
              {(() => {
                const now = new Date()
                const seasons = [
                  { name: 'peak season', month: 5, day: 20 },
                  { name: 'winter', month: 11, day: 1 },
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
              approaching, book now through our 24/7 online system for immediate confirmation. Join our satisfied customers enjoying pristine homes!
            </>
          ),
        }}
      />
    </>
  )
}
