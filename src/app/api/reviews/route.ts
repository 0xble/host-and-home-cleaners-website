import { getLogger } from '@/lib/logger'
import { getReviews } from '@/lib/reviews'

import { NextResponse } from 'next/server'

const logger = getLogger('api-reviews')

// Revalidate every 30 minutes (1800 seconds)
export const revalidate = 1800

export async function GET() {
  try {
    const reviews = await getReviews()

    return NextResponse.json(reviews, {
      headers: {
        'Cache-Control': `public, s-maxage=${revalidate}, stale-while-revalidate=${revalidate * 2}`,
      },
    })
  }
  catch (error: unknown) {
    // Enhanced error logging
    const errorDetails = error instanceof Error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
          cause: error.cause,
          constructor: error.constructor.name,
        }
      : {
          name: 'Unknown Error',
          message: String(error),
          stack: undefined,
          cause: undefined,
          constructor: 'Unknown',
        }

    logger.error('Detailed error in reviews API:', errorDetails)

    return NextResponse.json(
      {
        error: 'Failed to fetch reviews',
        details: errorDetails.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
