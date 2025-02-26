import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationPage from '@/components/LocationPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, TAGLINE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `Professional House & Airbnb Cleaners in Kaka'ako | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Kaka'ako\'s residents and vacation rental owners. 5-star rated cleaners with outstanding testimonials. Book today!`,
}

export default function Kakaako() {
  return (
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
            Kaka&apos;ako&apos;s Local
            <br />
            House & Airbnb Cleaning
          </>
        ),
        customHeroDescription: 'Professional cleaning services designed for Kaka\'ako\'s residential and vacation rental properties. We deliver exceptional quality that matches this vibrant neighborhood\'s energy.',
        customTestimonialsHeading: 'Community Reviews',
        customLocationsSectionHeading: 'Serving All of Kaka\'ako',
        customLocationsSectionDescription: 'Providing premium cleaning services throughout Kaka\'ako, from Ward Village to SALT at Our Kaka\'ako!',
        customHowItWorksHeading: 'Cleaning & Maintenance Made Simple',
        customHowItWorksSteps: [
          {
            title: 'Quick Booking',
            description: (
              <ul>
                <li>
                  Book instantly online or call for a personalized quote.
                </li>
                <li>
                  Select your preferred service package.
                </li>
                <li>
                  Share any specific requirements or access details.
                </li>
              </ul>
            ),
          },
          {
            title: 'Professional Care',
            description: (
              <ul>
                <li>
                  Our skilled team arrives on time with all necessary supplies.
                </li>
                <li>
                  We follow detailed protocols designed for residential and vacation properties.
                </li>
              </ul>
            ),
          },
          {
            title: 'Your Space, Perfected',
            description: (
              <ul>
                <li>
                  Return to a pristine home that matches Kaka\'ako\'s modern style.
                </li>
                <li>
                  Enjoy the perfect blend of cleanliness and comfort.
                </li>
              </ul>
            ),
          },
        ],
        customPricingSectionHeading: 'Our Services',
        customPricingSectionDescription: (
          <>
            <p className='mb-4 text-left'>
              Experience cleaning services tailored to Kaka'ako's lifestyle! From cozy homes to vacation rentals, we handle everything with meticulous attention to detail. Our specialized services address the unique needs of modern living spaces and Airbnb properties.
            </p>
            <p className='text-left'>
              Whether you need regular home maintenance, move-in/move-out services, or vacation rental turnovers, our expert team ensures your space maintains the highest standards of cleanliness.
            </p>
          </>
        ),
        customFAQHeading: 'FAQs',
        customFAQDescription: 'Find answers to frequently asked questions below. Our local team is always available to address any specific concerns.',
        customFAQs: [
          {
            question: 'What makes your service perfect for Kaka\'ako properties?',
            answer: (
              <>
                <p className='mb-6'>
                  As cleaning specialists in Kaka'ako, our team at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  understands the unique needs of residential and vacation rental properties in this dynamic district.
                </p>
                <CompetitorComparisonTable />
              </>
            ),
          },
          {
            question: 'How do you handle building access?',
            answer: (
              <p>
                We\'re well-versed in Kaka'ako's access protocols and security systems. We coordinate with property management and can arrange parking solutions to ensure smooth service delivery.
              </p>
            ),
          },
          {
            question: 'Do you clean modern finishes?',
            answer: (
              <p>
                Yes! We\'re experienced with all types of surfaces and finishes. We use appropriate cleaning methods and products that protect while maintaining your home\'s distinctive features.
              </p>
            ),
          },
          {
            question: 'How do you handle appliances and smart home features?',
            answer: (
              <p>
                Our team is trained in caring for appliances and smart home systems. We use appropriate cleaning techniques that effectively clean while respecting your home's technology and modern amenities.
              </p>
            ),
          },
          {
            question: 'What\'s your availability?',
            answer: (
              <p>
                We offer flexible scheduling to accommodate both residents and Airbnb hosts. While we recommend booking in advance, we can often accommodate last-minute requests. Contact us for current availability and any rush service fees that may apply.
              </p>
            ),
          },
          {
            question: 'Do you use eco-friendly products?',
            answer: (
              <p>
                Yes! We use environmentally conscious cleaning products that align with Kaka'ako's sustainable living values. Our products are effective yet safe for your home, pets, and the environment.
              </p>
            ),
          },
          {
            question: 'What\'s your rescheduling policy?',
            answer: (
              <p>
                We understand plans can change. We request 24 hours\' notice for rescheduling to help us maintain efficient service for all our clients in the Kaka'ako area.
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
        customCTAHeading: 'Ready for a Quote?',
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
              call our Kaka'ako team
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
            approaching, our schedule fills quickly. Book now through our 24/7 online system for immediate confirmation and join our satisfied Kaka'ako residents and Airbnb hosts enjoying pristine, professionally maintained properties!
          </>
        ),
      }}
    />
  )
}
