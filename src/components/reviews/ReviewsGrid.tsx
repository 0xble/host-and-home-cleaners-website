import type { Location } from '@/lib/types'

import ReviewsGridClient from '@/components/reviews/ReviewsGridClient'

interface ReviewsGridProps {
  location?: Location
}

export default function ReviewsGrid({ location }: ReviewsGridProps) {
  return <ReviewsGridClient location={location} />
}
