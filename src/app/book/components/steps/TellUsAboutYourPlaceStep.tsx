'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { BaseStepProps } from '../../types'
import { useEffect } from 'react'

export function TellUsAboutYourPlaceStep({ onValidityChangeAction }: BaseStepProps) {
  useEffect(() => {
    // This step is always valid since it's just informational
    onValidityChangeAction(true)
  }, [onValidityChangeAction])

  return (
    <Card className="max-w-4xl mx-auto rounded-none border-0 shadow-none">
      <CardHeader>
        <div className="text-sm font-medium text-muted-foreground mb-2">Step 2</div>
        <CardTitle className="text-3xl font-medium">
          Tell us about your place
        </CardTitle>
        <CardDescription className="text-base mt-4">
          In this step, we'll ask for some quick details about your home—like how many bedrooms you have, and what type of cleaning you're looking for.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
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
      </CardContent>
    </Card>
  )
}