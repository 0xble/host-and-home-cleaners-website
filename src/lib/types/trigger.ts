import type { RecordBookingPayload } from '@/lib/types/bookings'

export interface TriggerTaskOptions {
  idempotencyKey?: string
  queue?: {
    name: string
    concurrencyLimit?: number
  }
  concurrencyKey?: string
  ttl?: string | number
  delay?: string | Date
  tags?: string[]
  machine?: 'micro' | 'small-1x' | 'small-2x' | 'medium-1x' | 'medium-2x' | 'large-1x' | 'large-2x'
}

export interface TriggerTaskPayload<T = any> {
  payload: T
  options?: TriggerTaskOptions
}

export type RecordBookingTaskPayload = TriggerTaskPayload<RecordBookingPayload>
