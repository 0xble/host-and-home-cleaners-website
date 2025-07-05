import type { Metadata } from 'next'
import Link from 'next/link'

import TrackedLink from '@/components/analytics/facebook/PixelTrackedLink'
import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationLandingPage from '@/components/templates/LocationLandingPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, SITE_IMAGE, TAGLINE } from '@/lib/constants'
import { PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'
import { getBaseUrl } from '@/lib/utils'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.YORK.name}`

export const metadata: Metadata = {
  title: `Professional House & Airbnb Cleaners in Hallam | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Proudly serving Hallam and the greater York area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
  openGraph: {
    title: `Professional House & Airbnb Cleaners in Hallam | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Proudly serving Hallam and the greater York area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
    url: `${getBaseUrl()}/york/hallam`,
    type: 'website',
    images: [
      {
        url: `${getBaseUrl()}${SITE_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} in Hallam, PA`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Professional House & Airbnb Cleaners in Hallam | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Proudly serving Hallam and the greater York area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
    images: [`${getBaseUrl()}${SITE_IMAGE}`],
  },
}

export default function Hallam() {
  return (
    <LocationLandingPage
      location="YORK"
      // TODO: Remove this once we have reviews for York/Hallam
      reviewsLocationOverride={null}
      googleMapsEmbedUrl={LOCATIONS.YORK.googleMapsEmbedUrl}
      // TODO: Upload more photos and replace with York/Hallam photos
      photosFolder="honolulu"
      // TODO: Replace with latest pricing
      pricing={{ standard: 150, deep: 250, moveInOut: 350, vacationRental: 180 }}
      copy={{
        heroHeading: (
          <>
            Expert Home Cleaning Services in Hallam, PA
          </>
        ),
        heroDescription: 'Professional residential cleaning services tailored for Hallam homes and vacation rentals. We deliver exceptional quality that keeps your property pristine and welcoming.',
        reviewsHeading: 'Client Experiences',
        locationsSectionHeading: 'Serving All of Hallam',
        locationsSectionDescription: 'Providing premium cleaning services throughout Hallam and the surrounding York County area!',
        howItWorksHeading: 'Quality Clean Experience',
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
                  Share any special requirements for your property.
                </li>
              </ul>
            ),
          },
          {
            title: 'Professional Service',
            description: (
              <ul>
                <li>
                  Our experienced team arrives fully equipped and prepared.
                </li>
                <li>
                  We follow detailed protocols for thorough cleaning.
                </li>
              </ul>
            ),
          },
          {
            title: 'Perfect Results',
            description: (
              <ul>
                <li>
                  Return to a spotless home that feels fresh and inviting.
                </li>
                <li>
                  Enjoy spaces that are perfectly clean and welcoming.
                </li>
              </ul>
            ),
          },
        ],
        pricingHeading: 'Our Services',
        pricingDescription: (
          <>
            <p className="mb-4 text-left">
              Experience cleaning services designed for Hallam's properties! We understand the unique needs of both residential homes and vacation rentals in the York County area. Our comprehensive services address everything from regular maintenance to deep cleaning needs.
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
            question: 'What makes your service ideal for Hallam properties?',
            answer: (
              <>
                <p className="mb-6">
                  As cleaning specialists serving Hallam and the greater York area, our team at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  understands the unique needs of local homes and vacation rentals. We're experienced with both regular maintenance and rental turnovers.
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
                Yes! We clean patios, porches, and outdoor living spaces. We understand these areas are essential parts of your home and clean them with the same attention to detail.
              </p>
            ),
          },
          {
            question: 'How do you handle different surfaces?',
            answer: (
              <p>
                Our team is trained in caring for various materials and finishes. We use appropriate cleaning methods and products that protect while maintaining the beauty of your home's surfaces.
              </p>
            ),
          },
          {
            question: 'Can you accommodate flexible schedules?',
            answer: (
              <p>
                Yes! We understand the needs of both residents and vacation rental hosts. We offer flexible scheduling to ensure your property is ready when needed.
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
                We understand plans can change. We request 24 hours' notice for rescheduling to help us maintain efficient service for all our Hallam and York area clients.
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
                . We use detailed checklists for both residential and vacation rental properties and back every clean with our satisfaction guarantee. If anything doesn't meet your expectations, we'll return within 24 hours to make it right.
              </p>
            ),
          },
        ],
        ctaHeading: 'Get Started Today',
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
              href={`tel:+${PHONE.YORK.plain}`}
              className="link"
              isExternal
              eventName={PixelEvent.CONTACT}
              eventParams={{ method: 'phone' }}
            >
              call our York area team
            </TrackedLink>
            . With busy schedules filling up quickly, our schedule fills fast. Book now through our 24/7 online system and experience why Hallam residents trust us with their homes!
          </>
        ),
      }}
    />
  )
}
