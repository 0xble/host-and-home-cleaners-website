import { z } from 'zod'
import { LocationSchema } from '@/lib/types'
import { LOCATIONS } from '@/lib/constants'
import { BookingServiceCategorySchema, BookingFrequencySchema, BookingArrivalWindowSchema, BookingPricingParamsSchema } from '../types'

export const BookingFormValidationSchema = z.object({
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

export type BookingFormValid = z.infer<typeof BookingFormValidationSchema>