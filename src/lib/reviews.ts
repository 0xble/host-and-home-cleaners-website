import { differenceInMinutes, formatDistanceToNow, hoursToSeconds } from 'date-fns'
import { LOCATIONS, REVIEWS } from '0xble/notion/types'
import { queryDatabase } from './notion'

// In-memory cache for development
let reviewsCache: ReviewsData | null = null
let locationsCache: LocationData | null = null
let lastFetchTime = 0
const CACHE_DURATION_MIN = 60 // 1 hour

export type Platform = 'Google' | 'Facebook' | 'Yelp' | 'Thumbtack' | 'Nextdoor'

export type Review = {
  id: string
  rating: number
  text: string
  author: {
    name: string
    image: string | null
  }
  platform: Platform
  date: string
  url: string | null
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

export type LocationData = {
  locations: Location[]
}

export type Location = {
  id: string
  name: string
  googleUrl: string | null
  yelpUrl: string | null
  thumbtackUrl: string | null
  nextdoorUrl: string | null
}

// eslint-disable-next-line react-refresh/only-export-components
export const revalidate = hoursToSeconds(3) // Revalidate every 3 hours

async function fetchReviewPagesNotion() {
  try {
    console.log('Fetching reviews from Notion...')
    const result = await queryDatabase({
      database_id: REVIEWS.id,
      sorts: [{ property: 'Date', direction: 'descending' }],
      page_size: process.env.NODE_ENV === 'development' ? 50 : undefined,
    })
    console.log(`Successfully fetched ${result.length} reviews`)
    return result
  } catch (error) {
    console.error('Error fetching reviews:', error)
    throw error
  }
}

async function fetchLocationsPagesNotion() {
  try {
    console.log('Fetching locations from Notion...')
    const result = await queryDatabase({ database_id: LOCATIONS.id })
    console.log(`Successfully fetched ${result.length} locations`)
    return result
  } catch (error) {
    console.error('Error fetching locations:', error)
    throw error
  }
}

export async function getReviews(): Promise<ReviewsData> {
  try {
    // Use cache in development mode
    if (process.env.NODE_ENV === 'development') {
      const now = Date.now()
      if (reviewsCache && differenceInMinutes(now, lastFetchTime) < CACHE_DURATION_MIN) {
        console.log('Using cached reviews data')
        return reviewsCache
      }
    }

    console.log('Starting to fetch reviews and locations...')
    // Fetch reviews and locations in parallel
    const [reviewPages, { locations }] = await Promise.all([
      fetchReviewPagesNotion(),
      getLocations()
    ])

    const reviews: Review[] = reviewPages.map((page) => {
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
        : null

      const location = locations.find((l) => l.id === page.id)

      // Get reviewer profile URL
      const profileUrl = props['Reviewer Profile URL'] && 'url' in props['Reviewer Profile URL'] && props['Reviewer Profile URL'].url
        ? props['Reviewer Profile URL'].url
        : (() => {
          switch (platform) {
            case 'Google':
              return location?.googleUrl ?? null
            case 'Yelp':
              return location?.yelpUrl ?? null
            case 'Thumbtack':
              return location?.thumbtackUrl ?? null
            case 'Nextdoor':
              return location?.nextdoorUrl ?? null
            default:
              return null
          }
        })();

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

    const reviewsData = {
      overall_rating: reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length,
      platform_ratings,
      reviews,
    }

    // Update cache in development mode
    if (process.env.NODE_ENV === 'development') {
      locationsCache = { locations: locations as Location[] }
      reviewsCache = reviewsData
      lastFetchTime = Date.now()
      console.log('Updated reviews cache')
    }

    return reviewsData
  } catch (error) {
    console.error('Error fetching reviews:', error)
    throw error
  }
}

export async function getLocations(): Promise<LocationData> {
  // Use cache in development mode
  if (process.env.NODE_ENV === 'development') {
    const now = Date.now()
    if (locationsCache && differenceInMinutes(now, lastFetchTime) < CACHE_DURATION_MIN) {
      console.log('Using cached locations data')
      return locationsCache
    }
  }

  const locationPages = await fetchLocationsPagesNotion()

  const locations: Location[] = locationPages.map((page) => {
    const props = page.properties
    return {
      id: page.id,
      name: props['Name'] && 'title' in props['Name']
        ? props['Name'].title[0]?.plain_text!
        : 'Unknown',
      googleUrl: props['Google URL'] && 'url' in props['Google URL']
        ? props['Google URL'].url
        : null,
      yelpUrl: props['Yelp URL'] && 'url' in props['Yelp URL']
        ? props['Yelp URL'].url
        : null,
      thumbtackUrl: props['Thumbtack URL'] && 'url' in props['Thumbtack URL']
        ? props['Thumbtack URL'].url
        : null,
      nextdoorUrl: props['Nextdoor URL'] && 'url' in props['Nextdoor URL']
        ? props['Nextdoor URL'].url
        : null,
    }
  })

  const locationsData = { locations }

  // Update cache in development mode
  if (process.env.NODE_ENV === 'development') {
    locationsCache = locationsData
    lastFetchTime = Date.now()
    console.log('Updated locations cache')
  }

  return locationsData
}
