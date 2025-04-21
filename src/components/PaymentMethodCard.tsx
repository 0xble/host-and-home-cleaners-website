'use client'

import { Elements, PaymentElement } from '@stripe/react-stripe-js'
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'
import { getStripe } from '@/lib/stripe'

interface PaymentMethodInputProps {
  clientSecret: string
}

export function PaymentMethodCard({ clientSecret }: PaymentMethodInputProps) {
  const stripePromise = getStripe()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className='text-base font-medium'>Pay with</span>
          <div className="flex items-center gap-2">
            <Image src="/icons/brands/visa.svg" alt="Visa" width={32} height={20} className="h-2 w-auto" />
            <Image src="/icons/brands/mastercard.svg" alt="Mastercard" width={32} height={20} className="h-2 w-auto" />
            <Image src="/icons/brands/amex.svg" alt="American Express" width={32} height={20} className="h-2 w-auto" />
            <Image src="/icons/brands/discover.svg" alt="Discover" width={32} height={20} className="h-2 w-auto" />
            <Image src="/icons/brands/paypal.svg" alt="PayPal" width={32} height={20} className="h-2 w-auto" />
            <Image src="/icons/brands/google-pay.svg" alt="Google Pay" width={32} height={20} className="h-2 w-auto" />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!clientSecret ? (
          <div className="space-y-4">
            {/* Link payment method selector */}
            <Skeleton className="h-[40px] w-[270px]" />

            {/* Card number */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>

            {/* Expiration and CVC group */}
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

            {/* Country */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>

            {/* ZIP code */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>
        ) : (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'flat',
                variables: {
                  colorPrimary: '#222222',
                  colorBackground: '#ffffff',
                  colorText: '#222222',
                  colorDanger: '#df1b41',
                  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                  borderRadius: '8px',
                  fontSmooth: 'auto'
                },
                rules: {
                  '.Input': {
                    border: '1px solid #9CA3AF',
                    backgroundColor: '#ffffff',
                    padding: '8px 12px',
                    fontSize: 'var(--fontSizeBase)',
                    height: '40px',
                    boxShadow: 'none',
                    transition: 'all 0.2s ease',
                  },
                  '.Input::placeholder': {
                    color: '#717171',
                  },
                  '.Input:focus': {
                    border: '1px solid #9CA3AF',
                    boxShadow: '0 0 0 2px #0f172a, 0 0 0 4px #ffffff',
                    outline: 'none',
                  },
                  '.Input:disabled': {
                    opacity: '0.5',
                    cursor: 'not-allowed',
                  },
                  '.Label': {
                    color: '#4B4B4B',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                  },
                }
              }
            }}
          >
            <PaymentElement />
          </Elements>
        )}
      </CardContent>
    </Card>
  )
}