'use client'

import type { BaseStepProps } from '@/app/book/types'
import { StepLayout } from '@/app/book/components/StepLayout'
import { PRICING_PARAMETERS } from '@/app/book/constants'
import { useStepValidation } from '@/app/book/hooks/useStepValidation'
import { BookingFormOption } from '@/components/BookingFormOption'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const HOURS_OPTIONS = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const

export function HoursSelectionStep({ form, onValidityChangeAction }: BaseStepProps) {
  const { setValue, getValues } = form

  // Use the useStepValidation hook for validation
  useStepValidation(form, onValidityChangeAction, {
    fields: ['pricingParams'],
    customValidation: formData =>
      formData.pricingParams?.type === 'hourly'
      && formData.pricingParams?.hours !== undefined,
  })

  const handleSelectHours = (hours: number) => {
    const { serviceCategory } = getValues()
    const { type } = PRICING_PARAMETERS[serviceCategory]
    if (type === 'hourly') {
      setValue('pricingParams', { type: 'hourly', hours })
    }
    else {
      throw new Error('Expected hourly pricing parameters')
    }
  }

  return (
    <StepLayout
      title="How long do you need us for?"
      description="Choose how many hours you need for your cleaning service."
    >
      <FormField
        control={form.control}
        name="pricingParams.hours"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Hours</FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {HOURS_OPTIONS.map(value => (
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
