import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationLandingPage from '@/components/templates/LocationLandingPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, PRICING, SITE_IMAGE, TAGLINE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import { getBaseUrl } from '@/lib/utils'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House & Residential Cleaners in Kalihi | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Kalihi\'s diverse community with reliable, quality cleaning services. 5-star rated cleaners with outstanding testimonials. Book today!`,
  openGraph: {
    title: `Professional House & Residential Cleaners in Kalihi | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Serving Kalihi\'s diverse community with reliable, quality cleaning services. 5-star rated cleaners with outstanding testimonials. Book today!`,
    url: `${getBaseUrl()}/kalihi`,
    type: 'website',
    images: [
      {
        url: `${getBaseUrl()}${SITE_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} in Kalihi`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Professional House & Residential Cleaners in Kalihi | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Serving Kalihi\'s diverse community with reliable, quality cleaning services. 5-star rated cleaners with outstanding testimonials. Book today!`,
    images: [`${getBaseUrl()}${SITE_IMAGE}`],
  },
}

export default function Kalihi() {
  return (
    <LocationLandingPage
      location="HONOLULU"
      googleMapsEmbedUrl={LOCATIONS.HONOLULU.googleMapsEmbedUrl}
      photosFolder="honolulu"
      pricing={PRICING.HONOLULU}
      copy={{
        heroHeading: (
          <>
            Professional House Cleaners
            <br />
            in Kalihi Valley
          </>
        ),
        heroDescription: 'Professional cleaning services tailored for Kalihi\'s diverse community. From family homes to multi-generational properties, we deliver exceptional quality that makes your home shine.',
        reviewsHeading: 'Reviews & Testimonials',
        locationsSectionHeading: 'Serving All of Kalihi',
        locationsSectionDescription: 'Providing premium cleaning services throughout Kalihi, from Kalihi Valley to Kalihi Kai!',
        howItWorksHeading: 'Your Clean Home Journey',
        howItWorksSteps: [
          {
            title: 'Simple Booking',
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
            title: 'Professional Care',
            description: (
              <ul>
                <li>
                  Our experienced team arrives ready to exceed expectations.
                </li>
                <li>
                  We follow detailed protocols for thorough cleaning.
                </li>
              </ul>
            ),
          },
          {
            title: 'Family Comfort',
            description: (
              <ul>
                <li>
                  Return to a spotless home that\'s ready for family life.
                </li>
                <li>
                  Enjoy a clean that makes daily living easier.
                </li>
              </ul>
            ),
          },
        ],
        pricingHeading: 'Our Services',
        pricingDescription: (
          <>
            <p className="mb-4 text-left">
              Experience cleaning services designed for Kalihi\'s family-oriented community! We understand the unique needs of local homes - from busy family spaces to multi-generational living areas. Our comprehensive services address everything from regular maintenance to deep cleaning needs.
            </p>
            <p className="text-left">
              Whether you need recurring home cleaning, move-in/move-out services, or special attention for high-traffic areas, our expert team ensures your home stays perfectly clean for the whole family.
            </p>
          </>
        ),
        faqHeading: 'Frequently Asked Questions',
        faqDescription: 'Find answers to frequently asked questions below. Our local team is always available to address any specific concerns.',
        faqs: [
          {
            question: 'What makes your service ideal for Kalihi homes?',
            answer: (
              <>
                <p className="mb-6">
                  As cleaning specialists in Kalihi, our team at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  understands the unique needs of local families, from maintaining busy households to caring for multi-generational homes.
                </p>
                <CompetitorComparisonTable />
              </>
            ),
          },
          {
            question: 'How do you handle large family homes?',
            answer: (
              <p>
                We\'re experienced with Kalihi\'s family homes and understand the challenges of maintaining busy households. Our team efficiently cleans all living spaces while respecting family routines and schedules.
              </p>
            ),
          },
          {
            question: 'Do you clean outdoor spaces?',
            answer: (
              <p>
                Yes! We can include lanais, carports, and other outdoor living spaces in our service. We understand these areas are essential parts of family life and clean them with the same attention to detail.
              </p>
            ),
          },
          {
            question: 'Are your products safe for children and pets?',
            answer: (
              <p>
                Absolutely! We use family-safe cleaning products that are effective yet gentle. All our cleaning solutions are carefully chosen to be safe for children, pets, and family members of all ages.
              </p>
            ),
          },
          {
            question: 'Can you work around family schedules?',
            answer: (
              <p>
                Yes! We understand family life is busy. We offer flexible scheduling options and can work around school hours, nap times, or other family activities to minimize disruption to your routine.
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
                We understand family plans can change. We request 24 hours\' notice for rescheduling to help us maintain efficient service for all our Kalihi clients.
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
                . We use detailed checklists specific to family homes and back every clean with our satisfaction guarantee. If anything doesn\'t meet your expectations, we\'ll return within 24 hours to make it right.
              </p>
            ),
          },
        ],
        ctaHeading: 'Ready for a Better Clean?',
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
              call our Kalihi team
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
            approaching, our schedule fills quickly. Book now through our 24/7 online system for immediate confirmation and experience why Kalihi families trust us with their homes!
          </>
        ),
      }}
    />
  )
}
