import { Client } from '@notionhq/client'
import type { PageObjectResponse, QueryDatabaseParameters } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NOTION_API_KEY })

export async function queryDatabase(params: QueryDatabaseParameters) {
  const pages: PageObjectResponse[] = []
  let hasMore = true
  let startCursor: string | undefined

  while (hasMore) {
    const response = await notion.databases.query({
      ...params,
      start_cursor: startCursor,
    })

    const validPages = response.results.filter((page): page is PageObjectResponse => 'properties' in page)
    pages.push(...validPages)

    // Only continue fetching if page_size is not specified
    hasMore = !params.page_size && response.has_more
    startCursor = response.next_cursor ?? undefined
  }

  return pages
}