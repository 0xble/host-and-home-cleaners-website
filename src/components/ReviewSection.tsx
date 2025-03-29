'use client'

import { TestimonialCarousel } from '@/components/TestimonialCarousel'
import ReviewsGridClient from '@/components/ReviewsGridClient'
import { cn } from '@/lib/utils'

export type ReviewSectionProps = {
  heading: string
  className?: string
}

export default function ReviewSection({ heading, className }: ReviewSectionProps) {
  return (
    <div className={cn('my-12 flex flex-col', className)}>
      <div className='mx-auto mb-8 max-w-screen-md lg:mb-12'>
        <h2 className='mb-12 text-center tracking-tight text-gray-900'>{heading}</h2>
        <p className='mb-12 text-lg'>
          Here are all the reviews we have received from our customers.
          <div className='mb-4'/>
          The reviews below come in live. We do not edit any reviews.
          <div className='mb-4'/>
          After each job, we call to check in about how it went and ask for a review. Nearly all are amazing, and a couple are bad, but they are all real.
        </p>
      </div>
      <ReviewsGridClient />
      <TestimonialCarousel className='mt-16' />
    </div>
  )
}
