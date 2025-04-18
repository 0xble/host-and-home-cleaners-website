'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { PixelEvent } from '../../../lib/pixel/pixelEvents'
import { initializePixel } from '../../../lib/pixel/pixelUtils'

const isBrowser = typeof window !== 'undefined'

export function PixelInitializer() {
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !isBrowser) {
      return
    }

    initializePixel().then((instance) => {
      if (instance && pathname) {
        instance.pageView()
      }
    })
  }, [isMounted, pathname])

  return null
}

export function ContentViewTracker({ contentType, contentName, contentId }: { contentType: string, contentName: string, contentId: string }) {
  const [isMounted, setIsMounted] = useState(false)
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && isBrowser) {
      initializePixel().then(setPixel)
    }
  }, [isMounted])

  useEffect(() => {
    if (pixel && contentType && contentName && contentId && isMounted) {
      pixel.track(PixelEvent.VIEW_CONTENT, {
        content_type: contentType,
        content_name: contentName,
        content_id: contentId,
      })
    }
  }, [contentType, contentName, contentId, pixel, isMounted])

  return null
}
