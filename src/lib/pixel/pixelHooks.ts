'use client'

import type { PixelEventName } from '@/lib/pixel/pixelEvents'
import { usePathname } from 'next/navigation'

import { useCallback, useEffect, useState } from 'react'
import { PixelEvent } from '@/lib/pixel/pixelEvents'
import { initializePixel } from '@/lib/pixel/pixelUtils'

const isBrowser = typeof window !== 'undefined'

export function useEventTracking() {
  // eslint-disable-next-line ts/no-unsafe-assignment
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    if (isBrowser) {
      void initializePixel().then(setPixel as (pixel: any) => void)
    }
  }, [])

  const trackEvent = useCallback((eventName: string | PixelEventName, params = {}) => {
    if (pixel != null) {
      // eslint-disable-next-line ts/no-unsafe-call, ts/no-unsafe-member-access
      pixel.track(eventName, params)
    }
  }, [pixel])

  return trackEvent
}

export function useContentViewTracking(contentType: string, contentName: string, contentId: string) {
  // eslint-disable-next-line ts/no-unsafe-assignment
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    if (isBrowser) {
      void initializePixel().then(setPixel as (pixel: any) => void)
    }
  }, [])

  useEffect(() => {
    if (pixel != null && contentType != null && contentName != null) {
      // eslint-disable-next-line ts/no-unsafe-call, ts/no-unsafe-member-access
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
  // eslint-disable-next-line ts/no-unsafe-assignment
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    if (isBrowser) {
      void initializePixel().then(setPixel as (pixel: any) => void)
    }
  }, [])

  useEffect(() => {
    if (pathname != null && pixel != null) {
      // eslint-disable-next-line ts/no-unsafe-call, ts/no-unsafe-member-access
      pixel.pageView()
    }
  }, [pathname, pixel])
}
