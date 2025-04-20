'use client'

import { StepLayout } from '../StepLayout'
import { useStepValidation } from '../../hooks/useStepValidation'
import type { BaseStepProps } from '../../types'

export function TellUsAboutYourPlaceStep({ form, onValidityChangeAction }: BaseStepProps) {
    // This step is always valid because it's just informational
  useStepValidation(form, onValidityChangeAction, { alwaysValid: true })

  return (
    <StepLayout
      title={<h1 className="text-3xl font-medium">Tell us about your place</h1>}
      description={
        <p className="text-base mt-4">
          Next up, we'll ask for some quick details about your home—like how many bedrooms you have, and what type of cleaning you're looking for.
        </p>
      }
      label="Step 2"
      className="px-0"
    >
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
    </StepLayout>
  )
}