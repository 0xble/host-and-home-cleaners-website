import type { Location, SocialLink, SocialPlatform } from '@/lib/types'

export const SITE_NAME = 'Host & Home Cleaners'
export const SITE_DESCRIPTION = 'Host & Home Cleaners offers top-rated professional home cleaning services in Honolulu and Myrtle Beach. Book your trusted, local cleaners today for a spotless and refreshed home.'
// TODO: Change to more specific images instead of using frequently throughout the app
export const SITE_IMAGE = '/assets/featured/home/1.jpg'

export const BUSINESS_NAME = 'Host & Home Cleaners'
export const TAGLINE = '100% satisfaction guaranteed, or we\'ll redo it for FREE'
export const DOMAIN = 'hostandhomecleaners.com'
export const PHONE: Record<Location, { formatted: string, plain: string }> = {
  MYRTLE_BEACH: {
    formatted: '+1 (843) 350-5553',
    plain: '8433505553',
  },
  HONOLULU: {
    formatted: '+1 (808) 204-4775',
    plain: '8082044775',
  },
  YORK: {
    formatted: '+1 (717) 900-5573',
    plain: '7179005573',
  },
} as const
export const EMAIL = {
  SUPPORT: `support@${DOMAIN}`,
  MYRTLE_BEACH: `myrtlebeach@${DOMAIN}`,
  HONOLULU: `honolulu@${DOMAIN}`,
  YORK: `york@${DOMAIN}`,
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
        name: 'Removing accessible cobwebs from ceiling',
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
        name: 'Clean windowpanes (interior only)',
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
        name: 'Vacuum / clean exteriors of furnitures',
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
        name: 'Clean windowpanes (interior only)',
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
        name: 'Wipe down exposed baseboards',
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
        name: 'Clean windowpanes (interior only)',
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
        name: 'Clean glass doorways & windows (interior only)',
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

export interface Bedroom {
  label: string
  maxSqFt: string
  icon: string
}

export const BEDROOMS: ReadonlyMap<number, Bedroom> = new Map([
  [1, { label: 'One Bedroom', maxSqFt: '1,000', icon: 'one-bedroom' }],
  [2, { label: 'Two Bedroom', maxSqFt: '1,500', icon: 'two-bedroom' }],
  [3, { label: 'Three Bedroom', maxSqFt: '2,500', icon: 'three-bedroom' }],
  [4, { label: 'Four Bedroom', maxSqFt: '3,000', icon: 'four-bedroom' }],
])

export const PRICING = {
  MYRTLE_BEACH: {
    standard: 149,
    deep: 217,
    moveInOut: 242,
    vacationRental: 127,
  },
  HONOLULU: {
    standard: 184,
    deep: 236,
    moveInOut: 294,
    vacationRental: 146,
  },
} as const

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
      '29511',
      '29544',
    ] as const,
    timezone: 'America/New_York',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d106194.64630830522!2d-78.8788075!3d33.7197455!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x432592cd81e1d561%3A0x2bb5e85088c224ee!2sPristine%20Maid%20Cleaning!5e0!3m2!1sen!2sus!4v1709048737136!5m2!1sen!2sus',
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
      'Kakaako',
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
      '96371',
      '96477',
      '96701',
      '96706',
      '96707',
      '96712',
      '96717',
      '96730',
      '96731',
      '96734',
      '96744',
      '96759',
      '96762',
      '96782',
      '96786',
      '96789',
      '96791',
      '96792',
      '96795',
      '96797',
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
      '96862',
      '96863',
    ] as const,
    timezone: 'Pacific/Honolulu',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d237770.1723966727!2d-157.869932!3d21.3836454!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c4ce057e4bdff0b%3A0xa78d25a714d5f0ae!2sHost%20%26%20Home%20Cleaners%20Honolulu!5e0!3m2!1sen!2sus!4v1729395012053!5m2!1sen!2sus',
  },
  YORK: {
    id: '1e92fe6126cd808eac63c39af29d4187',
    name: 'York',
    state: 'Pennsylvania',
    stateAbbrev: 'PA',
    // TODO: These were generated by AI; need to be verified
    serviceAreas: [
      'York',
      'West York',
      'North York',
      'East York',
      'Shiloh',
      'Weigelstown',
      'Emigsville',
      'Spry',
      'Dover',
      'Thomasville',
      'New Salem',
      'Jacobus',
      'Loganville',
      'Seven Valleys',
      'Spring Grove',
      'Dallastown',
      'Yoe',
      'Red Lion',
      'Windsor',
      'Hallam',
      'Wrightsville',
      'Mount Wolf',
      'Manchester',
      'York Haven',
      'Glen Rock',
      'Shrewsbury',
      'New Freedom',
      'Stewartstown',
      'Dillsburg',
      'East Berlin',
      'New Oxford',
      'Hanover',
      'Columbia',
    ] as const,
    zipCodes: [
      '17401',
      '17402',
      '17403',
      '17404',
      '17406',
      '17407',
      '17408',
      '17313',
      '17315',
      '17318',
      '17339',
      '17379',
      '17342',
      '17345',
      '17347',
      '17356',
      '17360',
      '17362',
      '17364',
      '17366',
      '17368',
    ] as const,
    timezone: 'America/New_York',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24462.59827083503!2d-76.73113105!3d39.96767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa2728d94ade6b553%3A0x2b75bba40d4e3026!2sHost%20%26%20Home%20Cleaners%20York!5e0!3m2!1sen!2sus!4v1751603550055!5m2!1sen!2sus',
  },
} as const

export const SOCIAL_LINKS: Record<SocialPlatform, SocialLink> = {
  Facebook: {
    name: 'Facebook',
    href: {
      MYRTLE_BEACH: 'https://www.facebook.com/hostandhomecleanersmyrtlebeach',
      HONOLULU: 'https://www.facebook.com/hostandhomecleanershonolulu',
      YORK: 'https://www.facebook.com/hostandhomecleanersyork', // TODO: Verify York Facebook URL
    },
  },
  Instagram: {
    name: 'Instagram',
    href: {
      MYRTLE_BEACH: 'https://www.instagram.com/hostandhomecleanersmyrtlebeach',
      HONOLULU: 'https://www.instagram.com/hostandhomecleanershonolulu',
      YORK: 'https://www.instagram.com/hostandhomecleanersyork', // TODO: Verify York Instagram URL
    },
  },
  Google: {
    name: 'Google',
    href: {
      MYRTLE_BEACH: 'https://g.page/r/Ce4kwohQ6LUrEAI',
      HONOLULU: 'https://g.page/r/Ca7w1RSnJY2nEAE',
      YORK: 'https://maps.app.goo.gl/YiutpieQNWL49zV7A',
    },
  },
  Yelp: {
    name: 'Yelp',
    href: {
      MYRTLE_BEACH: 'https://www.yelp.com/biz/host-and-home-cleaners-myrtle-beach-3',
      HONOLULU: 'https://www.yelp.com/biz/host-and-home-cleaners-honolulu-urban-honolulu-5',
      YORK: 'https://www.yelp.com/biz/host-and-home-cleaners-york', // TODO: Verify York Yelp URL
    },
  },
  Nextdoor: {
    name: 'Nextdoor',
    href: {
      MYRTLE_BEACH: 'https://nextdoor.com/pages/pristine-maid-cleaning-myrtle-beach-sc',
      HONOLULU: 'https://nextdoor.com/pages/host-home-cleaners-honolulu-honolulu-hi',
      YORK: 'https://nextdoor.com/pages/host-home-cleaners-york', // TODO: Verify York Nextdoor URL
    },
  },
}
