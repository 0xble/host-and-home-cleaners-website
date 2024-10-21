import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { EMAIL, LOCATIONS, PHONE } from './constants'
import { ROUTES } from './routes'
import type { Location } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getBaseUrl = () => {
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

  return 'http://localhost:3000'
}

export type GetLocationOptions = {
  zipCode?: string
  href?: string
}
export const getLocation = (options: GetLocationOptions): Location | undefined => {
  if (options.zipCode) {
    for (const [location, { zipCodes }] of Object.entries(LOCATIONS)) {
      if ((zipCodes as string[]).includes(options.zipCode)) {
        return location as Location
      }
    }
  } else if (options.href) {
    for (const [location, { href, SERVICE_AREAS }] of Object.entries(ROUTES.LOCATIONS)) {
      if ([href, ...Object.values(SERVICE_AREAS).map(({ href }) => href)].some(routeHref => options.href?.startsWith(routeHref))) {
        return location as Location
      }
    }
  }
  return undefined
}

export const getEmail = (location: Location | null) => {
  if (location) {
    return EMAIL[location]
  } else {
    return EMAIL.SUPPORT // Default email
  }
}

export const getPhone = (location: Location | null) => {
  if (location) {
    return PHONE[location]
  } else {
    return PHONE.MYRTLE_BEACH // Default phone
  }
}

export const getState = (location: Location | null) => {
  if (location) {
    return LOCATIONS[location].state
  } else {
    return LOCATIONS.MYRTLE_BEACH.state // Default state
  }
}

export const getUrl = (location: Location | null) => {
  if (location) {
    return ROUTES.LOCATIONS[location].href
  } else {
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
