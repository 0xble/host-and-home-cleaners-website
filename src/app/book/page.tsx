'use client'

import type { Location } from '@/lib/types'
import type { BookingFrequency, BookingPricingParams, BookingServiceCategory } from './types'
import { BookingFormOption } from '@/components/BookingFormOption'
import { GradientButton } from '@/components/GradientButton'
import LottieAnimation from '@/components/LottieAnimation'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PRICING_PARAMETERS, LOCATIONS } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import { LocationSchema } from '@/lib/types'
import HouseCleanAnimation from '@/public/lottie/house-clean.json'
import ChecklistAnimation from '@/public/lottie/checklist.json'
import MansionAnimation from '@/public/lottie/mansion.json'
import SprayAnimation from '@/public/lottie/spray.json'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, isBefore } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { BookingArrivalWindowSchema, BookingFrequencySchema, BookingHourlyPricingParamsSchema, BookingPricingParamsSchema, BookingServiceCategorySchema } from './types'
import { LoadScript, LoadScriptProps } from '@react-google-maps/api'
import { AddressAutocompleteInput } from './components/AddressAutocompleteInput'
import { MapWithMarker, type Coordinates } from './components/MapWithMarker'
import { cn } from '@/lib/utils'
import { constructFullAddress } from './utils'
import { STEP_COMPONENTS } from './components/steps'
import { BookingStep } from './types/steps'

const BookingFormValidationSchema = z.object({
  location: LocationSchema,
  serviceCategory: BookingServiceCategorySchema,
  frequency: BookingFrequencySchema,
  date: z.date(),
  arrivalWindow: BookingArrivalWindowSchema,
  customer: z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number is required'),
    address: z.string().min(1, 'Address is required'),
    apt: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string()
      .min(5, 'ZIP code is required')
      .refine(
        (zip) => Object.values(LOCATIONS).some(
          location => (location as unknown as { zipCodes: string[] }).zipCodes.includes(zip)
        ),
        'Sorry, looks like we\'re not in your area. Please try another ZIP code.'
      ),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }).optional(),
  }),
  pricingParams: BookingPricingParamsSchema,
  price: z.object({
    initial: z.number(),
    recurring: z.number().nullable().optional(),
  }),
})

type BookingFormValid = z.infer<typeof BookingFormValidationSchema>

const BookingFormStateSchema = BookingFormValidationSchema.partial()
type BookingFormState = z.infer<typeof BookingFormStateSchema>

// const BookingFormStorageSchema = z.object({
//   formData: BookingFormStateSchema,
//   step: z.object({ current: z.number(), total: z.number() }),
//   visitedSteps: z.array(z.number()),
// })

// type BookingFormStorage = z.infer<typeof BookingFormStorageSchema>

// Define step transitions in a single place
export default function BookingPage() {
  const router = useRouter()
  const [location] = useState<Location>('MYRTLE_BEACH')
  const [step, setStep] = useState<BookingStep>(BookingStep.GETTING_STARTED)
  const [progress, setProgress] = useState<{ value: number, max: number }>({ value: 0, max: 6 })
  const prevServiceRef = useRef<BookingServiceCategory | null>(null)
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0])
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [isStepValid, setIsStepValid] = useState(true)

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(BookingFormValidationSchema),
    defaultValues: {
      location,
      serviceCategory: 'default',
      frequency: 'biweekly',
    },
    mode: "onTouched",
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
  const selectedServiceCategory = watch('serviceCategory') as BookingFormState['serviceCategory']
  const selectedPricingParams = watch('pricingParams') as BookingFormState['pricingParams']
  const selectedDate = watch('date') as BookingFormState['date']
  const selectedArrivalWindow = watch('arrivalWindow') as BookingFormState['arrivalWindow']
  const price = watch('price')
  const customerAddress = watch('customer.address')
  const customerApt = watch('customer.apt')
  const customerCity = watch('customer.city')
  const customerState = watch('customer.state')
  const customerZipCode = watch('customer.zipCode')
  const customerCoordinates = watch('customer.coordinates')

  // // Save form state to sessionStorage
  // const saveFormState = (data = getValues()) => {
  //   if (step.current > 0) {
  //     const stateToSave = {
  //       formData: data,
  //       step: { current: step.current, total: step.total },
  //       visitedSteps,
  //     }

  //     sessionStorage.setItem('bookingFormState', JSON.stringify(stateToSave))
  //   }
  // }

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
    step,
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

  // Restore form state on component mount
  useEffect(() => {
    // TODO:
    // const savedState = sessionStorage.getItem('bookingFormState')
    // if (savedState) {
    //   try {
    //     const { formData, step: savedStep, visitedSteps: savedSteps } = JSON.parse(savedState) as BookingFormStorage

    //     // Restore date as Date object (it's stored as string in JSON)
    //     if (formData.date) {
    //       formData.date = new Date(formData.date)
    //     }

    //     // Restore form values
    //     let hasError = false
    //     for (const [key, value] of Object.entries(formData)) {
    //       if (key in form) {
    //         setValue(key as keyof BookingFormValid, value as BookingFormValid[keyof BookingFormValid])
    //       }
    //       else {
    //         // If out-of-date or invalid, reset the form
    //         hasError = true
    //         reset()
    //         break
    //       }
    //     }

    //     if (!hasError) {
    //       // Restore UI state
    //       setStep(savedStep)
    //       setVisitedSteps(savedSteps)
    //     }
    //   }
    //   catch (error) {
    //     console.error('Error restoring form state:', error)
    //     // If there's an error, clear the invalid state
    //     sessionStorage.removeItem('bookingFormState')
    //   }
    // }
    // setIsRestoring(false)
  }, [])

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
        if (selectedServiceCategory) {
          const config = PRICING_PARAMETERS[location][selectedServiceCategory]
          switch (config.type) {
            case 'flat':
              return BookingStep.SIZE_SELECTION
            case 'hourly':
              return BookingStep.HOURS_SELECTION
          }
        }
        return null
      },
      prev: () => BookingStep.ADDRESS_INPUT,
    },
    [BookingStep.SIZE_SELECTION]: {
      next: () => BookingStep.CUSTOMER_DETAILS,
      prev: () => BookingStep.TELL_US_ABOUT_YOUR_PLACE,
    },
    [BookingStep.HOURS_SELECTION]: {
      next: () => BookingStep.CUSTOMER_DETAILS,
      prev: () => BookingStep.TELL_US_ABOUT_YOUR_PLACE,
    },
    [BookingStep.SCHEDULE]: {
      next: () => BookingStep.CONFIRMATION,
      prev: () => {
        if (selectedServiceCategory) {
          const config = PRICING_PARAMETERS[location][selectedServiceCategory]
          switch (config.type) {
            case 'flat':
              return BookingStep.SIZE_SELECTION
            case 'hourly':
              return BookingStep.HOURS_SELECTION
          }
        }
        return null
      },
    },
    [BookingStep.CONFIRMATION]: {
      next: () => null,
      prev: () => BookingStep.SCHEDULE,
    },
  }


  // Check if current step is valid
  const isCurrentStepValid = async () => {
    if (step === BookingStep.GETTING_STARTED)
      return true
    if (step === BookingStep.CHOOSE_YOUR_SERVICE)
      return true
    if (step === BookingStep.TELL_US_ABOUT_YOUR_PLACE)
      return true

    if (step === BookingStep.SERVICE_SELECTION) {
      return selectedServiceCategory !== undefined
    }

    if (step === BookingStep.SIZE_SELECTION) {
      return selectedPricingParams?.type === 'flat' && selectedPricingParams?.bedrooms != null
    }

    if (step === BookingStep.HOURS_SELECTION) {
      return selectedPricingParams?.type === 'hourly' && selectedPricingParams?.hours != null
    }

    if (step === BookingStep.SCHEDULE) {
      const date = getValues('date')
      const arrivalWindow = getValues('arrivalWindow')
      const frequency = getValues('frequency')
      return date !== null && arrivalWindow !== undefined && frequency !== undefined
    }

    if (step === BookingStep.CUSTOMER_DETAILS) {
      return trigger([
        'customer.firstName',
        'customer.lastName',
        'customer.email',
        'customer.phone',
      ])
    }

    if (step === BookingStep.ADDRESS_INPUT) {
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
    const currentStep = step
    const transition = STEP_TRANSITIONS[currentStep]

    if (!transition) return null

    return transition.next()
  }

  const getPrevStepNumber = () => {
    const currentStep = step
    const transition = STEP_TRANSITIONS[currentStep]

    if (!transition) return null

    return transition.prev()
  }

  const prevStep = () => {
    const prevStepNumber = getPrevStepNumber()
    if (prevStepNumber !== null) {
      setStep(prevStepNumber)
      setProgress({ ...progress, value: progress.value - 1 })
    }
  }

  const nextStep = async () => {
    const isValid = await isCurrentStepValid()
    if (!isValid) return

    const nextStepNumber = getNextStepNumber()
    if (nextStepNumber !== null) {
      setStep(nextStepNumber)
      setProgress({ ...progress, value: progress.value + 1 })
      setVisitedSteps(prev => [...new Set([...prev, nextStepNumber])])
    }
  }

  const onSubmit = (data: BookingFormValid) => {
    console.log('Form submitted:', data)
    // Clear session storage on successful submission
    sessionStorage.removeItem('bookingFormState')
    // In a real app, we would submit this data to an API
    alert('Booking submitted! Check console for details.')
  }

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (step === BookingStep.GETTING_STARTED)
        return

      event.preventDefault()
      prevStep()
    }

    if (step > BookingStep.GETTING_STARTED) {
      window.history.pushState(null, '', window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [step])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)
      const modifierKey = isMac ? event.metaKey : event.altKey

      if (modifierKey) {
        // At step 0, let the browser handle back navigation normally
        if (step === BookingStep.GETTING_STARTED && (event.key === '[' || event.key === 'ArrowLeft')) {
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
            step
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
  }, [step, router, visitedSteps])

  function calculatePrice(
    location: Location,
    serviceCategory: BookingServiceCategory,
    frequency: BookingFrequency,
    params: BookingPricingParams,
  ): BookingFormValid['price'] {
    const config = PRICING_PARAMETERS[location][serviceCategory]

    if (process.env.NODE_ENV === 'development') {
      console.log('params', params)
      console.log('pricing', config)
    }

    switch (config.type) {
      case 'flat': {
        if (params.type === 'flat') {
          const initial = config.bedrooms[params.bedrooms]
          const recurring = frequency && config.frequencies ? initial * (1 - config.frequencies[frequency]) : undefined
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
          const recurring = frequency && config.frequencies ? initial * (1 - config.frequencies[frequency]) : undefined
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

  // Libraries for Google Maps
  const libraries = React.useMemo<LoadScriptProps['libraries']>(() => ['places'], []);

  const handleAddressChange = useCallback((value: string) => {
    if (value && value.length > 5) {
      // Show fields after a slight delay
      const timer = setTimeout(() => {
        setShowAddressFields(true);
      }, 500);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  const handleStepValidityChange = (isValid: boolean) => {
    setIsStepValid(isValid)
  }

  const CurrentStepComponent = STEP_COMPONENTS[step]

  return (
    <div className="relative min-h-screen pb-24">
      <LoadScript
        googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
        libraries={libraries}
        loadingElement={<div>Loading Maps...</div>}
      >
        <div className="p-6">
          <Button variant="outline" size="default" asChild className="rounded-full px-5">
            <Link href={ROUTES.HOME.href}>
              Exit
            </Link>
          </Button>
        </div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {CurrentStepComponent ? (
              <CurrentStepComponent
                form={form}
                onValidityChange={handleStepValidityChange}
              />
            ) : (
              // Render your existing non-modularized steps here
              <>
                {step === BookingStep.SCHEDULE && (
                  <Card className="rounded-none border-0 shadow-none">
                    <CardHeader className="pt-2">
                      <CardTitle>Schedule Your Cleaning</CardTitle>
                      <CardDescription>
                        Select a date, time, and frequency for your service
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6 px-6">
                      <FormField
                        control={form.control}
                        name="date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Choose a Date</FormLabel>
                            <FormDescription>
                              Select an available date.
                            </FormDescription>
                            <Calendar
                              mode="single"
                              selected={selectedDate || undefined}
                              onSelect={date => date && field.onChange(date)}
                              disabled={isDateDisabled}
                              className="mx-auto rounded-md border"
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {selectedDate && (
                        <FormField
                          control={form.control}
                          name="arrivalWindow"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Arrival Window</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="pointer-events-auto z-20">
                                    <SelectValue placeholder="Select an arrival window" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="8:00AM - 9:00AM">8:00AM - 9:00AM</SelectItem>
                                  <SelectItem value="12:00PM - 1:00PM">12:00PM - 1:00PM</SelectItem>
                                  <SelectItem value="3:00PM - 4:00PM">3:00PM - 4:00PM</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      {(selectedServiceCategory && selectedPricingParams && selectedServiceCategory !== 'move-in-out') && (
                        <FormField
                          control={form.control}
                          name="frequency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Frequency</FormLabel>
                              <Select
                                onValueChange={(value: BookingFrequency) => {
                                  field.onChange(value)
                                  if (selectedServiceCategory && selectedPricingParams) {
                                    updatePrice(selectedServiceCategory, selectedPricingParams, value)
                                  }
                                }}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="pointer-events-auto z-20">
                                    <SelectValue placeholder="Select frequency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="weekly">Weekly</SelectItem>
                                  <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                                  <SelectItem value="monthly">Monthly</SelectItem>
                                  <SelectItem value="one-time">One-Time</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                    </CardContent>
                  </Card>
                )}
              </>
            )}
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
            {step === BookingStep.GETTING_STARTED
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
                      {step > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                        >
                          Back
                        </Button>
                      )}
                      {step < Object.keys(STEP_TRANSITIONS).length
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
      </LoadScript>
    </div>
  )
}
