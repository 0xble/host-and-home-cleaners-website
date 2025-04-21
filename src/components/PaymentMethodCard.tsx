'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { InfoIcon, Lock, Shield } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export function PaymentMethodCard() {
  const [isLoading, setIsLoading] = useState(false)
  const [values, setValues] = useState({
    cardNumber: '',
    expiration: '',
    cvv: '',
    zip: '',
  })

  // Show loading state upon mount
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1200)
  }, [])

  const handleChange = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value

    if (field === 'cardNumber') {
      // Remove any non-digit characters
      value = value.replace(/\D/g, '')

      // Add spaces after every 4 digits
      value = value.replace(/(\d{4})(?=\d)/g, '$1 ')

      // Limit to 16 digits plus spaces
      if (value.replace(/\s/g, '').length > 16) {
        return
      }
    }

    if (field === 'expiration') {
      // Remove any non-digit characters
      value = value.replace(/\D/g, '')

      // Format as MM/YY
      if (value.length >= 2) {
        const month = value.slice(0, 2)
        const year = value.slice(2)

        // Validate month (01-12)
        if (Number.parseInt(month) > 12) {
          return
        }

        value = month + (year ? `/${year}` : '')
      }

      // Limit to MM/YY format (5 characters)
      if (value.length > 5) {
        return
      }
    }

    setValues(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-base font-medium">Pay with</span>
          {/* Acceptable payment methods brand icons */}
          <div className="flex items-center gap-2">
            {[
              { src: '/icons/brands/visa.svg', alt: 'Visa', width: 30, height: 20 },
              { src: '/icons/brands/mastercard.svg', alt: 'Mastercard', width: 32, height: 20 },
              { src: '/icons/brands/amex.svg', alt: 'American Express', width: 32, height: 20 },
              { src: '/icons/brands/discover.svg', alt: 'Discover', width: 32, height: 20 },
              // { src: '/icons/brands/apple-pay.svg', alt: 'Apple Pay', width: 32, height: 20 },
              // { src: '/icons/brands/paypal.svg', alt: 'PayPal', width: 32, height: 20 },
              // { src: '/icons/brands/google-pay.svg', alt: 'Google Pay', width: 32, height: 20 },
            ].map(props => (
              <Image key={props.alt} {...props} className="h-2.5 w-auto" />
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isLoading
          ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Input
                    label={(
                      <span className="flex items-center gap-1">
                        Card number
                        <Lock className="h-3 w-3" />
                      </span>
                    )}
                    type="tel"
                    maxLength={19}
                    value={values.cardNumber}
                    onChange={handleChange('cardNumber')}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      label="MM/YY"
                      type="tel"
                      maxLength={5}
                      value={values.expiration}
                      onChange={handleChange('expiration')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Input
                      label="CVV"
                      type="tel"
                      maxLength={4}
                      value={values.cvv}
                      onChange={handleChange('cvv')}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Input
                    label="ZIP"
                    type="tel"
                    maxLength={5}
                    value={values.zip}
                    onChange={handleChange('zip')}
                  />
                </div>
              </div>
            )
          : (
              <div className="space-y-4">
                <Skeleton className="h-10 w-full rounded-xl" />
                <div className="grid grid-cols-2 gap-4">
                  <Skeleton className="h-10 w-full rounded-xl" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            )}

        <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
          <InfoIcon className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            Your card will only be charged on the day of your appointment.
            {' '}
            <HoverCard>
              <HoverCardTrigger asChild>
                <button type="button" className="underline">Learn more</button>
              </HoverCardTrigger>
              <HoverCardContent align="center" className="w-80 -ml-40 sm:ml-0">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold flex items-center gap-1.5">
                    <Shield className="h-4 w-4" />
                    Secure Booking Policy
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We only charge your card on the day of service. Your card information is securely stored to reserve your appointment time and ensure service availability.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
