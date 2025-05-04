import type { BookingServiceCategory, PricingParams } from '@/app/book/types'

export const PRICING_PARAMETERS: Readonly<Record<BookingServiceCategory, PricingParams>> = {
  'deep-clean': {
    type: 'flat',
    bedrooms: {
      MYRTLE_BEACH: {
        1: 241,
        2: 296,
        3: 441,
        4: 603,
      },
      HONOLULU: {
        1: 263.33,
        2: 374.44,
        3: 474.44,
        4: 707.78,
      },
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
      MYRTLE_BEACH: {
        1: 267,
        2: 360,
        3: 484,
        4: 691,
      },
      HONOLULU: {
        1: 326.67,
        2: 486.11,
        3: 637.78,
        4: 873.33,
      },
    },
  },
  'custom': {
    type: 'hourly',
    hourlyRate: {
      MYRTLE_BEACH: 61,
      HONOLULU: 82,
    },
    frequencies: {
      'one-time': 0,
      'weekly': 0.2,
      'biweekly': 0.15,
      'monthly': 0.1,
    },
  },
  'mansion': {
    type: 'hourly',
    hourlyRate: {
      MYRTLE_BEACH: 61,
      HONOLULU: 82,
    },
    frequencies: {
      'one-time': 0,
      'weekly': 0.2,
      'biweekly': 0.15,
      'monthly': 0.1,
    },
  },
}
