import { NotionDateParsedSchema } from '0xble/notion'
import { NotionBookingsFrequencyOptionSchema, NotionBookingsPaymentMethodOptionSchema, NotionBookingsServiceOptionSchema, NotionBookingsStatusOptionSchema, NotionBookingsTagsOptionSchema, NotionClientsSourceOptionSchema, NotionClientsStatusOptionSchema } from '0xble/notion/types'
import { unique } from 'remeda'
import { z } from 'zod'

export const RecordBookingPayloadSchema = z.object({
  pageId: z.string().optional(),
  upsert: z.boolean().optional(),
  values: z.object({
    id: z.coerce.number().int().optional(),
    status: NotionBookingsStatusOptionSchema.optional(),
    scheduled: z.union([z.string(), NotionDateParsedSchema]).optional(),
    client: z
      .object({
        id: z.coerce.number().int().optional(),
        name: z.string().optional(),
        status: NotionClientsStatusOptionSchema.optional(),
        email: z.string().email().optional(),
        phone: z.string().optional(),
        source: NotionClientsSourceOptionSchema.optional(),
      })
      .optional(),
    frequency: NotionBookingsFrequencyOptionSchema.optional(),
    service: NotionBookingsServiceOptionSchema.optional(),
    notes: z
      .union([
        z.object({
          value: z.string().nullable(),
          append: z.boolean(),
        }),
        z.string(),
      ])
      .optional(),
    keyNote: z
      .union([
        z.object({
          value: z.string().nullable(),
          append: z.boolean(),
        }),
        z.string(),
      ])
      .optional(),
    bookingNote: z
      .union([
        z.object({
          value: z.string().nullable(),
          append: z.boolean(),
        }),
        z.string(),
      ])
      .optional(),
    providerNote: z
      .union([
        z.object({
          value: z.string().nullable(),
          append: z.boolean(),
        }),
        z.string(),
      ])
      .optional(),
    tags: z
      .object({
        value: z.array(NotionBookingsTagsOptionSchema).optional(),
        append: z.boolean(),
      })
      .optional(),
    paymentMethod: NotionBookingsPaymentMethodOptionSchema.optional(),
    bedrooms: z.coerce.number().optional(),
    sqFt: z.string().optional(),
    duration: z.union([
      z.coerce.number().optional(),
      z
        .string()
        .refine(duration => /^\d{2}:\d{2}$/.test(duration), {
          message: 'Invalid duration format. Expected format: HH:MM',
        })
        .transform((duration) => {
          const formattedValue = duration.split(':').map((item: string) => Number(item))
          if (formattedValue[0] != null && formattedValue[1] != null) {
            return formattedValue[0] * 60 + formattedValue[1]
          }
          else {
            throw new Error(`Invalid duration format: ${duration}`)
          }
        }),
    ]),
    adjustedDuration: z.coerce.number().optional(),
    totalPrice: z.coerce.number().optional(),
    finalPrice: z.coerce.number().optional(),
    adjustedPrice: z.coerce.number().optional(),
    providers: z
      .union([
        z.array(
          z.object({
            id: z.coerce.number().int().optional(),
            name: z.string().optional(),
            email: z.string().email().optional(),
            payment: z.coerce.number().optional(),
          }),
        ),
        z.string().transform(ids => (ids ? ids.split(/[,\n]/).map(id => Number(id)) : [])),
      ])
      .optional(),
    providerPayments: z
      .string()
      .transform(payments => payments.split(/[,\n]/).map((amount) => {
        const match = amount.match(/[\d.]+/)
        return match ? Number(match[0]) : 0
      }))
      .optional(),
    tips: z.coerce.number().optional(),
    refund: z.coerce.number().optional(),
    giftcardAmountUsed: z.coerce.number().optional(),
    discountFromFrequency: z.coerce.number().optional(),
    discountFromReferral: z.coerce.number().optional(),
    discountFromCode: z.coerce.number().optional(),
    discountCode: z.string().optional(),
    clockedOut: z.coerce.date().optional(),
    zip: z.string().optional(),
    location: z.string(),
    address: z.object({
      id: z.string().optional(),
      address: z.string().optional(),
      street: z.string().optional(),
      apt: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z.string().optional(),
      coordinates: z.object({
        lat: z.number(),
        lng: z.number(),
      }).optional(),
    }).optional(),
    extras: z.object({
      value: z.array(z.string()).transform(
        extras => unique(extras.map((name) => {
          if (name.match(/dogs? & cats?/i)) {
            return 'Pet hair'
          }
          return name
        })),
      ).optional(),
      append: z.boolean(),
    }).optional(),
    exclusions: z.object({
      value: z.array(z.string()),
      append: z.boolean(),
    }).optional(),
    isFirstBooking: z.boolean().optional(),
    hasCancelledAll: z.union([z.boolean(), z.string().transform(text => text === 'all')]).optional(),
    cancellationReason: z.string().optional(),
    cancellationFee: z.coerce.number().optional(),
    cancelledAt: z.string().optional(),
    createdAt: z.string().optional(),
    createdBy: z.string().optional(),
  }),
})

export type RecordBookingPayload = z.input<typeof RecordBookingPayloadSchema>
