import type { MetadataRoute } from 'next'

import type { LocationRoute, RouteData } from '@/lib/routes'
import { ROUTES } from '@/lib/routes'
import { getBaseUrl } from '@/lib/utils'

function isRoute(value: unknown): value is RouteData {
  return typeof value === 'object' && value !== null && 'href' in value
}

function isLocationRoute(value: unknown): value is LocationRoute[keyof LocationRoute] {
  return typeof value === 'object' && value !== null && 'SERVICE_AREAS' in value
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Flatten the ROUTES object into a single array of RouteData objects.
  const routes = Object.values(ROUTES).flatMap((routeOrGroup) => {
    // If the value is a single route, return it in an array.
    if (isRoute(routeOrGroup)) {
      return [routeOrGroup]
    }
    // If the value is a group of routes, process them.
    if (typeof routeOrGroup === 'object' && routeOrGroup !== null) {
      return Object.values(routeOrGroup).flatMap((route) => {
        // If the route is a location, include its service areas.
        if (isLocationRoute(route)) {
          return [route, ...Object.values(route.SERVICE_AREAS)]
        }
        // Otherwise, just include the route if it's valid.
        return isRoute(route) ? [route] : []
      })
    }
    // If the value is not a route or a group, return an empty array.
    return []
  })

  const uniqueRoutes = new Map<string, RouteData>()
  routes
    // Filter out routes that have no priority or are external.
    .filter(page => page.priority && page.href.startsWith('/'))
    // Add each unique route to the Map.
    .forEach(page => uniqueRoutes.set(page.href, page))

  return Array.from(uniqueRoutes.values()).map(page => ({
    url: `${getBaseUrl()}${page.href}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority ?? 0,
  }))
}
