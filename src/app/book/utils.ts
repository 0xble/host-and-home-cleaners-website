import { type PricingParams } from "@/lib/constants"
import type { BookingServiceCategory, BookingFrequency, BookingPricingParams, BookingFormData } from "./types"

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
  address?: string;
  apt?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}): string {
  if (!address) return '';

  // First line: Street address with apt/unit
  const streetLine = apt ? `${address}, ${apt}` : address;

  // Second line: City, State ZIP (only if we have at least city and state)
  if (!city || !state) return streetLine;

  const locationLine = zipCode
    ? `${city}, ${state} ${zipCode}`
    : `${city}, ${state}`;

  // Use a special delimiter that we can split on later
  return `${streetLine}|${locationLine}`;
}

interface ExtractedAddressComponents {
  city: string | null;
  state: string | null;
  zipCode: string | null;
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
  };

  if (!addressComponents) return result;

  for (const component of addressComponents) {
    const types = component.types;
    if (types.includes('locality')) {
      result.city = component.long_name;
    } else if (types.includes('administrative_area_level_1')) {
      result.state = component.short_name;
    } else if (types.includes('postal_code')) {
      result.zipCode = component.short_name;
    }
  }

  return result;
}

export function calculatePrice(
  serviceCategory: BookingServiceCategory,
  frequency: BookingFrequency,
  params: BookingPricingParams,
  config: PricingParams,
  discount: number = 0,
  taxes: number = 0,
): BookingFormData['price'] {
  let serviceTotal: number;
  switch (config.type) {
    case 'flat': {
      if (params.type !== 'flat') throw new Error('Mismatch pricing types')
      const flatTotal = config.bedrooms[params.bedrooms]
      if (typeof flatTotal !== 'number') {
        throw new Error(`Invalid bedrooms pricing parameter ${params.bedrooms} for ${serviceCategory}`)
      }
      serviceTotal = flatTotal
      break
    }
    case 'hourly': {
      if (params.type !== 'hourly') throw new Error('Mismatch pricing types')
      serviceTotal = config.hourlyRate * params.hours
      break
    }
    default: {
      throw new Error('Unsupported pricing type')
    }
  }

  const totalInitial = serviceTotal - discount
  const recurringDiscount = config.frequencies ?  serviceTotal * config.frequencies[frequency] : 0
  const totalRecurring = totalInitial - recurringDiscount

  return {
    serviceTotal,
    discount,
    recurringDiscount,
    totalInitial,
    totalRecurring,
    taxes,
  }
}
