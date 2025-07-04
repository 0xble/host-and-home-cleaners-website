'use client'

import { StarRating } from '@/app/review/components/StarRating'
import { ContentViewTracker } from '@/components/analytics/facebook/Pixel'
import Brand from '@/components/Brand'
import { Card } from '@/components/ui/card'

import { Container } from '@/components/ui/container'

export default function ReviewPage() {
  return (
    <>
      <ContentViewTracker
        contentType="page"
        contentName="Review"
        contentId="review-page"
      />
      <Container className="py-20">
        <Card className="mx-auto max-w-2xl p-8">
          <Brand location={null} className="mb-8 text-xl" />
          <div className="text-center">
            <h1 className="mb-6 text-4xl">How was your experience?</h1>
            <p className="mb-8">We value your feedback! Please rate your experience with us.</p>
            <StarRating />
          </div>
        </Card>
      </Container>
    </>
  )
}
