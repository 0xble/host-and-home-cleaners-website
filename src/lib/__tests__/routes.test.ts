/* eslint-disable ts/no-unsafe-member-access */
/* eslint-disable ts/no-unsafe-call */
import type { RouteData } from '@/lib/routes'
import { existsSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'

// @ts-expect-error Ignore type declarations
import { describe, expect, it } from 'bun:test'

import { ROUTES } from '@/lib/routes'

describe('routes validation', () => {
  // Helper to check if a route exists in the app directory
  const routeExists = (route: string): boolean => {
    // Remove leading and trailing slashes
    route = route.replace(/^\/|\/$/g, '')

    if (!route)
      return true // Root route always exists

    const segments = route.split('/')
    let currentPath = resolve(process.cwd(), 'src/app')

    const findInRouteGroups = (path: string, segment: string): string | null => {
      const routeGroups = readdirSync(path)
        .filter((dir: string) => dir.startsWith('(') && dir.endsWith(')'))

      for (const group of routeGroups) {
        const groupPath = resolve(path, group)
        // Check if segment exists directly in the route group
        const directPath = resolve(groupPath, segment)
        if (existsSync(directPath)) {
          return directPath
        }

        // Special case for services - check with -cleaning suffix
        if (group === '(services)') {
          const cleaningPath = resolve(groupPath, `${segment}-cleaning`)
          if (existsSync(cleaningPath)) {
            return cleaningPath
          }
        }

        // Check if segment exists in nested route groups
        const nestedGroups = readdirSync(groupPath)
          .filter((dir: string) => dir.startsWith('(') && dir.endsWith(')'))

        for (const nestedGroup of nestedGroups) {
          const nestedPath = resolve(groupPath, nestedGroup, segment)
          if (existsSync(nestedPath)) {
            return nestedPath
          }

          // Special case for services in nested groups - check with -cleaning suffix
          const nestedCleaningPath = resolve(groupPath, nestedGroup, `${segment}-cleaning`)
          if (existsSync(nestedCleaningPath)) {
            return nestedCleaningPath
          }
        }
      }

      return null
    }

    for (const segment of segments) {
      // First check if the segment exists directly
      const directPath = resolve(currentPath, segment)
      if (existsSync(directPath)) {
        currentPath = directPath
        continue
      }

      // Then check in route groups
      const routeGroupPath = findInRouteGroups(currentPath, segment)
      if (routeGroupPath != null) {
        currentPath = routeGroupPath
        continue
      }

      // Special case for services - check if we're in the services directory
      if (currentPath.includes('(services)')) {
        const cleaningPath = resolve(currentPath, `${segment}-cleaning`)
        if (existsSync(cleaningPath)) {
          currentPath = cleaningPath
          continue
        }
      }

      return false
    }

    return true
  }

  // Helper to validate route format
  const isValidRouteFormat = (route: string): boolean => {
    // Skip validation for external URLs
    if (route.startsWith('http'))
      return true

    // Routes should:
    // 1. Start with /
    // 2. Not end with / (except root)
    // 3. Use kebab-case
    // 4. Not have consecutive slashes
    if (route === '/')
      return true

    const pattern = /^\/[a-z0-9-]+(?:\/[a-z0-9-]+)*$/
    return pattern.test(route)
  }

  const validateRouteObject = (obj: Record<string, RouteData | Record<string, RouteData>>, path = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      // Skip service areas validation as they're dynamically generated
      if (key === 'SERVICE_AREAS')
        return

      if (typeof value === 'object' && value !== null && 'href' in value) {
        const { href } = value as RouteData

        it(`${path}${key} should have a valid route format`, () => {
          expect(isValidRouteFormat(href)).toBe(true)
        })

        it(`${path}${key} should exist in the app directory`, () => {
          // Skip external URLs (like login)
          if (href.startsWith('http'))
            return
          expect(routeExists(href)).toBe(true)
        })
      }
      else if (typeof value === 'object' && value !== null) {
        // Recursively validate nested route objects
        validateRouteObject(value as Record<string, RouteData | Record<string, RouteData>>, `${path}${key}.`)
      }
    })
  }

  validateRouteObject(ROUTES)
})
