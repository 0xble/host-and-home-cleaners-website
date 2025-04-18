import { LOCATIONS } from './constants'

export interface Phone {
  formatted: string
  plain: string
}

export type Location = keyof typeof LOCATIONS
export const isLocation = (value: unknown): value is Location => Object.keys(LOCATIONS).includes(value as string)

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

export type Frequency = 'one-time' | 'weekly' | 'biweekly' | 'monthly'

export type ServiceCategory = 'Default' | 'Move In/Out' | 'Custom Areas Only' | 'Mansion'

export interface FlatPricingData {
  type: 'flat'
  bedrooms: Record<number, number>
  frequencies?: Record<Frequency, number>
}

export interface HourlyPricingData {
  type: 'hourly'
  hourlyRate: number
  frequencies: Record<Frequency, number>
}

export interface BookingFormData {
  serviceCategory: ServiceCategory
  bedrooms: number
  hours?: number
  frequency: Frequency
  date: Date
  arrivalWindow: string
  customer: {
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zipCode: string
  }
  location: Location
  price: {
    firstCleaning: number
    recurring?: number
  }
}

export type ArrivalWindow = '8:00AM - 9:00AM' | '12:00PM - 1:00PM' | '3:00PM - 4:00PM'
