import { z } from 'zod'

export const BookingFrequencySchema = z.enum(['one-time', 'weekly', 'biweekly', 'monthly'])
export type BookingFrequency = z.infer<typeof BookingFrequencySchema>

export const BookingServiceCategorySchema = z.enum(['default', 'move-in-out', 'custom', 'mansion'])
export type BookingServiceCategory = z.infer<typeof BookingServiceCategorySchema>

export const BookingArrivalWindowSchema = z.enum(['8:00AM - 9:00AM', '12:00PM - 1:00PM', '3:00PM - 4:00PM'])
export type BookingArrivalWindow = z.infer<typeof BookingArrivalWindowSchema>

export const BookingFlatPricingParamsSchema = z.object({
  type: z.literal('flat'),
  bedrooms: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
})
export type BookingFlatPricingParams = z.infer<typeof BookingFlatPricingParamsSchema>

export const BookingHourlyPricingParamsSchema = z.object({
  type: z.literal('hourly'),
  hours: z.union([
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
    z.literal(7),
    z.literal(8),
    z.literal(9),
    z.literal(10),
    z.literal(11),
    z.literal(12),
  ]),
})
export type BookingHourlyPricingParams = z.infer<typeof BookingHourlyPricingParamsSchema>

export const BookingPricingParamsSchema = z.discriminatedUnion('type', [BookingFlatPricingParamsSchema, BookingHourlyPricingParamsSchema])
export type BookingPricingParams = z.infer<typeof BookingPricingParamsSchema>
