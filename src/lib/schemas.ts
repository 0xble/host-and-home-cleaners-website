import { z } from 'zod'

export const ZipCodeSchema = z.coerce.string().regex(/^\d{5}$/)
export type ZipCode = z.infer<typeof ZipCodeSchema>
export function isZipCode(value: string): value is ZipCode {
  return ZipCodeSchema.safeParse(value).success
}
