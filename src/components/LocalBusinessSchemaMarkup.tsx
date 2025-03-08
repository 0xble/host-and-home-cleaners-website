import { slugify } from '0xble/strings'
import Script from 'next/script'
import React from 'react'

import { BUSINESS_NAME } from '@/lib/constants'

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

  const schema = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService', 'HomeAndConstructionBusiness'],
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
    // Include service type as a category
    'makesOffer': {
      '@type': 'Offer',
      'itemOffered': {
        '@type': 'Service',
        'name': 'Professional Cleaning Services',
      },
    },
  }

  return (
    <Script
      id={`local-business-schema-${slugify(address.addressLocality)}`}
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
