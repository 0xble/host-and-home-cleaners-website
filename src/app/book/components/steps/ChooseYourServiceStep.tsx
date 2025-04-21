'use client'

import type { BaseStepProps } from '../../types'
import { CardDescription, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { useStepValidation } from '../../hooks/useStepValidation'
import { StepLayout } from '../StepLayout'

export function ChooseYourServiceStep({ form, onValidityChangeAction }: BaseStepProps) {
  // This step is always valid because it's just informational
  useStepValidation(form, onValidityChangeAction, { alwaysValid: true })

  return (
    <StepLayout
      title={<CardTitle className="text-3xl font-medium">Choose your service</CardTitle>}
      description={(
        <CardDescription className="text-base mt-4">
          Let's start with the type of clean your space needs—a deep clean, between guests, an upcoming move, or just to bring it back to life. We'll handle the rest.
        </CardDescription>
      )}
      label="Step 1"
      className="px-0"
    >
      <div className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden pb-[75%]">
        <Image
          src="/assets/cleaner.png"
          alt="House cleaner"
          fill
          className="object-contain animate-wiggle"
          style={{ animationDelay: '200ms' }}
        />
      </div>
    </StepLayout>
  )
}
