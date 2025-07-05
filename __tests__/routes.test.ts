import type { RouteData } from '@/lib/routes'
import { readFileSync } from 'fs'
import { join } from 'path'
import { glob } from 'glob'
import { describe, expect, it } from 'vitest'
import { ROUTES } from '@/lib/routes'
import { getAppFileSystemRoutes } from './utils/getAppRoutes'

// --- Phase 1: Gather all defined routes from ROUTES configuration ---

function getAllDefinedRoutes(routesConfig: unknown): RouteData[] {
  const allRoutes: RouteData[] = []

  function recurse(current: unknown) {
    if (typeof current !== 'object' || current === null)
      return

    // If it looks like a RouteData object, add it.
    if ('href' in current && typeof (current as RouteData).href === 'string')
      allRoutes.push(current as RouteData)

    // Recurse into its values.
    Object.values(current).forEach(recurse)
  }

  recurse(routesConfig)

  // Remove duplicates by href
  const uniqueRoutes = allRoutes.reduce((acc, route) => {
    if (!acc.some(item => item.href === route.href))
      acc.push(route)
    return acc
  }, [] as RouteData[])

  return uniqueRoutes
}

function getComponentLinks(sourcePaths: string[]): Map<string, string[]> {
  const componentLinks = new Map<string, string[]>()
  const hrefRegex = /href=(?:'|")(.*?)(?:'|")/g

  const files = glob.sync(sourcePaths, { nodir: true })

  for (const file of files) {
    const content = readFileSync(file, 'utf8')
    const links: string[] = []
    let match

    while ((match = hrefRegex.exec(content)) !== null) {
      // match[1] is the link
      const link = match[1]
      if (typeof link === 'string')
        links.push(link)
    }

    if (links.length > 0)
      componentLinks.set(file, links)
  }

  return componentLinks
}

// --- Phase 4: The Tests ---

describe('website Route and Link Validation', () => {
  const definedRoutes = getAllDefinedRoutes(ROUTES)
  const internalStaticRoutes = definedRoutes
    .filter(r => r.href.startsWith('/') && !r.href.includes('['))
    .map(r => r.href)

  const appDir = join(process.cwd(), 'src', 'app')
  const fileSystemRoutes = getAppFileSystemRoutes(appDir)

  it('should have a corresponding file system route for every static route in ROUTES config', () => {
    const missingFileRoutes = internalStaticRoutes.filter(route => !fileSystemRoutes.includes(route))

    if (missingFileRoutes.length > 0)
      console.error('❌ Routes in `routes.ts` with no matching `page.tsx`:', missingFileRoutes)

    expect(missingFileRoutes).toHaveLength(0)
  })

  it('should have a corresponding route in ROUTES config for every file system route', () => {
    const missingConfigRoutes = fileSystemRoutes.filter(route => !internalStaticRoutes.includes(route))

    if (missingConfigRoutes.length > 0)
      console.error('❌ `page.tsx` files with no matching route in `routes.ts`:', missingConfigRoutes)

    expect(missingConfigRoutes).toHaveLength(0)
  })

  it('should have valid links in all components', () => {
    const componentLinks = getComponentLinks(['src/components/**/*.tsx', 'src/app/**/*.tsx'])
    const allDefinedInternalHrefs = definedRoutes.filter(r => r.href.startsWith('/')).map(r => r.href)
    const brokenLinks = new Map<string, string[]>()

    for (const [file, links] of componentLinks.entries()) {
      const fileBrokenLinks: string[] = []
      for (const link of links) {
        // Ignore external links, anchor links, the special /booking route, and dynamic links for this test
        if (link.startsWith('http') || link.startsWith('#') || link.startsWith('tel:') || link.startsWith('mailto:') || link.includes('[') || link.includes('${') || link === '/booking')
          continue

        if (!allDefinedInternalHrefs.includes(link))
          fileBrokenLinks.push(link)
      }

      if (fileBrokenLinks.length > 0)
        brokenLinks.set(file, fileBrokenLinks)
    }

    if (brokenLinks.size > 0) {
      console.error('❌ Found broken links in the following files:')
      for (const [file, links] of brokenLinks.entries())
        console.error(`  - ${file}: ${links.join(', ')}`)
    }

    expect(brokenLinks.size).toBe(0)
  })

  it('should have correctly formatted route hrefs', () => {
    const formatIssues: string[] = []
    const internalRoutes = definedRoutes.filter(r => r.href.startsWith('/'))

    for (const route of internalRoutes) {
      const { href, name } = route
      // 1. Must start with a '/'
      if (!href.startsWith('/'))
        formatIssues.push(`"${name}" (${href}) - Does not start with '/'.`)

      // 2. Should not have a trailing slash (unless it's the root)
      if (href !== '/' && href.endsWith('/'))
        formatIssues.push(`"${name}" (${href}) - Should not have a trailing slash.`)

      // 3. Should be kebab-case and contain only valid URL characters
      if (!/^\/(?:[a-z0-9-]+\/)*[a-z0-9-]+$/.test(href) && href !== '/')
        formatIssues.push(`"${name}" (${href}) - Is not valid kebab-case.`)
    }

    if (formatIssues.length > 0)
      console.error('❌ Found route formatting issues:', formatIssues)

    expect(formatIssues).toHaveLength(0)
  })
})
