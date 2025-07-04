import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationLandingPage from '@/components/templates/LocationLandingPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, PRICING, SITE_IMAGE, TAGLINE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import { getBaseUrl } from '@/lib/utils'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional Condo & House Cleaners in Salt Lake | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Salt Lake\'s residential and Airbnb properties. 5-star rated cleaners with outstanding testimonials. Book today!`,
  openGraph: {
    title: `Professional Condo & House Cleaners in Salt Lake | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Serving Salt Lake\'s residential and Airbnb properties. 5-star rated cleaners with outstanding testimonials. Book today!`,
    url: `${getBaseUrl()}/salt-lake`,
    type: 'website',
    images: [
      {
        url: `${getBaseUrl()}${SITE_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} in Salt Lake`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Professional Condo & House Cleaners in Salt Lake | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Serving Salt Lake\'s residential and Airbnb properties. 5-star rated cleaners with outstanding testimonials. Book today!`,
    images: [`${getBaseUrl()}${SITE_IMAGE}`],
  },
}

export default function SaltLake() {
  return (
    <LocationLandingPage
      location="HONOLULU"
      googleMapsEmbedUrl={LOCATIONS.HONOLULU.googleMapsEmbedUrl}
      photosFolder="honolulu"
      pricing={PRICING.HONOLULU}
      copy={{
        heroHeading: (
          <>
            Salt Lake&apos;s Trusted
            <br />
            House & Rental Cleaners
          </>
        ),
        heroDescription: 'Professional cleaning services tailored for Salt Lake\'s modern lifestyle. From high-rise condos to family homes, to Airbnb rentals, we deliver exceptional quality that elevates your living space.',
        reviewsHeading: 'Resident Reviews',
        locationsSectionHeading: 'Serving All of Salt Lake',
        locationsSectionDescription: 'Providing premium cleaning services throughout Salt Lake, from Ala Nioi Place to Salt Lake Boulevard!',
        howItWorksHeading: 'Effortless Clean Living',
        howItWorksSteps: [
          {
            title: 'Simple Scheduling',
            description: (
              <ul>
                <li>
                  Book online or call for a personalized quote.
                </li>
                <li>
                  Choose your preferred service package.
                </li>
                <li>
                  Share any special instructions or access details.
                </li>
              </ul>
            ),
          },
          {
            title: 'Expert Service',
            description: (
              <ul>
                <li>
                  Our experienced team arrives prepared with all necessary supplies.
                </li>
                <li>
                  We follow detailed protocols for both homes and vacation rentals.
                </li>
              </ul>
            ),
          },
          {
            title: 'Peace of Mind',
            description: (
              <ul>
                <li>
                  Return to a pristine space that feels like home.
                </li>
                <li>
                  Enjoy a clean that exceeds expectations.
                </li>
              </ul>
            ),
          },
        ],
        pricingHeading: 'Our Services',
        pricingDescription: (
          <>
            <p className="mb-4 text-left">
              Experience cleaning services designed for Salt Lake's residential community! We understand the unique needs of both family homes and vacation rentals. Our comprehensive services address everything from regular maintenance to deep cleaning needs.
            </p>
            <p className="text-left">
              Whether you need recurring home cleaning, vacation rental turnover service, or move-in/move-out cleaning, our expert team ensures your space maintains the highest standards of cleanliness.
            </p>
          </>
        ),
        faqHeading: 'Frequently Asked Questions',
        faqDescription: 'Find answers to frequently asked questions below. Our local team is always available to address any specific concerns.',
        faqs: [
          {
            question: 'What makes your service ideal for Salt Lake properties?',
            answer: (
              <>
                <p className="mb-6">
                  As cleaning specialists in Salt Lake, our team at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  understands the unique needs of residential homes and vacation rentals. We're experienced with both regular home maintenance and vacation property turnovers.
                </p>
                <CompetitorComparisonTable />
              </>
            ),
          },
          {
            question: 'How do you handle property access?',
            answer: (
              <p>
                We work with various access methods including lockboxes, smart locks, and in-person key exchanges. Our team follows strict security protocols to ensure your property is safe and secure.
              </p>
            ),
          },
          {
            question: 'Do you clean outdoor spaces?',
            answer: (
              <p>
                Yes! We clean lanais, patios, and entryways to ensure your entire living space is pristine. We understand these spaces are essential parts of Hawaii living.
              </p>
            ),
          },
          {
            question: 'How do you handle parking?',
            answer: (
              <p>
                We're familiar with Salt Lake's residential areas and parking situations. Our team plans accordingly to ensure efficient service without any parking hassles.
              </p>
            ),
          },
          {
            question: 'Can you work around family schedules?',
            answer: (
              <p>
                Yes! We understand the rhythm of family life and offer flexible scheduling options. We can work around school hours, nap times, or other activities to minimize disruption.
              </p>
            ),
          },
          {
            question: 'Do you use eco-friendly products?',
            answer: (
              <p>
                Yes! We use environmentally conscious cleaning products that are safe for your family and pets. Our products are effective yet gentle on your home and the environment.
              </p>
            ),
          },
          {
            question: 'What\'s your rescheduling policy?',
            answer: (
              <p>
                We understand plans can change. We request 24 hours' notice for rescheduling to help us maintain efficient service for all our Salt Lake clients.
              </p>
            ),
          },
          {
            question: 'How do you ensure quality?',
            answer: (
              <p className="mb-2">
                Quality is our priority at
                {' '}
                {SPECIFIC_BUSINESS_NAME}
                . We use detailed checklists specific to residential or vacation rentals and back every clean with our satisfaction guarantee. If anything doesn't meet your expectations, we'll return within 24 hours to make it right.
              </p>
            ),
          },
        ],
        ctaHeading: 'Get Your Quote in 60 Seconds!',
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
            <a
              href={`tel:+${PHONE.HONOLULU.plain}`}
              className="link"
            >
              call our Salt Lake team
            </a>
            . With
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
            approaching, our schedule fills quickly. Book now through our 24/7 online system for immediate confirmation and experience Salt Lake's most trusted cleaning service!
          </>
        ),
      }}
    />
  )
}
