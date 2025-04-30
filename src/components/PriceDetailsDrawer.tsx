import type { BookingFrequency, BookingPriceDetails, BookingPricingParams, BookingServiceCategory } from '@/app/book/types'
import { calculateDiscount } from '@/app/book/utils'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { formatPrice } from '@/lib/utils'
import { InfoIcon } from 'lucide-react'

interface PriceDetailsDrawerProps {
  price: BookingPriceDetails
  booking: {
    frequency: BookingFrequency
    serviceCategory: BookingServiceCategory
    pricingParams: BookingPricingParams
  }
}

export function PriceDetailsDrawer({
  price: {
    totalInitial,
    totalRecurring,
    serviceTotal,
    taxes,
    coupon,
    recurringDiscount,
  },
  booking: {
    frequency,
    serviceCategory,
    pricingParams,
  },
}: PriceDetailsDrawerProps) {
  const discount = coupon ? calculateDiscount({ serviceTotal, ...coupon.discount }) : 0

  const getFrequencyLabel = (freq: BookingFrequency) => {
    switch (freq) {
      case 'weekly':
        return 'Weekly visits'
      case 'biweekly':
        return 'Bi-Weekly visits'
      case 'monthly':
        return 'Monthly visits'
      case 'one-time':
        return 'One-Time visit'
    }
  }

  const getServiceLabel = (service: BookingServiceCategory) => {
    switch (service) {
      case 'deep-clean':
        return 'Deep clean'
      case 'move-in-out':
        return 'Move-In/Out clean'
      case 'custom':
        return 'Custom clean'
      case 'mansion':
        return 'Mansion housekeeping'
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="group h-auto w-full p-0 hover:bg-transparent"
        >
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex flex-col justify-center text-left">
              <div>
                {discount != null && discount > 0 && (
                  <>
                    <span className="text-sm sm:text-base line-through text-muted-foreground">{formatPrice(serviceTotal)}</span>
                    {' '}
                  </>
                )}
                <span className="sm:text-lg text-base font-medium">{formatPrice(totalInitial)}</span>
                <span className="sm:text-sm text-xs font-normal">{frequency !== 'one-time' && ' first'}</span>
                <InfoIcon className="size-5 text-muted-foreground opacity-50 transition-opacity group-hover:opacity-100 inline-block ml-1 -mt-1" />
              </div>
              {totalRecurring != null && frequency !== 'one-time' && (
                <div>
                  <span className="text-sm sm:text-base line-through text-muted-foreground">{formatPrice(serviceTotal)}</span>
                  {' '}
                  <span className="sm:text-lg text-base font-medium text-success">{formatPrice(totalRecurring)}</span>
                  <span className="sm:text-sm text-xs font-normal"> recurring</span>
                </div>
              )}
            </div>
          </div>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Summary</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <div className="space-y-6">
              {/* Service Details */}
              <div className="space-y-3 font-normal">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span>{getServiceLabel(serviceCategory)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frequency</span>
                  <span>{getFrequencyLabel(frequency)}</span>
                </div>
                {pricingParams?.type === 'flat' && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size</span>
                      <span>
                        {pricingParams.bedrooms}
                        {' '}
                        bedroom
                      </span>
                    </div>
                  </>
                )}
                {pricingParams?.type === 'hourly' && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Hours</span>
                    <span>
                      {pricingParams.hours}
                      {' '}
                      hours
                    </span>
                  </div>
                )}
              </div>

              <div className="border-b" />

              {/* Price Breakdown */}
              <div className="space-y-3 font-normal">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Total</span>
                  <span>{formatPrice(serviceTotal)}</span>
                </div>
                {discount != null && discount > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Discount</span>
                      <span className="text-success">{formatPrice(-Math.abs(discount))}</span>
                    </div>
                    {coupon?.description != null && (
                      <div className="font-light text-xs text-muted-foreground text-right w-full pb-1">{coupon.description}</div>
                    )}
                  </>
                )}
                {recurringDiscount != null && recurringDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recurring Discount</span>
                    <span className="text-success">{formatPrice(-Math.abs(recurringDiscount))}</span>
                  </div>
                )}
                {taxes != null && taxes > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Taxes</span>
                    <span className="text-success">{formatPrice(taxes)}</span>
                  </div>
                )}
              </div>

              <div className="border-b" />

              {/* Total */}
              <div className="space-y-3 font-medium">
                <div className="flex justify-between">
                  <span className="">Total for Initial Deep Clean</span>
                  <span>
                    <span className="">{formatPrice(totalInitial)}</span>
                  </span>
                </div>
                {totalRecurring != null && (
                  <div className="flex justify-between pb-2">
                    <span className="">Total for Recurring Upkeep</span>
                    <span className="">{formatPrice(totalRecurring)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
