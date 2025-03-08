import { slugify } from '0xble/strings'
import Script from 'next/script'
import React from 'react'

type NeighborhoodServiceProps = {
  neighborhoodName: string
  description: string
  url: string
  parentUrl: string
  fullServiceName: string
  parentBusinessName: string
}

export default function ServiceSchemaMarkup({
  neighborhoodName,
  description,
  url,
  parentUrl,
  fullServiceName,
  parentBusinessName,
}: NeighborhoodServiceProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': fullServiceName,
    'serviceType': 'Cleaning Service',
    description,
    url,
    'areaServed': {
      '@type': 'Place',
      'name': neighborhoodName,
    },
    // Link to the main business as the provider
    'provider': {
      '@type': 'LocalBusiness',
      'name': parentBusinessName,
      'url': parentUrl,
    },
    // Include specific services offered
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Cleaning Services',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Standard Cleaning',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Deep Cleaning',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Move In/Out Cleaning',
          },
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Vacation Rental Cleaning',
          },
        },
      ],
    },
  }

  return (
    <Script
      id={`service-schema-${slugify(neighborhoodName)}`}
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
