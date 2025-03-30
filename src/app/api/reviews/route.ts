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
  } catch (error: unknown) {
    // Enhanced error logging
    const errorDetails = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
      cause: error.cause,
      constructor: error.constructor.name,
    } : {
      name: 'Unknown Error',
      message: String(error),
      stack: undefined,
      cause: undefined,
      constructor: 'Unknown',
    }

    console.error('Detailed error in reviews API:', errorDetails)

    return NextResponse.json(
      {
        error: 'Failed to fetch reviews',
        details: errorDetails.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}