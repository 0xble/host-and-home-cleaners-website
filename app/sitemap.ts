import { DOMAIN } from '@/lib/globals'
import { ALL_PAGES } from '@/lib/pages'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ALL_PAGES.filter((page) => page.priority > 0)
  return pages.map((page) => ({
    url: `https://${DOMAIN}${page.href}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
