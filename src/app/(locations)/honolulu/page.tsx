import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import CTAButtons from '@/components/CTAButtons'
import CTASection from '@/components/CTASection'
import FAQSection from '@/components/FAQSection'
import HeroSection from '@/components/HeroSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import LocationsSection from '@/components/LocationsSection'
import Page from '@/components/Page'
import PricingSection from '@/components/PricingSection'
import ReviewsFloatingBadge from '@/components/ReviewsFloatingBadge'
import ReviewsMasonry from '@/components/ReviewsMasonry'
import TestimonialsSection from '@/components/TestimonialSection'
import TrustSection from '@/components/TrustSection'
import { BUSINESS_NAME, LOCATIONS, PHONE, TAGLINE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'

const SPECIFIC_BUSINESS_NAME = `${BUSINESS_NAME} ${LOCATIONS.HONOLULU.name}`

export const metadata: Metadata = {
  title: `${SPECIFIC_BUSINESS_NAME} | #1 House & Airbnb Cleaning in ${LOCATIONS.HONOLULU.stateAbbrev}`,
  description: `${TAGLINE}. Proudly serving the Honolulu and Oahu area. Professional 5-star cleaners with dozens of testimonials. Book today!`,
}

export default function Honolulu() {
  return (
    <Suspense>
      <ReviewsFloatingBadge id='ba527c37-e33e-46d1-8a33-08aed36ffd09' />
      <Page location='HONOLULU' className='mb-24 flex min-h-screen flex-col gap-12 lg:mb-32 lg:gap-12'>
        <HeroSection
          heading={(
            <>
              #1 Top-Rated & Trusted Cleaners
              <br />
              Proudly serving
              {' '}
              {`${LOCATIONS.HONOLULU.name}, ${LOCATIONS.HONOLULU.stateAbbrev}`}
            </>
          )}
          description='Experience top-rated residential cleaning services in Honolulu, HI. Fast, reliable, and affordable — the preferred choice for Airbnb/VRBO hosts, homeowners, property managers, and realtors!'
          actions={<CTAButtons className='mt-12 lg:mt-8' phone={PHONE.HONOLULU} />}
          photos='home' // TODO: Change folder name
        />
        <TrustSection />
        <TestimonialsSection heading='Hear What Your Neighbors Have to Say!' className='mt-12' />
        <ReviewsMasonry id='8a2da83f-ca84-4420-9a31-71143d5c546e' />
        <LocationsSection
          heading='We&apos;re Here to Serve You!'
          description='Proudly serving all areas of beautiful Oahu and Honolulu!'
          iframeSrc='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d237770.1723966727!2d-157.869932!3d21.3836454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c4ce057e4bdff0b%3A0xa78d25a714d5f0ae!2sHost%20%26%20Home%20Cleaners%20Honolulu!5e0!3m2!1sen!2sus!4v1729395012053!5m2!1sen!2sus'
          serviceAreas={LOCATIONS.HONOLULU.serviceAreas}
        />
        <HowItWorksSection
          heading='So, What Will Happen?'
          steps={[
            {
              title: 'Set Up Your Cleaning Appointment',
              description: (
                <ul>
                  <li>
                    Secure your slot online effortlessly or give us a call for a
                    free, no-obligation estimate.
                  </li>
                  <li>Experience a hassle-free, simple booking process.</li>
                  <li>Let us know your specific needs and ideal schedule.</li>
                </ul>
              ),
            },
            {
              title: 'Leave the Rest to Us',
              description: (
                <ul>
                  <li>
                    Sit back after booking while our certified cleaners get
                    ready to revitalize your space.
                  </li>
                  <li>
                    Expect our team, equipped with a thorough cleaning plan, to
                    arrive promptly at your home.
                  </li>
                </ul>
              ),
            },
            {
              title: 'Step Into a Freshly Cleaned Home',
              description: (
                <ul>
                  <li>
                    Enjoy the satisfaction of a perfectly cleaned home that
                    feels rejuvenated and renewed.
                  </li>
                  <li>
                    Take pleasure in the comfort and health benefits of a
                    professionally maintained living environment.
                  </li>
                </ul>
              ),
            },
          ]}
        />
        <PricingSection
          heading='Our Services'
          pricing={{ standard: 232, deep: 304, moveInOut: 340, airbnb: 232 }}
          description={(
            <>
              <p className='mb-4 text-left'>
                Discover our comprehensive cleaning services! From detailed oven cleaning to thorough bathroom sanitation and complete kitchen deep cleans, our skilled team provides exceptional residential cleaning solutions. We specialize in end-of-tenancy cleanings, short-term rental turnovers, and meticulous spring cleanings to meet all your cleaning needs.
              </p>
              <p className='text-left'>
                Our customized move-in and move-out cleaning packages ensure a seamless transition, while our intensive fridge cleaning services leave your appliance spotless.
              </p>
            </>
          )}
        />
        <FAQSection
          heading='FAQ'
          description='Browse through our common questions. If you have any queries not addressed here, don’t hesitate to reach out to us by phone, chat, or email at any time.'
          faqs={[
            {
              question: 'What makes you different from the competition?',
              answer: (
                <>
                  <p className='mb-6'>
                    When it comes to choosing a cleaning service in
                    Honolulu,
                    {' '}
                    {SPECIFIC_BUSINESS_NAME}
                    {' '}
                    stands out for
                    several key reasons.
                  </p>
                  <CompetitorComparisonTable />
                </>
              ),
            },
            {
              question: 'Do I need to supply my own cleaning products?',
              answer: (
                <p>
                  No need to worry about supplies — we bring our own
                  eco-friendly products and equipment, ensuring exceptional
                  results with zero inconvenience to you.
                </p>
              ),
            },
            {
              question: 'Are you insured and bonded to safeguard clients?',
              answer: (
                <>
                  <p className='mb-2'>
                    Absolutely!
                    {' '}
                    {SPECIFIC_BUSINESS_NAME}
                    {' '}
                    is fully
                    bonded and insured. This provides our clients with peace
                    of mind, knowing they are protected from any liabilities
                    during and after our services.
                  </p>
                  <p>
                    Our unwavering commitment to professionalism and client
                    safety is one of the main reasons why our customers
                    trust us for their cleaning needs.
                  </p>
                </>
              ),
            },
            {
              question: 'How early should I schedule your services?',
              answer: (
                <p>
                  We suggest booking as far in advance as possible,
                  particularly during busy seasons, to secure your preferred
                  time slot. However, we understand that life happens, so we
                  offer flexible scheduling, including same-day appointments
                  when available for a $20 surcharge.
                </p>
              ),
            },
            {
              question: 'What cleaning frequency is suggested?',
              answer: (
                <p>
                  For consistent cleanliness, we recommend scheduling
                  bi-weekly cleaning sessions. For those needing less
                  frequent cleanings, we offer monthly deep cleaning options
                  to maintain a spotless environment.
                </p>
              ),
            },
            {
              question: 'Do you offer services on weekends or holidays?',
              answer: (
                <p className='mb-2'>
                  Yes, to fit your busy life, we offer cleaning services on
                  weekends and select holidays. These times may come with an
                  additional fee, so we recommend booking early to ensure
                  availability.
                </p>
              ),
            },
            {
              question:
              'What steps are taken to guarantee the quality of your cleaning team?',
              answer: (
                <>
                  <p className='mb-2'>
                    Our hiring process is thorough, including complete
                    background checks and skill evaluations. We uphold high
                    standards with regular performance assessments and
                    detailed cleaning checklists, ensuring top-tier service
                    and accountability.
                  </p>
                  <p>
                    We also continuously collect and act on customer
                    feedback to enhance our services.
                  </p>
                </>
              ),
            },
            {
              question: 'Can I ask for extra services or specific tasks?',
              answer: (
                <p>
                  Absolutely! We are flexible and open to special requests
                  or extra services to meet your unique needs. Whether it’s
                  specific areas, specialized products, or additional tasks,
                  just let us know what you require.
                </p>
              ),
            },
            {
              question:
              'What is the process for changing or canceling a cleaning appointment?',
              answer: (
                <p>
                  We understand that plans change, so we offer easy
                  rescheduling options. Please notify us at least 24 hours
                  in advance if you need to cancel or reschedule, allowing
                  us to manage our team effectively.
                </p>
              ),
            },
            {
              question: 'How do you ensure I’m happy with the cleaning?',
              answer: (
                <p className='mb-2'>
                  Your happiness is our priority at
                  {' '}
                  {SPECIFIC_BUSINESS_NAME}
                  . If you’re not completely satisfied, contact us
                  within 24 hours, and we’ll promptly address the issue with
                  a complimentary redo to ensure you’re pleased with the
                  service.
                </p>
              ),
            },
          ]}
        />
        <Suspense>
          <CTASection
            heading='Get a quote and booking in just 60 seconds!'
            body={(
              <>
                Get an
                {' '}
                <Link
                  href={ROUTES.BOOKING.href}
                  className='link'
                >
                  instant, no-obligation quote online
                </Link>
                {' '}
                or
                {' '}
                <a
                  href={`tel:+${PHONE.HONOLULU.plain}`}
                  className='link'
                >
                  give us a call today
                </a>
                . If you call and the line is busy, don&apos;t worry — try again at
                a later time or leave a voicemail and we&apos;ll get back to you as
                soon as we can!
              </>
            )}
            location='HONOLULU'
          />
        </Suspense>
      </Page>
    </Suspense>
  )
}
