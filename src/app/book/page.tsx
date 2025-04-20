'use client'

import type { Location } from '@/lib/types'
import type {
  BookingFrequency,
  BookingPricingParams,
  BookingServiceCategory,
  BookingFormData,
} from './types'
import { BookingFormSchema } from './types'
import { GradientButton } from '@/components/GradientButton'
import { Button } from '@/components/ui/button'
import {
  Form
} from '@/components/ui/form'
import { Progress } from '@/components/ui/progress'
import { PRICING_PARAMETERS } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, isBefore } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { STEP_COMPONENTS } from './components/steps'
import { BookingStep } from './types'

// Add this helper function at the top level
const loadGoogleMapsScript = (callback: () => void) => {
  if (window.google) {
    callback();
    return;
  }

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  document.head.appendChild(script);
};

export default function BookingPage() {
  const router = useRouter()
  const [location] = useState<Location>('MYRTLE_BEACH')
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.GETTING_STARTED)
  const [progress, setProgress] = useState<{ value: number, max: number }>({ value: 0, max: 6 })
  const prevServiceRef = useRef<BookingServiceCategory | null>(null)
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0])
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [isStepValid, setIsStepValid] = useState(true)
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)
  const [isLoadingMaps, setIsLoadingMaps] = useState(false)

  const form = useForm<BookingFormData>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      location,
      serviceCategory: 'default',
      frequency: 'biweekly',
    },
  })

  const { watch, setValue, handleSubmit, getValues, trigger, formState: { errors } } = form

  const updatePrice = (
    serviceCategory: BookingServiceCategory,
    pricingParams: BookingPricingParams,
    frequency: BookingFrequency,
  ) => {
    setValue('price', calculatePrice(
      location,
      serviceCategory,
      frequency,
      pricingParams,
    ))
  }

  // Watch form values for price calculation
  const selectedFrequency = watch('frequency')
  const selectedServiceCategory = watch('serviceCategory') as BookingFormData['serviceCategory']
  const selectedPricingParams = watch('pricingParams') as BookingFormData['pricingParams']
  const selectedDate = watch('date') as BookingFormData['date']
  const selectedArrivalWindow = watch('arrivalWindow') as BookingFormData['arrivalWindow']
  const price = watch('price')
  const customerAddress = watch('customer.address')
  const customerApt = watch('customer.apt')
  const customerCity = watch('customer.city')
  const customerState = watch('customer.state')
  const customerZipCode = watch('customer.zipCode')
  const customerCoordinates = watch('customer.coordinates')

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
      console.log('Form values:', getValues())
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
      return trigger([
        'customer.firstName',
        'customer.lastName',
        'customer.email',
        'customer.phone',
      ])
    }

    if (currentStep === BookingStep.ADDRESS_INPUT) {
      return trigger([
        'customer.address',
        'customer.city',
        'customer.state',
        'customer.zipCode',
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

  const nextStep = async () => {
    const isValid = await isCurrentStepValid()
    if (!isValid) return

    const nextStepNumber = getNextStepNumber()
    if (nextStepNumber !== null) {
      // If next step is ADDRESS_INPUT and Google Maps isn't loaded yet
      if (nextStepNumber === BookingStep.ADDRESS_INPUT && !isGoogleMapsLoaded && !isLoadingMaps) {
        setIsLoadingMaps(true);
        loadGoogleMapsScript(() => {
          setIsGoogleMapsLoaded(true);
          setIsLoadingMaps(false);
          setCurrentStep(nextStepNumber);
          setProgress({ ...progress, value: progress.value + 1 });
          setVisitedSteps(prev => [...new Set([...prev, nextStepNumber])]);
        });
        return;
      }

      setCurrentStep(nextStepNumber)
      setProgress({ ...progress, value: progress.value + 1 })
      setVisitedSteps(prev => [...new Set([...prev, nextStepNumber])])
    }
  }

  const onSubmit = (data: BookingFormData) => {
    console.log('Form submitted:', data)
    // Clear session storage on successful submission
    sessionStorage.removeItem('bookingFormState')
    // In a real app, we would submit this data to an API
    alert('Booking submitted! Check console for details.')
  }

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (currentStep === BookingStep.GETTING_STARTED)
        return

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
          return
        }

        if (event.key === '[' || event.key === 'ArrowLeft') {
          event.preventDefault()
          prevStep()
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
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, router, visitedSteps])

  function calculatePrice(
    location: Location,
    serviceCategory: BookingServiceCategory,
    frequency: BookingFrequency,
    params: BookingPricingParams,
  ): BookingFormData['price'] {
    const config = PRICING_PARAMETERS[location][serviceCategory]
    if (!config) throw new Error(`No pricing config found for ${location} ${serviceCategory}`)

    if (process.env.NODE_ENV === 'development') {
      console.log('params', params)
      console.log('pricing', config)
    }

    switch (config.type) {
      case 'flat': {
        if (params.type === 'flat') {
          const initial = config.bedrooms[params.bedrooms]
          if (typeof initial !== 'number') throw new Error(`Invalid price for ${params.bedrooms} bedrooms`)

          const recurring = frequency && config.frequencies && config.frequencies[frequency]
            ? initial * (1 - config.frequencies[frequency])
            : null

          return {
            initial,
            recurring,
          }
        }
        else {
          throw new Error('Mismatch pricing types')
        }
      }
      case 'hourly': {
        if (params.type === 'hourly') {
          const initial = config.hourlyRate * params.hours
          const recurring = frequency && config.frequencies && config.frequencies[frequency]
            ? initial * (1 - config.frequencies[frequency])
            : null

          return {
            initial,
            recurring,
          }
        }
        else {
          throw new Error('Mismatch pricing types')
        }
      }
    }
  }

  const handleSelectServiceCategory = (serviceCategory: BookingServiceCategory) => {
    setValue('serviceCategory', serviceCategory)

    const config = PRICING_PARAMETERS[location][serviceCategory]
    if (!config) throw new Error(`No pricing config found for ${location} ${serviceCategory}`)

    switch (config.type) {
      case 'hourly':
        setProgress({ ...progress, max: 6 })
        break
      case 'flat':
        setProgress({ ...progress, max: 5 })
        break
    }
  }

  const handleSelectPricingParameters = (params: BookingPricingParams) => {
    setValue('pricingParams', params)
    if (selectedServiceCategory && selectedFrequency) {
      updatePrice(selectedServiceCategory, params, selectedFrequency)
    }
  }

  const isDateDisabled = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Disable past dates
    if (isBefore(date, today)) {
      return true
    }

    // Prevent booking without at least 2 days notice
    const twoDaysFromNow = addDays(today, 2)
    twoDaysFromNow.setHours(0, 0, 0, 0)

    if (!isBefore(date, today) && isBefore(date, twoDaysFromNow)) {
      return true
    }

    return false
  }

  // Format price for display
  const formatPrice = (price: number | null | undefined) => {
    return `$${price?.toFixed(0) ?? ''}`
  }

  const handleStepValidityChange = (isValid: boolean) => {
    setIsStepValid(isValid)
  }

  const CurrentStepComponent = STEP_COMPONENTS[currentStep]

  // TODO: Handle step not found
  if (!CurrentStepComponent) {
    return <div>Step not found</div>
  }

  return (
    <div className="relative min-h-screen pb-24">
      <div className="p-6">
        <Button variant="outline" size="default" asChild className="rounded-full px-5">
          <Link href={ROUTES.HOME.href}>
            Exit
          </Link>
        </Button>
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

      {/* Show bottom navigation bar on all steps */}
      <div className="fixed inset-x-0 bottom-20 z-10 bg-white">
        {/* Progress bar - show on all steps */}
        <Progress
          className="h-2 w-full rounded-none"
          segments={progress.max}
          value={progress.value}
        />
      </div>

      {/* Navigation and pricing */}
      <div className="fixed inset-x-0 bottom-0 z-10 h-20 bg-white shadow-md">
        <div className="flex size-full items-center justify-between px-6 py-4">
          {currentStep === BookingStep.GETTING_STARTED
            ? (
                <GradientButton
                  type="button"
                  onClick={nextStep}
                  className="w-full"
                >
                  Get started
                </GradientButton>
              )
            : (
                <>
                  <div className="flex items-center gap-4">
                    {canShowPrice() && (
                      <div className="flex flex-col justify-center">
                        <div className="text-lg font-medium">
                          {formatPrice(price.initial)}
                        </div>
                        {price.recurring && (
                          <div className="text-muted-foreground text-sm">
                            {selectedFrequency !== 'one-time'
                              ? `${formatPrice(price.recurring)} for recurring cleanings`
                              : ''}
                          </div>
                        )}
                      </div>
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
                    {currentStep < Object.keys(STEP_TRANSITIONS).length
                      ? (
                          <Button
                            type="button"
                            onClick={nextStep}
                            disabled={!isStepValid}
                          >
                            Next
                          </Button>
                        )
                      : (
                          <Button type="button" onClick={() => handleSubmit(onSubmit)()}>
                            Book
                          </Button>
                        )}
                  </div>
                </>
              )}
        </div>
      </div>
    </div>
  )
}