'use client'

import type { Frequency, Location, ServiceCategory } from '@/lib/types'
import { BookingFormOption } from '@/components/SelectionCard'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PRICING_PARAMETERS } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { addDays, isBefore } from 'date-fns'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import BookingFormNavbar from './components/BookingFormNavbar'

const BookingFormSchema = z.object({
  serviceCategory: z.enum(['Default', 'Move In/Out', 'Custom Areas Only', 'Mansion']),
  bedrooms: z.number().min(1).max(4),
  hours: z.number().min(3).max(12).optional(),
  frequency: z.enum(['one-time', 'weekly', 'biweekly', 'monthly']),
  date: z.date().nullable(),
  arrivalWindow: z.enum(['8:00AM - 9:00AM', '12:00PM - 1:00PM', '3:00PM - 4:00PM']),
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
  location: z.enum(['MYRTLE_BEACH', 'HONOLULU']),
  price: z.object({
    firstCleaning: z.number().nullable(),
    recurring: z.number().nullable().optional(),
  }),
})

// Extract type from the schema
type FormData = z.infer<typeof BookingFormSchema>

export default function BookingPage() {
  const router = useRouter()
  const [location] = useState<Location>('MYRTLE_BEACH')
  const [step, setStep] = useState(0)
  const [specializedService, setSpecializedService] = useState<string | null>(null)
  const [visitedSteps, setVisitedSteps] = useState<number[]>([0])

  // Initialize form with default values
  const form = useForm<FormData>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      serviceCategory: 'Default',
      bedrooms: 1,
      hours: undefined, // Start with undefined hours
      frequency: 'biweekly',
      date: null,
      arrivalWindow: '12:00PM - 1:00PM',
      customer: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
      },
      location,
      price: {
        firstCleaning: calculatePrice(location, 'Default', 1),
        recurring: calculateRecurringPrice(location, 'Default', 1, 'biweekly'),
      },
    },
  })

  const { watch, setValue } = form

  // Watch form values for price calculation
  const serviceCategory = watch('serviceCategory')
  const bedrooms = watch('bedrooms')
  const hours = watch('hours')
  const frequency = watch('frequency')

  // Check if current step is valid
  const isCurrentStepValid = () => {
    const { getValues, trigger } = form

    // Step 0 is always valid
    if (step === 0)
      return true

    // Step 1: Service Selection
    if (step === 1) {
      const serviceCategory = getValues('serviceCategory')
      const bedrooms = getValues('bedrooms')
      return serviceCategory !== undefined && bedrooms !== undefined
    }

    // Step 2: Hours Selection (for hourly services only)
    if (step === 2 && (serviceCategory === 'Custom Areas Only' || serviceCategory === 'Mansion')) {
      const hours = getValues('hours')
      return hours !== undefined && hours >= 3 && hours <= 12
    }

    // Step 3: Schedule
    if (step === 3) {
      const date = getValues('date')
      const arrivalWindow = getValues('arrivalWindow')
      const frequency = getValues('frequency')
      return date !== null && arrivalWindow !== undefined && frequency !== undefined
    }

    // Step 4: Customer Details
    if (step === 4) {
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
    if (step === 0)
      return 1
    if (step === 5)
      return null

    if (serviceCategory === 'Custom Areas Only' || serviceCategory === 'Mansion') {
      if (step === 1)
        return 2
      if (step === 2)
        return 3
      if (step === 3)
        return 4
      if (step === 4)
        return 5
    }
    else {
      if (step === 1)
        return 2
      if (step === 2)
        return 4
      if (step === 4)
        return 5
    }

    return null
  }

  // Update price when form values change
  const updatePrice = (params: {
    serviceCategory: ServiceCategory
    bedrooms?: number
    hours?: number
    frequency?: Frequency
  }) => {
    // Use provided values or fall back to watched values
    const serviceCategoryValue = params.serviceCategory || serviceCategory
    const bedroomsValue = params.bedrooms || bedrooms
    const hoursValue = params.hours || hours
    const frequencyValue = params.frequency || frequency

    const firstCleaning = calculatePrice(location, serviceCategoryValue, bedroomsValue, hoursValue)
    const recurring = calculateRecurringPrice(location, serviceCategoryValue, bedroomsValue, frequencyValue, hoursValue)

    setValue('price', {
      firstCleaning,
      recurring,
    })
  }

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    // In a real app, we would submit this data to an API
    alert('Booking submitted! Check console for details.')
  }

  const prevStep = () => {
    if (step === 1) {
      setStep(0)
      return
    }

    if (serviceCategory === 'Custom Areas Only' || serviceCategory === 'Mansion') {
      if (step === 2) {
        setStep(1)
      }
      else if (step === 3) {
        setStep(2)
      }
      else if (step === 4) {
        setStep(3)
      }
      else if (step === 5) {
        setStep(4)
      }
    }
    else {
      if (step === 2) {
        setStep(1)
      }
      else if (step === 4) {
        setStep(2)
      }
      else if (step === 5) {
        setStep(4)
      }
    }
  }

  const nextStep = () => {
    const nextStepNumber = getNextStepNumber()
    if (nextStepNumber !== null) {
      setStep(nextStepNumber)
      setVisitedSteps(prev => [...new Set([...prev, nextStepNumber])])
      updatePrice({ serviceCategory, bedrooms, hours, frequency })
    }
  }

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (step === 0)
        return

      event.preventDefault()
      prevStep()
    }

    if (step > 0) {
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
        if (step === 0 && (event.key === '[' || event.key === 'ArrowLeft')) {
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
            step > 0
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

  // Calculate price based on form values
  function calculatePrice(
    location: Location,
    serviceCategory: ServiceCategory,
    bedrooms: number,
    hours?: number,
  ): number {
    const pricingData = PRICING_PARAMETERS[location].serviceCategories[serviceCategory]

    if (pricingData.type === 'flat') {
      return pricingData.bedrooms[bedrooms as keyof typeof pricingData.bedrooms] || 0
    }
    else if (pricingData.type === 'hourly' && hours) {
      return pricingData.hourlyRate * hours
    }

    return 0
  }

  // Calculate recurring price with discount
  function calculateRecurringPrice(
    location: Location,
    serviceCategory: ServiceCategory,
    bedrooms: number,
    frequency: Frequency,
    hours?: number,
  ): number | undefined {
    if (frequency === 'one-time' || serviceCategory === 'Move In/Out') {
      return undefined
    }

    const pricingData = PRICING_PARAMETERS[location].serviceCategories[serviceCategory]
    let basePrice = 0
    let discount = 0

    if (pricingData.type === 'flat' && pricingData.frequencies) {
      basePrice = pricingData.bedrooms[bedrooms as keyof typeof pricingData.bedrooms] || 0
      discount = pricingData.frequencies[frequency]
    }
    else if (pricingData.type === 'hourly' && hours) {
      basePrice = pricingData.hourlyRate * hours
      discount = pricingData.frequencies[frequency]
    }

    return basePrice * (1 - discount)
  }

  // Fix the Calendar type error
  const selectedDate = watch('date')

  // Handle bedroom selection
  const handleBedroomSelect = (value: string) => {
    const bedroomCount = Number.parseInt(value)
    setValue('bedrooms', bedroomCount)
    setValue('serviceCategory', 'Default')
    setSpecializedService(null)
    // Use direct values for immediate price update
    updatePrice({ serviceCategory: 'Default', bedrooms: bedroomCount })
  }

  // Handle specialized service selection
  const handleSpecializedService = (value: string) => {
    setValue('serviceCategory', value as ServiceCategory)
    setSpecializedService(value)
    // Use direct values for immediate price update
    updatePrice({ serviceCategory: value as ServiceCategory, bedrooms })
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
    const pricingData = PRICING_PARAMETERS[location].serviceCategories[serviceCategory]

    if (pricingData.type === 'flat') {
      return bedrooms != null
    }

    if (pricingData.type === 'hourly') {
      return hours !== undefined && hours !== null
    }

    return true // For flat pricing, we always have bedrooms
  }

  // Format price for display
  const formatPrice = (price: number | null | undefined) => {
    if (price == null || !canShowPrice()) {
      return ''
    }
    return `$${price.toFixed(0)}`
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 0: Overview */}
          {step === 0 && (
            <Card className="max-w-4xl mx-auto rounded-none border-0 shadow-none">
              <CardHeader className="px-6 pt-6">
                <CardTitle className="text-4xl font-medium">
                  Need cleaning?
                  <br />
                  We're here to help
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-12 px-6">
                <div className="space-y-12">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-lg font-medium">1</div>
                      <h2 className="text-lg font-medium">Tell us about your property</h2>
                    </div>
                    <p className="pl-7 text-base">
                      Share some quick info—like the size of your home, what type of cleaning you need, and any special requests.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-lg font-medium">2</div>
                      <h2 className="text-lg font-medium">Customize your service</h2>
                    </div>
                    <p className="pl-7 text-base">
                      Choose the cleaning package that fits your needs. Add notes, photos, or instructions for us to best serve you.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-lg font-medium">3</div>
                      <h2 className="text-lg font-medium">Book and relax</h2>
                    </div>
                    <p className="pl-7 text-base">
                      Pick a time that works for you, confirm the details, and we'll handle the rest.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 1: Property Overview */}
          {step === 1 && (
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
          {step === 2 && (
            <Card className="rounded-none border-0 shadow-none">
              <CardHeader className="px-6 pt-6">
                <CardTitle>Select Your Cleaning Service</CardTitle>
                <CardDescription>
                  Choose your property type or specialized cleaning service
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 px-6">
                {/* Bedroom Selection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Number of Bedrooms</h3>
                  <p className="text-sm">Select the number of bedrooms in your property</p>

                  <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
                    {[1, 2, 3, 4].map(num => (
                      <BookingFormOption
                        key={num}
                        title={`${num} ${num === 1 ? 'Bedroom' : 'Bedrooms'}`}
                        isSelected={bedrooms === num}
                        isDisabled={!!specializedService}
                        onClick={() => handleBedroomSelect(num.toString())}
                      />
                    ))}
                  </div>
                </div>

                <div className="relative flex items-center py-2">
                  <div className="grow border-t border-neutral-400"></div>
                  <span className="mx-4 shrink text-muted-foreground">OR</span>
                  <div className="grow border-t border-neutral-400"></div>
                </div>

                {/* Specialized Services */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Specialized Cleaning</h3>
                  <p className="text-muted-foreground text-sm">Select one of our specialized cleaning options</p>

                  <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
                    <BookingFormOption
                      title="Move In/Out"
                      description="For moving in or out of a property"
                      isSelected={specializedService === 'Move In/Out'}
                      onClick={() => handleSpecializedService('Move In/Out')}
                    />

                    <BookingFormOption
                      title="Custom Areas Only"
                      description="For specific areas that need attention"
                      isSelected={specializedService === 'Custom Areas Only'}
                      onClick={() => handleSpecializedService('Custom Areas Only')}
                    />

                    <BookingFormOption
                      title="Mansion"
                      description="For large properties with 5+ bedrooms"
                      isSelected={specializedService === 'Mansion'}
                      onClick={() => handleSpecializedService('Mansion')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Hours Selection (For hourly services only) */}
          {step === 3 && (serviceCategory === 'Custom Areas Only' || serviceCategory === 'Mansion') && (
            <Card className="rounded-none border-0 shadow-none">
              <CardHeader className="px-6 pt-6">
                <CardTitle>Select Service Duration</CardTitle>
                <CardDescription>
                  Choose how many hours you need for your
                  {' '}
                  {serviceCategory}
                  {' '}
                  service
                </CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <FormField
                  control={form.control}
                  name="hours"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Hours</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
                          {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(hour => (
                            <BookingFormOption
                              key={hour}
                              title={`${hour} Hours`}
                              isSelected={field.value === hour}
                              onClick={() => {
                                field.onChange(hour)
                                updatePrice({ serviceCategory, bedrooms, hours: hour })
                              }}
                            />
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
          {step === 4 && (
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

                {(serviceCategory !== 'Move In/Out') && (
                  <FormField
                    control={form.control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Frequency</FormLabel>
                        <FormDescription>
                          {serviceCategory === 'Default'
                            ? 'Receive up to 60% off after first visit'
                            : 'Receive up to 20% off after first visit'}
                        </FormDescription>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            updatePrice({ serviceCategory, bedrooms, hours, frequency: value as Frequency })
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
                            <SelectItem value="biweekly">Biweekly</SelectItem>
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
          {step === 5 && (
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

      {/* Show BookingFormNavbar on all steps */}
      <BookingFormNavbar
        step={step}
        serviceCategory={serviceCategory}
        canShowPrice={canShowPrice}
        formatPrice={formatPrice}
        watchFirstCleaning={watch('price.firstCleaning')}
        watchRecurring={watch('price.recurring')}
        frequency={frequency}
        prevStep={prevStep}
        nextStep={nextStep}
        onSubmit={form.handleSubmit(onSubmit)}
      />
    </div>
  )
}
