import { Suspense } from 'react'

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
import { type Location, type LocationKey, PHONE } from '@/lib/constants'

type Step = {
  title: string
  description: React.ReactNode
}

type LocationPageProps = {
  locationKey: LocationKey
  location: Location
  reviewsMasonryId: string
  reviewsBadgeId: string
  googleMapsEmbedUrl: string
  photosFolder: string
  pricing: {
    standard: number
    deep: number
    moveInOut: number
    airbnb: number
  }
  copy: {
  // Hero Section
    customHeroHeading: React.ReactNode
    customHeroDescription: string
    // Testimonials Section
    customTestimonialsHeading: string
    // Locations Section
    customLocationsSectionHeading: string
    customLocationsSectionDescription: string
    // How It Works Section
    customHowItWorksHeading: string
    customHowItWorksSteps: Step[]
    // Pricing Section
    customPricingSectionHeading: string
    customPricingSectionDescription: React.ReactNode
    // FAQ Section
    customFAQHeading: string
    customFAQDescription: string
    customFAQs: Array<{
      question: string
      answer: React.ReactNode
    }>
    // CTA Section
    customCTAHeading: string
    customCTABody: React.ReactNode
  }
}

export default function LocationPage({
  locationKey,
  location,
  reviewsMasonryId,
  reviewsBadgeId,
  googleMapsEmbedUrl,
  photosFolder,
  pricing,
  copy: {
    customHeroHeading,
    customHeroDescription,
    customTestimonialsHeading,
    customLocationsSectionHeading,
    customLocationsSectionDescription,
    customHowItWorksHeading,
    customCTAHeading,
    customCTABody,
    customHowItWorksSteps,
    customPricingSectionHeading,
    customPricingSectionDescription,
    customFAQHeading,
    customFAQDescription,
    customFAQs,
  },
}: LocationPageProps) {
  return (
    <>
      <Suspense>
        <ReviewsFloatingBadge id={reviewsBadgeId} />
      </Suspense>
      <Page location={locationKey} className='mb-24 flex min-h-screen flex-col gap-12 lg:mb-32 lg:gap-12'>
        <HeroSection
          heading={customHeroHeading}
          description={customHeroDescription}
          photos={photosFolder}
          actions={<CTAButtons className='mt-12 lg:mt-8' phone={PHONE[locationKey]} />}
        />

        <TrustSection />

        <TestimonialsSection
          heading={customTestimonialsHeading}
          className='mt-12'
        />

        <ReviewsMasonry id={reviewsMasonryId} />

        <LocationsSection
          heading={customLocationsSectionHeading}
          description={customLocationsSectionDescription}
          iframeSrc={googleMapsEmbedUrl}
          serviceAreas={location.serviceAreas}
        />

        <HowItWorksSection
          heading={customHowItWorksHeading}
          steps={customHowItWorksSteps}
        />

        <PricingSection
          heading={customPricingSectionHeading}
          pricing={pricing}
          description={customPricingSectionDescription}
        />

        <FAQSection
          heading={customFAQHeading}
          description={customFAQDescription}
          faqs={customFAQs}
        />

        <Suspense>
          <CTASection
            heading={customCTAHeading}
            body={customCTABody}
            location={locationKey}
          />
        </Suspense>
      </Page>
    </>
  )
}
