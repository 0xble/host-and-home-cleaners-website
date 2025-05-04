'use client'

import { PixelEvent } from '@/lib/pixel/pixelEvents'
import { initializePixel } from '@/lib/pixel/pixelUtils'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

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

    void initializePixel().then((instance) => {
      if (instance != null && pathname != null) {
        instance.pageView()
      }
    })
  }, [isMounted, pathname])

  return null
}

export function ContentViewTracker({ contentType, contentName, contentId }: { contentType: string, contentName: string, contentId: string }) {
  const [isMounted, setIsMounted] = useState(false)
  // eslint-disable-next-line ts/no-unsafe-assignment
  const [pixel, setPixel] = useState<any>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && isBrowser) {
      void initializePixel().then(setPixel)
    }
  }, [isMounted])

  useEffect(() => {
    if (pixel != null && contentType != null && contentName != null && contentId != null && isMounted) {
      // eslint-disable-next-line ts/no-unsafe-call, ts/no-unsafe-member-access
      pixel.track(PixelEvent.VIEW_CONTENT, {
        content_type: contentType,
        content_name: contentName,
        content_id: contentId,
      })
    }
  }, [contentType, contentName, contentId, pixel, isMounted])

  return null
}
