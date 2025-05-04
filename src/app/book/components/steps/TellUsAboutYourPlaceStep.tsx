'use client'

import type { BaseStepProps } from '@/app/book/types'
import { StepLayout } from '@/app/book/components/StepLayout'
import { useStepValidation } from '@/app/book/hooks/useStepValidation'
import { CardDescription, CardTitle } from '@/components/ui/card'

export function TellUsAboutYourPlaceStep({ form, onValidityChangeAction }: BaseStepProps) {
  // This step is always valid because it's just informational
  useStepValidation(form, onValidityChangeAction, { alwaysValid: true })

  return (
    <StepLayout
      title={<CardTitle className="text-3xl font-medium">Tell us about your place</CardTitle>}
      description={(
        <CardDescription className="text-base mt-4">
          Next up, we'll ask for some quick details about your home—like how many bedrooms you have, and what type of cleaning you're looking for.
        </CardDescription>
      )}
      label="Step 2"
      className="px-0"
    >
      <div className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden pb-[90%] sm:pb-[52%]">
        <video
          className="absolute inset-0 w-full h-full object-contain"
          autoPlay
          playsInline
          preload="auto"
          muted
        >
          <source src="/videos/property-tour.mp4" type="video/mp4" />
        </video>
      </div>
    </StepLayout>
  )
}
