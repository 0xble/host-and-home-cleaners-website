'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SERVICE_PAGES } from '@/lib/pages'
import { cn } from '@/lib/utils'
import { Location } from '@/store/useLocationStore'
import { Bars3Icon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Brand from './Brand'

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
        'block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700 lg:dark:hover:bg-transparent lg:dark:hover:text-primary-500',
        pathname === href ? 'text-primary-700' : '',
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

type ContactLinkProps = {
  contact: string
  href: string
  className?: string
}

function ContactLink({ contact, href, className }: ContactLinkProps) {
  return (
    <a
      className={cn(
        'text-base font-extralight hover:text-primary-700 lg:text-lg',
        className
      )}
      href={href}
    >
      {contact}
    </a>
  )
}

type NavbarProps = {
  homeHref?: string
  location?: Location
  contact?: string
  contactHref?: string
}

export default function Navbar({
  homeHref,
  location,
  contact,
  contactHref,
}: NavbarProps) {
  return (
    <>
      <nav className='fixed start-0 top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-900'>
        <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
          <Brand className='text-xs sm:text-xl' location={location} />
          <div className='flex items-center space-x-3 lg:order-2 lg:space-x-0 rtl:space-x-reverse'>
            {contact && contactHref && (
              <ContactLink
                contact={contact}
                href={contactHref}
                className='text-md absolute hidden sm:-ml-72 sm:inline'
              />
            )}
            <Link
              href='https://bookings.pristinemaidcleaning.com/booknow'
              className='rounded-lg bg-primary-700 p-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:text-base'
            >
              Book now
            </Link>
            <button
              data-collapse-toggle='navbar-sticky'
              type='button'
              className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden'
              aria-controls='navbar-sticky'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-6 w-6' />
            </button>
          </div>
          {contact && contactHref && (
            <div className='w-full pt-4 text-end sm:hidden'>
              <ContactLink contact={contact} href={contactHref} />
            </div>
          )}
          <div
            className='hidden w-full items-center justify-between lg:order-1 lg:-ml-36 lg:flex lg:w-auto'
            id='navbar-sticky'
          >
            <ul className='mt-4 flex flex-col rounded-lg border p-4 font-light lg:mt-0 lg:flex-row lg:space-x-8 lg:border-0 lg:p-0 rtl:space-x-reverse'>
              <li>
                <NavbarLink href={homeHref || '/'}>Home</NavbarLink>
              </li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className='flex w-full items-center justify-between rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:text-white md:w-auto md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-primary-700 md:dark:hover:bg-transparent md:dark:hover:text-primary-500'>
                    Services
                    <svg
                      className='ms-2.5 h-2.5 w-2.5'
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
                  {SERVICE_PAGES.map((service) => (
                    <DropdownMenuItem
                      key={service.name}
                      className='block px-4 py-2 text-base font-light hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      asChild
                    >
                      <Link href={service.href}>{service.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <li>
                <NavbarLink href='/about'>About</NavbarLink>
              </li>
              <li>
                <NavbarLink href='https://bookings.pristinemaidcleaning.com/booknow'>
                  Booking
                </NavbarLink>
              </li>
              <li>
                <NavbarLink href='https://pristinemaidcleaning.bookingkoala.com/login'>
                  Login
                </NavbarLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Add space so children are not covered by navbar. */}
      <div className='h-[116px] sm:h-[80px]' />
    </>
  )
}
