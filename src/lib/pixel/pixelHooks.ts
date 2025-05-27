'use client'

import type { PixelEventName } from '@/lib/pixel/pixelEvents'
import { usePathname } from 'next/navigation'

import { useCallback, useEffect, useState } from 'react'
import { PixelEvent } from '@/lib/pixel/pixelEvents'
import { initializePixel } from '@/lib/pixel/pixelUtils'

const isBrowser = typeof window !== 'undefined'

interface EventData {
  eventID?: string
}

export function useEventTracking() {
  // eslint-disable-next-line ts/no-unsafe-assignment
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    if (isBrowser) {
      void initializePixel().then(setPixel as (pixel: any) => void)
    }
  }, [])

  const trackEvent = useCallback((
    eventName: string | PixelEventName,
    params: Record<string, any> = {},
    eventData: EventData = {},
  ) => {
    if (pixel != null) {
      if (typeof eventData.eventID === 'string' && eventData.eventID.trim() !== '') {
        // eslint-disable-next-line ts/no-unsafe-call, ts/no-unsafe-member-access
        pixel.track(eventName, params, eventData)
      }
      else {
        // eslint-disable-next-line ts/no-unsafe-call, ts/no-unsafe-member-access
        pixel.track(eventName, params)
      }
    }
  }, [pixel])

  return trackEvent
}

export function useContentViewTracking(
  contentType: string,
  contentName: string,
  contentId: string,
  eventID?: string,
) {
  // eslint-disable-next-line ts/no-unsafe-assignment
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    if (isBrowser) {
      void initializePixel().then(setPixel as (pixel: any) => void)
    }
  }, [])

  useEffect(() => {
    if (pixel != null && contentType != null && contentName != null) {
      const params = {
        content_type: contentType,
        content_name: contentName,
        content_id: contentId,
      }

      if (typeof eventID === 'string' && eventID.trim() !== '') {
        // eslint-disable-next-line ts/no-unsafe-call, ts/no-unsafe-member-access
        pixel.track(PixelEvent.VIEW_CONTENT, params, { eventID })
      }
      else {
        // eslint-disable-next-line ts/no-unsafe-call, ts/no-unsafe-member-access
        pixel.track(PixelEvent.VIEW_CONTENT, params)
      }
    }
  }, [contentType, contentName, contentId, pixel, eventID])
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
