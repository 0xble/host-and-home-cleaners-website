'use client'

import type { Location } from '@/lib/constants'
import ReviewsGridClient from '@/components/reviews/ReviewsGridClient'
import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import { cn } from '@/lib/utils'

export interface ReviewSectionProps {
  heading: string
  location?: Location | null
  className?: string
}

export default function ReviewsSection({ heading, className, location }: ReviewSectionProps) {
  return (
    <div className={cn('my-12 flex flex-col', className)}>
      <div className="mx-auto mb-8 max-w-screen-md lg:mb-12">
        <h2 className="mb-12 text-center tracking-tight text-shade">{heading}</h2>
        <div className="space-y-4 px-4 text-base sm:px-8 sm:text-lg lg:px-0">
          <p>Here are all the reviews we have received from our customers.</p>
          <p>The reviews below come in live. We do not edit any reviews.</p>
          <p>After each job, we call to check in about how it went and ask for a review. Nearly all are amazing, and a couple are bad, but they are all real.</p>
        </div>
      </div>
      <ReviewsGridClient location={location} />
      <TestimonialCarousel className="mt-16" />
    </div>
  )
}
