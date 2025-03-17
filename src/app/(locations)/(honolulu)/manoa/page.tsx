import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationLandingPage from '@/components/LocationLandingPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, TAGLINE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House Cleaners in Manoa Valley | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Manoa Valley\'s homes and properties. 5-star rated cleaners with outstanding testimonials. Book today!`,
}

export default function Manoa() {
  return (
    <LocationLandingPage
      locationKey='HONOLULU'
      location={LOCATIONS.HONOLULU}
      reviewsMasonryId='8a2da83f-ca84-4420-9a31-71143d5c546e'
      reviewsBadgeId='142009ae-6f8c-4599-9c7e-9d370298abc9'
      googleMapsEmbedUrl='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d237770.1723966727!2d-157.869932!3d21.3836454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c4ce057e4bdff0b%3A0xa78d25a714d5f0ae!2sHost%20%26%20Home%20Cleaners%20Honolulu!5e0!3m2!1sen!2sus!4v1729395012053!5m2!1sen!2sus'
      photosFolder='honolulu'
      pricing={{ standard: 232, deep: 304, moveInOut: 340, vacationRental: 232 }}
      copy={{
        customHeroHeading: (
          <>
            Professional House Cleaners
            <br />
            in Beautiful Manoa Valley
          </>
        ),
        customHeroDescription: 'Professional cleaning services tailored for Manoa\'s unique homes and climate. From historic properties to family residences, we deliver exceptional quality that respects your home\'s character.',
        customTestimonialsHeading: 'Neighbor Reviews',
        customLocationsSectionHeading: 'Serving All of Manoa',
        customLocationsSectionDescription: 'Providing premium cleaning services throughout Manoa Valley, from the University area to Upper Manoa!',
        customHowItWorksHeading: 'Your Clean Home Journey',
        customHowItWorksSteps: [
          {
            title: 'Simple Scheduling',
            description: (
              <ul>
                <li>
                  Book online or call for a personalized quote.
                </li>
                <li>
                  Choose your preferred cleaning package.
                </li>
                <li>
                  Share any special instructions about your home.
                </li>
              </ul>
            ),
          },
          {
            title: 'Expert Care',
            description: (
              <ul>
                <li>
                  Our experienced team arrives prepared for Manoa\'s unique conditions.
                </li>
                <li>
                  We follow protocols designed for local homes and materials.
                </li>
              </ul>
            ),
          },
          {
            title: 'Valley Fresh',
            description: (
              <ul>
                <li>
                  Return to a spotless home that feels as fresh as Manoa\'s morning air.
                </li>
                <li>
                  Enjoy a clean that considers our valley\'s unique environment.
                </li>
              </ul>
            ),
          },
        ],
        customPricingSectionHeading: 'Our Services',
        customPricingSectionDescription: (
          <>
            <p className='mb-4 text-left'>
              Experience cleaning services designed for Manoa\'s distinct environment! We understand the unique challenges of valley living - from managing humidity to protecting wood floors and fixtures. Our comprehensive services address everything from regular maintenance to deep cleaning needs.
            </p>
            <p className='text-left'>
              Whether you need recurring home cleaning, move-in/move-out services, or special attention for historic properties, our expert team ensures your home maintains its beauty while staying perfectly clean.
            </p>
          </>
        ),
        customFAQHeading: 'FAQs',
        customFAQDescription: 'Find answers to frequently asked questions below. Our local team is always available to address any specific concerns.',
        customFAQs: [
          {
            question: 'What makes your service ideal for Manoa homes?',
            answer: (
              <>
                <p className='mb-6'>
                  As cleaning specialists in Manoa Valley, our team at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  understands the unique needs of valley homes, from moisture management to caring for historic properties.
                </p>
                <CompetitorComparisonTable />
              </>
            ),
          },
          {
            question: 'How do you handle Manoa\'s humid climate?',
            answer: (
              <p>
                We use specialized cleaning techniques and products designed for Manoa\'s microclimate. Our methods help prevent mildew and maintain your home\'s cleanliness even in high humidity conditions.
              </p>
            ),
          },
          {
            question: 'Do you clean historic homes?',
            answer: (
              <p>
                Yes! We have extensive experience with Manoa\'s historic properties. We use appropriate cleaning methods and products that protect vintage materials while ensuring thorough cleaning.
              </p>
            ),
          },
          {
            question: 'How do you handle wood floors and fixtures?',
            answer: (
              <p>
                Our team is trained in caring for the wood features common in Manoa homes. We use gentle yet effective cleaning solutions that protect while maintaining these beautiful elements of your home.
              </p>
            ),
          },
          {
            question: 'What about sudden rain?',
            answer: (
              <p>
                We\'re well-versed in Manoa\'s weather patterns and plan accordingly. Our team brings appropriate equipment and adjusts cleaning strategies to ensure your home stays clean regardless of the weather.
              </p>
            ),
          },
          {
            question: 'Do you use eco-friendly products?',
            answer: (
              <p>
                Yes! We use environmentally conscious cleaning products that are safe for your family and align with Manoa\'s natural environment. Our products are effective yet gentle on your home and the valley ecosystem.
              </p>
            ),
          },
          {
            question: 'What\'s your rescheduling policy?',
            answer: (
              <p>
                We understand plans can change. We request 24 hours\' notice for rescheduling to help us maintain efficient service for all our Manoa Valley clients.
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
                . We use detailed checklists specific to valley homes and back every clean with our satisfaction guarantee. If anything doesn\'t meet your expectations, we\'ll return within 24 hours to make it right.
              </p>
            ),
          },
        ],
        customCTAHeading: 'Ready for a Valley-Fresh Clean?',
        customCTABody: (
          <>
            Get your
            {' '}
            <Link
              href={ROUTES.BOOKING.href}
              className='link'
            >
              instant, personalized quote online
            </Link>
            {' '}
            or
            {' '}
            <a
              href={`tel:+${PHONE.HONOLULU.plain}`}
              className='link'
            >
              connect directly with our Manoa Valley team
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
            approaching, our schedule is filling quickly. Our 24/7 online booking system provides immediate confirmation. Join our satisfied Manoa residents enjoying immaculately maintained homes - book now and experience the valley's most trusted cleaning service!
          </>
        ),
      }}
    />
  )
}
