import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationPage from '@/components/LocationPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, TAGLINE } from '@/lib/constants'
import { ContentViewTracker } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House & Vacation Rental Cleaners in Nuuanu | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Nuuanu\'s residential and vacation rental properties. 5-star rated cleaners with outstanding testimonials. Book today!`,
}

export default function Nuuanu() {
  return (
    <>
      <ContentViewTracker
        contentType='location'
        contentName='Nuuanu'
        contentId='nuuanu-location'
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
              Nuuanu Valley's Top Choice
              <br />
              Home & Airbnb Cleaning Service
            </>
          ),
          customHeroDescription: 'Professional cleaning services tailored for Nuuanu\'s homes and vacation rentals. We deliver exceptional quality that keeps your property pristine and welcoming.',
          customTestimonialsHeading: 'Client Experiences',
          customLocationsSectionHeading: 'Serving All of Nuuanu',
          customLocationsSectionDescription: 'Providing premium cleaning services throughout Nuuanu, from Nuuanu Avenue to Pali Highway!',
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
                Experience cleaning services designed for Nuuanu's properties! We understand the unique needs of both residential homes and vacation rentals. Our comprehensive services address everything from regular maintenance to deep cleaning needs.
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
              question: 'What sets your cleaning service apart in Nuuanu?',
              answer: (
                <>
                  <p className='mb-6'>
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
                <p className='mb-2'>
                  At
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  , excellence is non-negotiable. We implement comprehensive cleaning checklists tailored to each property type and stand firmly behind our work with a satisfaction guarantee. Not completely satisfied? We'll return within 24 hours to address any concerns.
                </p>
              ),
            },
          ],
          customCTAHeading: 'Schedule Your Clean Today',
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
              <a
                href={`tel:+${PHONE.HONOLULU.plain}`}
                className='link'
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
    </>
  )
}
