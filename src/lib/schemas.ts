import { z } from 'zod'

export const ZipCodeSchema = z.coerce.string().regex(/^\d{5}$/)
export type ZipCode = z.infer<typeof ZipCodeSchema>
export const isZipCode = (value: string): value is ZipCode =>
  ZipCodeSchema.safeParse(value).success
