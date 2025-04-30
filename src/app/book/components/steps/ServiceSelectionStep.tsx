'use client'

import type { BaseStepProps, BookingFormState, BookingServiceCategory } from '@/app/book/types'
import type { LottieAnimationProps } from '@/components/LottieAnimation'
import { StepLayout } from '@/app/book/components/StepLayout'
import { PRICING_PARAMETERS } from '@/app/book/constants'
import { useStepValidation } from '@/app/book/hooks/useStepValidation'
import TrackedLink from '@/components/analytics/facebook/PixelTrackedLink'
import { BookingFormOption } from '@/components/BookingFormOption'
import LottieAnimation from '@/components/LottieAnimation'
import { PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'
import ChecklistAnimation from '@/public/lottie/checklist.json'
import HouseCleanAnimation from '@/public/lottie/house.json'
import MansionAnimation from '@/public/lottie/mansion.json'
import SprayAnimation from '@/public/lottie/spray.json'
import { ClipboardList } from 'lucide-react'
import { memo, useEffect, useRef } from 'react'

const SERVICE_OPTIONS: {
  id: BookingServiceCategory
  title: string
  description: string
  animation: LottieAnimationProps['animationData']
}[] = [
  {
    id: 'deep-clean',
    title: 'Deep Clean',
    description: 'Recommended for places that haven\'t been professionally cleaned',
    animation: ChecklistAnimation,
  },
  {
    id: 'move-in-out',
    title: 'Move In/Out',
    description: 'For moving in or out of a property',
    animation: HouseCleanAnimation,
  },
  {
    id: 'custom',
    title: 'Custom Areas Only',
    description: 'For specific areas that need attention',
    animation: SprayAnimation,
  },
  {
    id: 'mansion',
    title: 'Mansion',
    description: 'For large properties with 4+ bedrooms or >3,000 sq. ft',
    animation: MansionAnimation,
  },
]

function ServiceSelectionStepComponent({ form, onValidityChangeAction }: BaseStepProps) {
  const prevServiceCategoryRef = useRef<BookingServiceCategory | null>(null)

  const { watch, setValue } = form
  const selectedServiceCategory = watch('serviceCategory') as BookingFormState['serviceCategory']

  // Update prevServiceCategoryRef when selectedServiceCategory changes
  useEffect(() => {
    prevServiceCategoryRef.current = selectedServiceCategory ?? null
  }, [selectedServiceCategory])

  // Validate step
  useStepValidation(form, onValidityChangeAction, {
    customValidation: formData => formData.serviceCategory !== undefined,
  })

  const handleSelectServiceCategory = (serviceCategory: BookingServiceCategory) => {
    setValue('serviceCategory', serviceCategory)
    const { frequencies } = PRICING_PARAMETERS[serviceCategory]
    if (frequencies == null) {
      setValue('frequency', 'one-time')
    }
  }

  return (
    <StepLayout
      title="How can we help?"
      description="Select the type of cleaning service that best fits your needs. Each option is tailored to different cleaning requirements."
      className="max-w-4xl mx-auto rounded-none border-0 shadow-none"
    >
      <div className="mb-4 flex justify-end">
        <TrackedLink
          href={ROUTES.CHECKLIST.href}
          eventName={PixelEvent.VIEW_CONTENT}
          className="inline-flex items-center text-xs text-muted-foreground hover:text-primary underline underline-offset-2 transition-colors"
          isExternal
          target="_blank"
          rel="noopener noreferrer"
        >
          <ClipboardList className="h-4 w-4 mr-1 text-muted-foreground" aria-hidden="true" />
          View what's included in each option
        </TrackedLink>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {SERVICE_OPTIONS.map(({ id, title, description, animation }) => (
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
                  className="w-full h-full transition-transform duration-200 group-active:scale-90"
                  animationData={animation}
                  onPlay={prevServiceCategoryRef.current !== id && selectedServiceCategory === id ? () => {} : undefined}
                />
              </div>
            </div>
          </BookingFormOption>
        ))}
      </div>
    </StepLayout>
  )
}

export const ServiceSelectionStep = memo(ServiceSelectionStepComponent)
