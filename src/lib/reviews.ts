import { compareDesc, differenceInMinutes, hoursToSeconds } from 'date-fns'
import { LOCATIONS, REVIEWS } from '0xble/notion/types'
import { queryDatabase } from './notion'
import type { QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { cache } from 'react'

// In-memory cache for development
let reviewsCache: ReviewsData | null = null
let locationsCache: LocationData | null = null
let lastFetchTime = 0
const CACHE_DURATION_MIN = 60 // 1 hour

export type Platform = 'Google' | 'Facebook' | 'Yelp' | 'Thumbtack' | 'Nextdoor'

export type Review = {
  id: string
  date: Date | null
  rating: number | null
  text: string | null
  author: {
    name: string | null
    image: string | null
  }
  platform: Platform | null
  url: string | null
  location: string | null
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

async function fetchReviewPagesNotion(filter?: QueryDatabaseParameters['filter']) {
  try {
    console.log('Fetching reviews from Notion...')
    const result = await queryDatabase({
      database_id: REVIEWS.id,
      filter,
      sorts: [{ property: 'Date', direction: 'descending' }],
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

// Cache the getLocations function
export const getLocations = cache(async (): Promise<LocationData> => {
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
})

// Cache the getReviews function
export const getReviews = cache(async (location?: string): Promise<ReviewsData> => {
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
    // Fetch locations first to get location ID for filtering
    const { locations } = await getLocations()

    // Create filter for location if provided
    const filter: QueryDatabaseParameters['filter'] = location ? {
      property: 'Location',
      relation: {
        contains: locations.find(loc => loc.name.toLowerCase() === location.toLowerCase())?.id || ''
      }
    } : undefined

    // Fetch reviews with location filter if provided
    const reviewPages = await fetchReviewPagesNotion(filter)

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
        ? props.Platform.select?.name as Platform
        : null

      // Get date from "Date" property and format it
      const date = props.Date && 'date' in props.Date && props.Date.date?.start
        ? new Date(props.Date.date.start)
        : new Date()

      // Get rating from "Rating" property
      const rating = props.Rating && 'number' in props.Rating
        ? Number(props.Rating.number) || 5
        : 5

      // Find the matching location first
      const locationId = props['Location'] && 'relation' in props['Location'] && props['Location'].relation[0]?.id
      const location = locationId ? locations.find((location) => location.id === locationId) : null

      // Get URL from "URL" property
      const url = props.URL && 'url' in props.URL && props.URL.url !== null
        ? props.URL.url
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

      // Get reviewer profile URL
      const profileUrl = props['Reviewer Profile URL'] && 'url' in props['Reviewer Profile URL'] && props['Reviewer Profile URL'].url !== null
        ? props['Reviewer Profile URL'].url
        : null

      return {
        id: page.id,
        rating,
        text: content,
        author: {
          name: reviewerName,
          image: profileUrl,
        },
        platform,
        date,
        url,
        location: location ? location.name : null,
      }
    }).sort((a, b) => compareDesc(a.date, b.date))

    // Calculate platform ratings
    const platformCounts = {} as Record<Platform, { total: number, count: number, totalCount: number }>
    reviews.forEach((review) => {
      if (review.platform) {
        if (!platformCounts[review.platform]) {
          platformCounts[review.platform] = { total: 0, count: 0, totalCount: 0 }
        }
        platformCounts[review.platform].totalCount++
        if (review.rating !== null) {
          platformCounts[review.platform].total += review.rating
          platformCounts[review.platform].count++
        }
      }
    })

    const platform_ratings = Object.entries(platformCounts).map(([platform, { total, count, totalCount }]) => ({
      platform: platform as Platform,
      rating: count > 0 ? total / count : 0,
      total_reviews: totalCount,
    }))

    const reviewsData = {
      overall_rating: reviews.reduce((acc, r) => acc + r.rating!, 0) / reviews.length,
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
})
