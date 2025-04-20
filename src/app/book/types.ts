import { z } from 'zod'
import { UseFormReturn } from 'react-hook-form'
import { LocationSchema } from '@/lib/types'
import { LOCATIONS } from '@/lib/constants'

export const BookingServiceCategorySchema = z.enum(['default', 'move-in-out', 'custom', 'mansion'])
export type BookingServiceCategory = z.infer<typeof BookingServiceCategorySchema>

export const BookingFrequencySchema = z.enum(['one-time', 'weekly', 'biweekly', 'monthly'])
export type BookingFrequency = z.infer<typeof BookingFrequencySchema>

export const BookingArrivalWindowSchema = z.enum(['8:00AM - 9:00AM', '12:00PM - 1:00PM', '3:00PM - 4:00PM'])
export type BookingArrivalWindow = z.infer<typeof BookingArrivalWindowSchema>

export const BookingFlatPricingParamsSchema = z.object({
  type: z.literal('flat'),
  bedrooms: z.number().min(1).max(4),
})

export const BookingHourlyPricingParamsSchema = z.object({
  type: z.literal('hourly'),
  hours: z.number().min(3).max(12),
})

export type BookingFlatPricingParams = z.infer<typeof BookingFlatPricingParamsSchema>
export type BookingHourlyPricingParams = z.infer<typeof BookingHourlyPricingParamsSchema>

export const BookingPricingParamsSchema = z.discriminatedUnion('type', [
  BookingFlatPricingParamsSchema,
  BookingHourlyPricingParamsSchema,
])
export type BookingPricingParams = z.infer<typeof BookingPricingParamsSchema>

// Used for booking form validation
export const BookingFormSchema = z.object({
  location: LocationSchema,
  serviceCategory: BookingServiceCategorySchema,
  frequency: BookingFrequencySchema,
  date: z.date(),
  arrivalWindow: BookingArrivalWindowSchema,
  customer: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number is required'),
    address: z.string().min(1, 'Address is required'),
    apt: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string()
      .min(5, 'ZIP code is required')
      .refine(
        (zip) => Object.values(LOCATIONS).some(
          location => (location as unknown as { zipCodes: string[] }).zipCodes.includes(zip)
        ),
        'Sorry, looks like we\'re not in your area. Please try another ZIP code.'
      ),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }),
  pricingParams: BookingPricingParamsSchema,
  price: z.object({
    initial: z.number(),
    recurring: z.number().nullable().optional(),
  }),
})

export type BookingFormData = z.infer<typeof BookingFormSchema>
export type BookingFormState = Partial<BookingFormData>

export enum BookingStep {
  GETTING_STARTED = 0,
  CHOOSE_YOUR_SERVICE = 1,
  SERVICE_SELECTION = 2,
  TELL_US_ABOUT_YOUR_PLACE = 3,
  SIZE_SELECTION = 4,
  HOURS_SELECTION = 5,
  CUSTOMER_DETAILS = 6,
  ADDRESS_INPUT = 7,
  SCHEDULE = 8,
  // CONFIRMATION = 9,
}

export interface BaseStepProps {
  form: UseFormReturn<BookingFormData>
  currentStep: BookingStep
  setCurrentStep: (step: BookingStep) => void
  onValidityChangeAction: (isValid: boolean) => void
  isGoogleMapsLoaded?: boolean
}
