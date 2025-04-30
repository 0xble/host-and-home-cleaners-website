import type { Location } from '@/lib/types'

import BookNowButton from '@/components/BookNowButton'
import FindLocationInput from '@/components/FindLocationInput'
import ReviewsSection from '@/components/reviews/ReviewsSection'
import Page from '@/components/templates/Page'
import CTASection from '@/components/templates/sections/CTASection'
import FAQSection from '@/components/templates/sections/FAQSection'
import HeroSection from '@/components/templates/sections/HeroSection'
import HowItWorksSection from '@/components/templates/sections/HowItWorksSection'
import PricingSection from '@/components/templates/sections/PricingSection'
// import ReviewsFloatingBadge from '@/components/ReviewsFloatingBadge'
import TrustSection from '@/components/templates/sections/TrustSection'
import { Suspense } from 'react'

interface Step {
  title: string
  description: React.ReactNode
}

interface Section {
  id: string
  component: React.ReactNode
  position?: number
}

interface LandingPageProps {
  location: Location | null
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
    // Reviews Section
    reviewsHeading: string
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

function createDefaultSections(heroHeading: React.ReactNode, heroDescription: string, heroActions: React.ReactElement | undefined, reviewsHeading: string, howItWorksHeading: string, howItWorksSteps: Step[], pricingHeading: string, pricing: LandingPageProps['pricing'], pricingDescription: React.ReactNode, faqHeading: string, faqDescription: string, faqs: LandingPageProps['copy']['faqs'], ctaHeading: string, ctaBody: React.ReactNode, location: Location | null, photosFolder: string): Section[] {
  return [
    {
      id: 'hero',
      component: (
        <HeroSection
          heading={heroHeading}
          description={heroDescription}
          photos={photosFolder}
          actions={heroActions || (
            <div className="flex items-center gap-6">
              <BookNowButton
                className="hidden sm:inline-flex lg:mr-3"
                size="lg"
                location={location}
              />
              <Suspense>
                <FindLocationInput />
              </Suspense>
            </div>
          )}
        />
      ),
    },
    {
      id: 'trust',
      component: <TrustSection />,
    },
    {
      id: 'reviews',
      component: (
        <ReviewsSection
          heading={reviewsHeading}
          location={location}
          className="mt-12"
        />
      ),
    },
    {
      id: 'how-it-works',
      component: (
        <HowItWorksSection
          heading={howItWorksHeading}
          steps={howItWorksSteps}
        />
      ),
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
    },
  ]
}

const emptySections: Section[] = []

export default function LandingPage({
  location,
  // reviewsBadgeId,
  photosFolder,
  pricing,
  copy: {
    heroHeading,
    heroDescription,
    heroActions,
    reviewsHeading,
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
    reviewsHeading,
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
    photosFolder,
  )

  // Merge custom sections with default sections and use index as position if not defined
  const allSections = [...defaultSections, ...sections]
    .map((section, index) => ({
      ...section,
      position: section.position ?? index,
    }))
    .sort((a, b) => a.position - b.position)

  return (
    <>
      {/* <Suspense>
        <ReviewsFloatingBadge id={reviewsBadgeId} />
      </Suspense> */}
      <Page location={location} className="mb-24 flex min-h-screen flex-col gap-12 lg:mb-32 lg:gap-12">
        {allSections.map(section => (
          <div key={section.id} id={section.id} className="scroll-mt-20">
            {section.component}
          </div>
        ))}
      </Page>
    </>
  )
}
