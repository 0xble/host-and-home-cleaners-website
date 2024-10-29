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
import TestimonialsSection from '@/components/TestimonialSection'
import TrustSection from '@/components/TrustSection'
import { BUSINESS_NAME, LOCATIONS, PHONE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'

const AREA = 'Garden City'

export const metadata: Metadata = {
  title: `${BUSINESS_NAME} | #1 House Cleaning in ${AREA}`,
  description: `${BUSINESS_NAME} is the #1 quality and reliable house cleaning service in ${AREA}. We offer a wide range of residential cleaning services, fast turnaround, and affordable prices.`,
}

export default function GardenCity() {
  return (
    <Suspense>
      <Page location='MYRTLE_BEACH' className='mb-24 flex min-h-screen flex-col gap-12 lg:mb-32 lg:gap-12'>
        <HeroSection
          heading={(
            <>
              {`${LOCATIONS.MYRTLE_BEACH.name}, ${LOCATIONS.MYRTLE_BEACH.stateAbbrev}'s`}
              <br />
              #1 Quality & Reliable Cleaners
            </>
          )}
          description='High-quality residential cleaning services, fast turnaround, at affordable prices — this is why home owners, Airbnb short-term vacation rentals, and realtors all go with us!'
          photos='myrtle-beach'
          actions={<CTAButtons className='mt-12 lg:mt-8' phone={PHONE.MYRTLE_BEACH} />}
        />
        <TrustSection />
        <TestimonialsSection heading='What Are Locals Saying?' />
        <LocationsSection
          heading='Are you in our service area?'
          description='Proudly serving all areas of Myrtle Beach and the Grand Strand!'
          iframeSrc='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d106194.64630830522!2d-78.8788075!3d33.7197455!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x432592cd81e1d561%3A0x2bb5e85088c224ee!2sPristine%20Maid%20Cleaning!5e0!3m2!1sen!2sus!4v1709048737136!5m2!1sen!2sus'
          serviceAreas={LOCATIONS.MYRTLE_BEACH.serviceAreas}
        />
        <HowItWorksSection
          heading='Our Process'
          steps={[
            {
              title: 'Schedule Your Cleaning',
              description: (
                <ul>
                  <li>
                    Easily book online or call us for a free, no-obligation quote.
                  </li>
                  <li>
                    Enjoy a hassle-free, straightforward booking experience.
                  </li>
                  <li>
                    Provide us with your specific needs and preferred schedule.
                  </li>
                </ul>
              ),
            },
            {
              title: 'Let Us Handle the Cleaning',
              description: (
                <ul>
                  <li>
                    Relax while our certified cleaners prepare to make your space spotless.
                  </li>
                  <li>
                    Our team arrives on time, equipped with a detailed cleaning plan.
                  </li>
                </ul>
              ),
            },
            {
              title: 'Enjoy Your Clean Home',
              description: (
                <ul>
                  <li>
                    Experience the joy of a thoroughly cleaned home that feels fresh and revitalized.
                  </li>
                  <li>
                    Benefit from the comfort and health advantages of a professionally cleaned living space.
                  </li>
                </ul>
              ),
            },
          ]}
        />
        <PricingSection
          heading='Bookings'
          pricing={{ standard: 129, deep: 169, moveInOut: 189, airbnb: 129 }}
          description={(
            <>
              <p className='mb-4 text-left'>
                We have it all! From meticulous oven scrubbing, comprehensive bathroom sanitation to full-scale kitchen deep cleans — our expert team delivers top-tier residential cleaning services. Specializing in end-of-lease cleanings, short-term accommodation refreshes, and detailed spring cleanings, we cater to all your cleaning needs.
              </p>
              <p className='text-left'>
                Our tailored move-in and move-out cleaning solutions guarantee a flawless handover, while our intensive refrigerator cleaning services render your appliance spotlessly clean.
              </p>
            </>
          )}
        />
        <FAQSection
          heading='FAQs'
          description='Explore our frequently asked questions. Should you have any inquiries not covered here, please feel free to contact us via phone, chat, or email at any time.'
          faqs={[
            {
              question: 'What sets you apart from the others?',
              answer: (
                <>
                  <p className='mb-6'>
                    When it comes to selecting a cleaning company in the Grand Strand, our team at
                    {' '}
                    {BUSINESS_NAME}
                    {' '}
                    stands out for several compelling reasons.
                  </p>
                  <CompetitorComparisonTable />
                </>
              ),
            },
            {
              question: 'Do I need to provide cleaning supplies?',
              answer: (
                <p>
                  No, we bring our own eco-friendly cleaning products and equipment to every job, ensuring optimal results without any hassle on your part.
                </p>
              ),
            },
            {
              question: 'Do you carry insurance and bonding to protect customers?',
              answer: (
                <>
                  <p className='mb-2'>
                    Absolutely!
                    {' '}
                    {BUSINESS_NAME}
                    {' '}
                    holds full bonding and insurance coverage. This offers our clients reassurance that they are shielded from any liabilities, providing peace of mind both during and after our services in their spaces.
                  </p>
                  <p>
                    Our unwavering dedication to professionalism and customer safety is just one of the reasons our clients consistently choose us for their cleaning requirements.
                  </p>
                </>
              ),
            },
            {
              question: 'How far in advance do I need to book your services?',
              answer: (
                <p>
                  We recommend booking our services as far in advance as possible, especially during peak seasons, to secure your preferred cleaning schedule. However, we understand that life can be unpredictable and offer flexible scheduling to accommodate same-day appointments when possible at a $20 surcharge.
                </p>
              ),
            },
            {
              question: 'What frequency of cleaning service is recommended?',
              answer: (
                <p>
                  For optimal cleanliness and maintenance, we suggest scheduling bi-weekly cleaning sessions. For those who prefer less frequent services, we offer monthly deep cleaning options to maintain a pristine environment.
                </p>
              ),
            },
            {
              question: 'Are cleaning services available on weekends or holidays?',
              answer: (
                <p className='mb-2'>
                  Yes, to accommodate your schedule, we provide cleaning services on weekends and selected holidays. Please note that these slots carry an additional surcharge and we advise early booking to ensure availability.
                </p>
              ),
            },
            {
              question: 'What measures are in place to ensure the quality of your cleaning staff?',
              answer: (
                <>
                  <p className='mb-2'>
                    Our hiring process is rigorous, involving comprehensive background checks and skill assessments. We maintain high standards through regular performance reviews and detailed cleaning checklists, ensuring consistent quality and accountability.
                  </p>
                  <p>
                    We also actively gather and act on client feedback to continually improve our services.
                  </p>
                </>
              ),
            },
            {
              question: 'Can I request additional services or specific cleaning tasks?',
              answer: (
                <p>
                  Absolutely! We are flexible and willing to accommodate special requests or additional services to meet your specific needs. Whether it's particular areas of focus, special cleaning agents, or extra tasks, just let us know your requirements.
                </p>
              ),
            },
            {
              question: 'What is the procedure for rescheduling or canceling a cleaning appointment?',
              answer: (
                <p>
                  We understand that plans can change, which is why we offer easy rescheduling options. Please inform us at least 24 hours in advance if you need to cancel or reschedule to help us efficiently manage our staffing.
                </p>
              ),
            },
            {
              question: 'How will you make sure I\'m satisfied with the cleaning?',
              answer: (
                <p className='mb-2'>
                  Your satisfaction is paramount at
                  {' '}
                  {BUSINESS_NAME}
                  . If the cleaning does not meet your expectations, please contact us within 24 hours. We will promptly address the issue and offer a complimentary redo of the service to ensure your satisfaction.
                </p>
              ),
            },
          ]}
        />
        <Suspense>
          <CTASection
            heading='Reserve a time and get a price in 60 seconds!'
            body={(
              <>
                Receive an
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
                  href={`tel:+${PHONE.MYRTLE_BEACH.plain}`}
                  className='link'
                >
                  call us today
                </a>
                . If the line is busy, please try again later or leave a voicemail, and we will return your call as soon as possible!
              </>
            )}
            location='MYRTLE_BEACH'
          />
        </Suspense>
      </Page>
    </Suspense>
  )
}
