'use client'

import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookingFormOption } from '@/components/BookingFormOption'
import type { BaseStepProps } from '../../types/steps'
import type { BookingPricingParams } from '../../types'

export function SizeSelectionStep({ form, onValidityChange }: BaseStepProps) {
  const { watch, setValue } = form
  const selectedPricingParams = watch('pricingParams')

  const handleSelectPricingParameters = (params: BookingPricingParams) => {
    setValue('pricingParams', params)
  }

  // This step is valid if we have selected a flat pricing with bedrooms
  const isValid = selectedPricingParams?.type === 'flat' && selectedPricingParams?.bedrooms != null
  onValidityChange(isValid)

  return (
    <Card className="rounded-none border-0 shadow-none">
      <CardHeader className="pt-2">
        <CardTitle>What is the size of your place?</CardTitle>
        <CardDescription>
          Select the number of bedrooms in your home to help us estimate the service duration and price.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 px-6">
        {/* Bedroom Selection */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <BookingFormOption
              isSelected={selectedPricingParams?.type === 'flat' && selectedPricingParams?.bedrooms === 1}
              onClick={() => handleSelectPricingParameters({ type: 'flat', bedrooms: 1 })}
            >
              <div className="relative mb-4 aspect-square size-16">
                <Image
                  src="/icons/sizes/one-bedroom.svg"
                  alt="One Bedroom"
                  fill
                  className="transition-colors"
                />
              </div>
              <h3 className="text-lg font-medium">One Bedroom</h3>
              <p className="mt-1 text-sm text-muted-foreground">Up to 1,000 sq ft</p>
            </BookingFormOption>

            <BookingFormOption
              isSelected={selectedPricingParams?.type === 'flat' && selectedPricingParams?.bedrooms === 2}
              onClick={() => handleSelectPricingParameters({ type: 'flat', bedrooms: 2 })}
            >
              <div className="relative mb-4 aspect-square size-16">
                <Image
                  src="/icons/sizes/two-bedroom.svg"
                  alt="Two Bedroom"
                  fill
                  className="transition-colors"
                />
              </div>
              <h3 className="text-lg font-medium">Two Bedroom</h3>
              <p className="mt-1 text-sm text-muted-foreground">Up to 1,500 sq ft</p>
            </BookingFormOption>

            <BookingFormOption
              isSelected={selectedPricingParams?.type === 'flat' && selectedPricingParams?.bedrooms === 3}
              onClick={() => handleSelectPricingParameters({ type: 'flat', bedrooms: 3 })}
            >
              <div className="relative mb-4 aspect-square size-16">
                <Image
                  src="/icons/sizes/three-bedroom.svg"
                  alt="Three Bedroom"
                  fill
                  className="transition-colors"
                />
              </div>
              <h3 className="text-lg font-medium">Three Bedroom</h3>
              <p className="mt-1 text-sm text-muted-foreground">Up to 2,500 sq ft</p>
            </BookingFormOption>

            <BookingFormOption
              isSelected={selectedPricingParams?.type === 'flat' && selectedPricingParams?.bedrooms === 4}
              onClick={() => handleSelectPricingParameters({ type: 'flat', bedrooms: 4 })}
            >
              <div className="relative mb-4 aspect-square size-16">
                <Image
                  className="transition-colors"
                  src="/icons/sizes/four-bedroom.svg"
                  alt="Four Bedroom"
                  fill
                />
              </div>
              <h3 className="text-lg font-medium">Four Bedroom</h3>
              <p className="mt-1 text-sm text-muted-foreground">Up to 3,500 sq ft</p>
            </BookingFormOption>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}