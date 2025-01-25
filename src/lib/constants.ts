import type { ZipCode } from './schemas'

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
export const BOOKINGKOALA_URL = 'https://bookings.hostandhomecleaners.com'

export const SERVICES = {
  STANDARD: 'Standard Cleaning',
  DEEP: 'Deep Cleaning',
  MOVE_IN_OUT: 'Move In/Out Cleaning',
  AIRBNB: 'Airbnb Cleaning',
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
    ],
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
    ] as ZipCode[],
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
    ],
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
    ],
  },
} as const

export type Location = typeof LOCATIONS[keyof typeof LOCATIONS]
export type LocationKey = keyof typeof LOCATIONS
