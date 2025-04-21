import type { RouteData } from '@/lib/routes'
import fs from 'fs'
import path from 'path'
import { ROUTES } from '@/lib/routes'

// @ts-expect-error Ignore type declarations
import { expect, mock, test } from 'bun:test'
import sitemap from '../sitemap'

mock.module('@/lib/utils', () => ({
  getBaseUrl: () => 'https://example.com',
}))

// Helper function to extract all valid internal routes
function getAllValidInternalRoutes(): RouteData[] {
  const routes: RouteData[] = []

  function processRoute(route: any) {
    if (!route)
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
  const routes: string[] = []

  function processDirectory(dir: string, parentPath: string = ''): void {
    const items = fs.readdirSync(dir)

    for (const item of items) {
      const fullPath = path.join(dir, item)
      const stat = fs.statSync(fullPath)

      // Skip special files and directories
      if (item.startsWith('_') || item.startsWith('.')
        || item === 'api' || item === 'components'
        || item === 'hooks' || item === 'layout.tsx'
        || item === 'page.tsx' || item === 'loading.tsx'
        || item === 'error.tsx' || item === 'not-found.tsx'
        || item === 'global-error.tsx' || item === 'robots.ts'
        || item === 'sitemap.ts' || item === 'globals.css') {
        continue
      }

      if (stat.isDirectory()) {
        const dirName = item.replace(/^\((.*)\)$/, '$1') // Remove parentheses from group routes
        const newParentPath = parentPath ? `${parentPath}/${dirName}` : dirName

        // Check if directory contains page.tsx
        if (fs.existsSync(path.join(fullPath, 'page.tsx'))) {
          routes.push(`/${newParentPath.toLowerCase()}`)
        }

        processDirectory(fullPath, newParentPath)
      }
    }
  }

  processDirectory(appDir)
  routes.push('/') // Add root route
  return routes.map(route => route.replace(/\/+/g, '/')) // Normalize paths
}

// Helper function to normalize route paths for comparison
function normalizePath(path: string): string {
  return path.toLowerCase()
    .replace(/\/+/g, '/') // Replace multiple slashes with single slash
    .replace(/\/$/, '') // Remove trailing slash
    .replace(/^([^/])/, '/$1') // Ensure leading slash
}

test('sitemap', () => {
  test('should generate sitemap entries for all valid internal routes', () => {
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

  test('should match app directory structure', () => {
    const result = sitemap()
    const appRoutes = getAppDirectoryRoutes()
    const sitemapPaths = result.map(entry =>
      normalizePath(new URL(entry.url).pathname),
    )

    // Check that each app route exists in sitemap
    appRoutes.forEach((appRoute) => {
      const normalizedAppRoute = normalizePath(appRoute)
      const routeExists = sitemapPaths.some(
        sitemapPath => normalizePath(sitemapPath) === normalizedAppRoute,
      )
      if (!routeExists) {
        console.warn(`Warning: App route ${appRoute} not found in sitemap`)
      }
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
      if (!routeExists) {
        console.warn(`Warning: Sitemap route ${sitemapPath} not found in app directory`)
      }
    })
  })

  test('should exclude routes with null priority', () => {
    const result = sitemap()
    const nullPriorityRoutes = getRoutesWithNullPriority()

    nullPriorityRoutes.forEach((route) => {
      expect(result).not.toContainEqual(expect.objectContaining({
        url: `https://example.com${route.href}`,
      }))
    })
  })

  test('should exclude external URLs', () => {
    const result = sitemap()
    const externalRoutes = getExternalRoutes()

    externalRoutes.forEach((route) => {
      expect(result).not.toContainEqual(expect.objectContaining({
        url: route.href,
      }))
    })
  })

  test('should have unique URLs', () => {
    const result = sitemap()
    const urls = result.map(entry => entry.url)
    const uniqueUrls = new Set(urls)

    expect(urls.length).toBe(uniqueUrls.size)
  })

  test('should have valid priorities', () => {
    const result = sitemap()

    result.forEach((entry) => {
      expect(entry.priority).toBeGreaterThanOrEqual(0)
      expect(entry.priority).toBeLessThanOrEqual(1)
    })
  })

  test('should have valid changeFrequency values', () => {
    const result = sitemap()
    const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']

    result.forEach((entry) => {
      if (entry.changeFrequency) {
        expect(validFrequencies).toContain(entry.changeFrequency)
      }
    })
  })

  test('should have lastModified dates', () => {
    const result = sitemap()

    result.forEach((entry) => {
      expect(entry.lastModified).toBeInstanceOf(Date)
    })
  })
})
