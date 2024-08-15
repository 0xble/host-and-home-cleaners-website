'use client'
import { useLocationStore, Location } from '@/store/useLocationStore'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import Navbar from './Navbar'
import Footer from './Footer'

type PageProps = {
  className?: string
  children: React.ReactNode
}

export default function Page({ className, children }: PageProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { location, setLocation } = useLocationStore()

  useEffect(() => {
    if (location === Location.NONE) {
      if (
        [
          '/house-cleaning-services-myrtle-beach',
          '/house-cleaning-services-garden-city',
        ].includes(pathname)
      ) {
        setLocation(Location.MYRTLE_BEACH)
      }
    } else if (pathname === '/') {
      if (location === 'Myrtle Beach') {
        router.replace('/house-cleaning-services-myrtle-beach')
      }
    }
  }, [location, setLocation, pathname, router])

  return (
    <>
      <Navbar location={location} />
      <main className={cn('', className)}>{children}</main>
      <Footer location={location} />
    </>
  )
}
