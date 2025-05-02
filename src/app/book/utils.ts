import type { BookingCoupon, BookingDiscount, BookingFormData, BookingFrequency, BookingPricingParams, BookingServiceCategory } from '@/app/book/types'
import type { Location } from '@/lib/types'
import { PRICING_PARAMETERS } from '@/app/book/constants'

/**
 * Constructs a formatted address string in two lines:
 * Line 1: Street address with apt/unit
 * Line 2: City, State ZIP
 */
export function constructFullAddress({
  address,
  apt,
  city,
  state,
  zipCode,
}: {
  address?: string
  apt?: string
  city?: string
  state?: string
  zipCode?: string
}): string {
  if (address == null)
    return ''

  // First line: Street address with apt/unit
  const streetLine = apt != null ? `${address}, ${apt}` : address

  // Second line: City, State ZIP (only if we have at least city and state)
  if (city == null || state == null)
    return streetLine

  const locationLine = zipCode != null
    ? `${city}, ${state} ${zipCode}`
    : `${city}, ${state}`

  // Use a special delimiter that we can split on later
  return `${streetLine}|${locationLine}`
}

interface ExtractedAddressComponents {
  city: string | null
  state: string | null
  zipCode: string | null
}

/**
 * Extracts city, state, and ZIP code from Google Places API address components
 * @param addressComponents - The address_components array from Google Places API
 * @returns Object containing city, state, and zipCode (all possibly null if not found)
 */
export function extractAddressComponents(addressComponents: google.maps.GeocoderAddressComponent[]): ExtractedAddressComponents {
  const result: ExtractedAddressComponents = {
    city: null,
    state: null,
    zipCode: null,
  }

  if (addressComponents == null)
    return result

  for (const component of addressComponents) {
    const types = component.types
    if (types.includes('locality')) {
      result.city = component.long_name
    }
    else if (types.includes('administrative_area_level_1')) {
      result.state = component.short_name
    }
    else if (types.includes('postal_code')) {
      result.zipCode = component.short_name
    }
  }

  return result
}

export function calculateDiscount({ type, value, serviceTotal }: BookingDiscount & { serviceTotal: number }): number {
  if (type === 'percentage')
    return serviceTotal * value
  if (type === 'fixed')
    return value
  return 0
}

export interface CalculatePriceParams {
  location: Location
  serviceCategory: BookingServiceCategory
  frequency: BookingFrequency
  params: BookingPricingParams
  coupon?: BookingCoupon | null
  taxes?: number
}

export function calculatePrice({
  location,
  serviceCategory,
  frequency,
  params,
  coupon,
  taxes = 0,
}: CalculatePriceParams): BookingFormData['price'] {
  const config = PRICING_PARAMETERS[serviceCategory]
  let serviceTotal: number
  switch (config.type) {
    case 'flat': {
      if (params.type !== 'flat')
        throw new Error('Mismatch pricing types')
      const flatTotal = config.bedrooms[location][params.bedrooms]
      if (typeof flatTotal !== 'number') {
        throw new TypeError(`Invalid bedrooms pricing parameter ${params.bedrooms} for ${serviceCategory}`)
      }
      serviceTotal = flatTotal
      break
    }
    case 'hourly': {
      if (params.type !== 'hourly')
        throw new Error('Mismatch pricing types')
      serviceTotal = config.hourlyRate[location] * params.hours
      break
    }
    default: {
      throw new Error('Unsupported pricing type')
    }
  }

  const discount = coupon ? calculateDiscount({ serviceTotal, ...coupon.discount }) : 0
  const totalInitial = serviceTotal - discount
  const recurringDiscount = frequency !== 'one-time' ? config.frequencies ? serviceTotal * config.frequencies[frequency] : 0 : null
  const totalRecurring = frequency !== 'one-time' && recurringDiscount != null ? serviceTotal - recurringDiscount : null

  return {
    serviceTotal,
    coupon: coupon ?? null,
    recurringDiscount,
    totalInitial,
    totalRecurring,
    taxes,
  }
}
