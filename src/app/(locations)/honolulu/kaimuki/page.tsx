import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationLandingPage from '@/components/templates/LocationLandingPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, PRICING, SITE_IMAGE, TAGLINE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import { getBaseUrl } from '@/lib/utils'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House & Airbnb Cleaners in Kaimuki | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Kaimuki\'s charming homes and properties. 5-star rated cleaners with outstanding testimonials. Book today!`,
  openGraph: {
    title: `Professional House & Airbnb Cleaners in Kaimuki | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Serving Kaimuki\'s charming homes and properties. 5-star rated cleaners with outstanding testimonials. Book today!`,
    url: `${getBaseUrl()}/kaimuki`,
    type: 'website',
    images: [
      {
        url: `${getBaseUrl()}${SITE_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} in Kaimuki`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Professional House & Airbnb Cleaners in Kaimuki | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Serving Kaimuki\'s charming homes and properties. 5-star rated cleaners with outstanding testimonials. Book today!`,
    images: [`${getBaseUrl()}${SITE_IMAGE}`],
  },
}

export default function Kaimuki() {
  return (
    <LocationLandingPage
      location="HONOLULU"
      googleMapsEmbedUrl={LOCATIONS.HONOLULU.googleMapsEmbedUrl}
      photosFolder="honolulu"
      pricing={PRICING.HONOLULU}
      copy={{
        heroHeading: (
          <>
            Kaimuki&apos;s Cleaning Professionals
            <br />
            for Homes & Vacation Rentals
          </>
        ),
        heroDescription: 'Professional cleaning services tailored for Kaimuki\'s charming homes and properties. From classic bungalows to modern renovations, we deliver exceptional quality that preserves and enhances your home\'s unique character.',
        reviewsHeading: 'What Your Neighbors Say',
        locationsSectionHeading: 'Serving All of Kaimuki',
        locationsSectionDescription: 'Providing premium cleaning services throughout Kaimuki, from Waialae Avenue to the slopes of Wilhelmina Rise!',
        howItWorksHeading: 'Your Home, Our Care',
        howItWorksSteps: [
          {
            title: 'Easy Booking',
            description: (
              <ul>
                <li>
                  Book online or call for a personalized quote.
                </li>
                <li>
                  Choose your preferred cleaning package.
                </li>
                <li>
                  Share any special requirements for your home.
                </li>
              </ul>
            ),
          },
          {
            title: 'Local Expertise',
            description: (
              <ul>
                <li>
                  Our experienced team arrives ready for Kaimuki\'s unique homes.
                </li>
                <li>
                  We follow protocols designed for local properties.
                </li>
              </ul>
            ),
          },
          {
            title: 'Neighborhood Pride',
            description: (
              <ul>
                <li>
                  Return to a spotless home that reflects Kaimuki\'s charm.
                </li>
                <li>
                  Enjoy a clean that respects your home\'s character.
                </li>
              </ul>
            ),
          },
        ],
        pricingHeading: 'Our Services',
        pricingDescription: (
          <>
            <p className="mb-4 text-left">
              Experience cleaning services designed for Kaimuki\'s distinctive homes! We understand the unique features of local properties - from vintage details to modern updates. Our comprehensive services address everything from regular maintenance to deep cleaning needs.
            </p>
            <p className="text-left">
              Whether you need recurring home cleaning, move-in/move-out services, or special attention for period features, our expert team ensures your home maintains its charm while staying perfectly clean.
            </p>
          </>
        ),
        faqHeading: 'Frequently Asked Questions',
        faqDescription: 'Find answers to frequently asked questions below. Our local team is always available to address any specific concerns.',
        faqs: [
          {
            question: 'What makes your service ideal for Kaimuki homes?',
            answer: (
              <>
                <p className="mb-6">
                  As cleaning specialists in Kaimuki, our team at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  understands the unique needs of local homes, from caring for original features to handling modern renovations.
                </p>
                <CompetitorComparisonTable />
              </>
            ),
          },
          {
            question: 'How do you handle vintage features?',
            answer: (
              <p>
                We\'re experienced with the unique features common in Kaimuki homes, from hardwood floors to period fixtures. We use appropriate cleaning methods and products that protect while maintaining these distinctive elements.
              </p>
            ),
          },
          {
            question: 'Do you clean outdoor spaces?',
            answer: (
              <p>
                Yes! We can include lanais, porches, and other outdoor living spaces in our service. We understand these areas are essential parts of Kaimuki homes and clean them with the same attention to detail.
              </p>
            ),
          },
          {
            question: 'How do you handle parking?',
            answer: (
              <p>
                We\'re familiar with Kaimuki\'s street parking situation and narrow driveways. Our team plans accordingly to ensure efficient service without causing any inconvenience to you or your neighbors.
              </p>
            ),
          },
          {
            question: 'What\'s your availability?',
            answer: (
              <p>
                We offer flexible scheduling to accommodate your needs. While we recommend booking in advance, we can often accommodate last-minute requests. Contact us for current availability.
              </p>
            ),
          },
          {
            question: 'Do you use eco-friendly products?',
            answer: (
              <p>
                Yes! We use environmentally conscious cleaning products that are safe for your family and pets. Our products are effective yet gentle on your home\'s surfaces and the environment.
              </p>
            ),
          },
          {
            question: 'What\'s your rescheduling policy?',
            answer: (
              <p>
                We understand plans can change. We request 24 hours\' notice for rescheduling to help us maintain efficient service for all our Kaimuki clients.
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
                . We use detailed checklists specific to local homes and back every clean with our satisfaction guarantee. If anything doesn\'t meet your expectations, we\'ll return within 24 hours to make it right.
              </p>
            ),
          },
        ],
        ctaHeading: 'Secure A Quote in 60 Seconds',
        ctaBody: (
          <>
            Get your
            {' '}
            <Link
              href={ROUTES.BOOKING.href}
              className="link"
            >
              custom quote online
            </Link>
            {' '}
            or
            {' '}
            <a
              href={`tel:+${PHONE.HONOLULU.plain}`}
              className="link"
            >
              call our Kaimuki team
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
            approaching, our schedule fills quickly. Book now through our 24/7 online system for immediate confirmation and experience Kaimuki's most trusted cleaning service!
          </>
        ),
      }}
    />
  )
}
