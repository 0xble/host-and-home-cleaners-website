import type { Metadata } from 'next'
import TrackedLink from '@/components/analytics/facebook/PixelTrackedLink'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationLandingPage from '@/components/templates/LocationLandingPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, TAGLINE } from '@/lib/constants'
import { PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional Home & Vacation Rental Cleaners in Hawaii Kai | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Hawaii Kai\'s residential and vacation rental properties. 5-star rated cleaners with outstanding reviews. Book today!`,
}

export default function HawaiiKai() {
  return (
    <LocationLandingPage
      location="HONOLULU"
      googleMapsEmbedUrl="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d237770.1723966727!2d-157.869932!3d21.3836454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c4ce057e4bdff0b%3A0xa78d25a714d5f0ae!2sHost%20%26%20Home%20Cleaners%20Honolulu!5e0!3m2!1sen!2sus!4v1729395012053!5m2!1sen!2sus"
      photosFolder="honolulu"
      pricing={{ standard: 232, deep: 304, moveInOut: 340, vacationRental: 232 }}
      copy={{
        heroHeading: (
          <>
            Professional House Cleaning
            <br />
            in Hawaii Kai
          </>
        ),
        heroDescription: 'Professional cleaning services tailored for Hawaii Kai\'s residential community. From family homes to vacation rentals, we deliver exceptional quality that preserves and enhances your property\'s appeal.',
        reviewsHeading: 'Client Experiences',
        locationsSectionHeading: 'Serving All of Hawaii Kai',
        locationsSectionDescription: 'Providing premium cleaning services throughout Hawaii Kai, from Portlock to Kalama Valley!',
        howItWorksHeading: 'Premium Clean Experience',
        howItWorksSteps: [
          {
            title: 'Personalized Booking',
            description: (
              <ul>
                <li>
                  Book online or call for a customized service plan.
                </li>
                <li>
                  Choose your preferred cleaning package.
                </li>
                <li>
                  Share any special requirements or access instructions.
                </li>
              </ul>
            ),
          },
          {
            title: 'Premium Service',
            description: (
              <ul>
                <li>
                  Our experienced team arrives fully equipped and prepared.
                </li>
                <li>
                  We follow detailed protocols for both homes and vacation rentals.
                </li>
              </ul>
            ),
          },
          {
            title: 'Island Living',
            description: (
              <ul>
                <li>
                  Return to a pristine home that feels welcoming.
                </li>
                <li>
                  Enjoy immaculate spaces perfect for island living.
                </li>
              </ul>
            ),
          },
        ],
        pricingHeading: 'Our Services',
        pricingDescription: (
          <>
            <p className="mb-4 text-left">
              Experience cleaning services designed for Hawaii Kai's diverse community! We understand the unique needs of both residential homes and vacation rentals. Our comprehensive services address everything from regular maintenance to detailed deep cleaning.
            </p>
            <p className="text-left">
              Whether you need recurring home cleaning, vacation rental turnover service, or preparation for special occasions, our expert team ensures your property maintains its pristine condition.
            </p>
          </>
        ),
        faqHeading: 'Frequently Asked Questions',
        faqDescription: 'Find answers to frequently asked questions below. Our local team is always available to address any specific concerns.',
        faqs: [
          {
            question: 'What makes your service ideal for Hawaii Kai homes?',
            answer: (
              <>
                <p className="mb-6">
                  As cleaning specialists in Hawaii Kai, our team at
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
            question: 'Do you clean outdoor living spaces?',
            answer: (
              <p>
                Yes! We clean lanais, patios, and outdoor entertainment spaces. We understand these areas are essential to the Hawaii Kai lifestyle and require special attention.
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
                Yes! We use environmentally conscious cleaning products that are safe for your family and the marine environment. Our products are effective yet gentle on your home and our oceans.
              </p>
            ),
          },
          {
            question: 'What\'s your rescheduling policy?',
            answer: (
              <p>
                We understand plans can change. We request 24 hours' notice for rescheduling to help us maintain efficient service for all our Hawaii Kai clients.
              </p>
            ),
          },
          {
            question: 'How do you ensure quality?',
            answer: (
              <p className="mb-2">
                Quality is our hallmark at
                {' '}
                {SPECIFIC_BUSINESS_NAME}
                . We use detailed checklists for both residential and vacation rental properties and back every clean with our satisfaction guarantee. If anything doesn't meet your expectations, we'll return within 24 hours to make it right.
              </p>
            ),
          },
        ],
        ctaHeading: 'Experience Premium Clean Living',
        ctaBody: (
          <>
            Get your
            {' '}
            <Link
              href={ROUTES.BOOKING.href}
              className="link"
            >
              personalized service plan
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
              call our Hawaii Kai team
            </TrackedLink>
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
            approaching, our schedule fills quickly. Book now through our 24/7 online system and discover why Hawaii Kai's most discerning residents trust us with their homes!
          </>
        ),
      }}
    />
  )
}
