'use client'

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { StepLayout } from '../StepLayout'
import { useStepValidation } from '../../hooks/useStepValidation'
import type { BaseStepProps } from '../../types'

const formatPhoneNumber = (value: string) => {
  // Remove all non-numeric characters
  const cleaned = value.replace(/\D/g, '')

  // Limit to 10 digits
  const limited = cleaned.slice(0, 10)

  // Format the number as (XXX) XXX-XXXX
  const match = limited.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/)
  if (!match) return value

  const [, area, prefix, line] = match

  if (!area) return ''
  if (!prefix) return `(${area}`
  if (!line) return `(${area}) ${prefix}`
  return `(${area}) ${prefix}-${line}`
}

export function CustomerDetailsStep({ form, onValidityChangeAction }: BaseStepProps) {
  // Use useStepValidation for validation
  useStepValidation(form, onValidityChangeAction, {
    customValidation: (formData) => Boolean(
      formData.customer?.firstName &&
      formData.customer?.lastName &&
      formData.customer?.email &&
      formData.customer?.phone?.replace(/\D/g, '').length === 10 // Ensure phone has exactly 10 digits
    )
  })

  return (
    <StepLayout
      title="Who will we be speaking with?"
      // TODO: Mention that they won't need to be present for the cleaning
      description="Enter your contact details"
    >
      <div className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="customer.firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='Happy' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer.lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='Customer' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="customer.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customer.phone"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="(123) 456-7890"
                  maxLength={14} // (XXX) XXX-XXXX = 14 characters
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value)
                    e.target.value = formatted
                    onChange(e)
                  }}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </StepLayout>
  )
}