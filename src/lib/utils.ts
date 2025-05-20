import type { ClassValue } from 'clsx'
import type { Location } from '@/lib/types'

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { EMAIL, LOCATIONS, PHONE } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_APP_URL != null) {
    return process.env.NEXT_PUBLIC_APP_URL
  }

  if (
    process.env.NODE_ENV === 'production'
    && process.env.VERCEL_PROJECT_PRODUCTION_URL != null
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (process.env.VERCEL_URL != null) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'https://localhost:3000'
}

export interface GetLocationOptions {
  zipCode?: string
  href?: string
}
export function getLocation(options: GetLocationOptions): Location | undefined {
  if (options.zipCode != null) {
    for (const [location, locationData] of Object.entries(LOCATIONS)) {
      const zipCodes = locationData.zipCodes as readonly string[]
      if (zipCodes.includes(options.zipCode)) {
        return location as Location
      }
    }
  }
  else if (options.href != null) {
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

export function formatPrice(value: number | string, options: Intl.NumberFormatOptions = {}) {
  const n = typeof value === 'string' ? Number.parseFloat(value) : value
  const formattedNumber = Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2, ...options })
  return n < 0 ? `-$${formattedNumber}` : `$${formattedNumber}`
}

export function roundToEvenDown(num: number) {
  return Math.floor(num / 2) * 2
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function constantCase(text: string): string {
  return text
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Convert camelCase to snake_case
    .replace(/[^a-z0-9]+/gi, '_') // Replace any non-alphanumeric chars with underscore
    .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
    .toUpperCase() // Convert to uppercase
}
