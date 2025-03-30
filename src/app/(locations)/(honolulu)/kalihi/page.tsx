import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationLandingPage from '@/components/LocationLandingPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, TAGLINE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House & Residential Cleaners in Kalihi | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Kalihi\'s diverse community with reliable, quality cleaning services. 5-star rated cleaners with outstanding testimonials. Book today!`,
}

export default function Kalihi() {
  return (
    <LocationLandingPage
      locationKey='HONOLULU'
      location={LOCATIONS.HONOLULU}
      reviewsBadgeId='142009ae-6f8c-4599-9c7e-9d370298abc9'
      googleMapsEmbedUrl='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d237770.1723966727!2d-157.869932!3d21.3836454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c4ce057e4bdff0b%3A0xa78d25a714d5f0ae!2sHost%20%26%20Home%20Cleaners%20Honolulu!5e0!3m2!1sen!2sus!4v1729395012053!5m2!1sen!2sus'
      photosFolder='honolulu'
      pricing={{ standard: 232, deep: 304, moveInOut: 340, vacationRental: 232 }}
      copy={{
        customHeroHeading: (
          <>
            Professional House Cleaners
            <br />
            in Kalihi Valley
          </>
        ),
        customHeroDescription: 'Professional cleaning services tailored for Kalihi\'s diverse community. From family homes to multi-generational properties, we deliver exceptional quality that makes your home shine.',
        customReviewsHeading: 'Reviews & Testimonials',
        customLocationsSectionHeading: 'Serving All of Kalihi',
        customLocationsSectionDescription: 'Providing premium cleaning services throughout Kalihi, from Kalihi Valley to Kalihi Kai!',
        customHowItWorksHeading: 'Your Clean Home Journey',
        customHowItWorksSteps: [
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
        customPricingSectionHeading: 'Our Services',
        customPricingSectionDescription: (
          <>
            <p className='mb-4 text-left'>
              Experience cleaning services designed for Kalihi\'s family-oriented community! We understand the unique needs of local homes - from busy family spaces to multi-generational living areas. Our comprehensive services address everything from regular maintenance to deep cleaning needs.
            </p>
            <p className='text-left'>
              Whether you need recurring home cleaning, move-in/move-out services, or special attention for high-traffic areas, our expert team ensures your home stays perfectly clean for the whole family.
            </p>
          </>
        ),
        customFAQHeading: 'Frequently Asked Questions',
        customFAQDescription: 'Find answers to frequently asked questions below. Our local team is always available to address any specific concerns.',
        customFAQs: [
          {
            question: 'What makes your service ideal for Kalihi homes?',
            answer: (
              <>
                <p className='mb-6'>
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
              <p className='mb-2'>
                Quality is our priority at
                {' '}
                {SPECIFIC_BUSINESS_NAME}
                . We use detailed checklists specific to family homes and back every clean with our satisfaction guarantee. If anything doesn\'t meet your expectations, we\'ll return within 24 hours to make it right.
              </p>
            ),
          },
        ],
        customCTAHeading: 'Ready for a Better Clean?',
        customCTABody: (
          <>
            Get your
            {' '}
            <Link
              href={ROUTES.BOOKING.href}
              className='link'
            >
              instant quote online
            </Link>
            {' '}
            or
            {' '}
            <a
              href={`tel:+${PHONE.HONOLULU.plain}`}
              className='link'
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
