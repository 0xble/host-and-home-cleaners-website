import type { Metadata } from 'next'
import Link from 'next/link'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocationPage from '@/components/LocationPage'
import ServiceSchemaMarkup from '@/components/ServiceSchemaMarkup'
import { BUSINESS_NAME, LOCATIONS, PHONE, TAGLINE, URL } from '@/lib/constants'
import { ContentViewTracker } from '@/lib/pixelClient'
import { ROUTES } from '@/lib/routes'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.MYRTLE_BEACH.name}`

export const metadata: Metadata = {
  title: `Professional House & Airbnb Cleaners in Surfside Beach | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Serving Surfside Beach and surrounding areas. House & vacation rental cleaners with 5-star ratings and excellent testimonials. Book today!`,
}

export default function SurfsideBeach() {
  return (
    <>
      <ContentViewTracker
        contentType='location'
        contentName='Surfside Beach'
        contentId='surfside-beach-location'
      />
      <ServiceSchemaMarkup
        neighborhoodName='Surfside Beach'
        fullServiceName='Professional House Cleaning Services in Surfside Beach'
        description={`${TAGLINE}. Professional house cleaning services in Surfside Beach, Myrtle Beach area.`}
        url={`https://${URL}/surfside-beach`}
        parentUrl={`https://${URL}${ROUTES.LOCATIONS.MYRTLE_BEACH.href}`}
        parentBusinessName={`${BUSINESS_NAME} ${LOCATIONS.MYRTLE_BEACH.name}`}
      />
      <LocationPage
        locationKey='MYRTLE_BEACH'
        location={LOCATIONS.MYRTLE_BEACH}
        reviewsMasonryId='d0cb12fc-b042-4a4a-a8cc-9ee8cc58588e'
        reviewsBadgeId='ba527c37-e33e-46d1-8a33-08aed36ffd09'
        googleMapsEmbedUrl='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d106194.64630830522!2d-78.8788075!3d33.7197455!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x432592cd81e1d561%3A0x2bb5e85088c224ee!2sPristine%20Maid%20Cleaning!5e0!3m2!1sen!2sus!4v1709048737136!5m2!1sen!2sus'
        photosFolder='myrtle-beach'
        pricing={{ standard: 129, deep: 169, moveInOut: 189, vacationRental: 129 }}
        copy={{
          customHeroHeading: (
            <>
              Surfside Beach&apos;s Beloved
              <br />
              Home & Vacation Rental Cleaners
            </>
          ),
          customHeroDescription: 'Keep your beach home pristine with our professional cleaning services. Whether you\'re a local family, vacation homeowner, or rental property manager in "The Family Beach," we deliver the quality clean you expect.',
          customTestimonialsHeading: 'What Your Neighbors Say',
          customLocationsSectionHeading: 'Proudly Serving Surfside Beach',
          customLocationsSectionDescription: 'Bringing top-quality cleaning services to Surfside Beach and the surrounding South Strand communities!',
          customHowItWorksHeading: 'Easy as a Beach Day',
          customHowItWorksSteps: [
            {
              title: 'Book in Minutes',
              description: (
                <ul>
                  <li>
                    Schedule your cleaning online or with a quick phone call.
                  </li>
                  <li>
                    Choose the service that fits your needs and schedule.
                  </li>
                  <li>
                    Let us know about any special requests or preferences.
                  </li>
                </ul>
              ),
            },
            {
              title: 'Relax & Leave It to Us',
              description: (
                <ul>
                  <li>
                    Our professional team arrives fully equipped and ready to exceed expectations.
                  </li>
                  <li>
                    We follow detailed cleaning protocols designed for beach homes.
                  </li>
                </ul>
              ),
            },
            {
              title: 'Enjoy Your Clean Home',
              description: (
                <ul>
                  <li>
                    Come back to a fresh, spotless space that feels like a perfect beach day.
                  </li>
                  <li>
                    Experience the peace of mind that comes with a professionally cleaned home.
                  </li>
                </ul>
              ),
            },
          ],
          customPricingSectionHeading: 'Services for Every Need',
          customPricingSectionDescription: (
            <>
              <p className='mb-4 text-left'>
                From weekly home maintenance to vacation rental turnovers, we've got your Surfside Beach property covered! Our services are designed to handle the unique challenges of beach living - sand control, humidity management, and salt air protection. We specialize in both residential cleaning and vacation property care.
              </p>
              <p className='text-left'>
                Our team understands the high standards expected in "The Family Beach" and delivers consistently exceptional results. Whether it's a post-beach day refresh or a deep cleaning service, we ensure your space stays as inviting as Surfside itself.
              </p>
            </>
          ),
          customFAQHeading: 'Frequently Asked Questions',
          customFAQDescription: 'Find answers to common questions below. Need more information? Our friendly local team is always ready to help!',
          customFAQs: [
            {
              question: 'Why choose us for your Surfside Beach home?',
              answer: (
                <>
                  <p className='mb-6'>
                    As cleaning specialists serving Surfside Beach, our team at
                    {' '}
                    {SPECIFIC_BUSINESS_NAME}
                    {' '}
                    brings unmatched experience in beach property care.
                  </p>
                  <CompetitorComparisonTable />
                </>
              ),
            },
            {
              question: 'How do you deal with beach sand and salt air?',
              answer: (
                <p>
                  We use specialized techniques and equipment designed for beach homes, including HEPA filtration vacuums for fine sand and gentle yet effective cleaning solutions that combat salt air residue while protecting your surfaces.
                </p>
              ),
            },
            {
              question: 'Are you experienced with vacation rentals?',
              answer: (
                <p>
                  Absolutely! We're experts in vacation rental turnovers and understand the quick timelines often needed between guests. Our efficient team ensures your rental is thoroughly cleaned and ready to wow your next guests, helping maintain those 5-star reviews.
                </p>
              ),
            },
            {
              question: 'What about beach toys and equipment?',
              answer: (
                <p>
                  We're happy to clean and organize beach equipment as part of our service. Just let us know your preferences for handling beach toys, chairs, umbrellas, and other gear - we'll make sure everything is clean and properly stored.
                </p>
              ),
            },
            {
              question: 'How soon can you clean after check-out?',
              answer: (
                <p>
                  We offer flexible scheduling to accommodate rental turnovers, often able to clean within hours of guest departure. During peak season (June-August), we recommend booking turnover services in advance to ensure availability.
                </p>
              ),
            },
            {
              question: 'Do you clean outdoor spaces?',
              answer: (
                <p>
                  Yes! We can clean porches, decks, and outdoor shower areas - crucial spaces for beach homes. We'll remove sand, salt residue, and debris to keep these areas as pristine as your indoor spaces.
                </p>
              ),
            },
            {
              question: 'What\'s your rescheduling policy?',
              answer: (
                <p>
                  We understand beach plans can change! We request 24 hours' notice for rescheduling and offer flexible options to accommodate your needs. For vacation rentals, we can adjust to unexpected early or late check-outs when possible.
                </p>
              ),
            },
            {
              question: 'How do you ensure consistent quality?',
              answer: (
                <p className='mb-2'>
                  Quality is our priority at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  . We use detailed checklists specific to beach properties and back every clean with our satisfaction guarantee. If you're not completely satisfied, we'll return within 24 hours to make it right.
                </p>
              ),
            },
          ],
          customCTAHeading: 'Save 15% on Your First Clean!',
          customCTABody: (
            <>
              Get your
              {' '}
              <Link
                href={ROUTES.BOOKING.href}
                className='link'
              >
                free estimate
              </Link>
              {' '}
              or
              {' '}
              <a
                href={`tel:+${PHONE.MYRTLE_BEACH.plain}`}
                className='link'
              >
                call our Surfside team
              </a>
              {' '}
              to experience the difference professional cleaning makes. With
              {' '}
              {(() => {
                const now = new Date()
                const seasons = [
                  { name: 'Spring', month: 2, day: 20 },
                  { name: 'Summer', month: 5, day: 20 },
                  { name: 'the holidays', month: 11, day: 1 },
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
              season approaching, our schedule is filling up quickly. As Surfside Beach's most trusted cleaning service, we're committed to delivering exceptional results that will keep your property welcoming all year round!
            </>
          ),
        }}
      />
    </>
  )
}
