import type { BookingServiceCategory, PricingParams } from '@/app/book/types'

export const PRICING_PARAMETERS: Readonly<Record<BookingServiceCategory, PricingParams>> = {
  'deep-clean': {
    type: 'flat',
    bedrooms: {
      MYRTLE_BEACH: {
        1: 217,
        2: 267,
        3: 327,
        4: 482,
      },
      HONOLULU: {
        1: 263.33,
        2: 374.44,
        3: 474.44,
        4: 707.78,
      },
      // TODO: Update with real York pricing
      YORK: {
        1: 217,
        2: 267,
        3: 327,
        4: 482,
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
        1: 242.5,
        2: 324,
        3: 432,
        4: 562,
      },
      HONOLULU: {
        1: 326.67,
        2: 486.11,
        3: 637.78,
        4: 873.33,
      },
      // TODO: Update with real York pricing
      YORK: {
        1: 242.5,
        2: 324,
        3: 432,
        4: 562,
      },
    },
  },
  'custom': {
    type: 'hourly',
    hourlyRate: {
      MYRTLE_BEACH: 61,
      HONOLULU: 82,
      YORK: 61, // TODO: Update with real York hourly rate
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
      YORK: 61, // TODO: Update with real York hourly rate
    },
    frequencies: {
      'one-time': 0,
      'weekly': 0.2,
      'biweekly': 0.15,
      'monthly': 0.1,
    },
  },
}
