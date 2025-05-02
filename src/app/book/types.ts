import type { Location } from '@/lib/types'
import type { UseFormReturn } from 'react-hook-form'
import { LOCATIONS } from '@/lib/constants'
import { LocationSchema } from '@/lib/types'
import { tz } from '@date-fns/tz'
import { addMonths, format, startOfMonth } from 'date-fns'
import { z } from 'zod'

export const BookingCouponCodeSchema = z.enum(['SPRING10'])
export type BookingCouponCode = z.infer<typeof BookingCouponCodeSchema>

export const BookingDiscountSchema = z.object({
  type: z.enum(['percentage', 'fixed']),
  value: z.number(),
})
export type BookingDiscount = z.infer<typeof BookingDiscountSchema>

export const BookingCouponSchema = z.object({
  discount: BookingDiscountSchema,
  description: z.string().optional(),
})
export type BookingCoupon = z.infer<typeof BookingCouponSchema>

export const COUPONS: Record<BookingCouponCode, BookingCoupon> = {
  SPRING10: {
    discount: {
      type: 'percentage',
      value: 0.1,
    },
    description: (() => {
      const now = new Date()
      const nextMonth = addMonths(now, 1)
      const firstOfNextMonth = startOfMonth(nextMonth, { in: tz('America/Los_Angeles') })
      return `Saving 10% off for our Spring Cleaning Sale! Until ${format(firstOfNextMonth, 'MMMM do', { in: tz('America/Los_Angeles') })}.`
    })(),
  },
}

export const BookingServiceCategorySchema = z.enum(['deep-clean', 'move-in-out', 'custom', 'mansion'])
export type BookingServiceCategory = z.infer<typeof BookingServiceCategorySchema>

export const BookingFrequencySchema = z.enum(['one-time', 'weekly', 'biweekly', 'monthly'])
export type BookingFrequency = z.infer<typeof BookingFrequencySchema>

export const BookingArrivalWindowSchema = z.enum(['9:00AM - 10:00AM', '1:00PM - 2:00PM', '3:00PM - 4:00PM'])
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

export const BookingPriceDetailsSchema = z.object({
  serviceTotal: z.number(),
  totalInitial: z.number(),
  totalRecurring: z.number().nullable(),
  recurringDiscount: z.number().nullable(),
  coupon: BookingCouponSchema.nullable(),
  taxes: z.number().nullable(),
})
export type BookingPriceDetails = z.infer<typeof BookingPriceDetailsSchema>

// Used for booking form validation
export const BookingFormSchema = z.object({
  location: LocationSchema,
  serviceCategory: BookingServiceCategorySchema,
  frequency: BookingFrequencySchema,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
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
        zip => Object.values(LOCATIONS).some(
          location => (location as unknown as { zipCodes: string[] }).zipCodes.includes(zip),
        ),
        'It looks like you may be outside of our service area? 😢 Please check to make sure the ZIP code is correct!',
      ),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }),
  payment: z.object({
    cardNumber: z.string().min(16, 'Card number is required'),
    expiration: z.string().min(5, 'Expiration date is required'),
    cvv: z.string().min(3, 'CVV is required'),
    zip: z.string().min(5, 'ZIP code is required'),
  }),
  pricingParams: BookingPricingParamsSchema,
  price: BookingPriceDetailsSchema,
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
  CONFIRMATION = 9,
}

export interface BaseStepProps {
  form: UseFormReturn<BookingFormData>
  currentStep: BookingStep
  location: Location | undefined
  isSubmitting?: boolean
  onSubmit?: (e: React.MouseEvent<HTMLButtonElement>) => void
  setCurrentStep: (step: BookingStep) => void
  onValidityChangeAction: (isValid: boolean) => void
}

export const PricingParamsBaseSchema = z.object({
  type: z.string(),
  frequencies: z.custom<{ [_frequency in BookingFrequency]: number }>().optional(),
})

export const FlatPricingParamsSchema = PricingParamsBaseSchema.extend({
  type: z.literal('flat'),
  bedrooms: z.custom<{ [_location in Location]: { [_bedrooms in BookingFlatPricingParams['bedrooms']]: number } }>(),
})
export type FlatPricingParams = z.infer<typeof FlatPricingParamsSchema>

export const HourlyPricingParamsSchema = PricingParamsBaseSchema.extend({
  type: z.literal('hourly'),
  hourlyRate: z.custom<{ [_location in Location]: number }>(),
})
export type HourlyPricingParams = z.infer<typeof HourlyPricingParamsSchema>

export const PricingParamsSchema = z.discriminatedUnion('type', [
  FlatPricingParamsSchema,
  HourlyPricingParamsSchema,
])
export type PricingParams = z.infer<typeof PricingParamsSchema>
