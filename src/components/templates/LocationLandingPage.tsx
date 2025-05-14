import type { LandingPageProps } from '@/components/templates/LandingPage'
import type { Location } from '@/lib/types'
import { ContentViewTracker } from '@/components/analytics/facebook/Pixel'
import CTAButtons from '@/components/CTAButtons'
import LandingPage from '@/components/templates/LandingPage'
import LocationsSection from '@/components/templates/sections/LocationsSection'
import { LOCATIONS, PHONE } from '@/lib/constants'
import { slugify } from '@/lib/utils'

export interface LocationLandingPageProps extends Omit<LandingPageProps, 'location'> {
  location: Location
  googleMapsEmbedUrl: string
  copy: LandingPageProps['copy'] & {
    locationsSectionHeading: string
    locationsSectionDescription: string
  }
}

export default function LocationLandingPage({
  location,
  googleMapsEmbedUrl,
  copy,
  ...props
}: LocationLandingPageProps) {
  const { name, serviceAreas } = LOCATIONS[location]
  const phone = PHONE[location]
  return (
    <>
      <ContentViewTracker
        contentType="location"
        contentName={name}
        contentId={`location-${slugify(name)}`}
      />
      <LandingPage
        {...props}
        location={location}
        copy={{
          heroActions: <CTAButtons className="mt-12 lg:mt-8" phone={phone} location={location} />,
          ...copy,
        }}
        sections={[
          {
            id: 'locations',
            component: (
              <LocationsSection
                heading={copy.locationsSectionHeading}
                description={copy.locationsSectionDescription}
                iframeSrc={googleMapsEmbedUrl}
                serviceAreas={serviceAreas}
              />
            ),
            position: 3.5, // Insert between reviews (3) and how-it-works (4)
          },
        ]}
      />
    </>
  )
}
