import type { LocationKey } from '@/lib/constants'

import ReviewsGridClient from './ReviewsGridClient'

interface ReviewsGridProps {
  location?: LocationKey
}

export default function ReviewsGrid({ location }: ReviewsGridProps) {
  return <ReviewsGridClient location={location} />
}
