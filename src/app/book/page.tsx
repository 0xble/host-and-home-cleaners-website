'use client'

import type { NotionDateParsed, NotionTimezone } from '0xble/notion/schemas'
import type {
  BaseStepProps,
  BookingFormData,
  BookingFormState,
} from '@/app/book/types'
import type { Location } from '@/lib/types'
import type { RecordBookingPayload } from '@/lib/types/bookings'
import type { ComponentType } from 'react'
import { AnimatedStepTransition } from '@/app/book/components/AnimatedStepTransition'
import { AddressInputStep } from '@/app/book/components/steps/AddressInputStep'
import { ChooseYourServiceStep } from '@/app/book/components/steps/ChooseYourServiceStep'
import { ConfirmationStep } from '@/app/book/components/steps/ConfirmationStep'
import { CustomerDetailsStep } from '@/app/book/components/steps/CustomerDetailsStep'
import { GettingStartedStep } from '@/app/book/components/steps/GettingStartedStep'
import { HoursSelectionStep } from '@/app/book/components/steps/HoursSelectionStep'
import { ScheduleStep } from '@/app/book/components/steps/ScheduleStep'
import { ServiceSelectionStep } from '@/app/book/components/steps/ServiceSelectionStep'
import { SizeSelectionStep } from '@/app/book/components/steps/SizeSelectionStep'
import { TellUsAboutYourPlaceStep } from '@/app/book/components/steps/TellUsAboutYourPlaceStep'
import { PRICING_PARAMETERS } from '@/app/book/constants'
import { BookingFormSchema, BookingStep, COUPONS } from '@/app/book/types'
import { calculatePrice } from '@/app/book/utils'
import { GradientButton } from '@/components/GradientButton'
import { PriceDetailsDrawer } from '@/components/PriceDetailsDrawer'
import { Button } from '@/components/ui/button'
import {
  Form,
} from '@/components/ui/form'
import { Progress } from '@/components/ui/progress'
import { toast } from '@/components/ui/use-toast'
import { DOMAIN, LOCATIONS } from '@/lib/constants'
import { GoogleMapsLoader } from '@/lib/google/GoogleMapsLoader'
import { getLogger } from '@/lib/logger'
import { ROUTES } from '@/lib/routes'
import { tz } from '@date-fns/tz'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { addDays, addHours, format, hoursToMinutes, parse } from 'date-fns'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'

const logger = getLogger('booking-page')

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
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.GETTING_STARTED)
  const [transitionDirection, setTransitionDirection] = useState<'forward' | 'backward'>('forward')
  const [progress, setProgress] = useState<{ value: number, max: number }>({ value: 0, max: MAX_STEPS })
  const [visitedSteps, setVisitedSteps] = useState<BookingStep[]>([])
  const [isStepValid, setIsStepValid] = useState(true)
  // TODO: Optimize storage
  const [isLoadedGoogleMaps, setIsLoadedGoogleMaps] = useState(false)
  const [isLoadingGoogleMaps, setIsLoadingGoogleMaps] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const coupon = COUPONS.SPRING10 // TODO: Allow input of coupon code

  const form = useForm<BookingFormData>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      location: searchParams?.get('location')?.toUpperCase() as Location,
      frequency: 'biweekly',
      price: {
        totalInitial: 0,
        totalRecurring: 0,
        serviceTotal: 0,
        taxes: 0,
        coupon,
      },
    },
    mode: 'onTouched',
  })

  const { watch, handleSubmit, getValues, trigger, formState: { errors } } = form

  // Watch form values for price calculation
  const selectedLocation = watch('location') as Location | undefined
  const selectedFrequency = watch('frequency') as BookingFormState['frequency']
  const selectedServiceCategory = watch('serviceCategory') as BookingFormState['serviceCategory']
  const selectedPricingParams = watch('pricingParams') as BookingFormState['pricingParams']
  const selectedDate = watch('date') as BookingFormState['date']
  const selectedArrivalWindow = watch('arrivalWindow') as BookingFormState['arrivalWindow']
  const customerAddress = watch('customer.address') as string | undefined
  const customerCity = watch('customer.city') as string | undefined
  const customerState = watch('customer.state') as string | undefined
  const customerZipCode = watch('customer.zipCode') as string | undefined
  const price = watch('price') as BookingFormState['price'] | undefined
  const payment = watch('payment') as BookingFormState['payment'] | undefined

  // Check if we have all required parameters to show price
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
        customer?.firstName
        && customer?.lastName
        && customer?.email
        && customer?.phone,
      )
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

  // Save form state when values change
  if (process.env.NODE_ENV !== 'production') {
    useEffect(() => {
      // Log form values if development mode
      if (process.env.NODE_ENV !== 'production') {
        logger.debug('Updated form values', getValues())
      }

      const validateStep = async () => {
        const isValid = await isCurrentStepValid()
        setIsStepValid(isValid)
      }
      void validateStep()
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
  }

  // Update price when service category, pricing params, or frequency changes
  useEffect(() => {
    if (selectedLocation != null && selectedServiceCategory != null && selectedPricingParams != null && selectedFrequency != null) {
      const price = calculatePrice({
        location: selectedLocation,
        serviceCategory: selectedServiceCategory,
        frequency: selectedFrequency,
        params: selectedPricingParams,
        coupon,
      })
      form.setValue('price', price)
      if (process.env.NODE_ENV !== 'production') {
        logger.debug('Updated price:', price)
      }
    }
  }, [
    selectedServiceCategory,
    selectedPricingParams,
    selectedFrequency,
    selectedLocation,
    coupon,
  ])

  // Debug log for form errors
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      logger.debug('Form errors:', errors)
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
        if (selectedLocation == null)
          throw new Error('Location is expected to be defined at this point')

        if (!selectedServiceCategory)
          return null

        const { type } = PRICING_PARAMETERS[selectedServiceCategory]
        switch (type) {
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
        if (selectedLocation == null)
          throw new Error('Location is expected to be defined at this point')

        if (!selectedServiceCategory)
          return null

        const { type } = PRICING_PARAMETERS[selectedServiceCategory]
        switch (type) {
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
  const getNextStepNumber = (step: BookingStep) => {
    const transition = STEP_TRANSITIONS[step]
    return transition.next()
  }

  const getPrevStepNumber = (step: BookingStep) => {
    const transition = STEP_TRANSITIONS[step]
    return transition.prev()
  }

  const prevStep = () => {
    const prevStepNumber = getPrevStepNumber(currentStep)
    if (prevStepNumber !== null) {
      setTransitionDirection('backward')
      setCurrentStep(prevStepNumber)
      setProgress({ ...progress, value: progress.value - 1 })
    }
  }

  const nextStep = async (override?: boolean) => {
    const isValid = override || await isCurrentStepValid()
    if (!isValid)
      return

    const nextStepNumber = getNextStepNumber(currentStep)
    if (nextStepNumber !== null) {
      // If next step is ADDRESS_INPUT and Google Maps isn't loaded yet
      if (nextStepNumber === BookingStep.ADDRESS_INPUT && !isLoadedGoogleMaps && !isLoadingGoogleMaps) {
        setIsLoadingGoogleMaps(true)
        try {
          await GoogleMapsLoader.getInstance().load()
          setIsLoadedGoogleMaps(true)
        }
        catch (error) {
          logger.error('Failed to load Google Maps:', error)
        }
        finally {
          setIsLoadingGoogleMaps(false)
        }
      }

      setTransitionDirection('forward')
      setVisitedSteps(prev => [...new Set([...prev, currentStep])])
      setProgress({ ...progress, value: progress.value + 1 })
      setCurrentStep(nextStepNumber)
    }
  }

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)

    if (selectedLocation == null)
      throw new Error('Location is expected to be defined at this point')

    const getScheduled = ({ date, arrivalWindow, hours }: { date: string, arrivalWindow: string, hours?: number }): string | NotionDateParsed => {
      const timezone = LOCATIONS[selectedLocation].timezone as NotionTimezone
      const start = parse(`${date} ${arrivalWindow.split(' - ')[0]}`, 'yyyy-MM-dd h:mma', new Date(), { in: tz(timezone) })
      if (hours == null) {
        return start.toISOString()
      }
      else {
        return {
          start,
          end: addHours(start, hours),
          timezone,
        }
      }
    }

    try {
      const { data: result } = await axios.post<{ status: string, message?: string }>('/api/bookings', {
        payload: {
          values: {
            location: LOCATIONS[selectedLocation].name,
            status: 'Upcoming',
            scheduled: getScheduled({
              date: data.date,
              arrivalWindow: data.arrivalWindow,
              hours: data.pricingParams.type === 'hourly' ? data.pricingParams.hours : undefined,
            }),
            client: {
              name: `${data.customer.firstName} ${data.customer.lastName}`,
              email: data.customer.email,
              phone: data.customer.phone,
              // source: 'Website',
            },
            frequency: (() => {
              switch (data.frequency) {
                case 'one-time':
                  return 'One-Time'
                case 'weekly':
                  return 'Weekly'
                case 'biweekly':
                  return 'Every Other Week'
                case 'monthly':
                  return 'Every Month'
                default:
                  return undefined
              }
            })(),
            service: (() => {
              switch (data.serviceCategory) {
                case 'deep-clean':
                  return undefined
                case 'move-in-out':
                  return 'Move In/Out'
                case 'custom':
                  return 'Custom'
                case 'mansion':
                  return 'Mansion'
                default:
                  return data.serviceCategory
              }
            })(),
            address: {
              street: data.customer.address,
              apt: data.customer.apt,
              city: data.customer.city,
              state: data.customer.state,
              zip: data.customer.zipCode,
              coordinates: data.customer.coordinates,
            },
            bedrooms: data.pricingParams?.type === 'flat' ? data.pricingParams.bedrooms : undefined,
            duration: data.pricingParams?.type === 'hourly' ? hoursToMinutes(data.pricingParams.hours) : undefined,
            totalPrice: data.price.serviceTotal,
            finalPrice: data.price.totalInitial,
            discountFromFrequency: data.price.recurringDiscount ?? undefined,
            isFirstBooking: true,
          },
        } satisfies RecordBookingPayload,
        data: payment,
      })

      if (result.status === 'success') {
        toast({
          title: 'Booking confirmed!',
          description: 'You will receive a confirmation email shortly.',
          variant: 'success',
        })

        // Clear session storage on successful submission
        sessionStorage.removeItem('bookingFormState')

        router.push(ROUTES.CONFIRMATION.href)
      }
      else {
        throw new Error(result.message ?? 'Failed to create booking')
      }
    }
    catch (error) {
      logger.error('Error creating booking:', error)

      toast({
        title: 'Sorry, something went wrong 🙁',
        description: error instanceof Error ? error.message : `Please try again or contact us at support@${DOMAIN} to book your cleaning.`,
        variant: 'destructive',
      })
    }
    finally {
      setIsSubmitting(false)
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
    const handleKeyDown = (event: KeyboardEvent): void => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(navigator.userAgent)
      const modifierKey = isMac ? event.metaKey : event.altKey

      if (modifierKey) {
        if (currentStep === BookingStep.GETTING_STARTED && (event.key === '[' || event.key === 'ArrowLeft')) {
          return
        }

        if (event.key === '[' || event.key === 'ArrowLeft') {
          event.preventDefault()
          prevStep()
        }
        else if (event.key === ']' || event.key === 'ArrowRight') {
          event.preventDefault()
          void (async () => {
            const nextStepNumber = getNextStepNumber(currentStep)
            if (
              nextStepNumber !== null
              && await isCurrentStepValid()
              && (visitedSteps.includes(nextStepNumber) || await isCurrentStepValid())
            ) {
              void nextStep()
            }
          })()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentStep, router, visitedSteps])

  const handleStepValidityChange = useCallback((isValid: boolean) => {
    setIsStepValid(isValid)

    // Autoadvance to next step for certain steps
    setTimeout(() => {
      if (
        isValid
        && !visitedSteps.includes(currentStep)
        && [
          BookingStep.SERVICE_SELECTION,
          BookingStep.SIZE_SELECTION,
          BookingStep.HOURS_SELECTION,
        ].includes(currentStep)
      ) {
        setTimeout(() => void nextStep(true), 100)
      }
    }, 0)
  }, [currentStep, nextStep, visitedSteps])

  // Create step components map for the transition layout
  const stepComponentsMap = useMemo(() => {
    const baseStepProps = {
      form,
      currentStep,
      location: selectedLocation,
      setCurrentStep,
      onValidityChangeAction: handleStepValidityChange,
    }

    return Object.values(BookingStep).reduce((acc, step) => {
      const StepComponent = STEP_COMPONENTS[step as BookingStep]
      if (step === BookingStep.CONFIRMATION) {
        acc[step] = (
          <StepComponent
            {...baseStepProps}
            isSubmitting={isSubmitting}
            onSubmit={(e) => {
              e.preventDefault()
              void handleSubmit(onSubmit)(e)
            }}
          />
        )
      }
      else {
        acc[step] = <StepComponent {...baseStepProps} />
      }
      return acc
    }, {} as Record<BookingStep | string, React.ReactNode>)
  }, [currentStep, form, handleStepValidityChange, isLoadedGoogleMaps, isSubmitting, handleSubmit, onSubmit])

  return (
    <div className="relative min-h-screen">
      {currentStep !== BookingStep.CONFIRMATION
        ? (
            <div className="p-6 flex justify-end">
              <Button variant="outline" size="default" asChild className="rounded-full px-5">
                <Link href={ROUTES.HOME.href}>
                  Exit
                </Link>
              </Button>
            </div>
          )
        : (
            <div className="p-6 flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevStep}
                className="rounded-full size-12"
              >
                <ArrowLeft />
              </Button>
            </div>
          )}

      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={(e) => {
            e.preventDefault()
            void handleSubmit(onSubmit)(e)
          }}
        >
          <AnimatedStepTransition
            direction={transitionDirection}
            currentStep={currentStep}
          >
            {stepComponentsMap[currentStep]}
          </AnimatedStepTransition>
        </form>
      </Form>

      {/* Skip button for development */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="fixed inset-x-0 bottom-24 z-20 px-6 py-2 bg-transparent pointer-events-none">
          <div className="flex justify-end pointer-events-auto">
            <Button
              variant="outline"
              size="default"
              className="font-mono border-2 border-dashed border-yellow-400 bg-yellow-50 hover:bg-yellow-100 text-yellow-700"
              onClick={() => {
                switch (currentStep) {
                  case BookingStep.GETTING_STARTED:
                    void nextStep(true)
                    break
                  case BookingStep.CHOOSE_YOUR_SERVICE:
                    void nextStep(true)
                    break
                  case BookingStep.SERVICE_SELECTION:
                    form.setValue('serviceCategory', 'deep-clean')
                    void nextStep(true)
                    break
                  case BookingStep.TELL_US_ABOUT_YOUR_PLACE:
                    void nextStep(true)
                    break
                  case BookingStep.CUSTOMER_DETAILS:
                    form.setValue('customer.firstName', 'John')
                    form.setValue('customer.lastName', 'Doe')
                    form.setValue('customer.email', 'john.doe@example.com')
                    form.setValue('customer.phone', '1234567890')
                    void nextStep(true)
                    break
                  case BookingStep.ADDRESS_INPUT:
                    form.setValue('customer.address', '123 Main St')
                    form.setValue('customer.city', 'Myrtle Beach')
                    form.setValue('customer.state', 'SC')
                    form.setValue('customer.zipCode', '29577')
                    form.setValue('location', 'MYRTLE_BEACH')
                    void nextStep(true)
                    break
                  case BookingStep.SIZE_SELECTION:
                  case BookingStep.HOURS_SELECTION: {
                    const pricingParams = currentStep === BookingStep.SIZE_SELECTION
                      ? { type: 'flat' as const, bedrooms: 2 }
                      : { type: 'hourly' as const, hours: 4 }

                    form.setValue('pricingParams.type', pricingParams.type)
                    form.setValue(`pricingParams.${pricingParams.type === 'flat' ? 'bedrooms' : 'hours'}`, pricingParams.type === 'flat' ? pricingParams.bedrooms : pricingParams.hours)
                    void nextStep(true)
                    break
                  }
                  case BookingStep.SCHEDULE: {
                    if (selectedLocation == null)
                      throw new Error('Location is expected to be defined at this point')

                    form.setValue('date', format(addDays(new Date(), 4), 'yyyy-MM-dd', { in: tz(LOCATIONS[selectedLocation].timezone) }))
                    form.setValue('arrivalWindow', '8:00AM - 9:00AM')
                    form.setValue('frequency', 'biweekly')
                    void nextStep(true)
                    break
                  }
                  case BookingStep.CONFIRMATION:
                    form.setValue('payment.cardNumber', '4242424242424242')
                    form.setValue('payment.expiration', '12/25')
                    form.setValue('payment.cvv', '123')
                    form.setValue('payment.zip', '12345')
                    void handleSubmit(onSubmit)
                    break
                }
              }}
            >
              Skip →
            </Button>
          </div>
        </div>
      )}

      {/* Navigation and pricing */}
      {currentStep !== BookingStep.CONFIRMATION && (
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
            <div className="flex size-full items-center justify-between p-4">
              {currentStep === BookingStep.GETTING_STARTED
                ? (
                    <GradientButton
                      type="button"
                      onClick={() => void nextStep()}
                      className="w-full sm:max-w-xs sm:ml-auto"
                    >
                      Get started
                    </GradientButton>
                  )
                : (
                    <>
                      <div className="flex items-center gap-4">
                        {price && selectedFrequency && selectedServiceCategory && selectedPricingParams && (
                          <PriceDetailsDrawer
                            price={{
                              serviceTotal: price.serviceTotal,
                              recurringDiscount: price.recurringDiscount,
                              taxes: price.taxes,
                              totalInitial: price.totalInitial,
                              totalRecurring: price.totalRecurring,
                              coupon,
                            }}
                            booking={{
                              frequency: selectedFrequency,
                              serviceCategory: selectedServiceCategory,
                              pricingParams: selectedPricingParams,
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
                          onClick={() => void nextStep()}
                          disabled={!isStepValid}
                        >
                          {currentStep === getPrevStepNumber(BookingStep.CONFIRMATION)
                            ? 'Review'
                            : 'Next'}
                        </Button>
                      </div>
                    </>
                  )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
