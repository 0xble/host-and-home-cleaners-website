'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { BookingFormOption } from '@/components/BookingFormOption'
import type { BaseStepProps } from '../../types/steps'
import type { BookingPricingParams } from '../../types'
import { BookingHourlyPricingParamsSchema } from '../../types'

export function HoursSelectionStep({ form, onValidityChange }: BaseStepProps) {
  const { watch, setValue } = form
  const selectedPricingParams = watch('pricingParams')
  const selectedServiceCategory = watch('serviceCategory')

  const handleSelectPricingParameters = (params: BookingPricingParams) => {
    setValue('pricingParams', params)
  }

  // This step is valid if we have selected an hourly pricing with hours
  const isValid = selectedPricingParams?.type === 'hourly' && selectedPricingParams?.hours != null
  onValidityChange(isValid)

  return (
    <Card className="rounded-none border-0 shadow-none">
      <CardHeader className="pt-2">
        <CardTitle>Select Service Duration</CardTitle>
        <CardDescription>
          Choose how many hours you need for your
          {' '}
          {selectedServiceCategory === 'custom' ? 'custom' : selectedServiceCategory === 'mansion' ? 'mansion' : ''}
          {' '}
          cleaning service
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6">
        <FormField
          control={form.control}
          name="pricingParams.hours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Hours</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
                  {BookingHourlyPricingParamsSchema.shape.hours.options.map(({ value }) => (
                    <BookingFormOption
                      key={`${value} hours`}
                      isSelected={field.value === value}
                      onClick={() => handleSelectPricingParameters({ type: 'hourly', hours: value })}
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
      </CardContent>
    </Card>
  )
}