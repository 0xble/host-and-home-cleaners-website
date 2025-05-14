import type { PageObjectResponse, QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'
import { getLogger } from '@/lib/logger'
import { APIResponseError, Client } from '@notionhq/client'
import { RateLimit } from 'async-sema'

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const logger = getLogger('notion')

// Notion has a rate limit of 2700 requests per 15 minutes = 3 requests per second
const rateLimiter = RateLimit(3, { timeUnit: 1000 })

async function fetchWithRetries<T>(
  apiCall: () => Promise<T>,
  maxRetries: number = 3,
): Promise<T> {
  let retries = 0
  while (retries <= maxRetries) {
    try {
      await rateLimiter()
      return await apiCall()
    }
    catch (error) {
      if (error instanceof APIResponseError) {
        // Handle rate limiting and server errors
        if ([429, 500, 502, 503, 504].includes(error.status)) {
          const waitTime = error.status === 429 ? 120 : Math.min(2 ** (retries + 4), 120) // Max 2 minutes
          logger.warn(`Notion API error (${error.status}), retrying in ${waitTime}s...`)
          await new Promise(resolve => setTimeout(resolve, waitTime * 1000))
          retries++
          if (retries > maxRetries) {
            throw new Error(`Max retries (${maxRetries}) reached: ${error.message}`)
          }
          continue
        }
      }
      throw error
    }
  }
  throw new Error('Unexpected error in retry loop')
}

export async function queryDatabase(params: QueryDatabaseParameters) {
  const pages: PageObjectResponse[] = []
  let hasMore = true
  let startCursor: string | undefined

  while (hasMore) {
    try {
      const response = await fetchWithRetries(async () =>
        notion.databases.query({
          ...params,
          start_cursor: startCursor,
        }),
      )

      const validPages = response.results.filter((page): page is PageObjectResponse => 'properties' in page)
      pages.push(...validPages)

      // Always continue fetching if response.has_more is true
      hasMore = response.has_more
      startCursor = response.next_cursor ?? undefined
    }
    catch (error) {
      logger.error('Error querying Notion database:', error)
      throw error
    }
  }

  return pages
}
