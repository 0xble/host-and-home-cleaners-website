import { Bars3Icon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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

  return (
    <Link
      href={href}
      className={cn(
        'block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700',
        pathname === href ? 'text-primary-700' : '',
        className,
      )}
      {...props}
    >
      {children}
    </Link>
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
      <nav className='fixed start-0 top-0 z-50 w-full border-b border-gray-200 bg-white'>
        <div className='mx-auto flex h-[82px] max-w-screen-xl flex-wrap items-center justify-between px-4'>
          <Brand className='text-xs sm:text-xl' location={location} />
          <div className='flex items-center space-x-3 lg:order-2 lg:space-x-0 rtl:space-x-reverse'>
            {phone && (
              <PhoneLink
                className='absolute hidden whitespace-nowrap sm:flex sm:-translate-x-40 lg:-translate-x-48'
                phone={phone}
              />
            )}
            <Link
              href={ROUTES.BOOKING.href}
              className='rounded-lg bg-primary-700 p-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 lg:text-base'
            >
              Book Now
            </Link>
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
            <div className='w-full pt-4 text-end sm:hidden'>
              <PhoneLink phone={phone} />
            </div>
          )}
          <div
            className='hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto lg:-translate-x-20'
            id='navbar-sticky'
          >
            <ul className='mt-4 flex flex-col rounded-lg border p-4 font-light lg:mt-0 lg:flex-row lg:space-x-8 lg:border-0 lg:p-0 rtl:space-x-reverse'>
              <li>
                <NavbarLink href={getUrl(location)}>
                  {ROUTES.HOME.name}
                </NavbarLink>
              </li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type='button'
                    className='flex w-full items-center justify-between rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-primary-700'
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
                <DropdownMenuContent>
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
