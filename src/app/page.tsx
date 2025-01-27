import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import CTASection from '@/components/CTASection'
import FAQSection from '@/components/FAQSection'
import FindLocationInput from '@/components/FindLocationInput'
import HeroSection from '@/components/HeroSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import Page from '@/components/Page'
import PricingSection from '@/components/PricingSection'
import ReviewsFloatingBadge from '@/components/ReviewsFloatingBadge'
import ReviewsMasonry from '@/components/ReviewsMasonry'
import TestimonialsSection from '@/components/TestimonialSection'
import TrustSection from '@/components/TrustSection'
import { BUSINESS_NAME, TAGLINE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'

export const metadata: Metadata = {
  title: `${BUSINESS_NAME} | Professional House & Airbnb Cleaning`,
  description: `${TAGLINE}. Professional 5-star cleaners with dozens of testimonials. Book today!`,
}

export default function Home() {
  return (
    <>
      <Suspense>
        <ReviewsFloatingBadge id='ba527c37-e33e-46d1-8a33-08aed36ffd09' />
      </Suspense>
      <Page location={null} className='mb-24 flex min-h-screen flex-col gap-12 lg:mb-32 lg:gap-12'>
        <HeroSection
          heading={(
            <>
              #1 Professional House
              {' '}
              <br />
              Cleaning Services
            </>
          )}
          description='Maintaining a clean home is crucial, but household chores can be stressful amid life&apos;s demands. Our expert team provides reliable services, saving you time and energy.'
          photos='home'
          actions={(
            <div className='flex items-center gap-6'>
              <Link
                href={ROUTES.BOOKING.href}
                className='hidden items-center justify-center rounded-xl bg-primary-700 p-4 text-center font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:inline-flex lg:mr-3 lg:px-6 lg:py-4 lg:text-xl'
              >
                Book Now
              </Link>
              <Suspense>
                <FindLocationInput />
              </Suspense>
            </div>
          )}
        />
        <TrustSection />
        <TestimonialsSection heading='What Are Your Neighbors Saying?' className='mt-12' />
        <ReviewsMasonry id='d0cb12fc-b042-4a4a-a8cc-9ee8cc58588e' />
        <HowItWorksSection
          heading='So, How Does It Work?'
          steps={[
            {
              title: 'Schedule and book a time.',
              description: (
                <ul>
                  <li>
                    Easily book online with a few clicks or give us a call to
                    get a free, no-obligation quote.
                  </li>
                  <li>Our process is quick, easy, and flexible.</li>
                  <li>Tell us your needs, preferences, and schedule a time.</li>
                </ul>
              ),
            },
            {
              title: 'Leave us to work our magic.',
              description: (
                <ul>
                  <li>
                    Once your appointment is booked, you can sit back and relax
                    while we take care of business.
                  </li>
                  <li>
                    Our team will arrive at your doorstep, fully equipped with a
                    detailed plan for your space.
                  </li>
                </ul>
              ),
            },
            {
              title: 'Enjoy your pristinely clean home.',
              description: (
                <ul>
                  <li>
                    After our team has worked their magic, you&apos;ll be
                    greeted by a home that&apos;s not just clean but truly
                    rejuvenated.
                  </li>
                  <li>Breathe easier in your new home!</li>
                </ul>
              ),
            },
          ]}
        />
        <PricingSection
          heading='Pricing'
          pricing={{ standard: 129, deep: 169, moveInOut: 189, airbnb: 129 }}
          description={(
            <>
              <p className='mb-4 text-left'>
                From oven cleaning and bathroom cleaning to full kitchen cleaning
                — we offers comprehensive home cleaning services. We also
                specialize in end of tenancy cleaning, short-term rental and
                vacation rental cleaning, and thorough spring cleaning.
              </p>
              <p className='text-left'>
                Our move-in and move-out services ensure a smooth transition,
                while our refrigerator cleaning leaves your fridge spotless.
              </p>
            </>
          )}
        />
        <FAQSection
          heading='FAQs'
          description='We know you have questions, and we have answers. Here are some of the most common questions we get asked.'
          faqs={[
            {
              question: 'Why should I choose you over other competitors?',
              answer: (
                <>
                  <p className='mb-6'>
                    Beyond our recognized quality and reliability, here&apos;s just a few of the other
                    reasons why your neighbors chose us over the competition:
                  </p>
                  <CompetitorComparisonTable />
                </>
              ),
            },
            {
              question: 'What cleaning services do you offer?',
              answer: (
                <>
                  <p className='mb-2'>
                    We specialize in offering cleaning services for home and rental cleaning. Our
                    services include standard cleanings, thorough deep cleanings, and specialized
                    move-in/out cleanings, and expert home organization.
                  </p>
                  <p>
                    Our services are designed to meet the unique needs of your space, and we offer a
                    range of add-ons to ensure that you get the cleaning you need, every time.
                  </p>
                </>
              ),
            },
            {
              question: 'Are you bonded and insured?',
              answer: (
                <>
                  <p className='mb-2'>
                    Yes,
                    {' '}
                    {BUSINESS_NAME}
                    {' '}
                    is fully bonded and insured. This ensures that our clients have
                    complete peace of mind when we enter and after we leave their spaces, knowing
                    they are protected against any liabilities.
                  </p>
                  <p>
                    Our commitment to professionalism and security is just one of the many reasons our
                    clients trust us with their cleaning needs over others.
                  </p>
                </>
              ),
            },
            {
              question:
    'How do you ensure the quality and consistency of your cleaning services?',
              answer: (
                <>
                  <p className='mb-2'>
                    Our team conducts periodic quality checks to guarantee consistency across all
                    services and are constantly improving our processes to ensure the highest quality.
                  </p>
                  <p>
                    Our quality assurance process includes rigorous training programs, regular
                    performance evaluations, and client feedback mechanisms to maintain high
                    standards. Our cleaning professionals are in regular communication with us during
                    the clean and equipped with checklists to ensure no detail is overlooked.
                  </p>
                </>
              ),
            },
            {
              question: 'How often should I schedule home cleaning services?',
              answer: (
                <p>
                  We recommend bi-weekly cleanings for consistent upkeep and a fresh environment.
                  However, we offer flexible scheduling to perfectly align with your unique needs,
                  including monthly deep cleans for those seeking a thorough refresh less frequently.
                </p>
              ),
            },
            {
              question: 'Do you offer weekend or holiday cleaning services?',
              answer: (
                <p className='mb-2'>
                  Yes, we recognize the importance of flexibility in our services. We can offer
                  cleaning appointments on weekends and during select holidays at a surcharge to
                  ensure we can fit into your busy schedule. Advance booking for these high-demand
                  times is recommended to secure your preferred slot.
                </p>
              ),
            },
            {
              question: 'How do you screen and hold your cleaning staff accountable?',
              answer: (
                <>
                  <p className='mb-2'>
                    We take great care in selecting our team, requiring thorough background checks and
                    detailed interviews to assess skills and reliability.
                  </p>
                  <p>
                    Each clean goes through a comprehensive checklist to ensure quality and rely any
                    accommodations and details from our clients. We use a blend of customer feedback
                    and on-site inspections to monitor cleaner performance. This allows us to address
                    any issues proactively and recognize excellence.
                  </p>
                </>
              ),
            },
            {
              question: 'Can you accommodate special requests or add-on services?',
              answer: (
                <p>
                  Yes, we strive to meet all our clients&apos; needs and are happy to accommodate
                  special requests and add-on services. Whether it&apos;s focusing on specific areas,
                  using particular cleaning products, or including additional tasks, just let us know.
                  We&apos;ll tailor our services to ensure your utmost satisfaction.
                </p>
              ),
            },
            {
              question: 'What is your policy on rescheduling or canceling an appointment?',
              answer: (
                <p>
                  We understand that life can be unpredictable.
                  {' '}
                  {BUSINESS_NAME}
                  {' '}
                  offers flexible rescheduling options and request that you provide us with at least
                  24 hours notice for cancellations. Our goal is to accommodate your needs while
                  ensuring our team can efficiently manage their schedules.
                </p>
              ),
            },
            {
              question: 'What should I do if I\'m not satisfied with the cleaning service?  ',
              answer: (
                <>
                  <p className='mb-2'>
                    We take your satisfaction very seriously at
                    {' '}
                    {BUSINESS_NAME}
                    , and uphold it as
                    our top priority. If for any reason you&apos;re not satisfied with our
                    service, please contact us right away within 24 hours of the cleaning.
                  </p>
                  <p>
                    We will address any issues promptly and, if you are not 100%
                    satisfied, provide a free redo. We&apos;re committed to ensuring every
                    client is delighted with our work to earn your continued business.
                  </p>
                </>
              ),
            },
          ]}
        />
        <Suspense>
          <CTASection
            heading='Ready to enjoy stress-free cleaning?'
            body={`Spend your life enjoying, not worrying about household chores. Let ${BUSINESS_NAME} take care of the cleaning while you focus on making memories with your loved ones. Whether you need a one-time residential deep clean or ongoing maintenance, our company got you covered.`}
            location={null}
          />
        </Suspense>
      </Page>
    </>
  )
}
