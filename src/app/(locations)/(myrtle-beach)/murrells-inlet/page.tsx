import type { Metadata } from 'next'
import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'

import LocationLandingPage from '@/components/templates/LocationLandingPage'
import { BUSINESS_NAME, LOCATIONS, PHONE, TAGLINE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.MYRTLE_BEACH.name}`

export const metadata: Metadata = {
  title: `Professional House & Airbnb Cleaners in Murrells Inlet | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Murrells Inlet and surrounding coastal communities. Expert cleaners with 5-star ratings and glowing reviews. Schedule today!`,
}

export default function MurrellsInlet() {
  return (
    <LocationLandingPage
      locationKey="MYRTLE_BEACH"
      location={LOCATIONS.MYRTLE_BEACH}
      reviewsBadgeId="ba527c37-e33e-46d1-8a33-08aed36ffd09"
      googleMapsEmbedUrl="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d106194.64630830522!2d-78.8788075!3d33.7197455!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x432592cd81e1d561%3A0x2bb5e85088c224ee!2sPristine%20Maid%20Cleaning!5e0!3m2!1sen!2sus!4v1709048737136!5m2!1sen!2sus"
      photosFolder="myrtle-beach"
      pricing={{ standard: 129, deep: 169, moveInOut: 189, vacationRental: 129 }}
      copy={{
        customHeroHeading: (
          <>
            Murrells Inlet&apos;s Premier
            <br />
            Property Cleaning Service
          </>
        ),
        customHeroDescription: 'Elevate your coastal living experience with our premium cleaning services. From residential properties to vacation homes, we understand the unique needs of Murrells Inlet residents and visitors.',
        customReviewsHeading: 'Local Neighborhood Stories',
        customLocationsSectionHeading: 'Serving Our Coastal Community',
        customLocationsSectionDescription: 'Delivering exceptional cleaning services throughout Murrells Inlet and neighboring seaside communities!',
        customHowItWorksHeading: 'Your Path to a Pristine Space',
        customHowItWorksSteps: [
          {
            title: 'Simple Scheduling',
            description: (
              <ul>
                <li>
                  Book your preferred time instantly through our website or with a quick call.
                </li>
                <li>
                  Select from our range of specialized cleaning services.
                </li>
                <li>
                  Tell us about any specific requirements or preferences.
                </li>
              </ul>
            ),
          },
          {
            title: 'Expert Care',
            description: (
              <ul>
                <li>
                  Our seasoned cleaning team arrives with all necessary supplies and equipment.
                </li>
                <li>
                  We follow a detailed cleaning protocol tailored to coastal homes.
                </li>
              </ul>
            ),
          },
          {
            title: 'Coastal Living at its Finest',
            description: (
              <ul>
                <li>
                  Return to a spotless, fresh-smelling home that sparkles like the inlet waters.
                </li>
                <li>
                  Enjoy the perfect blend of cleanliness and coastal comfort.
                </li>
              </ul>
            ),
          },
        ],
        customPricingSectionHeading: 'Tailored Services',
        customPricingSectionDescription: (
          <>
            <p className="mb-4 text-left">
              Experience the perfect clean for your coastal lifestyle! Our comprehensive services address the unique challenges of seaside living - from salt air effects to sand management. We specialize in vacation rental turnovers, residential deep cleans, and move-in/move-out services tailored to Murrells Inlet properties.
            </p>
            <p className="text-left">
              Whether you need regular maintenance for your permanent residence or turnover cleaning for your vacation property, our expert team delivers exceptional results that keep your space fresh, clean, and welcoming.
            </p>
          </>
        ),
        customFAQHeading: 'Frequently Asked Questions',
        customFAQDescription: 'Find answers to frequently asked questions below. Have a specific concern? Our local team is always here to help via phone, email, or chat.',
        customFAQs: [
          {
            question: 'What makes your service ideal for Murrells Inlet homes?',
            answer: (
              <>
                <p className="mb-6">
                  As local cleaning experts in Murrells Inlet, our team at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  understands the unique challenges of maintaining coastal properties.
                </p>
                <CompetitorComparisonTable />
              </>
            ),
          },
          {
            question: 'How do you handle coastal cleaning challenges?',
            answer: (
              <p>
                Our cleaning products and methods are specifically chosen to address coastal concerns like salt air residue, sand tracking, and humidity effects. We use eco-friendly products that are tough on dirt but gentle on your home and the environment.
              </p>
            ),
          },
          {
            question: 'Do you offer special services for vacation rentals?',
            answer: (
              <p>
                Yes! We specialize in vacation rental turnovers with flexible scheduling to accommodate guest checkouts. Our thorough cleaning process ensures your rental is pristine and ready for the next guests, maintaining your property's stellar reviews.
              </p>
            ),
          },
          {
            question: 'What safety measures do you have in place?',
            answer: (
              <>
                <p className="mb-2">
                  Your peace of mind is essential.
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  {' '}
                  maintains comprehensive insurance and bonding coverage, protecting both your property and our team.
                </p>
                <p>
                  We also follow strict safety protocols and use premium, eco-friendly cleaning products suitable for coastal environments.
                </p>
              </>
            ),
          },
          {
            question: 'How far in advance should I book?',
            answer: (
              <p>
                For regular cleaning services, we recommend booking 1-2 weeks in advance. During peak tourist season (May-September), earlier booking is advised. We offer flexible scheduling for last-minute needs with a small convenience fee.
              </p>
            ),
          },
          {
            question: 'Do you have experience with high-end properties?',
            answer: (
              <p>
                Absolutely! Our team is trained to handle luxury homes and high-end fixtures with appropriate care and attention. We use specialized products and techniques suitable for premium materials and finishes.
              </p>
            ),
          },
          {
            question: 'What is your rescheduling policy?',
            answer: (
              <p>
                We understand plans can change, especially with vacation properties. We request 24 hours' notice for rescheduling to help us maintain efficient service for all our clients. Last-minute changes can usually be accommodated during off-peak seasons.
              </p>
            ),
          },
          {
            question: 'How do you ensure quality service?',
            answer: (
              <p className="mb-2">
                Quality control is paramount at
                {' '}
                {SPECIFIC_BUSINESS_NAME}
                . Each cleaning follows our detailed checklist, and we welcome your feedback within 24 hours. If anything doesn't meet your expectations, we'll return to address it promptly at no additional cost.
              </p>
            ),
          },
        ],
        customCTAHeading: 'Experience the Difference',
        customCTABody: (
          <>
            Get your
            {' '}
            <Link
              href={ROUTES.BOOKING.href}
              className="link"
            >
              custom cleaning quote
            </Link>
            {' '}
            or
            {' '}
            <a
              href={`tel:+${PHONE.MYRTLE_BEACH.plain}`}
              className="link"
            >
              call our local team
            </a>
            . As we approach
            {' '}
            {(() => {
              const now = new Date()
              const seasons = [
                { name: 'Spring', month: 2, day: 20 },
                { name: 'Summer', month: 5, day: 20 },
                { name: 'holiday', month: 11, day: 1 },
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
            season, our schedule fills quickly - book your preferred time today!
          </>
        ),
      }}
    />
  )
}
