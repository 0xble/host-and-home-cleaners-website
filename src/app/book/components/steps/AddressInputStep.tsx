'use client'

import { useState } from 'react'
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { constructFullAddress, extractAddressComponents } from '../../utils'
import { MapWithMarker } from '../MapWithMarker'
import { AddressAutocompleteInput } from '../AddressAutocompleteInput'
import { StepLayout } from '../StepLayout'
import { useStepValidation } from '../../hooks/useStepValidation'
import type { BaseStepProps } from '../../types'
import type { Coordinates } from '../MapWithMarker'

export function AddressInputStep({ form, onValidityChangeAction }: BaseStepProps) {
  const { watch, setValue, trigger } = form
  const [showAddressFields, setShowAddressFields] = useState(false)

  const address = watch('customer.address')
  const apt = watch('customer.apt')
  const city = watch('customer.city')
  const state = watch('customer.state')
  const zipCode = watch('customer.zipCode')
  const coordinates = watch('customer.coordinates')

  // Use useStepValidation for validation
  useStepValidation(form, onValidityChangeAction, {
    customValidation: (formData) => Boolean(
      formData.customer?.address &&
      formData.customer?.city &&
      formData.customer?.state &&
      formData.customer?.zipCode
    )
  })

  const handleAddressChange = (value: string) => {
    if (value && value.length > 5) {
      // Show fields after a slight delay
      const timer = setTimeout(() => {
        setShowAddressFields(true)
      }, 500)
      return () => clearTimeout(timer)
    }
    return undefined
  }

  // TODO: Handle loading state
  // Check if Google Maps is loaded
  if (typeof window === 'undefined' || !window.google?.maps) {
    return (
      <StepLayout
        title="Loading Maps..."
        description="Please wait while we load the address input tools..."
      >
        <div />
      </StepLayout>
    )
  }

  return (
    <StepLayout
      title="Where is the cleaning?"
      description="Enter your address to help us find you."
    >
      <div className="max-w-xl mx-auto">
        <div className="border rounded-lg overflow-hidden">
          <FormField
            control={form.control}
            name="customer.address"
            render={({ field }) => (
              <FormItem className="m-0">
                <FormControl>
                  <AddressAutocompleteInput
                    value={field.value || ''}
                    showAddressFields={showAddressFields}
                    onChange={(value: string) => {
                      field.onChange(value)
                      handleAddressChange(value)
                    }}
                    onPlaceSelected={(place: google.maps.places.PlaceResult) => {
                      if (place.geometry?.location) {
                        const lat = place.geometry.location.lat()
                        const lng = place.geometry.location.lng()
                        setValue('customer.coordinates', { lat, lng })

                        if (!place.address_components) return

                        const components = extractAddressComponents(place.address_components)

                        if (components.city) setValue('customer.city', components.city)
                        if (components.state) setValue('customer.state', components.state)
                        if (components.zipCode) setValue('customer.zipCode', components.zipCode)

                        setShowAddressFields(true)
                        trigger('customer.zipCode')
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Additional fields container with animation */}
          <div
            className={cn(
              'divide-y border-t transition-all duration-1000 ease-in-out',
              showAddressFields
                ? 'max-h-[500px] opacity-100 transform-none delay-500'
                : 'max-h-0 opacity-0 pointer-events-none transform translate-y-[-10px]'
            )}
          >
            {/* Apt field */}
            <FormField
              control={form.control}
              name="customer.apt"
              render={({ field }) => (
                <FormItem className="m-0">
                  <FormControl>
                    <Input
                      placeholder="Apt, suite, unit (if applicable)"
                      className={cn(
                        'h-14 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0',
                        showAddressFields
                          ? 'opacity-100 transform-none'
                          : 'opacity-0 transform translate-y-[-10px]',
                        'transition-[opacity,transform] duration-1000 ease-in-out delay-[800ms]'
                      )}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* City field */}
            <FormField
              control={form.control}
              name="customer.city"
              render={({ field }) => (
                <FormItem className="m-0">
                  <FormControl>
                    <Input
                      placeholder="City / town"
                      className={cn(
                        'h-14 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0',
                        showAddressFields
                          ? 'opacity-100 transform-none'
                          : 'opacity-0 transform translate-y-[-10px]',
                        'transition-[opacity,transform] duration-1000 ease-in-out delay-[1200ms]'
                      )}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* State field */}
            <FormField
              control={form.control}
              name="customer.state"
              render={({ field }) => (
                <FormItem className="m-0">
                  <FormControl>
                    <Input
                      placeholder="State / territory"
                      className={cn(
                        'h-14 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0',
                        showAddressFields
                          ? 'opacity-100 transform-none'
                          : 'opacity-0 transform translate-y-[-10px]',
                        'transition-[opacity,transform] duration-1000 ease-in-out delay-[1600ms]'
                      )}
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* ZIP field */}
            <FormField
              control={form.control}
              name="customer.zipCode"
              render={({ field }) => (
                <FormItem className="m-0">
                  <FormControl>
                    <Input
                      placeholder="ZIP code"
                      className={cn(
                        'h-14 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0',
                        showAddressFields
                          ? 'opacity-100 transform-none'
                          : 'opacity-0 transform translate-y-[-10px]',
                        'transition-[opacity,transform] duration-1000 ease-in-out delay-[2000ms]'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="px-4 pb-2" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-[300px] mt-6 rounded-lg overflow-hidden">
          <MapWithMarker
            coordinates={coordinates}
            address={constructFullAddress({
              address,
              apt,
              city,
              state,
              zipCode,
            })}
            onPositionChange={(position: Coordinates) => {
              setValue('customer.coordinates', position)

              // Use reverse geocoding to update address fields
              const geocoder = new google.maps.Geocoder()
              geocoder.geocode({ location: position }, (results, status) => {
                if (status === 'OK' && results && results.length > 0) {
                  const place = results[0]
                  if (place && place.formatted_address) {
                    setValue('customer.address', place.formatted_address)
                  }

                  // Update city, state, zip
                  if (place && place.address_components) {
                    const components = extractAddressComponents(place.address_components)

                    if (components.city) setValue('customer.city', components.city)
                    if (components.state) setValue('customer.state', components.state)
                    if (components.zipCode) setValue('customer.zipCode', components.zipCode)

                    setShowAddressFields(true)
                  }
                }
              })
            }}
          />
        </div>
      </div>
    </StepLayout>
  )
}