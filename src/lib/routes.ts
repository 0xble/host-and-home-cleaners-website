import type { SnakeCase } from '@/types/strings'
import { BOOKINGKOALA_URL, LOCATIONS, SERVICES } from '@/lib/constants'
import { slugify } from '@/lib/utils'

export interface RouteData {
  name: string
  href: string
  priority: 1 | 0.9 | 0.8 | 0.7 | 0.6 | 0.5 | 0.4 | 0.3 | 0.2 | 0.1 | null
  changeFrequency?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
}

export type ServiceRoute = { [_ in keyof typeof SERVICES]: RouteData }
export type LocationRoute = {
  [location in keyof typeof LOCATIONS]: RouteData & {
    SERVICE_AREAS: { [_ in Uppercase<SnakeCase<(typeof LOCATIONS)[location]['serviceAreas'][number]>>]: RouteData }
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
    href: `${BOOKINGKOALA_URL}/booknow/home_cleaning?form_id=1&coupon=FIREWORKS10`,
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  LOGIN: {
    name: 'Login',
    href: `${BOOKINGKOALA_URL}/login`,
    priority: null,
  },
  REVIEW: {
    name: 'Review',
    href: '/review',
    priority: null,
  },
  BOOK: {
    name: 'Book',
    href: '/book',
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  SERVICES: Object.entries(SERVICES).reduce((acc, [service, name]) => {
    return {
      ...acc,
      [service]: {
        name,
        // Replace "/" with "-" to handle "Move In/Out Cleaning"
        href: `/${slugify(name.replaceAll('/', '-'))}`,
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
        href: `/${slugify(name)}`,
        priority: 1,
        changeFrequency: 'weekly',
        SERVICE_AREAS: serviceAreas.reduce((acc, area) => {
          const locationSlug = slugify(name)
          const areaSlug = slugify(area)
          const href = locationSlug === areaSlug ? `/${locationSlug}` : `/${locationSlug}/${areaSlug}`
          return {
            ...acc,
            [slugify(area).toUpperCase().replace(/-/g, '_')]: {
              name: area,
              href,
              priority: 1,
              changeFrequency: 'weekly',
            },
          }
        }, {}),
      },
    }
  }, {} as LocationRoute),
  LEGAL: {
    TERMS_OF_SERVICE: {
      name: 'Terms of Service',
      href: '/terms',
      priority: 0.1,
      changeFrequency: 'monthly',
    },
    PRIVACY_POLICY: {
      name: 'Privacy Policy',
      href: '/privacy',
      priority: 0.1,
      changeFrequency: 'monthly',
    },
  },
  CONFIRMATION: {
    name: 'Thank You',
    href: '/book/confirmation',
    priority: null,
  },
} as const satisfies Record<string, RouteData | Record<string, RouteData>>

export type Route = keyof typeof ROUTES
