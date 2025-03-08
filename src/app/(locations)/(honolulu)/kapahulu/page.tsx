import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationPage from '@/components/LocationPage'
import ServiceSchemaMarkup from '@/components/ServiceSchemaMarkup'
import { BUSINESS_NAME, LOCATIONS, PHONE, TAGLINE, URL } from '@/lib/constants'
import { ContentViewTracker } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House & Rental Cleaners in Kapahulu | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Kapahulu\'s homes and vacation rentals. 5-star rated cleaners with outstanding testimonials. Book today!`,
}

export default function Kapahulu() {
  return (
    <>
      <ContentViewTracker
        contentType='location'
        contentName='Kapahulu'
        contentId='kapahulu-location'
      />
      <ServiceSchemaMarkup
        neighborhoodName='Kapahulu'
        fullServiceName='Professional House Cleaning Services in Kapahulu'
        description={`${TAGLINE}. Professional house cleaning services in Kapahulu, Honolulu area.`}
        url={`https://${URL}/kapahulu`}
        parentUrl={`https://${URL}${ROUTES.LOCATIONS.HONOLULU.href}`}
        parentBusinessName={`${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`}
      />
      <LocationPage
        locationKey='HONOLULU'
        location={LOCATIONS.HONOLULU}
        reviewsMasonryId='8a2da83f-ca84-4420-9a31-71143d5c546e'
        reviewsBadgeId='142009ae-6f8c-4599-9c7e-9d370298abc9'
        googleMapsEmbedUrl='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d237770.1723966727!2d-157.869932!3d21.3836454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c4ce057e4bdff0b%3A0xa78d25a714d5f0ae!2sHost%20%26%20Home%20Cleaners%20Honolulu!5e0!3m2!1sen!2sus!4v1729395012053!5m2!1sen!2sus'
        photosFolder='honolulu'
        pricing={{ standard: 232, deep: 304, moveInOut: 340, vacationRental: 232 }}
        copy={{
          customHeroHeading: (
            <>Kapahulu's Trusted Local Residential & Airbnb Cleaners</>
          ),
          customHeroDescription: 'Professional cleaning services tailored for Kapahulu\'s diverse properties. From cozy homes to vacation rentals near Waikiki, we deliver exceptional quality that keeps your space pristine.',
          customTestimonialsHeading: 'Local Reviews',
          customLocationsSectionHeading: 'Serving All of Kapahulu',
          customLocationsSectionDescription: 'Providing premium cleaning services throughout Kapahulu, from Date Street to the edge of Waikiki!',
          customHowItWorksHeading: 'Simple & Professional Service',
          customHowItWorksSteps: [
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
          customPricingSectionHeading: 'Our Services',
          customPricingSectionDescription: (
            <>
              <p className='mb-4 text-left'>
                Experience cleaning services designed for Kapahulu\'s unique mix of properties! We understand the diverse needs of our clients - from local residents to vacation rental owners. Our comprehensive services address everything from regular maintenance to specialized cleaning needs.
              </p>
              <p className='text-left'>
                Whether you need recurring home cleaning, vacation rental turnovers, or move-in/move-out services, our expert team ensures your property maintains the highest standards of cleanliness.
              </p>
            </>
          ),
          customFAQHeading: 'FAQs',
          customFAQDescription: 'Find answers to frequently asked questions below. Our local team is always available to address any specific concerns.',
          customFAQs: [
            {
              question: 'What makes your service ideal for Kapahulu properties?',
              answer: (
                <>
                  <p className='mb-6'>
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
                <p className='mb-2'>
                  Quality is our priority at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  . We use detailed checklists for each property type and back every clean with our satisfaction guarantee. If anything doesn\'t meet your expectations, we\'ll return within 24 hours to make it right.
                </p>
              ),
            },
          ],
          customCTAHeading: 'Ready to Book?',
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
    </>
  )
}
