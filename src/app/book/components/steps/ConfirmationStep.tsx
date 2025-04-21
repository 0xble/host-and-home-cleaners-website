'use client'

import { format } from 'date-fns'
import { StepLayout } from '../StepLayout'
import type { BaseStepProps } from '../../types'
import { Card, CardContent } from '@/components/ui/card'
import { PaymentMethodCard } from '@/components/PaymentMethodCard'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { createPaymentIntent } from '@/lib/stripe/payment'

export function ConfirmationStep({ form }: BaseStepProps) {
  const { toast } = useToast()
  const { watch } = form
  const selectedServiceCategory = watch('serviceCategory')
  const selectedFrequency = watch('frequency')
  const selectedDate = watch('date')
  const selectedArrivalWindow = watch('arrivalWindow')
  const selectedPricingParams = watch('pricingParams')
  const price = watch('price')

  const [clientSecret, setClientSecret] = useState<string>('')
  const [, setIsLoading] = useState(false)
  const [, setError] = useState<string | null>(null)

  // Store the client secret in the form
  useEffect(() => {
    if (clientSecret) {
      form.setValue('clientSecret', clientSecret)
    }
  }, [clientSecret, form])

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (!price?.totalInitial) return

      setIsLoading(true)
      setError(null)

      try {
        const result = await createPaymentIntent(
          price.totalInitial,
          {
            service: selectedServiceCategory,
            frequency: selectedFrequency,
            date: selectedDate.toISOString(),
            arrivalWindow: selectedArrivalWindow
          }
        )

        if (!result.success || !result.clientSecret) {
          throw new Error(result.error || 'Failed to create payment intent')
        }

        setClientSecret(result.clientSecret)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to set up payment'
        setError(errorMessage)
        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPaymentIntent()
  }, [price, selectedServiceCategory, selectedFrequency, selectedDate, selectedArrivalWindow, toast])

  const formatServiceName = (service: string) => {
    switch (service) {
      case 'default':
        return 'Deep clean'
      case 'move-in-out':
        return 'Move In/Out'
      case 'custom':
        return 'Custom Areas Only'
      case 'mansion':
        return 'Mansion'
      default:
        return service
    }
  }

  const formatFrequency = (frequency: string) => {
    switch (frequency) {
      case 'weekly':
        return 'Weekly visits'
      case 'biweekly':
        return 'Bi-weekly visits'
      case 'monthly':
        return 'Monthly visits'
      case 'one-time':
        return 'One-time'
      default:
        return frequency
    }
  }

  const formatSize = () => {
    if (selectedPricingParams?.type === 'flat') {
      return `${selectedPricingParams.bedrooms} bedroom`
    }
    if (selectedPricingParams?.type === 'hourly') {
      return `${selectedPricingParams.hours} hours`
    }
    return ''
  }

  return (
    <StepLayout
      title="Confirm your booking"
      description="Review your booking details and complete payment"
    >
      <div className="grid gap-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span>{formatServiceName(selectedServiceCategory)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Frequency</span>
                <span>{formatFrequency(selectedFrequency)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Size</span>
                <span>{formatSize()}</span>
              </div>
            </div>

            <div className="border-t my-6"/>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span>{format(selectedDate, 'EEEE, MMMM d')}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Arrival Window</span>
                <span>{selectedArrivalWindow}</span>
              </div>
            </div>

            <div className="border-t my-6"/>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Total</span>
                <span>${price.serviceTotal.toFixed(2)}</span>
              </div>

              {price.recurringDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Recurring Discount</span>
                  <span>-${price.recurringDiscount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between font-medium">
                <span>Total for Initial Deep Clean</span>
                <span>${price.totalInitial.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-medium">
                <span>Total for Recurring Upkeep</span>
                <span>${price.totalRecurring.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <PaymentMethodCard clientSecret={clientSecret} />
      </div>
    </StepLayout>
  )
}