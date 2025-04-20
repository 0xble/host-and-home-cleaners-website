'use client'

import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { BaseStepProps } from '../../types/steps'

export function ChooseYourServiceStep({ form, onValidityChange }: BaseStepProps) {
  // This step is always valid since it's just informational
  onValidityChange(true)

  return (
    <Card className="max-w-4xl mx-auto rounded-none border-0 shadow-none">
      <CardHeader>
        <div className="text-sm font-medium text-muted-foreground mb-2">Step 1</div>
        <CardTitle className="text-3xl font-medium">
          Choose your service
        </CardTitle>
        <CardDescription className="text-base mt-4">
          Let's start with aute elit nostrud magna ut deserunt laborum Lorem duis. Irure velit sunt in aute do officia est proident qui minim nulla mollit.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <div className="relative w-full max-w-3xl mx-auto rounded-lg overflow-hidden pb-[75%]">
          <Image
            src="/assets/cleaner.png"
            alt="House cleaner"
            fill
            className="object-contain animate-wiggle"
            style={{ animationDelay: '200ms' }}
          />
        </div>
      </CardContent>
    </Card>
  )
}