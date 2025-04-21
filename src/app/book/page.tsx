'use client'

import type { Location } from '@/lib/types'
import type {
  BookingFormData,
  BaseStepProps
} from './types'
import { BookingFormSchema } from './types'
import { GradientButton } from '@/components/GradientButton'
import { Button } from '@/components/ui/button'
import {
  Form
} from '@/components/ui/form'
import { Progress } from '@/components/ui/progress'
import { PRICING_PARAMETERS, DOMAIN } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, type ComponentType, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { BookingStep } from './types'
import { AddressInputStep } from './components/steps/AddressInputStep'
import { ChooseYourServiceStep } from './components/steps/ChooseYourServiceStep'
import { CustomerDetailsStep } from './components/steps/CustomerDetailsStep'
import { GettingStartedStep } from './components/steps/GettingStartedStep'
import { HoursSelectionStep } from './components/steps/HoursSelectionStep'
import { ScheduleStep } from './components/steps/ScheduleStep'
import { ServiceSelectionStep } from './components/steps/ServiceSelectionStep'
import { SizeSelectionStep } from './components/steps/SizeSelectionStep'
import { TellUsAboutYourPlaceStep } from './components/steps/TellUsAboutYourPlaceStep'
import { GoogleMapsLoader } from '@/lib/google/GoogleMapsLoader'
import { addDays } from 'date-fns'
import { calculatePrice } from './utils'
import { PriceDetailsDrawer } from '@/components/PriceDetailsDrawer'
import { ConfirmationStep } from './components/steps/ConfirmationStep'
import { ArrowLeft } from 'lucide-react'
import { confirmPayment } from '@/lib/stripe/payment'
import { toast } from '@/components/ui/use-toast'

// Defines the components for each step
type StepComponent = ComponentType<BaseStepProps>
const STEP_COMPONENTS: Readonly<Record<BookingStep, StepComponent>> = {
  [BookingStep.GETTING_STARTED]: GettingStartedStep,
  [BookingStep.CHOOSE_YOUR_SERVICE]: ChooseYourServiceStep,
  [BookingStep.SERVICE_SELECTION]: ServiceSelectionStep,
  [BookingStep.TELL_US_ABOUT_YOUR_PLACE]: TellUsAboutYourPlaceStep,
  [BookingStep.ADDRESS_INPUT]: AddressInputStep,
  [BookingStep.SIZE_SELECTION]: SizeSelectionStep,
  [BookingStep.HOURS_SELECTION]: HoursSelectionStep,
  [BookingStep.CUSTOMER_DETAILS]: CustomerDetailsStep,
  [BookingStep.SCHEDULE]: ScheduleStep,
  [BookingStep.CONFIRMATION]: ConfirmationStep,
}

// Subtract 1 for hours and size selection being mutually exclusive
const MAX_STEPS = (Object.keys(STEP_COMPONENTS).length - 1) - 1

export default function BookingPage() {
  const router = useRouter()
  const [location] = useState<Location>('MYRTLE_BEACH')
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.GETTING_STARTED)
  const [progress, setProgress] = useState<{ value: number, max: number }>({ value: 0, max: MAX_STEPS })
  const [visitedSteps, setVisitedSteps] = useState<BookingStep[]>([])
  const [isStepValid, setIsStepValid] = useState(true)
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)
  const [isLoadingMaps, setIsLoadingMaps] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<BookingFormData>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      location,
      frequency: 'biweekly',
    },
    mode: 'onTouched'
  })

  const { watch, handleSubmit, getValues, trigger, formState: { errors } } = form

  // Watch form values for price calculation
  const selectedFrequency = watch('frequency')
  const selectedServiceCategory = watch('serviceCategory') as BookingFormData['serviceCategory']
  const selectedPricingParams = watch('pricingParams') as BookingFormData['pricingParams']
  const selectedDate = watch('date') as BookingFormData['date']
  const selectedArrivalWindow = watch('arrivalWindow') as BookingFormData['arrivalWindow']
  const customerAddress = watch('customer.address')
  const customerCity = watch('customer.city')
  const customerState = watch('customer.state')
  const customerZipCode = watch('customer.zipCode')
  const price = watch('price')
  const clientSecret = watch('clientSecret')

  // Check if we have all required parameters to show price
  const canShowPrice = () => {
    if (selectedPricingParams?.type === 'flat') {
      return selectedPricingParams.bedrooms != null
    }

    if (selectedPricingParams?.type === 'hourly') {
      return selectedPricingParams.hours != null
    }

    return false
  }

  // Save form state when values change
  useEffect(() => {
    // Log form values if development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Updated form values', getValues())
    }

    const validateStep = async () => {
      const isValid = await isCurrentStepValid()
      setIsStepValid(isValid)
    }
    validateStep()
  }, [
    currentStep,
    selectedServiceCategory,
    selectedPricingParams,
    selectedDate,
    selectedFrequency,
    selectedArrivalWindow,
    visitedSteps,
    customerAddress,
    customerCity,
    customerState,
    customerZipCode,
  ])

  // Debug log for form errors
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Form errors:', errors)
    }
  }, [errors])

  const STEP_TRANSITIONS: Readonly<Record<BookingStep, { next: () => BookingStep | null, prev: () => BookingStep | null }>> = {
    [BookingStep.GETTING_STARTED]: {
      next: () => BookingStep.CHOOSE_YOUR_SERVICE,
      prev: () => null,
    },
    [BookingStep.CHOOSE_YOUR_SERVICE]: {
      next: () => BookingStep.SERVICE_SELECTION,
      prev: () => BookingStep.GETTING_STARTED,
    },
    [BookingStep.SERVICE_SELECTION]: {
      next: () => BookingStep.TELL_US_ABOUT_YOUR_PLACE,
      prev: () => BookingStep.CHOOSE_YOUR_SERVICE,
    },
    [BookingStep.TELL_US_ABOUT_YOUR_PLACE]: {
      next: () => BookingStep.ADDRESS_INPUT,
      prev: () => BookingStep.SERVICE_SELECTION,
    },
    [BookingStep.ADDRESS_INPUT]: {
      next: () => BookingStep.CUSTOMER_DETAILS,
      prev: () => BookingStep.TELL_US_ABOUT_YOUR_PLACE,
    },
    [BookingStep.CUSTOMER_DETAILS]: {
      next: () => {
        if (!selectedServiceCategory) return null

        const config = PRICING_PARAMETERS[location][selectedServiceCategory]
        if (!config) return null

        switch (config.type) {
          case 'flat':
            return BookingStep.SIZE_SELECTION
          case 'hourly':
            return BookingStep.HOURS_SELECTION
          default:
            return null
        }
      },
      prev: () => BookingStep.ADDRESS_INPUT,
    },
    [BookingStep.SIZE_SELECTION]: {
      next: () => BookingStep.SCHEDULE,
      prev: () => BookingStep.CUSTOMER_DETAILS,
    },
    [BookingStep.HOURS_SELECTION]: {
      next: () => BookingStep.SCHEDULE,
      prev: () => BookingStep.CUSTOMER_DETAILS,
    },
    [BookingStep.SCHEDULE]: {
      next: () => BookingStep.CONFIRMATION,
      prev: () => {
        if (!selectedServiceCategory) return null

        const config = PRICING_PARAMETERS[location][selectedServiceCategory]
        if (!config) return null

        switch (config.type) {
          case 'flat':
            return BookingStep.SIZE_SELECTION
          case 'hourly':
            return BookingStep.HOURS_SELECTION
          default:
            return null
        }
      },
    },
    [BookingStep.CONFIRMATION]: {
      next: () => null,
      prev: () => BookingStep.SCHEDULE,
    },
  }

  // Check if current step is valid
  const isCurrentStepValid = async () => {
    if (currentStep === BookingStep.GETTING_STARTED)
      return true
    if (currentStep === BookingStep.CHOOSE_YOUR_SERVICE)
      return true
    if (currentStep === BookingStep.TELL_US_ABOUT_YOUR_PLACE)
      return true

    if (currentStep === BookingStep.SERVICE_SELECTION) {
      return selectedServiceCategory !== undefined
    }

    if (currentStep === BookingStep.SIZE_SELECTION) {
      return selectedPricingParams?.type === 'flat' && selectedPricingParams?.bedrooms != null
    }

    if (currentStep === BookingStep.HOURS_SELECTION) {
      return selectedPricingParams?.type === 'hourly' && selectedPricingParams?.hours != null
    }

    if (currentStep === BookingStep.SCHEDULE) {
      const date = getValues('date')
      const arrivalWindow = getValues('arrivalWindow')
      const frequency = getValues('frequency')
      return date !== null && arrivalWindow !== undefined && frequency !== undefined
    }

    if (currentStep === BookingStep.CUSTOMER_DETAILS) {
      const { customer } = getValues()
      return Boolean(
        customer?.firstName &&
        customer?.lastName &&
        customer?.email &&
        customer?.phone
      )
    }

    if (currentStep === BookingStep.ADDRESS_INPUT) {
      return trigger([
        'customer.address',
        'customer.city',
        'customer.state',
        'customer.zipCode'
      ])
    }

    return false
  }

  const getNextStepNumber = () => {
    const transition = STEP_TRANSITIONS[currentStep]

    if (!transition) return null

    return transition.next()
  }

  const getPrevStepNumber = () => {
    const transition = STEP_TRANSITIONS[currentStep]

    if (!transition) return null

    return transition.prev()
  }

  const prevStep = () => {
    const prevStepNumber = getPrevStepNumber()
    if (prevStepNumber !== null) {
      setCurrentStep(prevStepNumber)
      setProgress({ ...progress, value: progress.value - 1 })
    }
  }

  const nextStep = async (override?: boolean) => {
    const isValid = override || await isCurrentStepValid()
    if (!isValid) return

    const nextStepNumber = getNextStepNumber()
    if (nextStepNumber !== null) {
      // If next step is ADDRESS_INPUT and Google Maps isn't loaded yet
      if (nextStepNumber === BookingStep.ADDRESS_INPUT && !isGoogleMapsLoaded && !isLoadingMaps) {
        setIsLoadingMaps(true)
        try {
          await GoogleMapsLoader.getInstance().load()
          setIsGoogleMapsLoaded(true)
        } catch (error) {
          console.error('Failed to load Google Maps:', error)
        } finally {
          setIsLoadingMaps(false)
        }
      }

      setVisitedSteps(prev => [...new Set([...prev, currentStep])])
      setProgress({ ...progress, value: progress.value + 1 })
      setCurrentStep(nextStepNumber)
    }
  }

  const onSubmit = async (data: BookingFormData) => {
    if (currentStep === BookingStep.CONFIRMATION) {
      if (!data.clientSecret) {
        console.error('No client secret available for payment')
        return
      }

      setIsSubmitting(true)

      try {
        const result = await confirmPayment(data.clientSecret)

        if (!result.success) {
          throw new Error(result.error || 'Payment failed')
        }

        // Payment successful, clear form and navigate to confirmation
        toast({
          title: 'Booking confirmed!',
          description: 'Your payment was successful. You will receive a confirmation email shortly.',
        })

        // Clear session storage on successful submission
        sessionStorage.removeItem('bookingFormState')

        // Navigate to payment confirmation page
        router.push(`/payment-confirmation?payment_intent_client_secret=${data.clientSecret}`)
      } catch (error) {
        toast({
          title: 'Payment failed',
          description: error instanceof Error ? error.message : `Payment failed. Please try again or contact support@${DOMAIN}.`,
          variant: 'destructive',
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (currentStep === BookingStep.GETTING_STARTED)
        return undefined

      event.preventDefault()
      prevStep()
    }

    if (currentStep > BookingStep.GETTING_STARTED) {
      window.history.pushState(null, '', window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [currentStep])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)
      const modifierKey = isMac ? event.metaKey : event.altKey

      if (modifierKey) {
        // At step 0, let the browser handle back navigation normally
        if (currentStep === BookingStep.GETTING_STARTED && (event.key === '[' || event.key === 'ArrowLeft')) {
          return undefined
        }

        if (event.key === '[' || event.key === 'ArrowLeft') {
          event.preventDefault()
          prevStep()
          return undefined
        }
        else if (event.key === ']' || event.key === 'ArrowRight') {
          event.preventDefault()
          // Only allow forward navigation if:
          // 1. Current step is valid
          // 2. Next step has been visited before OR current step is valid
          const nextStepNumber = getNextStepNumber()
          if (
            currentStep
            && nextStepNumber !== null
            && await isCurrentStepValid()
            && (visitedSteps.includes(nextStepNumber) || await isCurrentStepValid())
          ) {
            nextStep()
          }
          return undefined
        }
      }
      return undefined
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, router, visitedSteps])

  const handleStepValidityChange = useCallback((isValid: boolean) => {
    setIsStepValid(isValid)

    // Add a small delay to ensure state is updated
    setTimeout(() => {
      if (
        isValid &&
        !visitedSteps.includes(currentStep) &&
        [
          BookingStep.SERVICE_SELECTION,
          BookingStep.CUSTOMER_DETAILS,
          BookingStep.SIZE_SELECTION,
          BookingStep.HOURS_SELECTION
        ].includes(currentStep)
      ) {
        setTimeout(() => nextStep(true), 100)
      }
    }, 0)
  }, [currentStep, nextStep, visitedSteps])

  const CurrentStepComponent = STEP_COMPONENTS[currentStep]

  // TODO: Handle step not found
  if (!CurrentStepComponent) {
    return <div>Step not found</div>
  }

  return (
    <div className="relative min-h-screen pb-24">
      <div className="p-6">
        {currentStep !== BookingStep.CONFIRMATION ? (
          <Button variant="outline" size="default" asChild className="rounded-full px-5">
            <Link href={ROUTES.HOME.href}>
              Exit
            </Link>
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={prevStep}
            className="rounded-full size-12"
          >
            <ArrowLeft />
          </Button>
        )}
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <CurrentStepComponent
            form={form}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onValidityChangeAction={handleStepValidityChange}
            isGoogleMapsLoaded={isGoogleMapsLoaded}
          />
        </form>
      </Form>

      {/* Navigation and pricing */}
      {currentStep !== BookingStep.CONFIRMATION ? (
        <>
          {/* Progress bar above bottom navigaton */}
          <div className="fixed inset-x-0 bottom-20 z-10 bg-white">
            <Progress
              className="h-2 w-full rounded-none"
              segments={progress.max / 2}
              value={progress.value / progress.max * 100}
            />
          </div>
          <div className="fixed inset-x-0 bottom-0 z-10 h-20 bg-white shadow-md">
            <div className="flex size-full items-center justify-between px-6 py-4">
              {currentStep === BookingStep.GETTING_STARTED
                ? (
                  <GradientButton
                    type="button"
                    onClick={() => nextStep()}
                    className="w-full"
                  >
                    Get started
                  </GradientButton>
                )
                : (
                  <>
                    <div className="flex items-center gap-4">
                      {canShowPrice() && (
                        <PriceDetailsDrawer
                          price={{
                            serviceTotal: price.serviceTotal,
                            discount: price.discount,
                            recurringDiscount: price.recurringDiscount,
                            taxes: price.taxes,
                            totalInitial: price.totalInitial,
                            totalRecurring: price.totalRecurring
                          }}
                          booking={{
                            frequency: selectedFrequency,
                            serviceCategory: selectedServiceCategory,
                            pricingParams: selectedPricingParams
                          }}
                        />
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {currentStep > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                        >
                          Back
                        </Button>
                      )}
                      <Button
                        type="button"
                        onClick={() => nextStep()}
                        disabled={!isStepValid}
                      >
                        Next
                      </Button>
                    </div>
                  </>
                )}
            </div>
          </div>

          {/* Skip button for development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed inset-x-0 bottom-24 z-20 px-6 py-2 bg-transparent pointer-events-none">
              <div className="flex justify-end pointer-events-auto">
                <Button
                  variant="outline"
                  size="default"
                  className="font-mono border-2 border-dashed border-yellow-400 bg-yellow-50 hover:bg-yellow-100 text-yellow-700"
                  onClick={() => {
                    switch (currentStep) {
                      case BookingStep.GETTING_STARTED:
                        nextStep(true)
                        break
                      case BookingStep.CHOOSE_YOUR_SERVICE:
                        nextStep(true)
                        break
                      case BookingStep.SERVICE_SELECTION:
                        form.setValue('serviceCategory', 'default')
                        nextStep(true)
                        break
                      case BookingStep.TELL_US_ABOUT_YOUR_PLACE:
                        nextStep(true)
                        break
                      case BookingStep.CUSTOMER_DETAILS:
                        form.setValue('customer.firstName', 'John')
                        form.setValue('customer.lastName', 'Doe')
                        form.setValue('customer.email', 'john.doe@example.com')
                        form.setValue('customer.phone', '1234567890')
                        nextStep(true)
                        break
                      case BookingStep.ADDRESS_INPUT:
                        form.setValue('customer.address', '123 Main St')
                        form.setValue('customer.city', 'Myrtle Beach')
                        form.setValue('customer.state', 'SC')
                        form.setValue('customer.zipCode', '29577')
                        nextStep(true)
                        break
                      case BookingStep.SIZE_SELECTION:
                        form.setValue('pricingParams.type', 'flat')
                        form.setValue('pricingParams.bedrooms', 2)
                        form.setValue('price', calculatePrice(
                          selectedServiceCategory,
                          selectedFrequency,
                          { type: 'flat', bedrooms: 2 },
                          PRICING_PARAMETERS[location][selectedServiceCategory]
                        ))
                        nextStep(true)
                        break
                      case BookingStep.HOURS_SELECTION:
                        form.setValue('pricingParams.type', 'hourly')
                        form.setValue('pricingParams.hours', 4)
                        form.setValue('price', calculatePrice(
                          selectedServiceCategory,
                          selectedFrequency,
                          { type: 'hourly', hours: 4 },
                          PRICING_PARAMETERS[location][selectedServiceCategory])
                        )
                        nextStep(true)
                        break
                      case BookingStep.SCHEDULE:
                        form.setValue('date', addDays(new Date(), 4))
                        form.setValue('arrivalWindow', '8:00AM - 9:00AM')
                        form.setValue('frequency', 'biweekly')
                        nextStep(true)
                        break
                    }
                  }}
                >
                  Skip →
                </Button>
              </div>
            </div>
          )}

        </>
      ) : (
        <div className="fixed inset-x-0 bottom-0 z-10 h-20">
          <div className="flex size-full items-center justify-between px-6 py-4">
            <GradientButton
              type="submit"
              variant="light"
              onClick={handleSubmit(onSubmit)}
              className="w-full"
              disabled={isSubmitting || !clientSecret}
            >
              {isSubmitting ? 'Processing...' : 'Book'}
            </GradientButton>
          </div>
        </div>
      )}
    </div>
  )
}