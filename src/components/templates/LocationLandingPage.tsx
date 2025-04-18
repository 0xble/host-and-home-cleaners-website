import type { Location, LocationKey } from '@/lib/constants'

import { slugify } from '0xble/strings'
import { ContentViewTracker } from '@/components/analytics/facebook/Pixel'
import CTAButtons from '@/components/CTAButtons'
import LandingPage from '@/components/templates/LandingPage'
import LocationsSection from '@/components/templates/sections/LocationsSection'
import { PHONE } from '@/lib/constants'

interface Step {
  title: string
  description: React.ReactNode
}

interface LocationPageProps {
  locationKey: LocationKey
  location: Location
  reviewsBadgeId: string
  googleMapsEmbedUrl: string
  photosFolder: string
  pricing: {
    standard: number
    deep: number
    moveInOut: number
    vacationRental: number
  }
  copy: {
    // Hero Section
    customHeroHeading: React.ReactNode
    customHeroDescription: string
    // Testimonials Section
    customReviewsHeading: string
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

export default function LocationLandingPage({
  locationKey,
  location,
  reviewsBadgeId,
  googleMapsEmbedUrl,
  photosFolder,
  pricing,
  copy: {
    customHeroHeading,
    customHeroDescription,
    customReviewsHeading,
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
      <ContentViewTracker
        contentType="location"
        contentName={location.name}
        contentId={`location-${slugify(location.name)}`}
      />
      <LandingPage
        location={locationKey}
        reviewsBadgeId={reviewsBadgeId}
        photosFolder={photosFolder}
        pricing={pricing}
        copy={{
          heroHeading: customHeroHeading,
          heroDescription: customHeroDescription,
          heroActions: <CTAButtons className="mt-12 lg:mt-8" phone={PHONE[locationKey]} />,
          reviewsHeading: customReviewsHeading,
          howItWorksHeading: customHowItWorksHeading,
          howItWorksSteps: customHowItWorksSteps,
          pricingHeading: customPricingSectionHeading,
          pricingDescription: customPricingSectionDescription,
          faqHeading: customFAQHeading,
          faqDescription: customFAQDescription,
          faqs: customFAQs,
          ctaHeading: customCTAHeading,
          ctaBody: customCTABody,
        }}
        sections={[
          {
            id: 'locations',
            component: (
              <LocationsSection
                heading={customLocationsSectionHeading}
                description={customLocationsSectionDescription}
                iframeSrc={googleMapsEmbedUrl}
                serviceAreas={location.serviceAreas}
              />
            ),
            position: 3.5, // Insert between reviews (3) and how-it-works (4)
          },
        ]}
      />
    </>
  )
}
