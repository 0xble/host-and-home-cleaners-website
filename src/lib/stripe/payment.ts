import { getStripe } from './index'

/**
 * Function to handle payment confirmation with Stripe
 */
export async function confirmPayment(clientSecret: string): Promise<{
  success: boolean;
  error?: string;
  paymentIntent?: { id: string; status: string }
}> {
  try {
    const stripe = await getStripe()

    if (!stripe) {
      return {
        success: false,
        error: 'Stripe failed to load'
      }
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-confirmation`,
      },
      redirect: 'if_required'
    })

    if (error) {
      console.error('Error confirming payment', error)

      return {
        success: false,
        error: error.message || 'An error occurred with your payment'
      }
    }

    if (paymentIntent && paymentIntent.status === 'succeeded') {
      return {
        success: true,
        paymentIntent: {
          id: paymentIntent.id,
          status: paymentIntent.status
        }
      }
    }

    // In development, mock a successful payment
    if (process.env.NODE_ENV === 'development' && !paymentIntent) {
      return {
        success: true,
        paymentIntent: {
          id: 'dev_mock_payment_' + Date.now(),
          status: 'succeeded'
        }
      }
    }

    return {
      success: false,
      error: 'Payment status is not successful',
      paymentIntent: paymentIntent ? {
        id: paymentIntent.id,
        status: paymentIntent.status
      } : undefined
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown payment error occurred'
    }
  }
}

/**
 * Function to create a payment intent
 */
export async function createPaymentIntent(amount: number, metadata: Record<string, any> = {}): Promise<{
  success: boolean;
  clientSecret?: string;
  error?: string;
}> {
  try {
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        metadata
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create payment intent')
    }

    return {
      success: true,
      clientSecret: data.clientSecret
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'An unknown error occurred'
    }
  }
}