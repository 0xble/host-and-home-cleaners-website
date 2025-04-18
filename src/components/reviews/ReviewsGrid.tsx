import type { LocationKey } from '@/lib/constants'

import ReviewsGridClient from './ReviewsGridClient'

type ReviewsGridProps = {
  location?: LocationKey
}

export default function ReviewsGrid({ location }: ReviewsGridProps) {
  return <ReviewsGridClient location={location} />
}
