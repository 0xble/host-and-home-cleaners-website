import type { ClassValue } from 'clsx'
import type { Location } from './types'
import { clsx } from 'clsx'

import { twMerge } from 'tailwind-merge'
import { EMAIL, LOCATIONS, PHONE } from './constants'
import { ROUTES } from './routes'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }

  if (
    process.env.VERCEL_ENV === 'production'
    && process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'https://localhost:3000'
}

export interface GetLocationOptions {
  zipCode?: string
  href?: string
}
export function getLocation(options: GetLocationOptions): Location | undefined {
  if (options.zipCode) {
    for (const [location, locationData] of Object.entries(LOCATIONS)) {
      const zipCodes = locationData.zipCodes as readonly string[]
      if (zipCodes.includes(options.zipCode)) {
        return location as Location
      }
    }
  }
  else if (options.href) {
    for (const [location, { href, SERVICE_AREAS }] of Object.entries(ROUTES.LOCATIONS)) {
      if ([href, ...Object.values(SERVICE_AREAS).map(({ href }) => href)].some(routeHref => options.href?.startsWith(routeHref))) {
        return location as Location
      }
    }
  }
  return undefined
}

export function getEmail(location: Location | null) {
  if (location) {
    return EMAIL[location]
  }
  else {
    return EMAIL.SUPPORT // Default email
  }
}

export function getPhone(location: Location | null) {
  if (location) {
    return PHONE[location]
  }
  else {
    return PHONE.MYRTLE_BEACH // Default phone
  }
}

export function getState(location: Location | null) {
  if (location) {
    return LOCATIONS[location].state
  }
  else {
    return LOCATIONS.MYRTLE_BEACH.state // Default state
  }
}

export function getUrl(location: Location | null) {
  if (location) {
    return ROUTES.LOCATIONS[location].href
  }
  else {
    return ROUTES.HOME.href
  }
}

export function getLocationsString(
  locations: { name: string, href: string }[],
) {
  return locations
    .map((location, index) =>
      index === locations.length - 1 ? `or ${location.name}` : location.name,
    )
    .join(', ')
}
