import { z } from 'zod'
import { LOCATIONS } from '@/lib/constants'

export const LocationSchema = z.enum(Object.keys(LOCATIONS) as [Location, ...Location[]])
export type Location = keyof typeof LOCATIONS
export type LocationData = typeof LOCATIONS[Location]

export interface Phone {
  formatted: string
  plain: string
}

export const isLocation = (value: unknown): value is Location => LocationSchema.options.includes(value as Location)

export type ServiceAreas = (typeof LOCATIONS)[keyof typeof LOCATIONS]['serviceAreas']
export const isServiceAreas = (value: unknown): value is ServiceAreas => Object.values(LOCATIONS).some((location: { serviceAreas: readonly string[] }) => location.serviceAreas.includes(value as string))

export type ServiceArea = ServiceAreas[number]
export const isServiceArea = (value: unknown): value is ServiceArea => isServiceAreas(value)

export type SocialPlatform = 'Facebook' | 'Instagram' | 'Google' | 'Yelp' | 'Nextdoor'
export function isSocialPlatform(value: string): value is SocialPlatform {
  return ['Facebook', 'Instagram', 'Google', 'Yelp', 'Nextdoor'].includes(value)
}

export interface SocialLink {
  name: SocialPlatform
  href: Record<Location, string>
}
