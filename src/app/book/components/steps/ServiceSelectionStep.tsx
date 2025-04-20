'use client'

import { memo, useCallback, useRef, useEffect } from 'react'
import { BookingFormOption } from '@/components/BookingFormOption'
import LottieAnimation from '@/components/LottieAnimation'
import type { LottieAnimationProps } from '@/components/LottieAnimation'
import { StepLayout } from '../StepLayout'
import { useStepValidation } from '../../hooks/useStepValidation'
import type { BaseStepProps } from '../../types'
import type { BookingServiceCategory } from '../../types'
import ChecklistAnimation from '@/public/lottie/checklist.json'
import HouseCleanAnimation from '@/public/lottie/house.json'
import SprayAnimation from '@/public/lottie/spray.json'
import MansionAnimation from '@/public/lottie/mansion.json'

const SERVICE_OPTIONS: {
  id: BookingServiceCategory
  title: string
  description: string
  animation: LottieAnimationProps['animationData']
}[] = [
  {
    id: 'default',
    title: "Deep Clean",
    description: "Recommended for places that haven't been professionally cleaned",
    animation: ChecklistAnimation
  },
  {
    id: 'move-in-out',
    title: "Move In/Out",
    description: "For moving in or out of a property",
    animation: HouseCleanAnimation
  },
  {
    id: 'custom',
    title: "Custom Areas Only",
    description: "For specific areas that need attention",
    animation: SprayAnimation
  },
  {
    id: 'mansion',
    title: "Mansion",
    description: "For large properties with 4+ bedrooms",
    animation: MansionAnimation
  }
]

function ServiceSelectionStepComponent({ form, onValidityChangeAction }: BaseStepProps) {
  const prevServiceCategoryRef = useRef<BookingServiceCategory | null>(null)

  const { watch, setValue } = form
  const selectedServiceCategory = watch('serviceCategory')

  // Update prevServiceCategoryRef when selectedServiceCategory changes
  useEffect(() => {
    prevServiceCategoryRef.current = selectedServiceCategory
  }, [selectedServiceCategory])

  // Validate step
  useStepValidation(form, onValidityChangeAction, {
    customValidation: (formData) => formData.serviceCategory !== undefined
  })

  const handleSelectServiceCategory = useCallback((serviceCategory: BookingServiceCategory) => {
    setValue('serviceCategory', serviceCategory)
  }, [setValue])

  const renderServiceOption = useCallback((
    id: BookingServiceCategory,
    title: string,
    description: string,
    animation: LottieAnimationProps['animationData']
  ) => (
    <BookingFormOption
      key={id}
      isSelected={selectedServiceCategory === id}
      onClick={() => handleSelectServiceCategory(id)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <span className="text-lg font-medium">{title}</span>
          <span className="text-muted-foreground text-sm mt-1">{description}</span>
        </div>
        <div className="size-16 flex-shrink-0">
          <LottieAnimation
            className="w-full h-full"
            animationData={animation}
            onPlay={prevServiceCategoryRef.current !== id && selectedServiceCategory === id ? () => {} : undefined}
          />
        </div>
      </div>
    </BookingFormOption>
  ), [selectedServiceCategory, handleSelectServiceCategory])

  return (
    <StepLayout
      title='What are we cleaning today?'
      description='Select the type of cleaning service that best fits your needs. Each option is tailored to different cleaning requirements.'
      className="max-w-4xl mx-auto rounded-none border-0 shadow-none"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SERVICE_OPTIONS.map(({ id, title, description, animation }) => (
          renderServiceOption(
            id,
            title,
            description,
            animation
          )
        ))}
      </div>
    </StepLayout>
  )
}

export const ServiceSelectionStep = memo(ServiceSelectionStepComponent)