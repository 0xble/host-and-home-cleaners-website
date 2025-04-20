'use client'

import { memo, useCallback } from 'react'
import { BookingFormOption } from '@/components/BookingFormOption'
import LottieAnimation from '@/components/LottieAnimation'
import { StepLayout } from '../StepLayout'
import { useStepValidation } from '../../hooks/useStepValidation'
import { STEP_CONTENT } from '../../constants/steps'
import type { BaseStepProps } from '../../types'
import type { BookingServiceCategory } from '../../types'
import ChecklistAnimation from '@/public/lottie/checklist.json'
import HouseCleanAnimation from '@/public/lottie/house-clean.json'
import SprayAnimation from '@/public/lottie/spray.json'
import MansionAnimation from '@/public/lottie/mansion.json'

const ANIMATIONS = {
  default: ChecklistAnimation,
  'move-in-out': HouseCleanAnimation,
  custom: SprayAnimation,
  mansion: MansionAnimation,
} as const

function ServiceSelectionStepComponent({ form, onValidityChangeAction }: BaseStepProps) {
  const { watch, setValue } = form
  const selectedServiceCategory = watch('serviceCategory')

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
    description: string
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
            animationData={ANIMATIONS[id]}
          />
        </div>
      </div>
    </BookingFormOption>
  ), [selectedServiceCategory, handleSelectServiceCategory])

  return (
    <StepLayout
      title={STEP_CONTENT.SERVICE_SELECTION.title}
      description={STEP_CONTENT.SERVICE_SELECTION.description}
      className="max-w-4xl mx-auto rounded-none border-0 shadow-none"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Object.entries(STEP_CONTENT.SERVICE_SELECTION.options).map(([key, { title, description }]) => (
          renderServiceOption(
            key as BookingServiceCategory,
            title,
            description
          )
        ))}
      </div>
    </StepLayout>
  )
}

export const ServiceSelectionStep = memo(ServiceSelectionStepComponent)