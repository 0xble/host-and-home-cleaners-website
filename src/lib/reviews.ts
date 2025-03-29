import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { formatDistanceToNow } from 'date-fns'

export const revalidate = 3600 // seconds

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export type Platform = 'Google' | 'Facebook' | 'Yelp' | 'Thumbtack' | 'Nextdoor'

export type ReviewsMasonryProps = {
  id?: string // Optional for backward compatibility
  className?: string
}

export type Review = {
  id: string
  rating: number
  text: string
  author: {
    name: string
    image?: string
  }
  platform: Platform
  date: string
  url?: string
}

export type PlatformRating = {
  platform: Platform
  rating: number
  total_reviews: number
}

export type ReviewsData = {
  overall_rating: number
  platform_ratings: PlatformRating[]
  reviews: Review[]
}

async function fetchReviewPagesNotion() {
  const pages: PageObjectResponse[] = []
  let hasMore = true
  let startCursor: string | undefined

  while (hasMore) {
    const response = await notion.databases.query({
      database_id: '1052fe6126cd80e3be43cbf84c0ecc5c',
      sorts: [{ property: 'Date', direction: 'descending' }],
      start_cursor: startCursor,
      page_size: 100,
    })

    const validPages = response.results.filter((page): page is PageObjectResponse => 'properties' in page)
    pages.push(...validPages)

    hasMore = response.has_more
    startCursor = response.next_cursor || undefined
  }

  return pages
}

export async function getReviews(): Promise<ReviewsData> {
  const pages = await fetchReviewPagesNotion()

  const reviews = pages.map((page) => {
    const props = page.properties

    // Get reviewer name from "Reviewer Name" property
    const reviewerName = props['Reviewer Name'] && 'rich_text' in props['Reviewer Name']
      ? props['Reviewer Name'].rich_text[0]?.plain_text || 'Anonymous'
      : 'Anonymous'

    // Get review content from "Content" property
    const content = props.Content && 'rich_text' in props.Content
      ? props.Content.rich_text[0]?.plain_text || ''
      : ''

    // Get platform from "Platform" property
    const platform = props.Platform && 'select' in props.Platform
      ? props.Platform.select?.name as Platform || 'Google'
      : 'Google'

    // Get date from "Date" property and format it
    const rawDate = props.Date && 'date' in props.Date && props.Date.date?.start
      ? new Date(props.Date.date.start)
      : new Date()

    const formattedDate = formatDistanceToNow(rawDate, { addSuffix: true })

    // Get rating from "Rating" property
    const rating = props.Rating && 'number' in props.Rating
      ? Number(props.Rating.number) || 5
      : 5

    // Get URL from "URL" property
    const url = props.URL && 'url' in props.URL && props.URL.url
      ? props.URL.url
      : undefined

    // Get reviewer profile URL
    const profileUrl = props['Reviewer Profile URL'] && 'url' in props['Reviewer Profile URL'] && props['Reviewer Profile URL'].url
      ? props['Reviewer Profile URL'].url
      : undefined

    return {
      id: page.id,
      rating,
      text: content,
      author: {
        name: reviewerName,
        image: profileUrl,
      },
      platform,
      date: formattedDate,
      url,
    }
  })

  // Calculate platform ratings
  const platformCounts = {} as Record<Platform, { total: number, count: number }>
  reviews.forEach((review) => {
    if (!platformCounts[review.platform]) {
      platformCounts[review.platform] = { total: 0, count: 0 }
    }
    platformCounts[review.platform].total += review.rating
    platformCounts[review.platform].count++
  })

  const platform_ratings = Object.entries(platformCounts).map(([platform, { total, count }]) => ({
    platform: platform as Platform,
    rating: total / count,
    total_reviews: count,
  }))

  return {
    overall_rating: reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length,
    platform_ratings,
    reviews,
  }
}
