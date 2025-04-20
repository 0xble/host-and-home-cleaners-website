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