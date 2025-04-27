'use client'

import type { BaseStepProps, BookingFormState, BookingFrequency } from '@/app/book/types'
import { StepLayout } from '@/app/book/components/StepLayout'
import { useStepValidation } from '@/app/book/hooks/useStepValidation'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LOCATIONS } from '@/lib/constants'
import { tz } from '@date-fns/tz'
import { addDays, format, isBefore, parse } from 'date-fns'

export function ScheduleStep({ form, location, onValidityChangeAction }: BaseStepProps) {
  const { watch, setValue } = form
  const selectedDate = watch('date') as BookingFormState['date']
  const selectedServiceCategory = watch('serviceCategory') as BookingFormState['serviceCategory']
  const selectedPricingParams = watch('pricingParams') as BookingFormState['pricingParams']

  // Use useStepValidation for validation
  useStepValidation(form, onValidityChangeAction, {
    fields: ['date', 'arrivalWindow'],
    customValidation: formData =>
      formData.serviceCategory === 'move-in-out' || formData.frequency !== undefined,
  })

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Disable past dates
    if (isBefore(date, today)) {
      return true
    }

    // Prevent booking without at least 2 days notice
    const twoDaysFromNow = addDays(today, 2)
    twoDaysFromNow.setHours(0, 0, 0, 0)

    if (!isBefore(date, today) && isBefore(date, twoDaysFromNow)) {
      return true
    }

    return false
  }

  // Update price when frequency changes
  const handleFrequencyChange = (value: BookingFrequency) => {
    setValue('frequency', value)
    if (selectedServiceCategory && selectedPricingParams) {
      // Trigger price update through form state change
      setValue('frequency', value, { shouldTouch: true })
    }
  }

  return (
    <StepLayout
      title="Schedule your cleaning"
      description="Select a date, time, and frequency for your service"
    >
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Calendar
                className="mx-auto rounded-md border"
                mode="single"
                selected={
                  selectedDate != null
                    ? parse(selectedDate, 'yyyy-MM-dd', new Date())
                    : undefined
                }
                onSelect={date => date && field.onChange(format(date, 'yyyy-MM-dd', { in: tz(LOCATIONS[location].timezone) }))}
                disabled={isDateDisabled}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedDate != null && (
          <FormField
            control={form.control}
            name="arrivalWindow"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Arrival Window</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="pointer-events-auto z-20">
                      <SelectValue placeholder="Select an arrival window" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="8:00AM - 9:00AM">8:00AM - 9:00AM</SelectItem>
                    <SelectItem value="12:00PM - 1:00PM">12:00PM - 1:00PM</SelectItem>
                    <SelectItem value="3:00PM - 4:00PM">3:00PM - 4:00PM</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {(selectedServiceCategory && selectedPricingParams && selectedServiceCategory !== 'move-in-out') && (
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frequency</FormLabel>
                <Select
                  onValueChange={handleFrequencyChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="pointer-events-auto z-20">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="weekly">
                      <div className="flex items-center justify-between w-full">
                        <span>Weekly</span>
                        <span className="ml-2 text-neutral-600">60% off</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="biweekly">
                      <div className="flex items-center justify-between w-full">
                        <span>Bi-Weekly</span>
                        <span className="text-neutral-600 ml-2">50% off</span>
                        <Badge variant="secondary" className="ml-4">Most popular</Badge>
                      </div>
                    </SelectItem>
                    <SelectItem value="monthly">
                      <div className="flex items-center justify-between w-full">
                        <span>Monthly</span>
                        <span className="ml-2 text-neutral-600">30% off</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="one-time">One-Time</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </div>
    </StepLayout>
  )
}
