import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import type { Frequency, ServiceCategory } from '@/lib/types'

type BookingFormNavbarProps = {
  step: number
  serviceCategory: ServiceCategory
  canShowPrice: () => boolean
  formatPrice: (price: number | null | undefined) => string
  watchFirstCleaning: number | null
  watchRecurring: number | null | undefined
  frequency: Frequency
  prevStep: () => void
  nextStep: () => void
  onSubmit: () => void
}

export default function BookingFormNavbar({
  step,
  serviceCategory,
  canShowPrice,
  formatPrice,
  watchFirstCleaning,
  watchRecurring,
  frequency,
  prevStep,
  nextStep,
  onSubmit,
}: BookingFormNavbarProps) {
  const totalSteps = serviceCategory === 'Custom Areas Only' || serviceCategory === 'Mansion' ? 4 : 3

  return (
    <>
      {/* Progress bar */}
      <div className='fixed inset-x-0 bottom-20 z-10 bg-white'>
        <Progress
          className='h-2 w-full rounded-none'
          value={((step - 1) / totalSteps) * 100}
          steps={totalSteps}
          showDividers
        />
      </div>

      {/* Navigation and pricing */}
      <div className='fixed inset-x-0 bottom-0 z-10 h-20 bg-white shadow-md'>
        <div className='flex size-full items-center justify-between px-6 py-4'>
          <div className='flex items-center gap-4'>
            {canShowPrice() && (
              <div className='flex flex-col justify-center'>
                <p className='text-lg font-bold'>
                  {formatPrice(watchFirstCleaning)}
                </p>
                {watchRecurring && (
                  <p className='text-muted-foreground text-sm'>
                    {frequency !== 'one-time'
                      ? `${formatPrice(watchRecurring)} for recurring cleanings`
                      : ''}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className='flex items-center gap-2'>
            {step > 1 && (
              <Button
                type='button'
                variant='outline'
                onClick={prevStep}
              >
                Back
              </Button>
            )}
            {step < 4
              ? (
                  <Button type='button' onClick={nextStep}>
                    Next
                  </Button>
                )
              : (
                  <Button type='button' onClick={onSubmit}>
                    Book
                  </Button>
                )}
          </div>
        </div>
      </div>
    </>
  )
}
