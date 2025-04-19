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
import { Spinner } from '@/components/ui/spinner'
import { PRICING_PARAMETERS } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import { LocationSchema } from '@/lib/types'
import HouseCleanAnimation from '@/public/lottie/house-clean.json'
import MansionAnimation from '@/public/lottie/mansion.json'
import SprayAnimation from '@/public/lottie/spray.json'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, isBefore } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { BookingArrivalWindowSchema, BookingFrequencySchema, BookingHourlyPricingParamsSchema, BookingPricingParamsSchema, BookingServiceCategorySchema } from './types'

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
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zipCode: z.string().min(5, 'ZIP code is required'),
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

const BookingFormStorageSchema = z.object({
  formData: BookingFormStateSchema,
  step: z.object({ current: z.number(), total: z.number() }),
  visitedSteps: z.array(z.number()),
})

type BookingFormStorage = z.infer<typeof BookingFormStorageSchema>

export default function BookingPage() {
  const router = useRouter()
  const [location] = useState<Location>('MYRTLE_BEACH')
  const [step, setStep] = useState({ current: 0, total: 3 })
  const prevServiceRef = useRef<BookingServiceCategory | null>(null)
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0])
  const [isRestoring, setIsRestoring] = useState(true)

  // Initialize form with default values
  const form = useForm({
    resolver: zodResolver(BookingFormValidationSchema),
    defaultValues: {
      location,
      serviceCategory: 'default',
      frequency: 'biweekly',
    },
  })

  const { watch, setValue, handleSubmit, getValues, trigger, reset } = form

  // Watch form values for price calculation
  const selectedFrequency = watch('frequency')
  const selectedServiceCategory = watch('serviceCategory') as BookingFormState['serviceCategory']
  const selectedPricingParams = watch('pricingParams') as BookingFormState['pricingParams']
  const selectedDate = watch('date') as BookingFormState['date']
  const selectedArrivalWindow = watch('arrivalWindow') as BookingFormState['arrivalWindow']
  const price = watch('price')

  // Save form state to sessionStorage
  const saveFormState = (data = getValues()) => {
    if (step.current > 0) {
      const stateToSave = {
        formData: data,
        step: { current: step.current, total: step.total },
        visitedSteps,
      }

      sessionStorage.setItem('bookingFormState', JSON.stringify(stateToSave))
    }
  }

  // Update price when form values change
  const updatePrice = (
    serviceCategory: BookingServiceCategory,
    frequency: BookingFrequency,
    pricingParams: BookingPricingParams,
  ) => {
    setValue('price', calculatePrice(location, serviceCategory, frequency, pricingParams))
  }

  // Save form state when values change
  useEffect(() => {
    if (!isRestoring) {
      saveFormState()
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
    const savedState = sessionStorage.getItem('bookingFormState')
    if (savedState) {
      try {
        const { formData, step: savedStep, visitedSteps: savedSteps } = JSON.parse(savedState) as BookingFormStorage

        // Restore date as Date object (it's stored as string in JSON)
        if (formData.date) {
          formData.date = new Date(formData.date)
        }

        // Restore form values
        for (const [key, value] of Object.entries(formData)) {
          if (key in form) {
            setValue(key as keyof BookingFormValid, value as BookingFormValid[keyof BookingFormValid])
          }
          else {
            // If out-of-date or invalid, reset the form
            reset()
            break
          }
        }

        // Restore UI state
        setStep(savedStep)
        setVisitedSteps(savedSteps)

        // Update price calculations
        if (formData.serviceCategory && formData.frequency && formData.pricingParams) {
          updatePrice(
            formData.serviceCategory,
            formData.frequency,
            formData.pricingParams,
          )
        }
      }
      catch (error) {
        console.error('Error restoring form state:', error)
        // If there's an error, clear the invalid state
        sessionStorage.removeItem('bookingFormState')
      }
    }
    setIsRestoring(false)
  }, [])

  // Check if current step is valid
  const isCurrentStepValid = () => {
    // Step 0 is always valid
    if (step.current === 0)
      return true

    // Step 1: Service Selection
    if (step.current === 1) {
      const serviceCategory = getValues('serviceCategory')
      const pricingParams = getValues('pricingParams')
      return serviceCategory !== undefined && pricingParams !== undefined
    }

    // Step 2: Hours Selection (for hourly services only)
    if (step.current === 2 && (selectedServiceCategory === 'custom' || selectedServiceCategory === 'mansion')) {
      const pricingParams = getValues('pricingParams')
      return pricingParams !== undefined && pricingParams.type === 'hourly'
    }

    // Step 3: Schedule
    if (step.current === 3) {
      const date = getValues('date')
      const arrivalWindow = getValues('arrivalWindow')
      const frequency = getValues('frequency')
      return date !== null && arrivalWindow !== undefined && frequency !== undefined
    }

    // Step 4: Customer Details
    if (step.current === 4) {
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

    // Default case
    return false
  }

  const getNextStepNumber = () => {
    if (step.current === 0)
      return 1
    if (step.current === 5)
      return null

    if (selectedPricingParams?.type === 'hourly') {
      if (step.current === 1)
        return 2
      if (step.current === 2)
        return 3
      if (step.current === 3)
        return 4
      if (step.current === 4)
        return 5
    }
    else {
      if (step.current === 1)
        return 2
      if (step.current === 2)
        return 4
      if (step.current === 4)
        return 5
    }

    return null
  }

  const onSubmit = (data: BookingFormValid) => {
    console.log('Form submitted:', data)
    // Clear session storage on successful submission
    sessionStorage.removeItem('bookingFormState')
    // In a real app, we would submit this data to an API
    alert('Booking submitted! Check console for details.')
  }

  const prevStep = () => {
    if (step.current === 1) {
      setStep({ ...step, current: 0 })
      return
    }

    if (selectedServiceCategory === 'custom' || selectedServiceCategory === 'mansion') {
      if (step.current === 2) {
        setStep({ ...step, current: 1 })
      }
      else if (step.current === 3) {
        setStep({ ...step, current: 2 })
      }
      else if (step.current === 4) {
        setStep({ ...step, current: 3 })
      }
      else if (step.current === 5) {
        setStep({ ...step, current: 4 })
      }
    }
    else {
      if (step.current === 2) {
        setStep({ ...step, current: 1 })
      }
      else if (step.current === 4) {
        setStep({ ...step, current: 2 })
      }
      else if (step.current === 5) {
        setStep({ ...step, current: 4 })
      }
    }
  }

  const nextStep = () => {
    const nextStepNumber = getNextStepNumber()
    if (nextStepNumber !== null) {
      setStep({ ...step, current: nextStepNumber })
      setVisitedSteps(prev => [...new Set([...prev, nextStepNumber])])
    }
  }

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (step.current === 0)
        return

      event.preventDefault()
      prevStep()
    }

    if (step.current > 0) {
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
        if (step.current === 0 && (event.key === '[' || event.key === 'ArrowLeft')) {
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
            step.current > 0
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
    const pricing = PRICING_PARAMETERS[location][serviceCategory]

    switch (pricing.type) {
      case 'flat': {
        if (params.type === 'flat') {
          const initial = pricing.bedrooms[params.bedrooms]
          const recurring = frequency && pricing.frequencies ? initial * (1 - pricing.frequencies[frequency]) : undefined
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
          const initial = pricing.hourlyRate * params.hours
          const recurring = frequency && pricing.frequencies ? initial * (1 - pricing.frequencies[frequency]) : undefined
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

  const handleSelectServiceCategory = (
    serviceCategory: BookingServiceCategory,
    pricingParams: BookingPricingParams | null,
  ) => {
    setValue('serviceCategory', serviceCategory)
    if (pricingParams) {
      setValue('pricingParams', pricingParams)
      updatePrice(serviceCategory, selectedFrequency, pricingParams)
    }
    else {
      // Reset fields
      setValue('pricingParams', undefined as any)
      setValue('price', undefined as any)
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

  // Format price for display
  const formatPrice = (price: number | null | undefined) => {
    return `$${price?.toFixed(0) ?? ''}`
  }

  return (
    <div className="relative min-h-screen pb-24">
      {/* Show a loading indicator while restoring state */}
      {isRestoring && (
        <div className="fixed inset-0 bg-background/80 flex items-center justify-center z-50">
          <Spinner />
        </div>
      )}

      <div className="p-6">
        <Button variant="outline" size="default" asChild className="rounded-full px-5">
          <Link href={ROUTES.HOME.href}>
            Exit
          </Link>
        </Button>
      </div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 0: Overview */}
          {step.current === 0 && (
            <Card className="max-w-4xl mx-auto rounded-none border-0 shadow-none">
              <CardHeader className="px-6 pt-6">
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

          {/* Step 1: First Step Card */}
          {step.current === 1 && (
            <Card className="max-w-4xl mx-auto rounded-none border-0 shadow-none">
              <CardHeader className="px-6 pt-6">
                <div className="text-sm font-medium text-muted-foreground mb-2">Step 1</div>
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

          {/* Step 2: Service Selection */}
          {step.current === 2 && (
            <Card className="rounded-none border-0 shadow-none">
              <CardHeader className="px-6 pt-6">
                <CardTitle>What is the size of the house?</CardTitle>
                <CardDescription>
                  A standard deep cleaning covers all areas of the house, including bathrooms, kitchens, and living areas.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 px-6">
                {/* Bedroom Selection */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <BookingFormOption
                      isSelected={selectedPricingParams?.type === 'flat' && selectedPricingParams?.bedrooms === 1}
                      onClick={() => handleSelectServiceCategory('default', { type: 'flat', bedrooms: 1 })}
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
                      onClick={() => handleSelectServiceCategory('default', { type: 'flat', bedrooms: 2 })}
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
                      onClick={() => handleSelectServiceCategory('default', { type: 'flat', bedrooms: 3 })}
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
                      onClick={() => handleSelectServiceCategory('default', { type: 'flat', bedrooms: 4 })}
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

                <div className="relative flex items-center py-2">
                  <div className="grow border-t border-neutral-400"></div>
                  <span className="mx-4 shrink text-muted-foreground">OR</span>
                  <div className="grow border-t border-neutral-400"></div>
                </div>

                {/* Specialized Services */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Do you need a specialized cleaning?</h3>
                  <p className="text-muted-foreground text-sm">Select one of our specialized cleaning options</p>

                  <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
                    <BookingFormOption
                      isSelected={selectedServiceCategory === 'move-in-out'}
                      onClick={() => {
                        handleSelectServiceCategory('move-in-out', null)
                      }}
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
                      onClick={() => handleSelectServiceCategory('custom', null)}
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
                      onClick={() => handleSelectServiceCategory('mansion', null)}
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
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Hours Selection (For hourly services only) */}
          {step.current === 3 && (selectedServiceCategory === 'custom' || selectedServiceCategory === 'mansion') && (
            <Card className="rounded-none border-0 shadow-none">
              <CardHeader className="px-6 pt-6">
                <CardTitle>Select Service Duration</CardTitle>
                <CardDescription>
                  Choose how many hours you need for your
                  {' '}
                  {selectedServiceCategory}
                  {' '}
                  service
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
                              onClick={() => {
                                field.onChange(value)
                                updatePrice(selectedServiceCategory, selectedFrequency, { type: 'hourly', hours: value })
                              }}
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

          {/* Step 4: Schedule */}
          {step.current === 4 && (
            <Card className="rounded-none border-0 shadow-none">
              <CardHeader className="px-6 pt-6">
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
                          onValueChange={(value) => {
                            field.onChange(value)
                            updatePrice(selectedServiceCategory, value as BookingFrequency, selectedPricingParams)
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

          {/* Step 5: Customer Details */}
          {step.current === 5 && (
            <Card className="rounded-none border-0 shadow-none">
              <CardHeader className="px-6 pt-6">
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
                          <Input placeholder="John" {...field} />
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
                          <Input placeholder="Doe" {...field} />
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
                          <Input placeholder="john.doe@example.com" type="email" {...field} />
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
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="customer.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="customer.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Anytown" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customer.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="CA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customer.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="12345" {...field} />
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
          segments={step.total}
          value={step.current === 0 ? 0 : ((step.current - 1) / step.total) * 100}
        />
      </div>

      {/* Navigation and pricing */}
      <div className="fixed inset-x-0 bottom-0 z-10 h-20 bg-white shadow-md">
        <div className="flex size-full items-center justify-between px-6 py-4">
          {step.current === 0
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
                    {step.current > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                      >
                        Back
                      </Button>
                    )}
                    {step.current < step.total
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

    </div>
  )
}
