import type { BookingFrequency, BookingPriceDetails, BookingPricingParams, BookingServiceCategory } from '@/app/book/types'
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
    discount,
    recurringDiscount,
  },
  booking: {
    frequency,
    serviceCategory,
    pricingParams,
  },
}: PriceDetailsDrawerProps) {
  const getFrequencyLabel = (freq: BookingFrequency) => {
    switch (freq) {
      case 'weekly':
        return 'Weekly visits'
      case 'biweekly':
        return 'Bi-Weekly visits'
      case 'monthly':
        return 'Monthly visits'
      default:
        return 'One-Time visit'
    }
  }

  const getServiceLabel = (service: BookingServiceCategory) => {
    switch (service) {
      case 'default':
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
                <span className="text-lg font-medium">{formatPrice(totalInitial)}</span>
                <span className="text-sm font-normal">{frequency !== 'one-time' && ' first'}</span>
                <InfoIcon className="size-5 text-muted-foreground opacity-50 transition-opacity group-hover:opacity-100 inline-block ml-2 -mt-1" />
              </div>
              {totalRecurring && frequency !== 'one-time' && (
                <div>
                  <span className="line-through text-muted-foreground text-base">{formatPrice(totalInitial)}</span>
                  {' '}
                  <span className="text-success text-base">{formatPrice(totalRecurring)}</span>
                  <span className="text-sm font-normal"> recurring</span>
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
                {discount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discounts</span>
                    <span className="text-success">{formatPrice(-Math.abs(discount))}</span>
                  </div>
                )}
                {recurringDiscount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Recurring Discount</span>
                    <span className="text-success">{formatPrice(-Math.abs(recurringDiscount))}</span>
                  </div>
                )}
                {taxes > 0 && (
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
                <div className="flex justify-between pb-2">
                  <span className="">Total for Recurring Upkeep</span>
                  <span className="">{formatPrice(totalRecurring)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
