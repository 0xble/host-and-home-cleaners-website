import { slugify } from '0xble/strings'

import CTAButtons from '@/components/CTAButtons'
import LandingPage from '@/components/LandingPage'
import LocationsSection from '@/components/LocationsSection'
import { type Location, type LocationKey, PHONE } from '@/lib/constants'
import { ContentViewTracker } from '@/lib/pixel'

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
    vacationRental: number
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

export default function LocationLandingPage({
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
      <ContentViewTracker
        contentType='location'
        contentName={location.name}
        contentId={`location-${slugify(location.name)}`}
      />
      <LandingPage
        location={locationKey}
        reviewsMasonryId={reviewsMasonryId}
        reviewsBadgeId={reviewsBadgeId}
        photosFolder={photosFolder}
        pricing={pricing}
        copy={{
          heroHeading: customHeroHeading,
          heroDescription: customHeroDescription,
          heroActions: <CTAButtons className='mt-12 lg:mt-8' phone={PHONE[locationKey]} />,
          testimonialsHeading: customTestimonialsHeading,
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
