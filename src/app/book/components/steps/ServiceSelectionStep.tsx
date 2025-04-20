'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookingFormOption } from '@/components/BookingFormOption'
import LottieAnimation from '@/components/LottieAnimation'
import type { BaseStepProps } from '../../types/steps'
import type { BookingServiceCategory } from '../../types'
import ChecklistAnimation from '@/public/lottie/checklist.json'
import HouseCleanAnimation from '@/public/lottie/house-clean.json'
import SprayAnimation from '@/public/lottie/spray.json'
import MansionAnimation from '@/public/lottie/mansion.json'

export function ServiceSelectionStep({ form }: BaseStepProps) {
  const { watch, setValue } = form
  const selectedServiceCategory = watch('serviceCategory')

  const handleSelectServiceCategory = (serviceCategory: BookingServiceCategory) => {
    setValue('serviceCategory', serviceCategory)
  }

  return (
    <Card className="max-w-4xl mx-auto rounded-none border-0 shadow-none">
      <CardHeader>
        <CardTitle>
          What are we cleaning today?
        </CardTitle>
        <CardDescription>
          Select the type of cleaning service that best fits your needs. Each option is tailored to different cleaning requirements.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <BookingFormOption
            isSelected={selectedServiceCategory === 'default'}
            onClick={() => handleSelectServiceCategory('default')}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col">
                <span className="text-lg font-medium">Deep Clean</span>
                <span className="text-muted-foreground text-sm mt-1">Recommended for places that haven't been professionally cleaned</span>
              </div>
              <div className="size-16 flex-shrink-0">
                <LottieAnimation
                  className="w-full h-full"
                  animationData={ChecklistAnimation}
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
                <span className="text-lg font-medium">Move In/Out</span>
                <span className="text-muted-foreground text-sm mt-1">For moving in or out of a property</span>
              </div>
              <div className="size-16 flex-shrink-0">
                <LottieAnimation
                  className="w-full h-full"
                  animationData={HouseCleanAnimation}
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
                <span className="text-lg font-medium">Custom Areas Only</span>
                <span className="text-muted-foreground text-sm mt-1">For specific areas that need attention</span>
              </div>
              <div className="size-16 flex-shrink-0">
                <LottieAnimation
                  className="w-full h-full"
                  animationData={SprayAnimation}
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
                <span className="text-lg font-medium">Mansion</span>
                <span className="text-muted-foreground text-sm mt-1">For large properties with 4+ bedrooms</span>
              </div>
              <div className="size-16 flex-shrink-0">
                <LottieAnimation
                  className="w-full h-full"
                  animationData={MansionAnimation}
                />
              </div>
            </div>
          </BookingFormOption>
        </div>
      </CardContent>
    </Card>
  )
}