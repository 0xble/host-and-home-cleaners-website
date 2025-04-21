'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function PaymentConfirmation() {
  const [status, setStatus] = useState<'success' | 'processing' | 'error' | 'loading'>('loading')
  const [message, setMessage] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    const checkStatus = async () => {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

      const clientSecret = searchParams.get('payment_intent_client_secret')
      if (!clientSecret) {
        setStatus('error')
        setMessage('No payment information found')
        return
      }

      try {
        const { paymentIntent } = await stripe!.retrievePaymentIntent(clientSecret)

        switch (paymentIntent?.status) {
          case 'succeeded':
            setStatus('success')
            setMessage('Payment successful! Thank you for your business.')
            break
          case 'processing':
            setStatus('processing')
            setMessage('Your payment is processing. We\'ll update you when payment is received.')
            break
          case 'requires_payment_method':
            setStatus('error')
            setMessage('Your payment was not successful, please try again.')
            break
          default:
            setStatus('error')
            setMessage('Something went wrong with your payment. Please try again.')
            break
        }
      } catch (error) {
        setStatus('error')
        setMessage('An error occurred while checking payment status.')
        console.error('Error retrieving payment intent:', error)
      }
    }

    checkStatus()
  }, [searchParams])

  return (
    <div className="container max-w-lg py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">
            {status === 'loading' && 'Checking payment status...'}
            {status === 'success' && 'Payment Successful'}
            {status === 'processing' && 'Payment Processing'}
            {status === 'error' && 'Payment Failed'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4 text-center">
          {status === 'loading' && (
            <div className="animate-pulse h-12 w-12 rounded-full bg-blue-100"></div>
          )}
          {status === 'success' && (
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          )}
          {status === 'processing' && (
            <div className="animate-spin h-12 w-12 rounded-full border-4 border-t-blue-500 border-blue-100"></div>
          )}
          {status === 'error' && (
            <AlertCircle className="h-12 w-12 text-red-500" />
          )}

          <p className="text-muted-foreground">{message}</p>

          <div className="pt-4">
            <Button asChild>
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}