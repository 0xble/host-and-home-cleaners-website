import type { Metadata } from 'next'
import { Suspense } from 'react'

import { ContentViewTracker } from '@/components/analytics/facebook/Pixel'
import BookNowButton from '@/components/BookNowButton'
import CompetitorComparisonTable from '@/components/CompetitorComparisonTable'
import FindLocationInput from '@/components/FindLocationInput'
import LandingPage from '@/components/templates/LandingPage'
import { BUSINESS_NAME, PRICING, SITE_IMAGE, TAGLINE } from '@/lib/constants'

const PAGE_TITLE = `${BUSINESS_NAME} | Professional House & Airbnb Cleaning`
const PAGE_DESCRIPTION = `${TAGLINE}. Professional 5-star cleaners with dozens of reviews. Book today!`

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [
      {
        url: SITE_IMAGE,
        width: 1200,
        height: 630,
        alt: PAGE_TITLE,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [SITE_IMAGE],
  },
}

export default function Home() {
  return (
    <>
      <ContentViewTracker
        contentType="page"
        contentName="Home"
        contentId="home-page"
      />
      {/* <Suspense>
        <ReviewsFloatingBadge id='ba527c37-e33e-46d1-8a33-08aed36ffd09' />
      </Suspense> */}
      <LandingPage
        location={null}
        photosFolder="home"
        pricing={PRICING.MYRTLE_BEACH}
        copy={{
          heroHeading: (
            <>
              #1 Professional House
              {' '}
              <br />
              Cleaning Services
            </>
          ),
          heroDescription: 'Maintaining a clean home is crucial, but household chores can be stressful amid life\'s demands. Our expert team provides reliable services, saving you time and energy.',
          heroActions: (
            <div className="flex items-center gap-6">
              <BookNowButton
                className="hidden sm:inline-flex lg:mr-3"
                size="lg"
                location={null}
              />
              <Suspense>
                <FindLocationInput />
              </Suspense>
            </div>
          ),
          reviewsHeading: 'What Are Your Neighbors Saying?',
          howItWorksHeading: 'So, How Does It Work?',
          howItWorksSteps: [
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
          ],
          pricingHeading: 'Pricing',
          pricingDescription: (
            <>
              <p className="mb-4 text-left">
                From oven cleaning and bathroom cleaning to full kitchen cleaning
                — we offers comprehensive home cleaning services. We also
                specialize in end of tenancy cleaning, short-term rental and
                vacation rental cleaning, and thorough spring cleaning.
              </p>
              <p className="text-left">
                Our move-in and move-out services ensure a smooth transition,
                while our refrigerator cleaning leaves your fridge spotless.
              </p>
            </>
          ),
          faqHeading: 'FAQs',
          faqDescription: 'We know you have questions, and we have answers. Here are some of the most common questions we get asked.',
          faqs: [
            {
              question: 'Why should I choose you over other competitors?',
              answer: (
                <>
                  <p className="mb-6">
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
                  <p className="mb-2">
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
                  <p className="mb-2">
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
              question: 'How do you ensure the quality and consistency of your cleaning services?',
              answer: (
                <>
                  <p className="mb-2">
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
                <p className="mb-2">
                  Yes, we recognize the importance of flexibility in our services. We can offer
                  cleaning appointments on weekends and during select holidays at a surcharge to
                  ensure we can fit into your busy schedule. Advance booking for these high-demand
                  times is recommended to secure your preferred slot.
                </p>
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
                  <p className="mb-2">
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
          ],
          ctaHeading: 'Ready to enjoy stress-free cleaning?',
          ctaBody: `Spend your life enjoying, not worrying about household chores. Let ${BUSINESS_NAME} take care of the cleaning while you focus on making memories with your loved ones. Whether you need a one-time residential deep clean or ongoing maintenance, our company got you covered.`,
        }}
      />
    </>
  )
}
