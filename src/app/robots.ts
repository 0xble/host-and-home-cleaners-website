import type { MetadataRoute } from 'next'

import { getBaseUrl } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Prevent crawlers from accessing Cloudflare's /cdn-cgi/ endpoint which
      // includes email protection and other Cloudflare-specific features.
      disallow: ['/cdn-cgi/'],
    },
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  }
}
