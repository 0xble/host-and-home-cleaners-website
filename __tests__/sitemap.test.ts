/* eslint-disable ts/no-unsafe-argument */
/* eslint-disable ts/strict-boolean-expressions */
/* eslint-disable ts/no-unsafe-member-access */
/* eslint-disable ts/no-unsafe-call */
import type { RouteData } from '@/lib/routes'
import path from 'path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'
import { ROUTES } from '@/lib/routes'
import { getAppFileSystemRoutes, normalizePath } from './utils/getAppRoutes'

// Set up consistent environment for testing
let originalUrl: string | undefined

beforeAll(() => {
  originalUrl = process.env.NEXT_PUBLIC_APP_URL
  process.env.NEXT_PUBLIC_APP_URL = 'https://example.com'
})

afterAll(() => {
  if (originalUrl) {
    process.env.NEXT_PUBLIC_APP_URL = originalUrl
  }
  else {
    delete process.env.NEXT_PUBLIC_APP_URL
  }
})

// Helper function to extract all valid internal routes
function getAllValidInternalRoutes(): RouteData[] {
  const routes: RouteData[] = []

  function processRoute(route: any) {
    if (route == null)
      return

    if ('href' in route && route.priority !== null) {
      if (typeof route.href === 'string' && !route.href.startsWith('http')) {
        routes.push(route)
      }
    }

    if ('SERVICE_AREAS' in route) {
      Object.values(route.SERVICE_AREAS)
        .filter((area: any) => area.href !== route.href)
        .forEach(processRoute)
    }
  }

  Object.values(ROUTES).forEach((route) => {
    if (typeof route === 'object' && route !== null) {
      if ('href' in route) {
        processRoute(route)
      }
      else {
        Object.values(route).forEach(processRoute)
      }
    }
  })

  return routes
}

// Helper function to extract external routes
function getExternalRoutes(): RouteData[] {
  const routes: RouteData[] = []

  function processRoute(route: any) {
    if (!route)
      return

    if ('href' in route && typeof route.href === 'string' && route.href.startsWith('http')) {
      routes.push(route)
    }
  }

  Object.values(ROUTES).forEach((route) => {
    if (typeof route === 'object' && route !== null) {
      if ('href' in route) {
        processRoute(route)
      }
      else {
        Object.values(route).forEach(processRoute)
      }
    }
  })

  return routes
}

// Helper function to extract routes with null priority
function getRoutesWithNullPriority(): RouteData[] {
  const routes: RouteData[] = []

  function processRoute(route: any) {
    if (!route)
      return

    if ('href' in route && route.priority === null) {
      routes.push(route)
    }
  }

  Object.values(ROUTES).forEach((route) => {
    if (typeof route === 'object' && route !== null) {
      if ('href' in route) {
        processRoute(route)
      }
      else {
        Object.values(route).forEach(processRoute)
      }
    }
  })

  return routes
}

// Helper function to get valid routes from app directory structure
function getAppDirectoryRoutes(): string[] {
  const appDir = path.join(process.cwd(), 'src', 'app')
  return getAppFileSystemRoutes(appDir)
}

describe('sitemap', () => {
  it('should generate sitemap entries for all valid internal routes', async () => {
    const result = sitemap()
    const validRoutes = getAllValidInternalRoutes()

    validRoutes.forEach((route) => {
      expect(result).toContainEqual(expect.objectContaining({
        url: `https://example.com${route.href}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      }))
    })

    // Verify the total number of routes matches
    expect(result.length).toBe(validRoutes.length)
  })

  it('should match app directory structure', async () => {
    const result = sitemap()
    const appRoutes = getAppDirectoryRoutes()
    const sitemapPaths = result.map(entry =>
      normalizePath(new URL(entry.url).pathname),
    )

    // Check that each app route exists in sitemap
    appRoutes.forEach((appRoute) => {
      // Skip routes that have null priority in the ROUTES configuration
      const shouldSkip = getRoutesWithNullPriority().some((route: RouteData) => route.href === appRoute)
      if (shouldSkip)
        return

      const normalizedAppRoute = normalizePath(appRoute)
      const routeExists = sitemapPaths.some(
        sitemapPath => normalizePath(sitemapPath) === normalizedAppRoute,
      )
      if (!routeExists)
        throw new Error(`Error: App route ${appRoute} not found in sitemap`)
    })

    // Check that each sitemap route exists in app directory
    sitemapPaths.forEach((sitemapPath) => {
      // Skip confirmation pages and other dynamic routes that won't have a static page.tsx
      if (sitemapPath.includes('confirmation'))
        return

      const normalizedSitemapPath = normalizePath(sitemapPath)
      const routeExists = appRoutes.some(
        appRoute => normalizePath(appRoute) === normalizedSitemapPath,
      )
      if (!routeExists)
        throw new Error(`Error: Sitemap route ${sitemapPath} not found in app directory`)
    })
  })

  it('should exclude routes with null priority', async () => {
    const result = sitemap()
    const nullPriorityRoutes = getRoutesWithNullPriority()

    nullPriorityRoutes.forEach((route) => {
      expect(result).not.toContainEqual(expect.objectContaining({
        url: `https://example.com${route.href}`,
      }))
    })
  })

  it('should exclude external URLs', async () => {
    const result = sitemap()
    const externalRoutes = getExternalRoutes()

    externalRoutes.forEach((route) => {
      expect(result).not.toContainEqual(expect.objectContaining({
        url: route.href,
      }))
    })
  })

  it('should have unique URLs', async () => {
    const result = sitemap()
    const urls = result.map(entry => entry.url)
    const uniqueUrls = new Set(urls)

    expect(urls.length).toBe(uniqueUrls.size)
  })

  it('should have valid priorities', async () => {
    const result = sitemap()

    result.forEach((entry) => {
      expect(entry.priority).toBeGreaterThanOrEqual(0)
      expect(entry.priority).toBeLessThanOrEqual(1)
    })
  })

  it('should have valid changeFrequency values', async () => {
    const result = sitemap()
    const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']

    result.forEach((entry) => {
      if (entry.changeFrequency)
        expect(validFrequencies).toContain(entry.changeFrequency)
    })
  })

  it('should have lastModified dates', async () => {
    const result = sitemap()

    result.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date)
    })
  })
})
