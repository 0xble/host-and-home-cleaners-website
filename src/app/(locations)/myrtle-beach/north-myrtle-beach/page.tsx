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
  title: `Professional House & Airbnb Cleaners in North Myrtle Beach | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Proudly serving North Myrtle Beach and the Grand Strand area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
  openGraph: {
    title: `Professional House & Airbnb Cleaners in North Myrtle Beach | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Proudly serving North Myrtle Beach and the Grand Strand area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
    url: `${getBaseUrl()}/north-myrtle-beach`,
    type: 'website',
    images: [
      {
        url: `${getBaseUrl()}${SITE_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} in North Myrtle Beach`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Professional House & Airbnb Cleaners in North Myrtle Beach | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Proudly serving North Myrtle Beach and the Grand Strand area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
    images: [`${getBaseUrl()}${SITE_IMAGE}`],
  },
}

export default function NorthMyrtleBeach() {
  return (
    <LocationLandingPage
      location="MYRTLE_BEACH"
      googleMapsEmbedUrl="{LOCATIONS.MYRTLE_BEACH.googleMapsEmbedUrl}"
      photosFolder="myrtle-beach"
      pricing={PRICING.MYRTLE_BEACH}
      copy={{
        heroHeading: 'North Myrtle Beach\'s Premier Home Cleaning',
        heroDescription: 'In a city known for its vibrant entertainment and beautiful coastline, your home should be a peaceful retreat. We provide meticulous cleaning that lets you enjoy all that North Myrtle Beach has to offer, worry-free.',
        reviewsHeading: 'Hear From Your Neighbors!',
        locationsSectionHeading: 'Areas We Service',
        locationsSectionDescription: 'Bringing exceptional cleaning services to North Myrtle Beach and all surrounding coastal communities!',
        howItWorksHeading: 'Getting Started is Easy',
        howItWorksSteps: [
          {
            title: 'Quick & Easy Booking',
            description: (
              <ul>
                <li>
                  Schedule online in seconds or call for a personalized quote.
                </li>
                <li>
                  Choose from our flexible booking options that fit your schedule.
                </li>
                <li>
                  Customize your service with specific cleaning preferences.
                </li>
              </ul>
            ),
          },
          {
            title: 'Professional Service',
            description: (
              <ul>
                <li>
                  Our expert team arrives fully equipped and ready to exceed expectations.
                </li>
                <li>
                  Each cleaning follows our proven, systematic approach for consistent results.
                </li>
              </ul>
            ),
          },
          {
            title: 'Satisfaction Guaranteed',
            description: (
              <ul>
                <li>
                  Come home to a perfectly cleaned space that exceeds your expectations.
                </li>
                <li>
                  Feel the immediate difference in your home's cleanliness and comfort.
                </li>
              </ul>
            ),
          },
        ],
        pricingHeading: 'Cleaning Solutions',
        pricingDescription: (
          <>
            <p className="mb-4 text-left">
              Transform your space with our comprehensive cleaning solutions! Our expert team specializes in everything from thorough kitchen and bathroom sanitization to complete home refreshes. Whether you need regular maintenance cleaning, vacation rental turnovers, or deep cleaning services, we deliver exceptional results every time.
            </p>
            <p className="text-left">
              From move-in/move-out services to detailed appliance cleaning, we ensure every corner of your home receives the attention it deserves. Experience the perfect blend of thoroughness and efficiency with our professional cleaning team.
            </p>
          </>
        ),
        faqHeading: 'FAQs',
        faqDescription: 'Browse through our most common questions below. Need more information? Our friendly team is ready to help via phone, email, or chat 24/7.',
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
        ctaHeading: 'Ready for a Spotless Home?',
        ctaBody: (
          <>
            Get your
            {' '}
            <Link
              href={ROUTES.BOOKING.href}
              className="link"
            >
              personalized quote
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
              speak with our team
            </TrackedLink>
            . Peak
            {' '}
            {(() => {
              const now = new Date()
              const seasons = [
                { name: 'Spring', month: 2, day: 20 },
                { name: 'Summer', month: 5, day: 20 },
                { name: 'holiday', month: 11, day: 1 },
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
            season is approaching and our availability is limited - please secure your preferred time slot today!
          </>
        ),
      }}
    />
  )
}
