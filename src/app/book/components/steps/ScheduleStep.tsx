'use client'

import type { BaseStepProps, BookingFrequency } from '../../types'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { addDays, isBefore } from 'date-fns'
import { useStepValidation } from '../../hooks/useStepValidation'
import { StepLayout } from '../StepLayout'

export function ScheduleStep({ form, onValidityChangeAction }: BaseStepProps) {
  const { watch, setValue } = form
  const selectedDate = watch('date')
  const selectedServiceCategory = watch('serviceCategory')
  const selectedPricingParams = watch('pricingParams')

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
                selected={selectedDate || undefined}
                onSelect={date => date && field.onChange(date)}
                disabled={isDateDisabled}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {selectedDate && (
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
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
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
