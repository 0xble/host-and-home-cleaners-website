import type { SocialLink, SocialPlatform } from './types'

export const BUSINESS_NAME = 'Host & Home Cleaners'
export const TAGLINE = '100% satisfaction guaranteed, or we\'ll redo it for FREE'
export const URL = 'hostandhomecleaners.com'
export const PHONE = {
  MYRTLE_BEACH: {
    formatted: '+1 (843) 350-5553',
    plain: '8433505553',
  },
  HONOLULU: {
    formatted: '+1 (808) 204-4775',
    plain: '8082044775',
  },
} as const
export const EMAIL = {
  SUPPORT: `support@${URL}`,
  MYRTLE_BEACH: `myrtlebeach@${URL}`,
  HONOLULU: `honolulu@${URL}`,
} as const

export const CHECKLIST_NAME = 'Host & Home 72-point Checklist™'
export const BOOKINGKOALA_URL = 'https://hostandhomecleaners.bookingkoala.com'

export const SERVICES = {
  STANDARD: 'Standard Cleaning',
  DEEP: 'Deep Cleaning',
  MOVE_IN_OUT: 'Move In/Out Cleaning',
  VACATION_RENTAL: 'Vacation Rental Cleaning',
} as const

export const LOCATIONS = {
  MYRTLE_BEACH: {
    name: 'Myrtle Beach',
    serviceAreas: ['Myrtle Beach', 'North Myrtle Beach', 'Surfside Beach', 'Garden City', 'Murrells Inlet', 'Conway'] as const,
  },
  HONOLULU: {
    name: 'Honolulu',
    serviceAreas: ['Honolulu', 'Waikiki', 'Ala Moana', 'Kakaako', 'Makiki', 'Manoa', 'Kaimuki', 'Kahala', 'Kapahulu', 'Waialae', 'Palolo', 'Aina Haina', 'Hawaii Kai', 'Nuuanu', 'Kalihi', 'Moanalua', 'Salt Lake'] as const,
  },
} as const

export type LocationKey = keyof typeof LOCATIONS
export type Location = typeof LOCATIONS[LocationKey]

export const SOCIAL_LINKS: Record<SocialPlatform, SocialLink> = {
  Facebook: {
    name: 'Facebook',
    href: {
      MYRTLE_BEACH: 'https://www.facebook.com/hostandhomecleanersmyrtlebeach',
      HONOLULU: 'https://www.facebook.com/hostandhomecleanershonolulu',
    },
  },
  Instagram: {
    name: 'Instagram',
    href: {
      MYRTLE_BEACH: 'https://www.instagram.com/hostandhomecleanersmyrtlebeach',
      HONOLULU: 'https://www.instagram.com/hostandhomecleanershonolulu',
    },
  },
  Google: {
    name: 'Google',
    href: {
      MYRTLE_BEACH: 'https://g.page/r/Ce4kwohQ6LUrEAI',
      HONOLULU: 'https://g.page/r/Ca7w1RSnJY2nEAE',
    },
  },
  Yelp: {
    name: 'Yelp',
    href: {
      MYRTLE_BEACH: 'https://www.yelp.com/biz/host-and-home-cleaners-myrtle-beach-3',
      HONOLULU: 'https://www.yelp.com/biz/host-and-home-cleaners-honolulu-urban-honolulu-5',
    },
  },
  Nextdoor: {
    name: 'Nextdoor',
    href: {
      MYRTLE_BEACH: 'https://nextdoor.com/pages/pristine-maid-cleaning-myrtle-beach-sc',
      HONOLULU: 'https://nextdoor.com/pages/host-home-cleaners-honolulu-honolulu-hi',
    },
  },
}
