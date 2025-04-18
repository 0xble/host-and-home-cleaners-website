import type { LocationRoute, Route } from '@/lib/routes'

import type { MetadataRoute } from 'next'
import { ROUTES } from '@/lib/routes'
import { getBaseUrl } from '@/lib/utils'

function isRoute(value: unknown): value is Route {
  return typeof value === 'object' && value !== null && 'href' in value
}

function isLocationRoute(value: unknown): value is LocationRoute[keyof LocationRoute] {
  return typeof value === 'object' && value !== null && 'SERVICE_AREAS' in value
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.entries(ROUTES).flatMap(([key, route]): Route[] => {
    if (isRoute(route)) {
      return [route]
    }
    else if (typeof route === 'object' && route !== null) {
      if (key === 'LOCATIONS') {
        return Object.values(route).flatMap((location) => {
          if (isLocationRoute(location)) {
            const uniqueServiceAreas = Object.values(location.SERVICE_AREAS).filter(
              area => area.href !== location.href,
            )
            return [location, ...uniqueServiceAreas]
          }
          return []
        })
      }
      return Object.values(route).filter(isRoute)
    }
    return []
  })

  const uniqueRoutes = new Map<string, Route>()
  routes
    .filter(page => page.priority > 0 && page.href.startsWith('/'))
    .forEach(page => uniqueRoutes.set(page.href, page))

  return Array.from(uniqueRoutes.values()).map(page => ({
    url: `${getBaseUrl()}${page.href}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
