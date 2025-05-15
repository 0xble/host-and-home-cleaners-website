'use client'

import type { BaseStepProps, BookingFormState, BookingFrequency } from '@/app/book/types'
import { tz } from '@date-fns/tz'
import { addDays, format, isBefore, parse } from 'date-fns'
import { round } from 'remeda'
import { StepLayout } from '@/app/book/components/StepLayout'
import { PRICING_PARAMETERS } from '@/app/book/constants'
import { useStepValidation } from '@/app/book/hooks/useStepValidation'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { LOCATIONS } from '@/lib/constants'

export function ScheduleStep({ form, onValidityChangeAction }: BaseStepProps) {
  const { watch, setValue, getValues } = form
  const selectedDate = watch('date') as BookingFormState['date']
  const selectedServiceCategory = watch('serviceCategory') as BookingFormState['serviceCategory']

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
                onSelect={(date) => {
                  if (!date)
                    return

                  const { location } = getValues()
                  field.onChange(format(date, 'yyyy-MM-dd', { in: tz(LOCATIONS[location].timezone) }))
                }}
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
                    <SelectItem value="9:00AM - 10:00AM">9:00AM - 10:00AM</SelectItem>
                    <SelectItem value="1:00PM - 2:00PM">1:00PM - 2:00PM</SelectItem>
                    <SelectItem value="3:00PM - 4:00PM">3:00PM - 4:00PM</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {selectedServiceCategory && PRICING_PARAMETERS[selectedServiceCategory]?.frequencies && (
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
                    {Object.entries(PRICING_PARAMETERS[selectedServiceCategory].frequencies!)
                      .sort(([, discountA], [, discountB]) => discountB - discountA) // Sort by discount in descending order
                      .map(([frequency, discount]) => (
                        <SelectItem key={frequency} value={frequency}>
                          <div className="flex items-center justify-between w-full">
                            <span>{frequency === 'biweekly' ? 'Bi-Weekly' : frequency.charAt(0).toUpperCase() + frequency.slice(1)}</span>
                            {frequency !== 'one-time' && (
                              <span className="ml-2 text-neutral-600">
                                {round(discount * 100, 2)}
                                % off
                              </span>
                            )}
                            {frequency === 'biweekly' && (
                              <Badge variant="secondary" className="ml-4">Most popular</Badge>
                            )}
                          </div>
                        </SelectItem>
                      ))}
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
