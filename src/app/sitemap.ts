import type { MetadataRoute } from 'next'

import { ROUTES } from '@/lib/routes'
import { getBaseUrl } from '@/lib/utils'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.values(ROUTES).flatMap((route) => {
    if (typeof route === 'object' && 'href' in route) {
      return [route]
    } else if (typeof route === 'object') {
      return Object.values(route)
    }
    return []
  })

  return routes
    .filter(page => page.priority > 0 && page.href.startsWith('/'))
    .map(page => ({
      url: `${getBaseUrl()}${page.href}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    }))
}
