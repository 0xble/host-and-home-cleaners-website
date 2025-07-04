import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationLandingPage from '@/components/templates/LocationLandingPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, PRICING, SITE_IMAGE, TAGLINE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import { getBaseUrl } from '@/lib/utils'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House & Vacation Rental Cleaners in Nuuanu | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Nuuanu\'s residential and vacation rental properties. 5-star rated cleaners with outstanding testimonials. Book today!`,
  openGraph: {
    title: `Professional House & Vacation Rental Cleaners in Nuuanu | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Serving Nuuanu\'s residential and vacation rental properties. 5-star rated cleaners with outstanding testimonials. Book today!`,
    url: `${getBaseUrl()}/nuuanu`,
    type: 'website',
    images: [
      {
        url: `${getBaseUrl()}${SITE_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} in Nuuanu`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Professional House & Vacation Rental Cleaners in Nuuanu | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Serving Nuuanu\'s residential and vacation rental properties. 5-star rated cleaners with outstanding testimonials. Book today!`,
    images: [`${getBaseUrl()}${SITE_IMAGE}`],
  },
}

export default function Nuuanu() {
  return (
    <LocationLandingPage
      location="HONOLULU"
      googleMapsEmbedUrl={LOCATIONS.HONOLULU.googleMapsEmbedUrl}
      photosFolder="honolulu"
      pricing={PRICING.HONOLULU}
      copy={{
        heroHeading: (
          <>
            Nuuanu Valley's Top Choice
            <br />
            Home & Airbnb Cleaning Service
          </>
        ),
        heroDescription: 'Professional cleaning services tailored for Nuuanu\'s homes and vacation rentals. We deliver exceptional quality that keeps your property pristine and welcoming.',
        reviewsHeading: 'Client Experiences',
        locationsSectionHeading: 'Serving All of Nuuanu',
        locationsSectionDescription: 'Providing premium cleaning services throughout Nuuanu, from Nuuanu Avenue to Pali Highway!',
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
              Experience cleaning services designed for Nuuanu's properties! We understand the unique needs of both residential homes and vacation rentals. Our comprehensive services address everything from regular maintenance to deep cleaning needs.
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
            question: 'What sets your cleaning service apart in Nuuanu?',
            answer: (
              <>
                <p className="mb-6">
                  With deep roots in Nuuanu, our team at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  brings specialized expertise in caring for local properties. From historic homes to modern condos, we adapt our services to meet each property's unique requirements.
                </p>
                <CompetitorComparisonTable />
              </>
            ),
          },
          {
            question: 'What are your property access procedures?',
            answer: (
              <p>
                We accommodate multiple access options including digital locks, key lockboxes, and personal handoffs. Our team adheres to rigorous security measures to maintain the safety and privacy of your property.
              </p>
            ),
          },
          {
            question: 'What about exterior cleaning?',
            answer: (
              <p>
                Absolutely! From covered lanais to garden patios, we treat outdoor living areas with expert care. These spaces are vital to Hawaii living and receive our full attention and detailed cleaning protocols.
              </p>
            ),
          },
          {
            question: 'How do you manage different surface types?',
            answer: (
              <p>
                Our cleaners are extensively trained in proper care techniques for all surface materials. We select cleaning solutions and methods specifically suited to protect and enhance your home's unique finishes.
              </p>
            ),
          },
          {
            question: 'How flexible is your scheduling?',
            answer: (
              <p>
                Very! Whether you're a full-time resident or vacation rental owner, we'll work around your timeline. Our scheduling system ensures your property receives service exactly when you need it.
              </p>
            ),
          },
          {
            question: 'Tell me about your cleaning products',
            answer: (
              <p>
                We prioritize eco-conscious cleaning solutions that deliver powerful results while being gentle on your home and the environment. All products are carefully selected to be safe for families, pets, and our island ecosystem.
              </p>
            ),
          },
          {
            question: 'What if I need to reschedule?',
            answer: (
              <p>
                Life happens! We simply ask for 24 hours' advance notice for any schedule changes. This helps us maintain our high service standards for all our Nuuanu customers.
              </p>
            ),
          },
          {
            question: 'How do you maintain consistent quality?',
            answer: (
              <p className="mb-2">
                At
                {' '}
                {SPECIFIC_BUSINESS_NAME}
                , excellence is non-negotiable. We implement comprehensive cleaning checklists tailored to each property type and stand firmly behind our work with a satisfaction guarantee. Not completely satisfied? We'll return within 24 hours to address any concerns.
              </p>
            ),
          },
        ],
        ctaHeading: 'Schedule Your Clean Today',
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
            <a
              href={`tel:+${PHONE.HONOLULU.plain}`}
              className="link"
            >
              call our Nuuanu team
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
            approaching, our schedule fills quickly. Book now through our 24/7 online system and experience why Nuuanu residents trust us with their homes!
          </>
        ),
      }}
    />
  )
}
