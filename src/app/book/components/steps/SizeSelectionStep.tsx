'use client'

import type { BaseStepProps } from '@/app/book/types'
import { StepLayout } from '@/app/book/components/StepLayout'
import { useStepValidation } from '@/app/book/hooks/useStepValidation'
import { calculatePrice } from '@/app/book/utils'
import { BookingFormOption } from '@/components/BookingFormOption'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { PRICING_PARAMETERS } from '@/lib/constants'
import Image from 'next/image'

const BEDROOM_OPTIONS = [
  { bedrooms: 1, label: 'One Bedroom', sqft: '1,000', icon: 'one-bedroom' },
  { bedrooms: 2, label: 'Two Bedroom', sqft: '1,500', icon: 'two-bedroom' },
  { bedrooms: 3, label: 'Three Bedroom', sqft: '2,500', icon: 'three-bedroom' },
  { bedrooms: 4, label: 'Four Bedroom', sqft: '3,500', icon: 'four-bedroom' },
] as const

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
    const { location, serviceCategory, frequency } = getValues()
    const config = PRICING_PARAMETERS[location][serviceCategory]
    if (config.type === 'flat') {
      setValue('price', calculatePrice(serviceCategory, frequency, { type: 'flat', bedrooms }, config))
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
                {BEDROOM_OPTIONS.map(({ bedrooms, label, sqft, icon }) => (
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
                      {sqft}
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
