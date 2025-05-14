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
  title: `Professional House & Vacation Rental Cleaners in Waikiki | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Waikiki's luxury condos, vacation rentals, and residential properties. 5-star rated cleaners with outstanding reviews. Book today!`,
}

export default function Waikiki() {
  return (
    <LocationLandingPage
      location="HONOLULU"
      googleMapsEmbedUrl="https://www.google.com/maps/embed?pb=!1m14!1m8!1d237770.1723966727!2d-157.869932!3d21.3836454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c4ce057e4bdff0b%3A0xa78d25a714d5f0ae!2sHost%20%26%20Home%20Cleaners%20Honolulu!5e0!3m2!1sen!2sus!4v1729395012053!5m2!1sen!2sus"
      photosFolder="honolulu"
      pricing={{ standard: 232, deep: 304, moveInOut: 340, vacationRental: 232 }}
      copy={{
        heroHeading: (
          <>
            Waikiki&apos;s House & Vacation Rental Cleaning Pros
          </>
        ),
        heroDescription: 'Experience world-class cleaning services for your Waikiki property. From luxury condos to vacation rentals, we deliver the exceptional quality that this world-famous destination demands.',
        reviewsHeading: 'Client Experiences',
        locationsSectionHeading: 'Serving All of Waikiki',
        locationsSectionDescription: 'Providing top-tier cleaning services throughout Waikiki, from Kalakaua Avenue to Kapahulu!',
        howItWorksHeading: 'Simple Steps to Pristine',
        howItWorksSteps: [
          {
            title: 'Easy Booking',
            description: (
              <ul>
                <li>
                  Book instantly online or call for a personalized quote.
                </li>
                <li>
                  Select your preferred service and timing.
                </li>
                <li>
                  Share any special requirements or access instructions.
                </li>
              </ul>
            ),
          },
          {
            title: 'Professional Service',
            description: (
              <ul>
                <li>
                  Our experienced team arrives fully equipped and ready to exceed expectations.
                </li>
                <li>
                  We follow detailed protocols designed for luxury properties.
                </li>
              </ul>
            ),
          },
          {
            title: 'Paradise Perfect',
            description: (
              <ul>
                <li>
                  Return to an immaculately clean space that matches Waikiki's beauty.
                </li>
                <li>
                  Enjoy the perfect blend of cleanliness and tropical comfort.
                </li>
              </ul>
            ),
          },
        ],
        pricingHeading: 'Our Services',
        pricingDescription: (
          <>
            <p className="mb-4 text-left">
              Discover our comprehensive cleaning solutions tailored for Waikiki properties! From daily housekeeping to deep cleaning services, we handle everything with the attention to detail that luxury properties demand. Our specialized services address the unique challenges of oceanfront living - salt air, humidity, and sand management.
            </p>
            <p className="text-left">
              Whether you need regular maintenance for your permanent residence, vacation rental turnovers, or move-in/move-out services, our expert team ensures your space maintains the highest standards of cleanliness and presentation.
            </p>
          </>
        ),
        faqHeading: 'FAQs',
        faqDescription: 'Find answers to frequently asked questions below. Our local team is always available to address any specific concerns.',
        faqs: [
          {
            question: 'What makes your service ideal for Waikiki properties?',
            answer: (
              <>
                <p className="mb-6">
                  As cleaning specialists in Waikiki, our team at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  understands the unique needs of homes, condos, and vacation rentals in this premier location.
                </p>
                <CompetitorComparisonTable />
              </>
            ),
          },
          {
            question: 'How do you handle building access and parking?',
            answer: (
              <p>
                We're experienced with Waikiki's apartment/condo building and gated community protocols and security requirements. We coordinate with building or community management and can arrange parking solutions to ensure smooth service delivery.
              </p>
            ),
          },
          {
            question: 'Do you offer services for vacation rentals?',
            answer: (
              <p>
                Absolutely! We specialize in vacation rental turnovers with flexible scheduling to accommodate check-out times. Our efficient team ensures your rental is pristine and ready for the next guests, helping maintain your 5-star reviews.
              </p>
            ),
          },
          {
            question: 'How do you handle salt air and humidity?',
            answer: (
              <p>
                We use specialized cleaning products and techniques designed for oceanfront properties. Our methods effectively address salt residue, humidity effects, and the unique challenges of maintaining properties in Waikiki's tropical environment.
              </p>
            ),
          },
          {
            question: 'What\'s your availability for same-day service?',
            answer: (
              <p>
                While we recommend booking in advance, we understand the dynamic nature of vacation rentals and can often accommodate same-day service requests. Contact us for current availability and any rush service fees that may apply.
              </p>
            ),
          },
          {
            question: 'Do you clean lanais and outdoor spaces?',
            answer: (
              <p>
                Yes! We clean lanais, balconies, and outdoor living spaces as part of our service. We ensure these areas are just as pristine as your indoor spaces, perfect for enjoying Waikiki's beautiful views.
              </p>
            ),
          },
          {
            question: 'What\'s your cancellation policy?',
            answer: (
              <p>
                We understand plans can change in the hospitality industry. We request 24 hours' notice for cancellations or rescheduling. For vacation rentals, we can usually accommodate schedule adjustments based on guest check-out times.
              </p>
            ),
          },
          {
            question: 'How do you ensure quality service?',
            answer: (
              <p className="mb-2">
                Quality is our hallmark at
                {' '}
                {SPECIFIC_BUSINESS_NAME}
                . We maintain detailed checklists specific to luxury properties and back every clean with our satisfaction guarantee. If anything doesn't meet your expectations, we'll return within 24 hours to make it right.
              </p>
            ),
          },
        ],
        ctaHeading: 'Ready For A Quote?',
        ctaBody: (
          <>
            Transform your Waikiki property with just a few clicks! Get your
            {' '}
            <Link
              href={ROUTES.BOOKING.href}
              className="link"
            >
              instant, personalized quote online
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
              call our team
            </TrackedLink>
            . As Waikiki's premier cleaning service, we deliver five-star results for luxury condos and vacation rentals. With
            {' '}
            {(() => {
              const now = new Date()
              const seasons = [
                { name: 'peak summer', month: 5, day: 20 },
                { name: 'winter', month: 11, day: 1 },
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
            season approaching, book now through our 24/7 online system for immediate confirmation. Join our satisfied Waikiki clients and experience cleaning services that match the beauty of your oceanfront views!
          </>
        ),
      }}
    />
  )
}
