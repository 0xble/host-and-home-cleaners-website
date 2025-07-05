import type { Metadata } from 'next'
import Link from 'next/link'
import TrackedLink from '@/components/analytics/facebook/PixelTrackedLink'
import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import LocalBusinessSchemaMarkup from '@/components/schema/LocalBusinessSchemaMarkup'
import LocationLandingPage from '@/components/templates/LocationLandingPage'
import { BUSINESS_NAME, DOMAIN, EMAIL, LOCATIONS, PHONE, SITE_IMAGE, TAGLINE } from '@/lib/constants'
import { PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'
import { getBaseUrl } from '@/lib/utils'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.YORK.name}`

export const metadata: Metadata = {
  title: `Professional House & Airbnb Cleaners in York | ${BUSINESS_NAME}`,
  description: `${TAGLINE}. Proudly serving the York area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
  openGraph: {
    title: `Professional House & Airbnb Cleaners in York | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Proudly serving the York area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
    url: `${getBaseUrl()}/york`,
    type: 'website',
    images: [
      {
        url: `${getBaseUrl()}${SITE_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${BUSINESS_NAME} in York, PA`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Professional House & Airbnb Cleaners in York | ${BUSINESS_NAME}`,
    description: `${TAGLINE}. Proudly serving the York area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
    images: [`${getBaseUrl()}${SITE_IMAGE}`],
  },
}

export default function YorkPage() {
  return (
    <>
      <LocalBusinessSchemaMarkup
        locationName={LOCATIONS.YORK.name}
        description={`${TAGLINE}. Proudly serving the York area.`}
        url={`https://${DOMAIN}${ROUTES.LOCATIONS.YORK.href}`}
        telephone={PHONE.YORK.formatted}
        email={EMAIL.YORK}
        address={{
          streetAddress: '800 E King St Ste 542',
          addressLocality: 'York',
          addressRegion: 'PA',
          postalCode: '17403',
          addressCountry: 'US',
        }}
      />
      <LocationLandingPage
        location="YORK"
        // TODO: Remove this once we have reviews for York
        reviewsLocationOverride={null}
        googleMapsEmbedUrl={LOCATIONS.YORK.googleMapsEmbedUrl}
        // TODO: Upload more photos and replace with York photos
        photosFolder="honolulu"
        // TODO: Replace with latest pricing
        pricing={{ standard: 150, deep: 250, moveInOut: 350, vacationRental: 180 }}
        copy={{
          heroHeading: (
            <>
              #1 Award-Winning House Cleaning & Maid Service in York, PA
            </>
          ),
          heroDescription:
            `Discover why York, PA homeowners and Airbnb hosts trust us for reliable, professional house cleaning. Our vetted local cleaners deliver sparkling results for houses, apartments, and vacation rentals. Book your cleaning online in just 60 seconds!`,
          reviewsHeading: `Why York Residents & Hosts Rave About Our Cleaning Services`,
          locationsSectionHeading: `Proudly Serving York, PA`,
          locationsSectionDescription: `From historic downtown York to East York, West York, and nearby neighborhoods. Check our service area map below to see if we cover your location!`,
          howItWorksHeading: `How to Schedule`,
          howItWorksSteps: [
            {
              title: 'Get a Fast, Free Quote',
              description: (
                <ul>
                  <li>Use our instant online quote tool or call for a custom estimate—no obligation required.</li>
                  <li>Select your cleaning type and share any special instructions or requests.</li>
                  <li>Choose a convenient date and time for your cleaning appointment.</li>
                </ul>
              ),
            },
            {
              title: 'We Clean—You Relax',
              description: (
                <ul>
                  <li>Our insured, background-checked York cleaning pros arrive on time with all supplies and equipment.</li>
                  <li>We follow a detailed checklist to ensure every room is thoroughly cleaned and sanitized.</li>
                </ul>
              ),
            },
            {
              title: 'Enjoy a Spotless, Healthy Home',
              description: (
                <ul>
                  <li>Step into a fresh, immaculate space—perfect for families, guests, or new tenants.</li>
                  <li>Your satisfaction is 100% guaranteed. If you need anything, our local team is just a call away!</li>
                </ul>
              ),
            },
          ],
          pricingHeading: `Simple, Transparent Pricing`,
          pricingDescription: (
            <>
              Transparent, upfront rates for all homes and vacation rentals in York, PA.
              <br />
              No contracts, hidden fees, or surprises—just honest pricing and outstanding results every time.
            </>
          ),
          faqHeading: `Common Questions Answered`,
          faqDescription: `Find answers about our booking process, what's included, and how our York cleaning team delivers 5-star service.`,
          faqs: [
            {
              question: 'How do you compare to other York cleaning companies?',
              answer: (
                <>
                  <p className="mb-6">
                    Choosing a cleaning service in York, PA can be tough. At
                    {' '}
                    {SPECIFIC_BUSINESS_NAME}
                    , we stand out with our local expertise, flexible scheduling, and 5-star customer care.
                  </p>
                  <CompetitorComparisonTable />
                </>
              ),
            },
            {
              question: 'Do I need to provide cleaning supplies or equipment?',
              answer: (
                <p>
                  No, our York cleaning team brings all eco-friendly products and professional equipment. You can relax knowing we use safe, effective supplies for every job.
                </p>
              ),
            },
            {
              question: 'Are your cleaners insured and background-checked?',
              answer: (
                <>
                  <p className="mb-2">
                    Yes!
                    {' '}
                    {SPECIFIC_BUSINESS_NAME}
                    {' '}
                    is fully bonded and insured, and every cleaner is background-checked for your peace of mind. Your home's safety and security are always our top priority.
                  </p>
                  <p>
                    We're committed to professionalism and client trust—just one reason so many York residents choose us.
                  </p>
                </>
              ),
            },
            {
              question: 'How far in advance should I book a cleaning?',
              answer: (
                <p>
                  We recommend booking as early as possible, especially during busy seasons. However, we offer flexible scheduling and can often accommodate last-minute or same-day cleanings in York for a small additional fee.
                </p>
              ),
            },
            {
              question: 'What cleaning schedule is best for my home?',
              answer: (
                <p>
                  Most York clients prefer bi-weekly cleanings for ongoing freshness. We also offer monthly deep cleans and one-time services for special occasions or move-ins/outs.
                </p>
              ),
            },
            {
              question: 'Do you clean on weekends or holidays?',
              answer: (
                <p className="mb-2">
                  Yes! We offer weekend and select holiday cleanings to fit your schedule. These slots fill up quickly, so book early to secure your preferred time.
                </p>
              ),
            },
            {
              question: 'Can I request special tasks or add-on services?',
              answer: (
                <p>
                  Absolutely! We're happy to accommodate special requests—just let us know if you need extra attention to certain areas, specialty products, or additional services.
                </p>
              ),
            },
            {
              question: 'What\'s your cancellation or rescheduling policy?',
              answer: (
                <p>
                  Plans change! Please notify us at least 24 hours in advance to cancel or reschedule your York cleaning. This helps us serve all clients efficiently.
                </p>
              ),
            },
            {
              question: 'What if I\'m not satisfied with my cleaning?',
              answer: (
                <p className="mb-2">
                  Your satisfaction is guaranteed. If you're not happy, contact us within 24 hours and we'll return for a complimentary re-clean—no questions asked.
                </p>
              ),
            },
          ],
          ctaHeading: 'Book Your York Cleaning Service in Seconds!',
          ctaBody: (
            <>
              Ready for a beautifully clean home?
              {' '}
              <Link href={ROUTES.BOOKING.href} className="link">
                Get your free instant quote
              </Link>
              {' '}
              or
              {' '}
              <TrackedLink
                href={`tel:+${PHONE.YORK.plain}`}
                className="link"
                isExternal
                eventName={PixelEvent.CONTACT}
                eventParams={{ method: 'phone' }}
              >
                call our York cleaning team
              </TrackedLink>
              . If we miss your call, leave a message and we'll get back to you quickly. With high demand in York, secure your preferred date now—our online booking is open 24/7 for your convenience!
            </>
          ),
        }}
      />
    </>
  )
}
