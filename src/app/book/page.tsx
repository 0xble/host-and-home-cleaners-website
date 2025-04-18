'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { addDays, isBefore } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import {
  Card,
  CardContent,
  CardDescription, CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Location, ServiceCategory, type Frequency } from '@/lib/types'
import { PRICING_PARAMETERS } from '@/lib/constants'
import { Progress } from "@/components/ui/progress"

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
  // Default to Myrtle Beach, could be based on user location or a parameter
  const [location] = useState<Location>('MYRTLE_BEACH')
  const [step, setStep] = useState(1)
  const [specializedService, setSpecializedService] = useState<string | null>(null)

  // Calculate price based on form values
  function calculatePrice(
    location: Location,
    serviceCategory: ServiceCategory,
    bedrooms: number,
    hours?: number
  ): number {
    const pricingData = PRICING_PARAMETERS[location].serviceCategories[serviceCategory]

    if (pricingData.type === 'flat') {
      return pricingData.bedrooms[bedrooms as keyof typeof pricingData.bedrooms] || 0
    } else if (pricingData.type === 'hourly' && hours) {
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
    hours?: number
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
    } else if (pricingData.type === 'hourly' && hours) {
      basePrice = pricingData.hourlyRate * hours
      discount = pricingData.frequencies[frequency]
    }

    return basePrice * (1 - discount)
  }

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
        firstCleaning: calculatePrice(location, 'Default', 1), // Use existing function
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

  // Update price when form values change
  const updatePrice = () => {
    const firstCleaning = calculatePrice(location, serviceCategory, bedrooms, hours)
    const recurring = calculateRecurringPrice(location, serviceCategory, bedrooms, frequency, hours)

    setValue('price', {
      firstCleaning,
      recurring,
    })
  }

  // Update price when relevant form values change
  useEffect(() => {
    updatePrice()
  }, [serviceCategory, bedrooms, hours, frequency])

  // Fix the Calendar type error
  const selectedDate = form.watch('date');

  // Handle bedroom selection
  const handleBedroomSelect = (value: string) => {
    const bedroomCount = parseInt(value);
    setValue('bedrooms', bedroomCount);
    setValue('serviceCategory', 'Default');
    setSpecializedService(null);
    updatePrice();
  };

  // Handle specialized service selection
  const handleSpecializedService = (value: string) => {
    setValue('serviceCategory', value as ServiceCategory);
    setSpecializedService(value);
    updatePrice();
  };

  const nextStep = () => {
    if (serviceCategory === 'Custom Areas Only' || serviceCategory === 'Mansion') {
      if (step === 1) {
        setStep(2)
      } else if (step === 2) {
        setStep(3)
      } else if (step === 3) {
        setStep(4)
      }
    } else {
      if (step === 1) {
        setStep(3)
      } else if (step === 3) {
        setStep(4)
      }
    }
    updatePrice()
  }

  const prevStep = () => {
    if (serviceCategory === 'Custom Areas Only' || serviceCategory === 'Mansion') {
      if (step === 2) {
        setStep(1)
      } else if (step === 3) {
        setStep(2)
      } else if (step === 4) {
        setStep(3)
      }
    } else {
      if (step === 3) {
        setStep(1)
      } else if (step === 4) {
        setStep(3)
      }
    }
  }

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data)
    // In a real app, we would submit this data to an API
    alert('Booking submitted! Check console for details.')
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
    const pricingData = PRICING_PARAMETERS[location].serviceCategories[serviceCategory];

    if (pricingData.type === 'flat') {
      return bedrooms != null;
    }

    if (pricingData.type === 'hourly') {
      return hours !== undefined && hours !== null;
    }

    return true; // For flat pricing, we always have bedrooms
  }

  // Format price for display
  const formatPrice = (price: number | null | undefined) => {
    if (price == null || !canShowPrice()) return ''
    return `$${price.toFixed(0)}`
  }

  return (
    <div className="relative min-h-screen pb-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1: Service Selection */}
          {step === 1 && (
            <Card className="border-0 rounded-none shadow-none">
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
                  <p className="text-sm text-muted-foreground">Select the number of bedrooms in your property</p>

                  <div className="grid grid-cols-2 gap-4 pt-2 sm:grid-cols-4">
                    {[1, 2, 3, 4].map((num) => (
                      <div
                        key={num}
                        className={`flex flex-col items-center justify-between rounded-md border
                          ${specializedService
                            ? 'border-muted bg-popover opacity-70 cursor-pointer hover:opacity-100 hover:border-gray-400'
                            : bedrooms === num
                              ? 'border-primary'
                              : 'border-muted bg-popover hover:bg-accent hover:text-accent-foreground'
                          } p-4 transition-all`}
                        onClick={() => handleBedroomSelect(num.toString())}
                      >
                        <span className="text-center font-medium">{num} {num === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative py-2 flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-600">OR</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Specialized Services */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Specialized Cleaning</h3>
                  <p className="text-sm text-muted-foreground">Select one of our specialized cleaning options</p>

                  <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-3">
                    <div
                      className={`flex flex-col items-center justify-between rounded-md border
                        ${specializedService === 'Move In/Out'
                          ? 'border-primary'
                          : 'border-muted bg-popover hover:bg-accent hover:text-accent-foreground'
                        } p-4 cursor-pointer transition-all`}
                      onClick={() => handleSpecializedService('Move In/Out')}
                    >
                      <span className="text-center font-medium">Move In/Out</span>
                      <span className="text-xs text-muted-foreground text-center mt-2">For moving in or out of a property</span>
                    </div>

                    <div
                      className={`flex flex-col items-center justify-between rounded-md border
                        ${specializedService === 'Custom Areas Only'
                          ? 'border-primary'
                          : 'border-muted bg-popover hover:bg-accent hover:text-accent-foreground'
                        } p-4 cursor-pointer transition-all`}
                      onClick={() => handleSpecializedService('Custom Areas Only')}
                    >
                      <span className="text-center font-medium">Custom Areas Only</span>
                      <span className="text-xs text-muted-foreground text-center mt-2">For specific areas that need attention</span>
                    </div>

                    <div
                      className={`flex flex-col items-center justify-between rounded-md border
                        ${specializedService === 'Mansion'
                          ? 'border-primary'
                          : 'border-muted bg-popover hover:bg-accent hover:text-accent-foreground'
                        } p-4 cursor-pointer transition-all`}
                      onClick={() => handleSpecializedService('Mansion')}
                    >
                      <span className="text-center font-medium">Mansion</span>
                      <span className="text-xs text-muted-foreground text-center mt-2">For large properties with 5+ bedrooms</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Hours Selection (For hourly services only) */}
          {step === 2 && (serviceCategory === 'Custom Areas Only' || serviceCategory === 'Mansion') && (
            <Card className="border-0 rounded-none shadow-none">
              <CardHeader className="px-6 pt-6">
                <CardTitle>Select Service Duration</CardTitle>
                <CardDescription>
                  Choose how many hours you need for your {serviceCategory} service
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
                          {[3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((hour) => (
                            <div
                              key={hour}
                              className={`flex flex-col items-center justify-between rounded-md border
                                ${field.value === hour
                                  ? 'border-primary'
                                  : 'border-muted bg-popover hover:bg-accent hover:text-accent-foreground'
                                } p-4 cursor-pointer transition-all`}
                              onClick={() => {
                                field.onChange(hour);
                                updatePrice();
                              }}
                            >
                              <span className="text-center font-medium">{hour} Hours</span>
                            </div>
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

          {/* Step 3: Schedule */}
          {step === 3 && (
            <Card className="border-0 rounded-none shadow-none">
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
                        The next 2 days are fully booked. Select a date at least 3 days from today.
                      </FormDescription>
                      <Calendar
                        mode="single"
                        selected={selectedDate || undefined}
                        onSelect={(date) => date && field.onChange(date)}
                        disabled={isDateDisabled}
                        className="rounded-md border mx-auto"
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
                        <FormLabel>Cleaning Frequency</FormLabel>
                        <FormDescription>
                          {serviceCategory === 'Default'
                            ? 'Regular cleanings receive up to 60% off after first visit'
                            : 'Regular cleanings receive up to 20% off after first visit'}
                        </FormDescription>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value)
                            updatePrice()
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="pointer-events-auto z-20">
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="one-time">One Time</SelectItem>
                            <SelectItem value="weekly">Weekly (Best Value)</SelectItem>
                            <SelectItem value="biweekly">Biweekly (Popular)</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
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

          {/* Step 4: Customer Details */}
          {step === 4 && (
            <Card className="border-0 rounded-none shadow-none">
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

      {/* Unified navigation and pricing footer */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-white shadow-md">
        {/* Progress bar with step markers */}
        <div className="relative w-full h-2">
          <Progress
            value={
              ((step - 1) / (serviceCategory === 'Custom Areas Only' || serviceCategory === 'Mansion' ? 4 : 3)) * 100
            }
            className="h-2 w-full rounded-none"
            steps={serviceCategory === 'Custom Areas Only' || serviceCategory === 'Mansion' ? 4 : 3}
            showDividers
          />
        </div>

        <div className="w-full flex items-center justify-between px-6 p-4">
          <div className="flex items-center gap-4">
            {canShowPrice() && (
              <div>
                <p className="text-lg font-bold">
                  {formatPrice(form.watch('price.firstCleaning'))}
                </p>
                {form.watch('price.recurring') && (
                  <p className="text-sm text-muted-foreground">
                    {frequency !== 'one-time'
                      ? `${formatPrice(form.watch('price.recurring'))} for recurring cleanings`
                      : ''}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
              >
                Back
              </Button>
            )}
            {step < 4 ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="button" onClick={form.handleSubmit(onSubmit)}>
                Complete Booking
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}