import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationPage from '@/components/LocationPage'
import TrackedLink from '@/components/TrackedLink'
import { BUSINESS_NAME, LOCATIONS, PHONE, TAGLINE } from '@/lib/constants'
import { ContentViewTracker, PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House & Vacation Rental Cleaners in Aina Haina | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Aina Haina\'s residential and vacation rental properties. 5-star rated cleaners with outstanding testimonials. Book today!`,
}

export default function AinaHaina() {
  return (
    <>
      <ContentViewTracker
        contentType='location'
        contentName='Aina Haina'
        contentId='aina-haina-location'
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
            <>
              Aina Haina, Meet Expert Home Cleaning
            </>
          ),
          customHeroDescription: 'Professional cleaning services tailored for Aina Haina\'s homes and vacation rentals. We deliver exceptional quality that keeps your property pristine and welcoming.',
          customTestimonialsHeading: 'Client Experiences',
          customLocationsSectionHeading: 'Serving All of Aina Haina',
          customLocationsSectionDescription: 'Providing premium cleaning services throughout Aina Haina, from East Hind Drive to Wailupe Valley!',
          customHowItWorksHeading: 'Quality Clean Experience',
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
          customPricingSectionHeading: 'Our Services',
          customPricingSectionDescription: (
            <>
              <p className='mb-4 text-left'>
                Experience cleaning services designed for Aina Haina's properties! We understand the unique needs of both residential homes and vacation rentals. Our comprehensive services address everything from regular maintenance to deep cleaning needs.
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
              question: 'What makes your service ideal for Aina Haina properties?',
              answer: (
                <>
                  <p className='mb-6'>
                    As cleaning specialists in Aina Haina, our team at
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
                  Yes! We clean lanais, patios, and outdoor living spaces. We understand these areas are essential parts of your home and clean them with the same attention to detail.
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
                  We understand plans can change. We request 24 hours' notice for rescheduling to help us maintain efficient service for all our Aina Haina clients.
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
                  . We use detailed checklists for both residential and vacation rental properties and back every clean with our satisfaction guarantee. If anything doesn't meet your expectations, we'll return within 24 hours to make it right.
                </p>
              ),
            },
          ],
          customCTAHeading: 'Get Started Today',
          customCTABody: (
            <>
              Get your
              {' '}
              <Link
                href={ROUTES.BOOKING.href}
                className='link'
              >
                personalized quote
              </Link>
              {' '}
              or
              {' '}
              <TrackedLink
                href={`tel:+${PHONE.HONOLULU.plain}`}
                className='link'
                isExternal
                eventName={PixelEvent.CONTACT}
                eventParams={{ method: 'phone' }}
              >
                call our Aina Haina team
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
              approaching, our schedule fills quickly. Book now through our 24/7 online system and experience why Aina Haina residents trust us with their homes!
            </>
          ),
        }}
      />
    </>
  )
}
