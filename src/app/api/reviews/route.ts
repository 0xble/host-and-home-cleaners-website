import { NextResponse } from 'next/server'
import { getReviews } from '@/lib/reviews'

// Revalidate every 3 hours (10800 seconds)
export const revalidate = 10800

export async function GET() {
  try {
    const reviews = await getReviews()
    return NextResponse.json(reviews, {
      headers: {
        'Cache-Control': `public, s-maxage=${revalidate}, stale-while-revalidate=${revalidate * 2}`,
      },
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}