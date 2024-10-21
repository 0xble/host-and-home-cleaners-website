import { LOCATIONS } from './constants'

export type Phone = {
  formatted: string
  plain: string
}

export type Location = keyof typeof LOCATIONS
export const isLocation = (value: unknown): value is Location => Object.keys(LOCATIONS).includes(value as string)

export type ServiceAreas = (typeof LOCATIONS)[keyof typeof LOCATIONS]['serviceAreas']
export const isServiceAreas = (value: unknown): value is ServiceAreas => Object.values(LOCATIONS).some((location: { serviceAreas: readonly string[] }) => location.serviceAreas.includes(value as string))

export type ServiceArea = ServiceAreas[number]
export const isServiceArea = (value: unknown): value is ServiceArea => isServiceAreas(value)
