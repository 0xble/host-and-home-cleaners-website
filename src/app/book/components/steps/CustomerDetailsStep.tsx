'use client'

import { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import type { BaseStepProps } from '../../types/steps'

export function CustomerDetailsStep({ form, onValidityChange }: BaseStepProps) {
  const { formState: { errors }, watch } = form

  const firstName = watch('customer.firstName')
  const lastName = watch('customer.lastName')
  const email = watch('customer.email')
  const phone = watch('customer.phone')

  useEffect(() => {
    const isValid = !errors.customer?.firstName &&
                   !errors.customer?.lastName &&
                   !errors.customer?.email &&
                   !errors.customer?.phone &&
                   !!firstName && !!lastName && !!email && !!phone

    onValidityChange(isValid)
  }, [firstName, lastName, email, phone, errors, onValidityChange])

  return (
    <Card className="rounded-none border-0 shadow-none">
      <CardHeader className="pt-2">
        <CardTitle>Your Information</CardTitle>
        <CardDescription>
          Enter your contact details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-6">
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
      </CardContent>
    </Card>
  )
}