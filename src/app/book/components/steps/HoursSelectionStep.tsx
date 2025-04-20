'use client'

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { BookingFormOption } from '@/components/BookingFormOption'
import { StepLayout } from '../StepLayout'
import { useStepValidation } from '../../hooks/useStepValidation'
import type { BaseStepProps } from '../../types'
import { PRICING_PARAMETERS } from '@/lib/constants'
import { calculatePrice } from '../../utils'

const HOURS_OPTIONS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

export function HoursSelectionStep({ form, onValidityChangeAction }: BaseStepProps) {
  const { setValue, getValues } = form

  // Use the useStepValidation hook for validation
  useStepValidation(form, onValidityChangeAction, {
    fields: ['pricingParams'],
    customValidation: (formData) =>
      formData.pricingParams?.type === 'hourly' &&
      formData.pricingParams?.hours !== undefined
  })

  const handleSelectHours = (hours: number) => {
    const { location, serviceCategory, frequency } = getValues()
    const config = PRICING_PARAMETERS[location][serviceCategory]
    if (config.type === 'hourly') {
      setValue('price', calculatePrice(serviceCategory, frequency, { type: 'hourly', hours }, config))
      setValue('pricingParams', { type: 'hourly', hours })
    } else {
      throw new Error('Expected hourly pricing parameters')
    }
  }

  return (
    <StepLayout
      title="Select Service Duration"
      description="Choose how many hours you need for your cleaning service."
    >
      <FormField
        control={form.control}
        name="pricingParams.hours"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Hours</FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
                {HOURS_OPTIONS.map((value) => (
                  <BookingFormOption
                    key={`${value} hours`}
                    isSelected={field.value === value}
                    onClick={() => handleSelectHours(value)}
                  >
                    <span className="text-center font-medium">{`${value} Hours`}</span>
                  </BookingFormOption>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </StepLayout>
  )
}