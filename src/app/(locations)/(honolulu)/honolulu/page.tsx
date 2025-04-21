import type { Metadata } from 'next'
import TrackedLink from '@/components/analytics/facebook/PixelTrackedLink'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocalBusinessSchemaMarkup from '@/components/schema/LocalBusinessSchemaMarkup'
import LocationLandingPage from '@/components/templates/LocationLandingPage'
import { BUSINESS_NAME, EMAIL, LOCATIONS, PHONE, TAGLINE, DOMAIN } from '@/lib/constants'
import { PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House & Airbnb Cleaners in Honolulu | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Proudly serving the Honolulu and Oahu area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
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
        locationKey="HONOLULU"
        location={LOCATIONS.HONOLULU}
        reviewsBadgeId="142009ae-6f8c-4599-9c7e-9d370298abc9"
        googleMapsEmbedUrl="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d237770.1723966727!2d-157.869932!3d21.3836454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c4ce057e4bdff0b%3A0xa78d25a714d5f0ae!2sHost%20%26%20Home%20Cleaners%20Honolulu!5e0!3m2!1sen!2sus!4v1729395012053!5m2!1sen!2sus"
        photosFolder="honolulu"
        pricing={{ standard: 232, deep: 304, moveInOut: 340, vacationRental: 232 }}
        copy={{
          customHeroHeading: (
            <>
              #1 Top-Rated & Trusted Cleaners
              <br />
              Proudly serving
              {' '}
              {`${LOCATIONS.HONOLULU.name}, ${LOCATIONS.HONOLULU.stateAbbrev}`}
            </>
          ),
          customHeroDescription: 'Experience top-rated residential cleaning services in Honolulu, HI. Fast, reliable, and affordable — the preferred choice for Airbnb/VRBO hosts, homeowners, property managers, and realtors!',
          customReviewsHeading: 'Hear From Your Neighbors',
          customLocationsSectionHeading: 'We\'re Here to Serve You!',
          customLocationsSectionDescription: 'Proudly serving all areas of beautiful Oahu and Honolulu!',
          customHowItWorksHeading: 'So, What Will Happen?',
          customHowItWorksSteps: [
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
          customPricingSectionHeading: 'Our Services',
          customPricingSectionDescription: (
            <>
              <p className="mb-4 text-left">
                Discover our comprehensive cleaning services! From detailed oven cleaning to thorough bathroom sanitation and complete kitchen deep cleans, our skilled team provides exceptional residential cleaning solutions. We specialize in end-of-tenancy cleanings, short-term rental turnovers, and meticulous spring cleanings to meet all your cleaning needs.
              </p>
              <p className="text-left">
                Our customized move-in and move-out cleaning packages ensure a seamless transition, while our intensive fridge cleaning services leave your appliance spotless.
              </p>
            </>
          ),
          customFAQHeading: 'FAQ',
          customFAQDescription: 'Browse through our common questions. If you have any queries not addressed here, don\'t hesitate to reach out to us by phone, chat, or email at any time.',
          customFAQs: [
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
          customCTAHeading: 'Get a quote and booking in just 60 seconds!',
          customCTABody: (
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
