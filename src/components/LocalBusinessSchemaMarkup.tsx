import Script from 'next/script'
import type { LocalBusiness, WithContext } from 'schema-dts'

import { BUSINESS_NAME } from '@/lib/constants'
import { slugify } from '0xble/strings'

type Address = {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

type LocalBusinessSchemaMarkupProps = {
  locationName: string
  description: string
  url: string
  telephone: string
  email: string
  address: Address
}

export default function LocalBusinessSchemaMarkup({
  locationName,
  description,
  url,
  telephone,
  email,
  address,
}: LocalBusinessSchemaMarkupProps) {
  // Format the business name to include the location
  const fullBusinessName = `${BUSINESS_NAME} ${locationName}`

  const schema: WithContext<LocalBusiness> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': url,
    'name': fullBusinessName,
    description,
    url,
    telephone,
    email,
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': address.streetAddress,
      'addressLocality': address.addressLocality,
      'addressRegion': address.addressRegion,
      'postalCode': address.postalCode,
      'addressCountry': address.addressCountry,
    },
    // Additional properties for a cleaning business
    'priceRange': '$$',
    'paymentAccepted': 'Cash, Credit Card',
    'makesOffer': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Deep Cleaning',
          'description': 'Recommended as an initial cleaning to get your home to a high standard of cleanliness to maintain with recurring standard cleanings.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Vacation Rental Cleaning',
          'description': 'Expert Airbnb cleaning services that ensure your property is guest-ready. Includes automatic scheduling, customized checklists, post-cleaning photos, and flexible hours for turnovers.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Move In / Move Out Cleaning',
          'description': 'Recommended for a thorough cleaning of spaces before moving in or out. Includes comprehensive deep cleaning of kitchens, bathrooms, living areas, and all commonly overlooked spaces.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'House Cleaning',
          'description': 'Professional house cleaning services including dusting, vacuuming, mopping, bathroom cleaning, and kitchen sanitization. Perfect for maintaining a clean and healthy home environment.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Residential Cleaning',
          'description': 'Comprehensive residential cleaning services tailored to your home. Includes regular maintenance cleaning, deep cleaning, and specialized cleaning for specific areas of your home.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Standard Cleaning',
          'description': 'Recommended as a recurring service for maintaining the cleanliness of a home after a deep clean. Includes dusting, vacuuming, sanitizing, and polishing with eco-friendly products.'
        }
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Maid Service',
          'description': 'Professional maid service offering regular house cleaning, deep cleaning, and specialized cleaning tasks. Our experienced maids provide thorough cleaning with attention to detail and eco-friendly products.'
        }
      },
    ],
    // Detailed opening hours for each day
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Monday',
        'opens': '08:00',
        'closes': '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Tuesday',
        'opens': '08:00',
        'closes': '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Wednesday',
        'opens': '08:00',
        'closes': '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Thursday',
        'opens': '08:00',
        'closes': '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Friday',
        'opens': '08:00',
        'closes': '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Saturday',
        'opens': '08:00',
        'closes': '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': 'Sunday',
        'opens': '08:00',
        'closes': '20:00',
      },
    ],
    'areaServed': address.addressLocality,
  }

  return (
    <Script
      id={`local-business-schema-${slugify(address.addressLocality)}`}
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
