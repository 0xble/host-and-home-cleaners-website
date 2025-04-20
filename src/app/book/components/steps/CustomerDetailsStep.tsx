'use client'

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { StepLayout } from '../StepLayout'
import { useStepValidation } from '../../hooks/useStepValidation'
import type { BaseStepProps } from '../../types'

export function CustomerDetailsStep({ form, onValidityChangeAction }: BaseStepProps) {
  // Use useStepValidation for validation
  useStepValidation(form, onValidityChangeAction, {
    customValidation: (formData) => Boolean(
      formData.customer?.firstName &&
      formData.customer?.lastName &&
      formData.customer?.email &&
      formData.customer?.phone
    )
  })

  return (
    <StepLayout
      title="Who will we be speaking with?"
      description="Enter your contact details"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="customer.firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input {...field} />
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
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customer.email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customer.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </StepLayout>
  )
}