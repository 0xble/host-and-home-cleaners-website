'use client'

import type { BaseStepProps } from '@/app/book/types'
import { useEffect } from 'react'
import { StepLayout } from '@/app/book/components/StepLayout'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

export function CustomerDetailsStep({ form, onValidityChangeAction }: BaseStepProps) {
  const firstName = form.watch('customer.firstName') as string | undefined
  const lastName = form.watch('customer.lastName') as string | undefined
  const email = form.watch('customer.email') as string | undefined
  const phone = form.watch('customer.phone') as string | undefined

  useEffect(() => {
    const isValid = Boolean(
      firstName != null
      && lastName != null
      && email != null
      && phone != null && phone.replace(/\D/g, '').length === 10, // Ensure phone has exactly 10 digits
    )
    onValidityChangeAction(isValid)
  }, [firstName, lastName, email, phone, onValidityChangeAction])

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
                  <Input placeholder="Happy" {...field} />
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
                  <Input placeholder="Customer" {...field} />
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="(123)456-7890"
                  maxLength={10}
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
