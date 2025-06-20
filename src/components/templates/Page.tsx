'use client'
import type { Location } from '@/lib/types'

import { useEffect } from 'react'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { PHONE } from '@/lib/constants'

import { cn } from '@/lib/utils'
import { useLocationStore } from '@/store/useLocationStore'

interface PageProps {
  children: React.ReactNode
  location: Location | 'CACHED' | null
  className?: string
}

export default function Page(props: PageProps) {
  const { className, children } = props
  const { location: cachedLocation, setLocation } = useLocationStore()
  const location = props.location === 'CACHED' ? cachedLocation : props.location

  useEffect(() => {
    if (props.location !== 'CACHED' && props.location !== null && props.location !== cachedLocation) {
      setLocation(props.location)
    }
  }, [cachedLocation, props.location, setLocation])

  return (
    <>
      <Navbar
        location={location}
        phone={location ? PHONE[location] : null}
      />
      <main className={cn('', className)}>{children}</main>
      <Footer location={location} />
    </>
  )
}
