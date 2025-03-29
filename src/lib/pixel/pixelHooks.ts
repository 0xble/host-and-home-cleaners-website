'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { PixelEvent, type PixelEventName } from './pixelEvents'
import { initializePixel } from './pixelUtils'

const isBrowser = typeof window !== 'undefined'

export function useEventTracking() {
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    if (isBrowser) {
      initializePixel().then(setPixel)
    }
  }, [])

  const trackEvent = useCallback((eventName: string | PixelEventName, params = {}) => {
    if (pixel) {
      pixel.track(eventName, params)
    }
  }, [pixel])

  return trackEvent
}

export function useContentViewTracking(contentType: string, contentName: string, contentId: string) {
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    if (isBrowser) {
      initializePixel().then(setPixel)
    }
  }, [])

  useEffect(() => {
    if (pixel && contentType && contentName) {
      pixel.track(PixelEvent.VIEW_CONTENT, {
        content_type: contentType,
        content_name: contentName,
        content_id: contentId,
      })
    }
  }, [contentType, contentName, contentId, pixel])
}

export function usePageViewTracking() {
  const pathname = usePathname()
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    if (isBrowser) {
      initializePixel().then(setPixel)
    }
  }, [])

  useEffect(() => {
    if (pathname && pixel) {
      pixel.pageView()
    }
  }, [pathname, pixel])
}
