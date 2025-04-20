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
import { PRICING_PARAMETERS } from '@/lib/constants'
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

enum BookingStep {
  GETTING_STARTED = 0,
  CHOOSE_YOUR_SERVICE = 1,
  SERVICE_SELECTION = 2,
  TELL_US_ABOUT_YOUR_PLACE = 3,
  SIZE_SELECTION = 4,
  HOURS_SELECTION = 5,
  CUSTOMER_DETAILS = 6,
  ADDRESS_INPUT = 7,
  SCHEDULE = 8,
  CONFIRMATION = 9,
}

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
    zipCode: z.string().min(5, 'ZIP code is required'),
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
  const [step, setStep] = useState<BookingStep>(BookingStep.ADDRESS_INPUT)
  const [progress, setProgress] = useState<{ value: number, max: number }>({ value: 0, max: 6 })
  const prevServiceRef = useRef<BookingServiceCategory | null>(null)
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0])
  const [showAddressFields, setShowAddressFields] = useState(false);

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(BookingFormValidationSchema),
    defaultValues: {
      location,
      serviceCategory: 'default',
      frequency: 'biweekly',
    },
  })

  const { watch, setValue, handleSubmit, getValues, trigger } = form

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
    // if (!isRestoring) {
    //   saveFormState()
    // }

    // Log form values if development mode
    if (process.env.NODE_ENV === 'development') {
      console.log('Form values:', getValues())
    }
  }, [
    step,
    selectedServiceCategory,
    selectedPricingParams,
    selectedDate,
    selectedFrequency,
    selectedArrivalWindow,
    visitedSteps,
  ])

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
    // TOOD: Move to right location after testing
    [BookingStep.ADDRESS_INPUT]: {
      next: () => null,
      prev: () => null,
    },
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
      prev: () => BookingStep.SERVICE_SELECTION,
    },
    [BookingStep.SIZE_SELECTION]: {
      next: () => BookingStep.CUSTOMER_DETAILS,
      prev: () => BookingStep.TELL_US_ABOUT_YOUR_PLACE,
    },
    [BookingStep.HOURS_SELECTION]: {
      next: () => BookingStep.CUSTOMER_DETAILS,
      prev: () => BookingStep.TELL_US_ABOUT_YOUR_PLACE,
    },
    [BookingStep.CUSTOMER_DETAILS]: {
      next: () => BookingStep.SCHEDULE,
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
      }
    },
    [BookingStep.SCHEDULE]: {
      next: () => BookingStep.CONFIRMATION,
      prev: () => BookingStep.CUSTOMER_DETAILS,
    },
    [BookingStep.CONFIRMATION]: {
      next: () => null,
      prev: () => BookingStep.SCHEDULE,
    },
  }


  // Check if current step is valid
  const isCurrentStepValid = () => {
    if (step === BookingStep.GETTING_STARTED)
      return true
    if (step === BookingStep.SERVICE_SELECTION)
      return true

    if (step === BookingStep.SIZE_SELECTION) {
      return selectedPricingParams !== undefined && selectedPricingParams.type === 'flat'
    }

    if (step === BookingStep.HOURS_SELECTION) {
      return selectedPricingParams !== undefined && selectedPricingParams.type === 'hourly'
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

  const nextStep = () => {
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
            && isCurrentStepValid()
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
            {step === BookingStep.GETTING_STARTED && (
              <Card className="max-w-4xl mx-auto rounded-none border-0 shadow-none">
                <CardHeader className="pt-2">
                  <CardTitle className="text-4xl font-medium">
                    Need cleaning?
                    <br />
                    We're here to help
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-12 px-6">
                  <div className="border-b border-neutral-300 pb-8">
                    <div className="flex items-center gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <div className="text-lg font-medium">1</div>
                          <h2 className="text-lg font-medium">Choose your service</h2>
                        </div>
                        <p className="pl-7 text-sm">
                          Select the cleaning type that best fits your situation and your needs.
                        </p>
                      </div>
                      <div className="relative flex-shrink-0 size-20">
                        <Image
                          src="/broom-dustpan.png"
                          alt="Broom and dustpan illustration"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8">
                    <div className="border-b border-neutral-300 pb-8">
                      <div className="flex items-center gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="text-lg font-medium">2</div>
                            <h2 className="text-lg font-medium">Tell us about your place</h2>
                          </div>
                          <p className="pl-7 text-sm">
                            Share some basic info and add any notes, photos, or instructions.
                          </p>
                        </div>
                        <div className="relative flex-shrink-0 size-20">
                          <Image
                            src="/living-room.png"
                            alt="Living room illustration"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-8">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <div className="text-lg font-medium">3</div>
                            <h2 className="text-lg font-medium">Book and relax</h2>
                          </div>
                          <p className="pl-7 text-sm">
                            Pick a time that works, confirm details, and we'll handle the rest.
                          </p>
                        </div>
                        <div className="relative flex-shrink-0 size-20">
                          <Image
                            src="/door.avif"
                            alt="Door illustration"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === BookingStep.CHOOSE_YOUR_SERVICE && (
              <Card className="max-w-4xl mx-auto rounded-none border-0 shadow-none">
                <CardHeader>
                  <div className="text-sm font-medium text-muted-foreground mb-2">Step 1</div>
                  <CardTitle className="text-3xl font-medium">
                    Choose your service
                  </CardTitle>
                  <CardDescription className="text-base mt-4">
                    Let's start with aute elit nostrud magna ut deserunt laborum Lorem duis. Irure velit sunt in aute do officia est proident qui minim nulla mollit.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden pb-[75%]">
                    <Image
                      src="/assets/cleaner.png"
                      alt="House cleaner"
                      fill
                      className="object-contain animate-wiggle"
                      style={{ animationDelay: '200ms' }}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* TODO: Add learn more modal that appears to show additional information about each service */}
            {step === BookingStep.SERVICE_SELECTION && (
              <Card className="max-w-4xl mx-auto rounded-none border-0 shadow-none">
                <CardHeader className="pt-2">
                  <CardTitle>What are we cleaning today?</CardTitle>
                  <CardDescription>
                    Select the type of cleaning service that best fits your needs.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 px-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <BookingFormOption
                      isSelected={selectedServiceCategory === 'default'}
                      onClick={() => handleSelectServiceCategory('default')}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <span className="font-medium">Deep Clean</span>
                          <span className="text-muted-foreground text-xs">Recommended for places that haven't been professionally cleaned and follow up upkeep</span>
                        </div>
                        <div className="size-16 flex-shrink-0">
                          <LottieAnimation
                            className="w-full h-full"
                            animationData={ChecklistAnimation}
                            onPlay={prevServiceRef.current !== 'default' && selectedServiceCategory === 'default' ? () => {} : undefined}
                          />
                        </div>
                      </div>
                    </BookingFormOption>

                    <BookingFormOption
                      isSelected={selectedServiceCategory === 'move-in-out'}
                      onClick={() => handleSelectServiceCategory('move-in-out')}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <span className="font-medium">Move In/Out</span>
                          <span className="text-muted-foreground text-xs">For moving in or out of a property</span>
                        </div>
                        <div className="size-16 flex-shrink-0">
                          <LottieAnimation
                            className="w-full h-full"
                            animationData={HouseCleanAnimation}
                            onPlay={prevServiceRef.current !== 'move-in-out' && selectedServiceCategory === 'move-in-out' ? () => {} : undefined}
                          />
                        </div>
                      </div>
                    </BookingFormOption>

                    <BookingFormOption
                      isSelected={selectedServiceCategory === 'custom'}
                      onClick={() => handleSelectServiceCategory('custom')}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <span className="font-medium">Custom Areas Only</span>
                          <span className="text-muted-foreground text-xs">For specific areas that need attention</span>
                        </div>
                        <div className="size-16 flex-shrink-0">
                          <LottieAnimation
                            className="w-full h-full"
                            animationData={SprayAnimation}
                            onPlay={prevServiceRef.current !== 'custom' && selectedServiceCategory === 'custom' ? () => {} : undefined}
                          />
                        </div>
                      </div>
                    </BookingFormOption>

                    <BookingFormOption
                      isSelected={selectedServiceCategory === 'mansion'}
                      onClick={() => handleSelectServiceCategory('mansion')}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col">
                          <span className="font-medium">Mansion</span>
                          <span className="text-muted-foreground text-xs">For large properties with 4+ bedrooms</span>
                        </div>
                        <div className="size-16 flex-shrink-0">
                          <LottieAnimation
                            animationData={MansionAnimation}
                            onPlay={prevServiceRef.current !== 'mansion' && selectedServiceCategory === 'mansion' ? () => {} : undefined}
                          />
                        </div>
                      </div>
                    </BookingFormOption>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === BookingStep.TELL_US_ABOUT_YOUR_PLACE && (
              <Card className="max-w-4xl mx-auto rounded-none border-0 shadow-none">
                <CardHeader>
                  <div className="text-sm font-medium text-muted-foreground mb-2">Step 2</div>
                  <CardTitle className="text-3xl font-medium">
                    Tell us about your place
                  </CardTitle>
                  <CardDescription className="text-base mt-4">
                    In this step, we'll ask for some quick details about your home—like how many bedrooms you have, and what type of cleaning you're looking for.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0">
                  <div className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden pb-[75%]">
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      playsInline
                      preload="auto"
                      muted
                    >
                      <source src="/videos/property-tour.mp4" type="video/mp4" />
                    </video>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === BookingStep.SIZE_SELECTION && (
              <Card className="rounded-none border-0 shadow-none">
                <CardHeader className="pt-2">
                  <CardTitle>What is the size of your place?</CardTitle>
                  <CardDescription>
                    Select the number of bedrooms in your home to help us estimate the service duration and price.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 px-6">
                  {/* Bedroom Selection */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                      <BookingFormOption
                        isSelected={selectedPricingParams?.type === 'flat' && selectedPricingParams?.bedrooms === 1}
                        onClick={() => handleSelectPricingParameters({ type: 'flat', bedrooms: 1 })}
                      >
                        <div className="relative mb-4 aspect-square size-16">
                          <Image
                            src="/icons/sizes/one-bedroom.svg"
                            alt="One Bedroom"
                            fill
                            className="transition-colors"
                          />
                        </div>
                        <h3 className="text-lg font-medium">One Bedroom</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Up to 1,000 sq ft</p>
                      </BookingFormOption>

                      <BookingFormOption
                        isSelected={selectedPricingParams?.type === 'flat' && selectedPricingParams?.bedrooms === 2}
                        onClick={() => handleSelectPricingParameters({ type: 'flat', bedrooms: 2 })}
                      >
                        <div className="relative mb-4 aspect-square size-16">
                          <Image
                            src="/icons/sizes/two-bedroom.svg"
                            alt="Two Bedroom"
                            fill
                            className="transition-colors"
                          />
                        </div>
                        <h3 className="text-lg font-medium">Two Bedroom</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Up to 1,500 sq ft</p>
                      </BookingFormOption>

                      <BookingFormOption
                        isSelected={selectedPricingParams?.type === 'flat' && selectedPricingParams?.bedrooms === 3}
                        onClick={() => handleSelectPricingParameters({ type: 'flat', bedrooms: 3 })}
                      >
                        <div className="relative mb-4 aspect-square size-16">
                          <Image
                            src="/icons/sizes/three-bedroom.svg"
                            alt="Three Bedroom"
                            fill
                            className="transition-colors"
                          />
                        </div>
                        <h3 className="text-lg font-medium">Three Bedroom</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Up to 2,500 sq ft</p>
                      </BookingFormOption>

                      <BookingFormOption
                        isSelected={selectedPricingParams?.type === 'flat' && selectedPricingParams?.bedrooms === 4}
                        onClick={() => handleSelectPricingParameters({ type: 'flat', bedrooms: 4 })}
                      >
                        <div className="relative mb-4 aspect-square size-16">
                          <Image
                            className="transition-colors"
                            src="/icons/sizes/four-bedroom.svg"
                            alt="Four Bedroom"
                            fill
                          />
                        </div>
                        <h3 className="text-lg font-medium">Four Bedroom</h3>
                        <p className="mt-1 text-sm text-muted-foreground">Up to 3,500 sq ft</p>
                      </BookingFormOption>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === BookingStep.HOURS_SELECTION && (
              <Card className="rounded-none border-0 shadow-none">
                <CardHeader className="pt-2">
                  <CardTitle>Select Service Duration</CardTitle>
                  <CardDescription>
                    Choose how many hours you need for your
                    {' '}
                    {selectedServiceCategory === 'custom' ? 'custom' : selectedServiceCategory === 'mansion' ? 'mansion' : ''}
                    {' '}
                    cleaning service
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                  <FormField
                    control={form.control}
                    name="pricingParams.hours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Number of Hours</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
                            {BookingHourlyPricingParamsSchema.shape.hours.options.map(({ value }) => (
                              <BookingFormOption
                                key={`${value} hours`}
                                isSelected={field.value === value}
                                onClick={() => handleSelectPricingParameters({ type: 'hourly', hours: value })}
                              >
                                <span className="text-center font-medium">{`${value} Hours`}</span>
                              </BookingFormOption>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {step === BookingStep.ADDRESS_INPUT && (
              <Card className="rounded-none border-0 shadow-none">
                <CardHeader className="pt-2">
                  <CardTitle>Where is the cleaning?</CardTitle>
                  <CardDescription>
                    Enter your address to help us find you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-6">
                  <div className="max-w-xl mx-auto">
                    <div className="border rounded-lg overflow-hidden">
                      <FormField
                        control={form.control}
                        name="customer.address"
                        render={({ field }) => (
                          <FormItem className="m-0">
                            <FormControl>
                              <AddressAutocompleteInput
                                value={field.value || ''}
                                showAddressFields={showAddressFields}
                                onChange={(value: string) => {
                                  field.onChange(value);
                                  handleAddressChange(value);
                                }}
                                onPlaceSelected={(place: google.maps.places.PlaceResult) => {
                                  if (place.geometry?.location) {
                                    const lat = place.geometry.location.lat();
                                    const lng = place.geometry.location.lng();
                                    setValue('customer.coordinates', { lat, lng });

                                    // Update city, state, zip based on selected place
                                    const addressComponents = place.address_components || [];
                                    let city = '';
                                    let state = '';
                                    let zipCode = '';

                                    for (const component of addressComponents) {
                                      const types = component.types;
                                      if (types.includes('locality')) {
                                        city = component.long_name;
                                      } else if (types.includes('administrative_area_level_1')) {
                                        state = component.short_name;
                                      } else if (types.includes('postal_code')) {
                                        zipCode = component.long_name;
                                      }
                                    }

                                    setValue('customer.city', city);
                                    setValue('customer.state', state);
                                    setValue('customer.zipCode', zipCode);
                                    setShowAddressFields(true); // Show fields immediately on place selection
                                  }
                                }}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Additional fields container with animation */}
                      <div
                        className={`
                          divide-y border-t
                          transition-all duration-1000 ease-in-out
                          ${showAddressFields
                            ? 'max-h-[500px] opacity-100 transform-none delay-500'
                            : 'max-h-0 opacity-0 pointer-events-none transform translate-y-[-10px]'
                          }
                        `}
                      >
                        {/* Apt field */}
                        <FormField
                          control={form.control}
                          name="customer.apt"
                          render={({ field }) => (
                            <FormItem className="m-0">
                              <FormControl>
                                <Input
                                  label="Apt, suite, unit (if applicable)"
                                  className={cn(
                                    'h-14 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0',
                                    showAddressFields
                                      ? 'opacity-100 transform-none'
                                      : 'opacity-0 transform translate-y-[-10px]',
                                    'transition-[opacity,transform] duration-1000 ease-in-out delay-[800ms]'
                                  )}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* City field */}
                        <FormField
                          control={form.control}
                          name="customer.city"
                          render={({ field }) => (
                            <FormItem className="m-0">
                              <FormControl>
                                <Input
                                  label="City / town"
                                  className={cn(
                                    'h-14 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0',
                                    showAddressFields
                                      ? 'opacity-100 transform-none'
                                      : 'opacity-0 transform translate-y-[-10px]',
                                    'transition-[opacity,transform] duration-1000 ease-in-out delay-[1200ms]'
                                  )}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* State field */}
                        <FormField
                          control={form.control}
                          name="customer.state"
                          render={({ field }) => (
                            <FormItem className="m-0">
                              <FormControl>
                                <Input
                                  label="State / territory"
                                  className={cn(
                                    'h-14 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0',
                                    showAddressFields
                                      ? 'opacity-100 transform-none'
                                      : 'opacity-0 transform translate-y-[-10px]',
                                    'transition-[opacity,transform] duration-1000 ease-in-out delay-[1600ms]'
                                  )}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />

                        {/* ZIP field */}
                        <FormField
                          control={form.control}
                          name="customer.zipCode"
                          render={({ field }) => (
                            <FormItem className="m-0">
                              <FormControl>
                                <Input
                                  label="ZIP code"
                                  className={cn(
                                    'h-14 border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0',
                                    showAddressFields
                                      ? 'opacity-100 transform-none'
                                      : 'opacity-0 transform translate-y-[-10px]',
                                    'transition-[opacity,transform] duration-1000 ease-in-out delay-[2000ms]'
                                  )}
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Map */}
                    <div className="w-full h-[300px] mt-6 rounded-lg overflow-hidden">
                      <MapWithMarker
                        coordinates={customerCoordinates}
                        address={constructFullAddress({
                          address: customerAddress,
                          apt: customerApt,
                          city: customerCity,
                          state: customerState,
                          zipCode: customerZipCode,
                        })}
                        onPositionChange={(position: Coordinates) => {
                          setValue('customer.coordinates', position);

                          // Use reverse geocoding to update address fields
                          const geocoder = new google.maps.Geocoder();
                          geocoder.geocode({ location: position }, (results, status) => {
                            if (status === 'OK' && results && results.length > 0) {
                              const place = results[0];
                              if (place && place.formatted_address) {
                                setValue('customer.address', place.formatted_address);
                              }

                              // Update city, state, zip
                              if (place && place.address_components) {
                                let cityVal = '';
                                let stateVal = '';
                                let zipVal = '';

                                for (const component of place.address_components) {
                                  const types = component.types;
                                  if (types.includes('locality')) {
                                    cityVal = component.long_name;
                                  } else if (types.includes('administrative_area_level_1')) {
                                    stateVal = component.short_name;
                                  } else if (types.includes('postal_code')) {
                                    zipVal = component.long_name;
                                  }
                                }

                                setValue('customer.city', cityVal);
                                setValue('customer.state', stateVal);
                                setValue('customer.zipCode', zipVal);
                                setShowAddressFields(true); // Show additional fields when map marker is moved
                              }
                            }
                          });
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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

            {step === BookingStep.CUSTOMER_DETAILS && (
              <Card className="rounded-none border-0 shadow-none">
                <CardHeader className="pt-2">
                  <CardTitle>Your Information</CardTitle>
                  <CardDescription>
                    Enter your contact and address details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="customer.firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input label="First Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customer.lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input label="Last Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="customer.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input label="Email" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="customer.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input label="Phone Number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
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
                            <Button type="button" onClick={nextStep}>
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
