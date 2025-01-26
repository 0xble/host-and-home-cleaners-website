import type { SnakeCase } from '0xble/strings'
import S from 'string'

import { BOOKINGKOALA_URL, LOCATIONS, SERVICES } from './constants'

export type Route = {
  name: string
  href: string
  priority: 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
}

export type ServiceRoute = { [_ in keyof typeof SERVICES]: Route }
export type LocationRoute = {
  [location in keyof typeof LOCATIONS]: Route & {
    SERVICE_AREAS: { [_ in Uppercase<SnakeCase<(typeof LOCATIONS)[location]['serviceAreas'][number]>>]: Route }
  }
}

export const ROUTES = {
  HOME: {
    name: 'Home',
    href: '/',
    priority: 1,
    changeFrequency: 'weekly',
  },
  ABOUT: {
    name: 'About',
    href: '/about',
    priority: 0.4,
    changeFrequency: 'monthly',
  },
  CHECKLIST: {
    name: 'Checklist',
    href: '/checklist',
    priority: 0.7,
    changeFrequency: 'monthly',
  },
  APPLY: {
    name: 'Apply',
    href: '/apply',
    priority: 0.6,
    changeFrequency: 'monthly',
  },
  BOOKING: {
    name: 'Booking',
    href: `${BOOKINGKOALA_URL}/booknow`,
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  LOGIN: {
    name: 'Login',
    href: `${BOOKINGKOALA_URL}/login`,
    priority: 0,
    changeFrequency: 'never',
  },
  SERVICES: Object.entries(SERVICES).reduce((acc, [service, name]) => {
    return {
      ...acc,
      [service]: {
        name,
        // Replace "/" with "-" to handle "Move In/Out Cleaning"
        href: `/${S(name).replaceAll('/', '-').slugify()}`,
        priority: 1,
        changeFrequency: 'weekly',
      },
    }
  }, {} as ServiceRoute),
  LOCATIONS: Object.entries(LOCATIONS).reduce((acc, [location, { name, serviceAreas }]) => {
    return {
      ...acc,
      [location]: {
        name,
        href: `/${S(name).slugify()}`,
        priority: 1,
        changeFrequency: 'weekly',
        SERVICE_AREAS: serviceAreas.reduce((acc, area) => {
          return {
            ...acc,
            [S(area).slugify().s.toUpperCase()]: {
              name: area,
              href: `/${S(area).slugify()}`,
              priority: 1,
              changeFrequency: 'weekly',
            },
          }
        }, {}),
      },
    }
  }, {} as LocationRoute),
  LEGAL: {
    PRIVACY_POLICY: {
      name: 'Privacy Policy',
      href: '/privacy',
      priority: 0.1,
      changeFrequency: 'monthly',
    },
    TERMS_OF_SERVICE: {
      name: 'Terms of Service',
      href: '/terms',
      priority: 0.1,
      changeFrequency: 'monthly',
    },
  },
} as const
