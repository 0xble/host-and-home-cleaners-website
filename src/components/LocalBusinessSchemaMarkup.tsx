'use client'

import { LocalBusinessJsonLd } from 'next-seo'

export type LocalBusinessSchemaMarkupProps = {
  type: string
  id: string
  name: string
  description: string
  url: string
  telephone: string
  email: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
}

export default function LocalBusinessSchemaMarkup({
  type,
  id,
  name,
  description,
  url,
  telephone,
  email,
  address,
}: LocalBusinessSchemaMarkupProps) {
  return (
    <LocalBusinessJsonLd
      type={type}
      id={id}
      name={name}
      description={description}
      url={url}
      telephone={telephone}
      email={email}
      address={address}
    />
  )
}
