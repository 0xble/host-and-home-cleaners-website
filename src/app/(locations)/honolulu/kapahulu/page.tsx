import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationLandingPage from '@/components/templates/LocationLandingPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, PRICING, SITE_IMAGE, TAGLINE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import { getBaseUrl } from '@/lib/utils'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House & Rental Cleaners in Kapahulu | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Kapahulu\'s homes and vacation rentals. 5-star rated cleaners with outstanding testimonials. Book today!`,
  openGraph: {
    title: `Professional House & Rental Cleaners in Kapahulu | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Serving Kapahulu\'s homes and vacation rentals. 5-star rated cleaners with outstanding testimonials. Book today!`,
    url: `${getBaseUrl()}/kapahulu`,
    type: 'website',
    images: [
      {
        url: `${getBaseUrl()}${SITE_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} in Kapahulu`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Professional House & Rental Cleaners in Kapahulu | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Serving Kapahulu\'s homes and vacation rentals. 5-star rated cleaners with outstanding testimonials. Book today!`,
    images: [`${getBaseUrl()}${SITE_IMAGE}`],
  },
}

export default function Kapahulu() {
  return (
    <LocationLandingPage
      location="HONOLULU"
      googleMapsEmbedUrl={LOCATIONS.HONOLULU.googleMapsEmbedUrl}
      photosFolder="honolulu"
      pricing={PRICING.HONOLULU}
      copy={{
        heroHeading: (
          <>Kapahulu's Trusted Local Residential & Airbnb Cleaners</>
        ),
        heroDescription: 'Professional cleaning services tailored for Kapahulu\'s diverse properties. From cozy homes to vacation rentals near Waikiki, we deliver exceptional quality that keeps your space pristine.',
        reviewsHeading: 'Local Reviews',
        locationsSectionHeading: 'Serving All of Kapahulu',
        locationsSectionDescription: 'Providing premium cleaning services throughout Kapahulu, from Date Street to the edge of Waikiki!',
        howItWorksHeading: 'Simple & Professional Service',
        howItWorksSteps: [
          {
            title: 'Quick Booking',
            description: (
              <ul>
                <li>
                  Book online or call for a personalized quote.
                </li>
                <li>
                  Choose your preferred service package.
                </li>
                <li>
                  Share any specific requirements for your property.
                </li>
              </ul>
            ),
          },
          {
            title: 'Expert Service',
            description: (
              <ul>
                <li>
                  Our experienced team arrives prepared for your property type.
                </li>
                <li>
                  We follow detailed protocols for both residential and rental properties.
                </li>
              </ul>
            ),
          },
          {
            title: 'Perfect Results',
            description: (
              <ul>
                <li>
                  Return to a spotless space that exceeds expectations.
                </li>
                <li>
                  Enjoy professional cleaning that maintains your property\'s value.
                </li>
              </ul>
            ),
          },
        ],
        pricingHeading: 'Our Services',
        pricingDescription: (
          <>
            <p className="mb-4 text-left">
              Experience cleaning services designed for Kapahulu\'s unique mix of properties! We understand the diverse needs of our clients - from local residents to vacation rental owners. Our comprehensive services address everything from regular maintenance to specialized cleaning needs.
            </p>
            <p className="text-left">
              Whether you need recurring home cleaning, vacation rental turnovers, or move-in/move-out services, our expert team ensures your property maintains the highest standards of cleanliness.
            </p>
          </>
        ),
        faqHeading: 'FAQs',
        faqDescription: 'Find answers to frequently asked questions below. Our local team is always available to address any specific concerns.',
        faqs: [
          {
            question: 'What makes your service ideal for Kapahulu properties?',
            answer: (
              <>
                <p className="mb-6">
                  As cleaning specialists in Kapahulu, our team at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  understands the unique needs of both residential homes and vacation rentals in this vibrant neighborhood.
                </p>
                <CompetitorComparisonTable />
              </>
            ),
          },
          {
            question: 'Do you handle vacation rental turnovers?',
            answer: (
              <p>
                Yes! We specialize in quick turnovers for vacation rentals, ensuring your property is ready for the next guests. We understand the importance of timing and attention to detail in the hospitality industry.
              </p>
            ),
          },
          {
            question: 'How do you handle parking?',
            answer: (
              <p>
                We\'re familiar with Kapahulu\'s busy streets and parking situation. Our team plans accordingly to ensure efficient service without causing any inconvenience to you or your neighbors.
              </p>
            ),
          },
          {
            question: 'Can you accommodate flexible schedules?',
            answer: (
              <p>
                Yes! We understand the need for flexibility, especially for vacation rental turnovers. We offer early morning and evening appointments to work around check-in/check-out times.
              </p>
            ),
          },
          {
            question: 'Do you clean outdoor spaces?',
            answer: (
              <p>
                Yes! We can include lanais, patios, and other outdoor living spaces in our service. We understand these areas are essential parts of Hawaii living and clean them with the same attention to detail.
              </p>
            ),
          },
          {
            question: 'Do you use eco-friendly products?',
            answer: (
              <p>
                Yes! We use environmentally conscious cleaning products that are safe for your family, guests, and pets. Our products are effective yet gentle on your property and the environment.
              </p>
            ),
          },
          {
            question: 'What\'s your rescheduling policy?',
            answer: (
              <p>
                We understand plans can change. We request 24 hours\' notice for rescheduling to help us maintain efficient service for all our Kapahulu clients.
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
                . We use detailed checklists for each property type and back every clean with our satisfaction guarantee. If anything doesn\'t meet your expectations, we\'ll return within 24 hours to make it right.
              </p>
            ),
          },
        ],
        ctaHeading: 'Ready to Book?',
        ctaBody: (
          <>
            Get your
            {' '}
            <Link
              href={ROUTES.BOOKING.href}
              className="link"
            >
              instant, personalized quote online
            </Link>
            {' '}
            or
            {' '}
            <a
              href={`tel:+${PHONE.HONOLULU.plain}`}
              className="link"
            >
              connect directly with our Kapahulu team
            </a>
            . As Kapahulu's premier cleaning service, we blend local expertise with five-star results. With
            {' '}
            {(() => {
              const now = new Date()
              const seasons = [
                { name: 'peak tourist season', month: 5, day: 20 },
                { name: 'winter holidays', month: 11, day: 1 },
                { name: 'spring break', month: 2, day: 20 },
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
            approaching, book now through our 24/7 online system for immediate confirmation. Join our satisfied Kapahulu clients enjoying immaculately maintained spaces!
          </>
        ),
      }}
    />
  )
}
