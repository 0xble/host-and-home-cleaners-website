import type { BookingFlatPricingParams, BookingFrequency, BookingServiceCategory } from '@/app/book/types'
import type { Location, SocialLink, SocialPlatform } from './types'
import { z } from 'zod'

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

export type ServiceKey = keyof typeof SERVICES

export interface ServiceInclusion {
  name: string
  services: Record<ServiceKey, boolean>
}

export interface ServiceInclusions {
  title: string
  inclusions: ServiceInclusion[]
}

export const SERVICE_CHECKLIST: Record<string, ServiceInclusions> = {
  LIVING_ROOMS: {
    title: 'Living Rooms / Bedrooms / Hallways',
    inclusions: [
      {
        name: 'Removing cobwebs from ceiling',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dust ceiling fans & lighting fixtures',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dusting & wiping of windowsills & blinds',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Clean windowpanes inside',
        services: {
          STANDARD: false,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dusting & cleaning off of shelves, ledges, desk, & other surfaces',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Feather dust wall art, furniture, & objects',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: false,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dusting of TV, monitors, & other electronics',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: false,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dusting & wiping of light switches',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dusting of door frames',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Clean / wipe mirrors & glass items',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Hand detailing & cleaning of exposed baseboards',
        services: {
          STANDARD: false,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Checking / bagging garbage or trash under beds',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: false,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Change linens / make beds (linens must be provided)',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: false,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Remove trash & replace trash can liners (liners must be provided)',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: false,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Sweep & mop all flooring (hard wood, tile flooring, etc.)',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Vacuuming of carpet flooring & around furniture',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Vacuuming out of closets',
        services: {
          STANDARD: false,
          DEEP: false,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Vacuum / clean inside furniture',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: false,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Set / stage living room items',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: false,
          VACATION_RENTAL: true,
        },
      },
    ],
  },
  BATHROOMS: {
    title: 'Bathrooms',
    inclusions: [
      {
        name: 'Removing cobwebs from ceiling',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dust reachable vents',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dust ceiling fans & light fixtures',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dusting & wiping of windowsills & blinds',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Clean windowpanes inside',
        services: {
          STANDARD: false,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dusting & cleaning off of shelves, ledges, desk, & other surfaces',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Feather dust wall art & dust around objects',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: false,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dusting & wiping of light switches',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dusting of door frames',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Cleaning of shower & or tub',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Wipe, clean & dry sink / faucets',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Cleaning of inside, outside, and around toilet',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Hand detailing & cleaning of baseboards',
        services: {
          STANDARD: false,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Spot check walls',
        services: {
          STANDARD: false,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Wipe mirrors & glass items',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Clean inside of cabinets & drawers',
        services: {
          STANDARD: false,
          DEEP: false,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Clean exterior of cabinets & drawers',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Remove trash & replace trash can liners',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: false,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Sweep & mop all flooring (hardwood, tile flooring, etc.)',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
    ],
  },
  KITCHEN: {
    title: 'Kitchen',
    inclusions: [
      {
        name: 'Removing cobwebs from ceiling',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dust reachable vents',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dust ceiling fans & light fixtures',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dusting & wiping of windowsills & blinds',
        services: {
          STANDARD: false,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Cleaning of windowpanes insdes',
        services: {
          STANDARD: false,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dusting & cleaning off of shelves, ledges, desk & other surfaces',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Feather dust wall art & dust around objects',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: false,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dusting & wiping of light switches',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dusting of door frames',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Cleaning of the inside of microwaves',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Clean inside of fridge, freezer, & stove',
        services: {
          STANDARD: false,
          DEEP: false,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Cleaning of stove tops',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Clean hood vents',
        services: {
          STANDARD: false,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Clean exterior surfaces of fridge, stove, microwave, dishwasher',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Clean inside of cabinet & drawers',
        services: {
          STANDARD: false,
          DEEP: false,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Clean exterior of cabinet fronts & drawer fronts',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Removing of items from counter tops & cleaning all counter tops',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: false,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Wipe, clean & dry sink / faucets',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Wipe mirrors and glass items',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Sweep & mop all flooring (hardwood / tile flooring etc.)',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Hand detailing & cleaning of exposed baseboards',
        services: {
          STANDARD: false,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Spot check walls',
        services: {
          STANDARD: false,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Remove trash & replace trash can liners',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: false,
          VACATION_RENTAL: true,
        },
      },
    ],
  },
  EXTRA_ROOMS: {
    title: 'Extra Rooms (Laundry, Office, etc.)',
    inclusions: [
      {
        name: 'Removing of cobwebs throughout',
        services: {
          STANDARD: false,
          DEEP: false,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Dust & wipe down outside of washer & dryer',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Cleaning of inside glass doorways & windows',
        services: {
          STANDARD: false,
          DEEP: false,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Picking up & bagging of trash',
        services: {
          STANDARD: true,
          DEEP: true,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Sweeping of complete flooring',
        services: {
          STANDARD: false,
          DEEP: false,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Mopping of tile flooring',
        services: {
          STANDARD: false,
          DEEP: false,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
      {
        name: 'Vacuuming of carpet flooring',
        services: {
          STANDARD: false,
          DEEP: false,
          MOVE_IN_OUT: true,
          VACATION_RENTAL: true,
        },
      },
    ],
  },
}

export const LOCATIONS = {
  MYRTLE_BEACH: {
    id: 'c202ac2d56404655ba4620ec3e1dcf62',
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
    id: '5ae41ba1a59649679c18d2a77062fea8',
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

const PricingParamsSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('flat'),
    bedrooms: z.custom<{ [_ in BookingFlatPricingParams['bedrooms']]: number }>(),
    frequencies: z.custom<{ [_ in BookingFrequency]: number }>().optional(),
  }),
  z.object({
    type: z.literal('hourly'),
    hourlyRate: z.number(),
    frequencies: z.custom<{ [_ in BookingFrequency]: number }>().optional(),
  }),
])
type PricingParams = z.infer<typeof PricingParamsSchema>

export const PRICING_PARAMETERS: Readonly<Record<Location, Record<BookingServiceCategory, PricingParams>>> = {
  MYRTLE_BEACH: {
    'default': {
      type: 'flat',
      bedrooms: {
        1: 149,
        2: 179,
        3: 209,
        4: 239,
      },
      frequencies: {
        'one-time': 0,
        'weekly': 0.6,
        'biweekly': 0.5,
        'monthly': 0.3,
      },
    },
    'move-in-out': {
      type: 'flat',
      bedrooms: {
        1: 229,
        2: 269,
        3: 309,
        4: 349,
      },
    },
    'custom': {
      type: 'hourly',
      hourlyRate: 65,
      frequencies: {
        'one-time': 0,
        'weekly': 0.2,
        'biweekly': 0.15,
        'monthly': 0.1,
      },
    },
    'mansion': {
      type: 'hourly',
      hourlyRate: 75,
      frequencies: {
        'one-time': 0,
        'weekly': 0.2,
        'biweekly': 0.15,
        'monthly': 0.1,
      },
    },
  },
  HONOLULU: {
    'default': {
      type: 'flat',
      bedrooms: {
        1: 169,
        2: 199,
        3: 239,
        4: 279,
      },
      frequencies: {
        'one-time': 0,
        'weekly': 0.6,
        'biweekly': 0.5,
        'monthly': 0.3,
      },
    },
    'move-in-out': {
      type: 'flat',
      bedrooms: {
        1: 259,
        2: 299,
        3: 339,
        4: 379,
      },
    },
    'custom': {
      type: 'hourly',
      hourlyRate: 75,
      frequencies: {
        'one-time': 0,
        'weekly': 0.2,
        'biweekly': 0.15,
        'monthly': 0.1,
      },
    },
    'mansion': {
      type: 'hourly',
      hourlyRate: 85,
      frequencies: {
        'one-time': 0,
        'weekly': 0.2,
        'biweekly': 0.15,
        'monthly': 0.1,
      },
    },
  },
}
