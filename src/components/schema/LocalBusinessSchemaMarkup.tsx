import type { LocalBusiness, WithContext } from 'schema-dts'
import { BUSINESS_NAME } from '@/lib/constants'
import { getReviews } from '@/lib/reviews'

import { slugify } from '@/lib/utils'
import Script from 'next/script'

interface Address {
  streetAddress: string
  addressLocality: string
  addressRegion: string
  postalCode: string
  addressCountry: string
}

interface LocalBusinessSchemaMarkupProps {
  locationName: string
  serviceAreaName?: string
  description: string
  url: string
  telephone: string
  email: string
  address: Address
}

export default async function LocalBusinessSchemaMarkup({
  locationName,
  serviceAreaName,
  description,
  url,
  telephone,
  email,
  address,
}: LocalBusinessSchemaMarkupProps) {
  // Format the business name to include the location
  const fullBusinessName = `${BUSINESS_NAME} ${locationName}`

  // Fetch reviews data on the server with location filter
  const reviewsData = await getReviews(locationName)

  // Calculate overall rating and review count from platform ratings
  const ratingValue = Number((reviewsData.platform_ratings.reduce((acc, curr) => acc + curr.rating * curr.total_reviews, 0)
    / reviewsData.platform_ratings.reduce((acc, curr) => acc + curr.total_reviews, 0)).toFixed(1))

  const reviewCount = reviewsData.platform_ratings.reduce((acc, curr) => acc + curr.total_reviews, 0)

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
    // Add aggregate rating if there are reviews
    ...(reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            'ratingValue': ratingValue.toString(),
            'reviewCount': reviewCount,
            'ratingCount': reviewCount,
            'bestRating': '5',
            'worstRating': '1',
            'reviewAspect': 'House Cleaning Service',
          },
        }
      : {}),
    // Additional properties for a cleaning business
    'priceRange': '$$',
    'paymentAccepted': 'Cash, Credit Card',
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
    'makesOffer': [
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Deep Cleaning',
          'description': 'Recommended as an initial cleaning to get your home to a high standard of cleanliness to maintain with recurring standard cleanings.',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Vacation Rental Cleaning',
          'description': 'Expert Airbnb cleaning services that ensure your property is guest-ready. Includes automatic scheduling, customized checklists, post-cleaning photos, and flexible hours for turnovers.',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Move In / Move Out Cleaning',
          'description': 'Recommended for a thorough cleaning of spaces before moving in or out. Includes comprehensive deep cleaning of kitchens, bathrooms, living areas, and all commonly overlooked spaces.',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'House Cleaning',
          'description': 'Professional house cleaning services including dusting, vacuuming, mopping, bathroom cleaning, and kitchen sanitization. Perfect for maintaining a clean and healthy home environment.',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Residential Cleaning',
          'description': 'Comprehensive residential cleaning services tailored to your home. Includes regular maintenance cleaning, deep cleaning, and specialized cleaning for specific areas of your home.',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Standard Cleaning',
          'description': 'Recommended as a recurring service for maintaining the cleanliness of a home after a deep clean. Includes dusting, vacuuming, sanitizing, and polishing with eco-friendly products.',
        },
      },
      {
        '@type': 'Offer',
        'itemOffered': {
          '@type': 'Service',
          'name': 'Maid Service',
          'description': 'Professional maid service offering regular house cleaning, deep cleaning, and specialized cleaning tasks. Our experienced maids provide thorough cleaning with attention to detail and eco-friendly products.',
        },
      },
    ],
    'areaServed': address.addressLocality,
  }

  return (
    <Script
      id={`local-business-schema-${slugify(serviceAreaName ?? locationName)}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
