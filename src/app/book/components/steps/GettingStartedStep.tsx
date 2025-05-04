'use client'

import type { BaseStepProps } from '@/app/book/types'
import { StepLayout } from '@/app/book/components/StepLayout'
import { useStepValidation } from '@/app/book/hooks/useStepValidation'
import { CardTitle } from '@/components/ui/card'
import Image from 'next/image'

export function GettingStartedStep({ form, onValidityChangeAction }: BaseStepProps) {
  // This step is always valid because it's just informational
  useStepValidation(form, onValidityChangeAction, { alwaysValid: true })

  return (
    <StepLayout
      title={(
        <CardTitle className="text-4xl font-medium">
          Need cleaning?
          <br />
          We're here to help
        </CardTitle>
      )}
      className="space-y-12 px-6"
    >
      <div className="border-b border-neutral-300 pb-8">
        <div className="flex items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <div className="text-lg font-medium">1</div>
              <h2 className="text-lg font-medium">Choose your service</h2>
            </div>
            <p className="pl-7 text-sm">
              Select the cleaning type that best fits your situation and your needs.
            </p>
          </div>
          <div className="relative flex-shrink-0 size-20">
            <Image
              src="/assets/broom-dustpan.png"
              alt="Broom and dustpan illustration"
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <div className="border-b border-neutral-300 pb-8">
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <div className="text-lg font-medium">2</div>
                <h2 className="text-lg font-medium">Tell us about your place</h2>
              </div>
              <p className="pl-7 text-sm">
                Share some basic info and add any notes, photos, or instructions.
              </p>
            </div>
            <div className="relative flex-shrink-0 size-20">
              <Image
                src="/assets/living-room.png"
                alt="Living room illustration"
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-2">
                <div className="text-lg font-medium">3</div>
                <h2 className="text-lg font-medium">Book and relax</h2>
              </div>
              <p className="pl-7 text-sm">
                Pick a time that works, confirm details, and we'll handle the rest.
              </p>
            </div>
            <div className="relative flex-shrink-0 size-20">
              <Image
                src="/assets/door.avif"
                alt="Door illustration"
                fill
                sizes="80px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </StepLayout>
  )
}
