'use client'

import type { BaseStepProps } from '@/app/book/types'
import { StepLayout } from '@/app/book/components/StepLayout'
import { calculateDiscount } from '@/app/book/utils'
import { GradientButton } from '@/components/GradientButton'
import { PaymentMethodCard } from '@/components/PaymentMethodCard'
import { Card, CardContent } from '@/components/ui/card'
import { ROUTES } from '@/lib/routes'
import { cn, formatPrice } from '@/lib/utils'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export function ConfirmationStep({ form, isSubmitting, onSubmit }: BaseStepProps) {
  const { watch } = form
  const selectedServiceCategory = watch('serviceCategory')
  const selectedFrequency = watch('frequency')
  const selectedDate = watch('date')
  const selectedArrivalWindow = watch('arrivalWindow')
  const selectedPricingParams = watch('pricingParams')
  const price = watch('price')

  const formatServiceName = (service: string) => {
    switch (service) {
      case 'deep-clean':
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

  const coupon = price.coupon
  const discount = coupon ? calculateDiscount({ serviceTotal: price.serviceTotal, ...coupon.discount }) : 0

  return (
    <StepLayout
      title="Confirm your booking"
      description="Review your booking details and complete payment"
      className="mb-4"
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

            <div className="border-b my-6" />

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

            <div className="border-b my-6" />

            <div className="space-y-3 font-normal">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service Total</span>
                <span className={cn(discount !== 0 && 'line-through')}>{formatPrice(price.serviceTotal)}</span>
              </div>
              {discount !== 0 && (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-success">{formatPrice(-Math.abs(discount))}</span>
                  </div>
                  {coupon?.description != null && (
                    <div className="font-light text-xs text-muted-foreground text-right w-full">{coupon.description}</div>
                  )}
                </>
              )}
              {price.recurringDiscount != null && price.recurringDiscount !== 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Recurring Discount</span>
                  <span className="text-success">{formatPrice(-Math.abs(price.recurringDiscount))}</span>
                </div>
              )}
              {price.taxes != null && price.taxes !== 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="text-success">{formatPrice(price.taxes)}</span>
                </div>
              )}
            </div>

            <div className="border-b my-6" />

            {/* Total */}
            <div className="space-y-3 font-medium">
              <div className="flex justify-between">
                <span className="">{(() => {
                  if (selectedFrequency === 'one-time') {
                    return 'Total'
                  } else {
                    if (selectedServiceCategory === 'deep-clean') {
                      return 'Total for Initial Deep Clean'
                    } else {
                      return 'Total for Initial'
                    }
                  }
                })()}
                </span>
                <span>
                  <span className="text-lg">{formatPrice(price.totalInitial)}</span>
                </span>
              </div>
              {price.totalRecurring != null && price.totalRecurring !== 0 && (
                <div className="flex justify-between pb-2">
                  <span className="">Total for Recurring Upkeep</span>
                  <span className="text-lg">{formatPrice(price.totalRecurring)}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <PaymentMethodCard form={form} />

        <div className="space-y-2 mt-4">
          <p className="text-xs text-center">
            By clicking the button below, you agree to our
            {' '}
            <Link href={ROUTES.LEGAL.TERMS_OF_SERVICE.href} className="underline" target="_blank">terms of service</Link>
            {' '}
            and
            {' '}
            <Link href={ROUTES.LEGAL.PRIVACY_POLICY.href} className="underline" target="_blank">privacy policy</Link>
            .
          </p>
          <GradientButton
            type="submit"
            variant="light"
            onClick={onSubmit}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                  </span>
                )
              : (
                  'Book'
                )}
          </GradientButton>
        </div>
      </div>
    </StepLayout>
  )
}
