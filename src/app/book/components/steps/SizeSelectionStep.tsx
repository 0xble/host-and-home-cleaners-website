'use client'

import type { BaseStepProps } from '@/app/book/types'
import Image from 'next/image'
import { StepLayout } from '@/app/book/components/StepLayout'
import { PRICING_PARAMETERS } from '@/app/book/constants'
import { useStepValidation } from '@/app/book/hooks/useStepValidation'
import { BookingFormOption } from '@/components/BookingFormOption'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { BEDROOMS } from '@/lib/constants'

export function SizeSelectionStep({ form, onValidityChangeAction }: BaseStepProps) {
  const { setValue, getValues } = form

  // Use the useStepValidation hook for validation
  useStepValidation(form, onValidityChangeAction, {
    fields: ['pricingParams'],
    customValidation: formData =>
      formData.pricingParams?.type === 'flat'
      && formData.pricingParams?.bedrooms !== undefined,
  })

  const handleSelectBedrooms = (bedrooms: number) => {
    const { serviceCategory } = getValues()
    const { type } = PRICING_PARAMETERS[serviceCategory]
    if (type === 'flat') {
      setValue('pricingParams', { type: 'flat', bedrooms })
    }
    else {
      throw new Error('Expected flat pricing parameters')
    }
  }

  return (
    <StepLayout
      title="What is the size of your place?"
      description="Select the number of bedrooms in your home to help us estimate the service duration and price."
    >
      <FormField
        control={form.control}
        name="pricingParams.bedrooms"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Number of Bedrooms</FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {Array.from(BEDROOMS.entries()).map(([bedrooms, { label, maxSqFt, icon }]) => (
                  <BookingFormOption
                    key={bedrooms}
                    isSelected={field.value === bedrooms}
                    onClick={() => handleSelectBedrooms(bedrooms)}
                  >
                    <div className="relative mb-4 aspect-square size-16">
                      <Image
                        src={`/icons/sizes/${icon}.svg`}
                        alt={label}
                        fill
                        className="transition-transform duration-200 group-active:scale-90"
                      />
                    </div>
                    <h3 className="text-base font-medium">{label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Up to
                      {' '}
                      {maxSqFt}
                      {' '}
                      sq ft
                    </p>
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
