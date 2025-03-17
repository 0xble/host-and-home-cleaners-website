import { Suspense } from 'react'

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
import type { LocationKey } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'

type Step = {
  title: string
  description: React.ReactNode
}

type Section = {
  id: string
  component: React.ReactNode
  position: number
}

type LandingPageProps = {
  location: LocationKey | null
  reviewsMasonryId: string
  reviewsBadgeId: string
  photosFolder: string
  pricing: {
    standard: number
    deep: number
    moveInOut: number
    vacationRental: number
  }
  copy: {
    // Hero Section
    heroHeading: React.ReactNode
    heroDescription: string
    heroActions?: React.ReactElement
    // Testimonials Section
    testimonialsHeading: string
    // How It Works Section
    howItWorksHeading: string
    howItWorksSteps: Step[]
    // Pricing Section
    pricingHeading: string
    pricingDescription: React.ReactNode
    // FAQ Section
    faqHeading: string
    faqDescription: string
    faqs: Array<{
      question: string
      answer: React.ReactNode
    }>
    // CTA Section
    ctaHeading: string
    ctaBody: React.ReactNode
  }
  sections?: Section[]
}

const createDefaultSections = (
  heroHeading: React.ReactNode,
  heroDescription: string,
  heroActions: React.ReactElement | undefined,
  testimonialsHeading: string,
  howItWorksHeading: string,
  howItWorksSteps: Step[],
  pricingHeading: string,
  pricing: LandingPageProps['pricing'],
  pricingDescription: React.ReactNode,
  faqHeading: string,
  faqDescription: string,
  faqs: LandingPageProps['copy']['faqs'],
  ctaHeading: string,
  ctaBody: React.ReactNode,
  location: LocationKey | null,
  reviewsMasonryId: string,
  photosFolder: string,
): Section[] => [
  {
    id: 'hero',
    component: (
      <HeroSection
        heading={heroHeading}
        description={heroDescription}
        photos={photosFolder}
        actions={heroActions || (
          <div className='flex items-center gap-6'>
            <a
              href={ROUTES.BOOKING.href}
              className='hidden items-center justify-center rounded-xl bg-primary-700 p-4 text-center font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:inline-flex lg:mr-3 lg:px-6 lg:py-4 lg:text-xl'
            >
              Book Now
            </a>
            <Suspense>
              <FindLocationInput />
            </Suspense>
          </div>
        )}
      />
    ),
    position: 0,
  },
  {
    id: 'trust',
    component: <TrustSection />,
    position: 1,
  },
  {
    id: 'testimonials',
    component: (
      <TestimonialsSection
        heading={testimonialsHeading}
        className='mt-12'
      />
    ),
    position: 2,
  },
  {
    id: 'reviews',
    component: <ReviewsMasonry id={reviewsMasonryId} />,
    position: 3,
  },
  {
    id: 'how-it-works',
    component: (
      <HowItWorksSection
        heading={howItWorksHeading}
        steps={howItWorksSteps}
      />
    ),
    position: 4,
  },
  {
    id: 'pricing',
    component: (
      <PricingSection
        heading={pricingHeading}
        pricing={pricing}
        description={pricingDescription}
      />
    ),
    position: 5,
  },
  {
    id: 'faq',
    component: (
      <FAQSection
        heading={faqHeading}
        description={faqDescription}
        faqs={faqs}
      />
    ),
    position: 6,
  },
  {
    id: 'cta',
    component: (
      <Suspense>
        <CTASection
          heading={ctaHeading}
          body={ctaBody}
          location={location}
        />
      </Suspense>
    ),
    position: 7,
  },
]

const emptySections: Section[] = []

export default function LandingPage({
  location,
  reviewsMasonryId,
  reviewsBadgeId,
  photosFolder,
  pricing,
  copy: {
    heroHeading,
    heroDescription,
    heroActions,
    testimonialsHeading,
    howItWorksHeading,
    howItWorksSteps,
    pricingHeading,
    pricingDescription,
    faqHeading,
    faqDescription,
    faqs,
    ctaHeading,
    ctaBody,
  },
  sections = emptySections,
}: LandingPageProps) {
  // Create default sections
  const defaultSections = createDefaultSections(
    heroHeading,
    heroDescription,
    heroActions,
    testimonialsHeading,
    howItWorksHeading,
    howItWorksSteps,
    pricingHeading,
    pricing,
    pricingDescription,
    faqHeading,
    faqDescription,
    faqs,
    ctaHeading,
    ctaBody,
    location,
    reviewsMasonryId,
    photosFolder,
  )

  // Merge custom sections with default sections
  const allSections = [...defaultSections, ...sections].sort((a, b) => a.position - b.position)

  return (
    <>
      <Suspense>
        <ReviewsFloatingBadge id={reviewsBadgeId} />
      </Suspense>
      <Page location={location} className='mb-24 flex min-h-screen flex-col gap-12 lg:mb-32 lg:gap-12'>
        {allSections.map(section => (
          <div key={section.id}>{section.component}</div>
        ))}
      </Page>
    </>
  )
}
