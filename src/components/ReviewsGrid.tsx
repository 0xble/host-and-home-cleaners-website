import ReviewsGridClient from './ReviewsGridClient'
import type { LocationKey } from '@/lib/constants'

interface ReviewsGridProps {
  location?: LocationKey
}

export default function ReviewsGrid({ location }: ReviewsGridProps) {
  return <ReviewsGridClient location={location} />
}