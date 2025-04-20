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
