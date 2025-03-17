import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationLandingPage from '@/components/LocationLandingPage'
import TrackedLink from '@/components/TrackedLink'
import { BUSINESS_NAME, LOCATIONS, PHONE, TAGLINE } from '@/lib/constants'
import { PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House & Airbnb Cleaners in Ala Moana | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Ala Moana\'s residents and vacation rental owners. 5-star rated cleaners with outstanding testimonials. Book today!`,
}

export default function AlaMoana() {
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
            Ala Moana&apos;s Local Experts
            <br />
            House & Rental Cleaners
          </>
        ),
        customHeroDescription: 'Professional cleaning services for Ala Moana\'s homes and vacation rentals. We deliver exceptional quality that this premier residential district deserves.',
        customTestimonialsHeading: 'What Our Clients Say',
        customLocationsSectionHeading: 'Serving All of Ala Moana',
        customLocationsSectionDescription: 'Providing premium cleaning services throughout the Ala Moana district, from Piikoi Street to Ward Avenue!',
        customHowItWorksHeading: 'Your Path to Clean',
        customHowItWorksSteps: [
          {
            title: 'Simple Scheduling',
            description: (
              <ul>
                <li>
                  Book online instantly or call for a custom quote.
                </li>
                <li>
                  Choose your preferred cleaning package.
                </li>
                <li>
                  Provide any specific instructions or requirements.
                </li>
              </ul>
            ),
          },
          {
            title: 'Expert Service',
            description: (
              <ul>
                <li>
                  Our professional team arrives on time and fully equipped.
                </li>
                <li>
                  We follow detailed protocols designed for residential properties.
                </li>
              </ul>
            ),
          },
          {
            title: 'Enjoy Your Space',
            description: (
              <ul>
                <li>
                  Come home to an impeccably clean living space.
                </li>
                <li>
                  Experience the perfect blend of cleanliness and comfort.
                </li>
              </ul>
            ),
          },
        ],
        customPricingSectionHeading: 'Our Services',
        customPricingSectionDescription: (
          <>
            <p className='mb-4 text-left'>
              Experience comprehensive cleaning solutions designed for Ala Moana's modern lifestyle! From regular maintenance to deep cleaning services, we handle everything with meticulous attention to detail. Our specialized services address all your cleaning needs - from spotless floors to sparkling appliances and fixtures.
            </p>
            <p className='text-left'>
              Whether you need recurring cleaning for your home, Airbnb turnover service, or move-in/move-out cleaning, our expert team ensures your space maintains the highest standards of cleanliness and presentation.
            </p>
          </>
        ),
        customFAQHeading: 'Frequently Asked Questions',
        customFAQDescription: 'Find answers to frequently asked questions below. Our local team is always available to address any specific concerns.',
        customFAQs: [
          {
            question: 'What makes your service perfect for Ala Moana properties?',
            answer: (
              <>
                <p className='mb-6'>
                  As cleaning specialists in Ala Moana, our team at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  understands the unique needs of both residential homes and vacation rentals in this vibrant district.
                </p>
                <CompetitorComparisonTable />
              </>
            ),
          },
          {
            question: 'How do you handle property access?',
            answer: (
              <p>
                We're experienced with various access methods including lockboxes, smart locks, and in-person key exchanges. We follow strict security protocols to ensure your property is safe and secure.
              </p>
            ),
          },
          {
            question: 'Do you clean outdoor spaces?',
            answer: (
              <p>
                Yes! We clean lanais, patios, and outdoor living spaces as part of our service. We understand these areas are essential parts of your home and clean them with the same attention to detail.
              </p>
            ),
          },
          {
            question: 'How do you handle different surfaces and finishes?',
            answer: (
              <p>
                Our team is trained in caring for all types of surfaces and finishes. We use appropriate cleaning products and techniques that effectively clean while protecting your valuable surfaces and fixtures.
              </p>
            ),
          },
          {
            question: 'What\'s your availability?',
            answer: (
              <p>
                We offer flexible scheduling to accommodate your busy lifestyle. While we recommend booking in advance, we can often accommodate last-minute requests. Contact us for current availability and any rush service fees that may apply.
              </p>
            ),
          },
          {
            question: 'Do you bring your own supplies?',
            answer: (
              <p>
                Yes! We bring all necessary cleaning supplies and equipment, using premium products that are effective yet safe for your home and the environment. If you have specific products you'd prefer we use, just let us know.
              </p>
            ),
          },
          {
            question: 'What\'s your cancellation policy?',
            answer: (
              <p>
                We understand plans can change. We request 24 hours' notice for cancellations or rescheduling to help us maintain efficient service for all our clients.
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
        customCTAHeading: 'Reserve Your Spot in 60 Seconds',
        customCTABody: (
          <>
            Get your
            {' '}
            <Link
              href={ROUTES.BOOKING.href}
              className='link'
            >
              custom quote
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
              call our Ala Moana team
            </TrackedLink>
            {' '}
            today. We bring 5-star quality cleaning to your home. With
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
            approaching, secure your preferred time slot now and experience why Ala Moana's most discerning residents trust us with their homes.
          </>
        ),
      }}
    />
  )
}
