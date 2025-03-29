import { getReviews, type ReviewsMasonryProps } from '@/lib/reviews'

import { ReviewsMasonryClient } from './ReviewsMasonryClient'

export default async function ReviewsMasonry({ className }: ReviewsMasonryProps) {
  const reviewsData = await getReviews()
  return <ReviewsMasonryClient data={reviewsData} className={className} />
}
