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
    state: 'South Carolina',
    stateAbbrev: 'SC',
    serviceAreas: [
      'Myrtle Beach',
      'North Myrtle Beach',
      'Conway',
      'Surfside Beach',
      'Murrells Inlet',
      'Garden City',
    ] as const,
    zipCodes: [
      '29527',
      '29526',
      '29579',
      '29588',
      '29575',
      '29577',
      '29572',
      '29568',
      '29566',
      '29582',
      '28467',
      '29576',
      '29585',
      '29440',
      '29554',
      '29569',
    ] as const,
  },
  HONOLULU: {
    name: 'Honolulu',
    state: 'Hawaii',
    stateAbbrev: 'HI',
    serviceAreas: [
      'Honolulu',
      'Waikiki',
      'Ala Moana',
      'Kaka\'ako',
      'Manoa',
      'Kaimuki',
      'Kapahulu',
      'Kalihi',
      'Moanalua',
      'Salt Lake',
      'Hawaii Kai',
      'Kahala',
      'Nuuanu',
      'Makiki',
      'Palolo',
      'Aina Haina',
      'Waialae',
    ] as const,
    zipCodes: [
      '96801',
      '96802',
      '96803',
      '96804',
      '96805',
      '96806',
      '96807',
      '96808',
      '96809',
      '96810',
      '96811',
      '96812',
      '96813',
      '96814',
      '96815',
      '96816',
      '96817',
      '96818',
      '96819',
      '96820',
      '96821',
      '96822',
      '96823',
      '96824',
      '96825',
      '96826',
      '96828',
      '96830',
      '96835',
      '96836',
      '96837',
      '96838',
      '96839',
      '96840',
      '96841',
      '96843',
      '96844',
      '96846',
      '96847',
      '96848',
      '96849',
      '96850',
    ] as const,
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
