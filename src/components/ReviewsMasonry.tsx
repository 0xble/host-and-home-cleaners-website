import { hoursToSeconds } from 'date-fns'

import { getReviews, type ReviewsMasonryProps } from '@/lib/reviews'

import { ReviewsMasonryClient } from './ReviewsMasonryClient'

// eslint-disable-next-line react-refresh/only-export-components
export const revalidate = hoursToSeconds(3) // Revalidate every 3 hours

export default async function ReviewsMasonry({ className }: ReviewsMasonryProps) {
  const reviewsData = await getReviews()
  return <ReviewsMasonryClient data={reviewsData} className={className} />
}
