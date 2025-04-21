'use client'

import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { useEffect, useState } from 'react'

export function PaymentMethodCard() {
  const [isLoading, setIsLoading] = useState(false)

  // Load for 1 second on mount
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => { setIsLoading(false) }, 1000)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className='text-base font-medium'>Pay with</span>
          <div className="flex items-center gap-2">
            {[
              { src: '/icons/brands/visa.svg', alt: 'Visa', width: 30, height: 20 },
              { src: '/icons/brands/mastercard.svg', alt: 'Mastercard', width: 32, height: 20 },
              { src: '/icons/brands/amex.svg', alt: 'American Express', width: 32, height: 20 },
              { src: '/icons/brands/discover.svg', alt: 'Discover', width: 32, height: 20 },
              { src: '/icons/brands/paypal.svg', alt: 'PayPal', width: 32, height: 20 },
              { src: '/icons/brands/google-pay.svg', alt: 'Google Pay', width: 32, height: 20 },
            ].map((props) => (
              <Image key={props.alt} {...props} className="h-[10px] w-auto" />
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-[40px] w-[270px]" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Skeleton className="h-[40px] w-[270px]" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}