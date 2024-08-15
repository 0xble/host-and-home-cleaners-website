import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocationsString(
  locations: { name: string; href: string }[]
) {
  return locations
    .map((location, index) =>
      index === locations.length - 1 ? `or ${location.name}` : location.name
    )
    .join(', ')
}
