import { readdirSync } from 'fs'
import { join } from 'path'

/**
 * Normalizes a URL path for comparison.
 * - Ensures path is lowercase.
 * - Ensures a leading slash.
 * - Collapses multiple slashes.
 * - Removes a trailing slash unless it's the root path.
 * @param path The path string to normalize.
 * @returns The normalized path string.
 */
export function normalizePath(path: string): string {
  const lowerCasePath = path.toLowerCase()
  const withLeadingSlash = lowerCasePath.startsWith('/') ? lowerCasePath : `/${lowerCasePath}`
  const withoutMultiSlashes = withLeadingSlash.replace(/\/+/g, '/')
  if (withoutMultiSlashes.length > 1 && withoutMultiSlashes.endsWith('/'))
    return withoutMultiSlashes.slice(0, -1)

  return withoutMultiSlashes
}

/**
 * Recursively finds routes by looking for `page.tsx` files.
 * @param dir The directory to scan.
 * @param prefix The URL prefix for the current directory.
 * @returns An array of found route paths.
 */
function findRoutes(dir: string, prefix: string): string[] {
  const routes: string[] = []
  try {
    const entries = readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        const isRouteGroup = entry.name.startsWith('(') && entry.name.endsWith(')')
        const newPrefix = isRouteGroup ? prefix : join(prefix, entry.name)
        routes.push(...findRoutes(fullPath, newPrefix))
      }
      else if (entry.name === 'page.tsx') {
        routes.push(prefix)
      }
    }
  }
  catch {
    // This utility is designed to be resilient and not crash the test suite.
    // We ignore errors here (e.g., a directory doesn't exist during a scan) because the
    // primary goal is to gather a list of *existing* routes. The actual test assertions
    // that use this function's output are responsible for failing if a *required*
    // route is missing, thus ensuring correctness without making the tests brittle.
  }
  return routes
}

/**
 * Scans the app directory to get a list of all file-system based routes.
 * @param appDir The absolute path to the `src/app` directory.
 * @returns A sorted array of unique, normalized route strings.
 */
export function getAppFileSystemRoutes(appDir: string): string[] {
  const rawRoutes = findRoutes(appDir, '/')
  const normalizedRoutes = rawRoutes.map(route => normalizePath(route))
  return [...new Set(normalizedRoutes)].sort()
}
