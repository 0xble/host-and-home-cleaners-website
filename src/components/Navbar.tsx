'use client'

import { Bars3Icon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import TrackedLink from '@/components/TrackedLink'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CHECKLIST_NAME } from '@/lib/constants'
import { PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'
import type { Location, Phone } from '@/lib/types'
import { cn, getUrl } from '@/lib/utils'

import Brand from './Brand'
import PhoneLink from './PhoneLink'

type NavbarLinkProps = {
  href: string
  children: React.ReactNode
  className?: string
}

export function NavbarLink({
  href,
  children,
  className,
  ...props
}: NavbarLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <TrackedLink
      href={href}
      className={cn(
        'block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700',
        isActive && 'text-white bg-primary-700 lg:bg-transparent lg:text-primary-700',
        className,
      )}
      eventName={href === ROUTES.BOOKING.href ? PixelEvent.SCHEDULE : 'NavClick'}
      eventParams={href === ROUTES.BOOKING.href ? {} : { path: href }}
      {...props}
    >
      {children}
    </TrackedLink>
  )
}

type NavbarProps = {
  location: Location | null
  phone: Phone | null
}

export default function Navbar({
  location,
  phone,
}: NavbarProps) {
  return (
    <>
      <nav className='fixed start-0 top-0 z-50 w-full border-b bg-white shadow-sm'>
        <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
          <Brand className='text-xs sm:text-xl' location={location} />
          <div className='flex items-center space-x-3 lg:order-2 lg:space-x-0 rtl:space-x-reverse'>
            {phone && (
              <PhoneLink
                className='absolute hidden whitespace-nowrap sm:flex sm:-translate-x-40 lg:-translate-x-48'
                phone={phone}
              />
            )}
            <TrackedLink
              href={ROUTES.BOOKING.href}
              className='rounded-lg bg-primary-700 p-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 lg:text-base'
              eventName={PixelEvent.SCHEDULE}
            >
              Book Now
            </TrackedLink>
            <button
              data-collapse-toggle='navbar-sticky'
              type='button'
              className='inline-flex size-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden'
              aria-controls='navbar-sticky'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='size-6' />
            </button>
          </div>
          {phone && (
            <div className='w-full pt-2 text-end sm:hidden'>
              <PhoneLink phone={phone} />
            </div>
          )}
          <div
            className='hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto lg:-translate-x-20'
            id='navbar-sticky'
          >
            <ul className='mt-4 flex flex-col rounded-lg border bg-white p-4 font-light lg:mt-0 lg:flex-row lg:space-x-8 lg:border-0 lg:p-0 rtl:space-x-reverse'>
              <li>
                <NavbarLink href={getUrl(location)}>
                  {ROUTES.HOME.name}
                </NavbarLink>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type='button'
                      className='flex items-center justify-between rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:hover:bg-transparent md:hover:text-primary-700 lg:p-0'
                    >
                      Services
                      <svg
                        className='ms-2.5 size-2.5'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 10 6'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='m1 1 4 4 4-4'
                        />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='shadow-lg max-lg:translate-x-10'>
                    <DropdownMenuItem
                      className='block px-4 py-2 text-base font-light hover:bg-gray-100'
                      asChild
                    >
                      <Link href={ROUTES.CHECKLIST.href}>{CHECKLIST_NAME}</Link>
                    </DropdownMenuItem>
                    {Object.values(ROUTES.SERVICES).map(service => (
                      <DropdownMenuItem
                        key={service.name}
                        className='block px-4 py-2 text-base font-light hover:bg-gray-100'
                        asChild
                      >
                        <Link href={service.href}>{service.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <NavbarLink href={ROUTES.ABOUT.href}>{ROUTES.ABOUT.name}</NavbarLink>
              </li>
              <li>
                <NavbarLink href={ROUTES.BOOKING.href}>{ROUTES.BOOKING.name}</NavbarLink>
              </li>
              <li>
                <NavbarLink href={ROUTES.LOGIN.href}>{ROUTES.LOGIN.name}</NavbarLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* @hack */}
      {/* Add space so children are not covered by navbar. */}
      <div className='h-[116px] sm:h-[80px]' />
    </>
  )
}
