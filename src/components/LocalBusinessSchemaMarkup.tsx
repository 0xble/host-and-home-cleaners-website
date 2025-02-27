'use client'

import { LocalBusinessJsonLd, type LocalBusinessJsonLdProps } from 'next-seo'

export default function LocalBusinessSchemaMarkup(props: LocalBusinessJsonLdProps) {
  return <LocalBusinessJsonLd {...props} />
}
