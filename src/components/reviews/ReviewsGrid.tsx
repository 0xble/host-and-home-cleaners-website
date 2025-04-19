import type { Location } from '@/lib/constants'

import ReviewsGridClient from './ReviewsGridClient'

interface ReviewsGridProps {
  location?: Location
}

export default function ReviewsGrid({ location }: ReviewsGridProps) {
  return <ReviewsGridClient location={location} />
}
