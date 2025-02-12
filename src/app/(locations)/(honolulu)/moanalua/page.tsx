import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationPage from '@/components/LocationPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, TAGLINE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House & Vacation Rental Cleaners in Moanalua | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Moanalua\'s residential and vacation rental properties. 5-star rated cleaners with outstanding testimonials. Book today!`,
}

export default function Moanalua() {
  return (
    <LocationPage
      locationKey='HONOLULU'
      location={LOCATIONS.HONOLULU}
      reviewsMasonryId='8a2da83f-ca84-4420-9a31-71143d5c546e'
      reviewsBadgeId='142009ae-6f8c-4599-9c7e-9d370298abc9'
      googleMapsEmbedUrl='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d237770.1723966727!2d-157.869932!3d21.3836454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c4ce057e4bdff0b%3A0xa78d25a714d5f0ae!2sHost%20%26%20Home%20Cleaners%20Honolulu!5e0!3m2!1sen!2sus!4v1729395012053!5m2!1sen!2sus'
      photosFolder='honolulu'
      pricing={{ standard: 232, deep: 304, moveInOut: 340, airbnb: 232 }}
      copy={{
        customHeroHeading: (
          <>
            Moanalua Valley&apos;s Trusted
            <br />
            Local Cleaning Experts
          </>
        ),
        customHeroDescription: 'Professional cleaning services tailored for Moanalua\'s diverse community. From residential homes to vacation rentals, we deliver exceptional quality that exceeds expectations.',
        customTestimonialsHeading: 'Resident Reviews',
        customLocationsSectionHeading: 'Serving All of Moanalua',
        customLocationsSectionDescription: 'Providing premium cleaning services throughout Moanalua, from residential neighborhoods to Moanalua Gardens!',
        customHowItWorksHeading: 'Simple Steps to Clean',
        customHowItWorksSteps: [
          {
            title: 'Easy Booking',
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
            title: 'Professional Service',
            description: (
              <ul>
                <li>
                  Our experienced team arrives fully equipped and prepared.
                </li>
                <li>
                  We follow detailed protocols to ensure consistent quality.
                </li>
              </ul>
            ),
          },
          {
            title: 'Perfect Results',
            description: (
              <ul>
                <li>
                  Return to a spotless, refreshed home.
                </li>
                <li>
                  Enjoy a clean that maintains your property\'s value.
                </li>
              </ul>
            ),
          },
        ],
        customPricingSectionHeading: 'Our Services',
        customPricingSectionDescription: (
          <>
            <p className='mb-4 text-left'>
              Experience cleaning services designed for Moanalua\'s community! We understand the specific needs of both residential properties and vacation rentals. Our comprehensive services address everything from regular maintenance to move-out cleans.
            </p>
            <p className='text-left'>
              Whether you need recurring home cleaning, Airbnb turnover service, or move-in/move-out cleaning, our expert team ensures your property meets the highest standards of cleanliness.
            </p>
          </>
        ),
        customFAQHeading: 'Frequently Asked Questions',
        customFAQDescription: 'Find answers to frequently asked questions below. Our local team is always available to address any specific concerns.',
        customFAQs: [
          {
            question: 'What makes your service ideal for Moanalua homes?',
            answer: (
              <>
                <p className='mb-6'>
                  As cleaning specialists in Moanalua, our team at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  understands local property requirements and vacation rental standards. We're experienced with both residential homes and short-term rentals.
                </p>
                <CompetitorComparisonTable />
              </>
            ),
          },
          {
            question: 'Do you handle move-out cleans?',
            answer: (
              <p>
                Yes! We specialize in thorough move-out cleaning services that ensure your property is ready for its next occupants. Our detailed checklist can be viewed at
                {' '}
                <Link
                  href={ROUTES.CHECKLIST.href}
                  className='link'
                >
                  this link
                </Link>
                .
              </p>
            ),
          },
          {
            question: 'Can you accommodate vacation rental schedules?',
            answer: (
              <p>
                Absolutely! We understand the time-sensitive nature of vacation rental turnovers and offer flexible scheduling to accommodate guest check-ins and check-outs.
              </p>
            ),
          },
          {
            question: 'Do you clean outdoor spaces?',
            answer: (
              <p>
                Yes! We can include lanais, carports, and garden areas in our service. We understand these spaces are important for both residential properties and vacation rentals.
              </p>
            ),
          },
          {
            question: 'What are your scheduling options?',
            answer: (
              <p>
                We offer flexible scheduling to accommodate your needs, whether it's regular weekly cleaning or same-day vacation rental turnovers. We can often arrange rush services when needed.
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
                We request 24 hours\' notice for rescheduling when possible, but we understand plans can change and we'll do our best to accommodate last-minute adjustments.
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
                . We use detailed checklists and back every clean with our satisfaction guarantee. If anything doesn\'t meet your expectations, we\'ll return within 24 hours to make it right.
              </p>
            ),
          },
        ],
        customCTAHeading: 'Reserve Your Spot in 60 Seconds!',
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
              call our Moanalua team
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
            approaching, our schedule fills quickly. Book now through our 24/7 online system for immediate confirmation and experience why Moanalua residents trust us with their homes!
          </>
        ),
      }}
    />
  )
}
