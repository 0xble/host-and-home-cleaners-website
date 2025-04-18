'use client'

import type { Location, Phone } from '@/lib/types'
import TrackedLink from '@/components/analytics/facebook/PixelTrackedLink'
import BookNowButton from '@/components/BookNowButton'
import Brand from '@/components/Brand'
import PhoneLink from '@/components/PhoneLink'
import { SocialIcon } from '@/components/SocialIcon'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import { CHECKLIST_NAME, EMAIL, SOCIAL_LINKS } from '@/lib/constants'
import { PixelEvent } from '@/lib/pixel'
import { ROUTES } from '@/lib/routes'
import { scrollToSection } from '@/lib/scroll'
import { cn } from '@/lib/utils'
import { Bars3Icon } from '@heroicons/react/24/solid'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

function splitIntoColumns<T>(items: T[], numColumns: number): T[][] {
  const itemsPerColumn = Math.ceil(items.length / numColumns)
  const columns: T[][] = []

  for (let i = 0; i < numColumns; i++) {
    const start = i * itemsPerColumn
    const end = Math.min(start + itemsPerColumn, items.length)
    columns.push(items.slice(start, end))
  }

  return columns
}

interface NavbarLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

function NavbarLink({
  href,
  children,
  className,
  onClick,
  ...props
}: NavbarLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <TrackedLink
      href={href}
      className={cn(
        'block rounded py-2 pl-3 pr-4',
        isActive
          ? 'text-white bg-primary-700 lg:bg-transparent lg:text-primary-700'
          : 'text-gray-900 hover:bg-gray-100',
        className,
      )}
      eventName={href === ROUTES.BOOKING.href ? PixelEvent.SCHEDULE : 'NavClick'}
      eventParams={href === ROUTES.BOOKING.href ? {} : { path: href }}
      onClick={onClick}
      {...props}
    >
      {children}
    </TrackedLink>
  )
}

interface NavbarProps {
  location: Location | null
  phone: Phone | null
}

export default function Navbar({
  location,
  phone,
}: NavbarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Used to set the fixed height of the navbar and spacer div.
  const FIXED_HEIGHT = pathname === ROUTES.HOME.href ? 'h-[64px] xs:h-[76px] sm:h-[86px]' : 'h-[96px] sm:h-[86px]'

  return (
    <>
      <nav className={cn('fixed start-0 top-0 z-50 w-full border-b bg-white shadow-sm', FIXED_HEIGHT)}>
        <div className="mx-auto flex h-full max-w-screen-xl flex-wrap items-center justify-between px-2 xs:px-4">
          <Brand className="text-xs sm:text-xl" location={location} />
          <div className="flex items-center sm:space-x-3 lg:order-2 lg:space-x-0 rtl:space-x-reverse">
            {phone && (
              <PhoneLink
                className="absolute hidden whitespace-nowrap sm:flex sm:-translate-x-40 lg:-translate-x-48"
                phone={phone}
              />
            )}
            <BookNowButton
              className="z-50 rounded-lg px-2 py-3 text-xs xs:p-3 xs:text-sm lg:text-base"
              size="sm"
            />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex size-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 lg:hidden"
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="size-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white backdrop-blur-sm sm:w-[400px]">
                <div className="flex h-full flex-col">
                  <div className="flex-1 overflow-y-auto">
                    <ul className="mt-6 flex flex-col space-y-4">
                      <li>
                        <NavbarLink href={ROUTES.HOME.href}>{ROUTES.HOME.name}</NavbarLink>
                      </li>
                      <li>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="flex w-full items-center justify-between rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:hover:bg-transparent md:hover:text-primary-700"
                            >
                              {ROUTES.ABOUT.name}
                              <svg
                                className="ms-2.5 size-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 4 4 4-4"
                                />
                              </svg>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="shadow-lg">
                            <DropdownMenuItem
                              className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                              asChild
                            >
                              <NavbarLink href={ROUTES.ABOUT.href}>About Us</NavbarLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="block cursor-pointer px-4 py-2 text-base font-light hover:bg-gray-100"
                              onClick={() => {
                                scrollToSection('reviews')
                                setIsOpen(false)
                              }}
                            >
                              Reviews
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="block cursor-pointer px-4 py-2 text-base font-light hover:bg-gray-100"
                              onClick={() => {
                                scrollToSection('how-it-works')
                                setIsOpen(false)
                              }}
                            >
                              How It Works
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="block cursor-pointer px-4 py-2 text-base font-light hover:bg-gray-100"
                              asChild
                            >
                              <NavbarLink href={ROUTES.CHECKLIST.href}>{CHECKLIST_NAME}</NavbarLink>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="block cursor-pointer px-4 py-2 text-base font-light hover:bg-gray-100"
                              onClick={() => {
                                scrollToSection('pricing')
                                setIsOpen(false)
                              }}
                            >
                              Pricing
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="block cursor-pointer px-4 py-2 text-base font-light hover:bg-gray-100"
                              onClick={() => {
                                scrollToSection('faq')
                                setIsOpen(false)
                              }}
                            >
                              FAQ
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </li>
                      <li>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="flex w-full items-center justify-between rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:hover:bg-transparent md:hover:text-primary-700"
                            >
                              Services
                              <svg
                                className="ms-2.5 size-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 4 4 4-4"
                                />
                              </svg>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="shadow-lg">
                            {Object.values(ROUTES.SERVICES)
                              .sort((a, b) => {
                                const order: Record<string, number> = {
                                  [ROUTES.SERVICES.DEEP.name]: 0,
                                  [ROUTES.SERVICES.MOVE_IN_OUT.name]: 1,
                                  [ROUTES.SERVICES.VACATION_RENTAL.name]: 2,
                                  [ROUTES.SERVICES.STANDARD.name]: 3,
                                }
                                return (order[a.name] ?? 999) - (order[b.name] ?? 999)
                              })
                              .map(service => (
                                <DropdownMenuItem
                                  key={service.name}
                                  className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                                  asChild
                                >
                                  <NavbarLink href={service.href}>{service.name}</NavbarLink>
                                </DropdownMenuItem>
                              ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </li>
                      <li>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              className="flex w-full items-center justify-between rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:hover:bg-transparent md:hover:text-primary-700"
                            >
                              Locations
                              <svg
                                className="ms-2.5 size-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 4 4 4-4"
                                />
                              </svg>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="-translate-x-4 shadow-lg sm:translate-x-0">
                            {Object.entries(ROUTES.LOCATIONS).map(([locationKey, location]) => (
                              <DropdownMenu key={locationKey}>
                                <DropdownMenuTrigger asChild>
                                  <button
                                    type="button"
                                    className="flex w-full items-center justify-between px-4 py-2 text-base font-light hover:bg-gray-100"
                                  >
                                    {location.name}
                                    <svg
                                      className="ms-2.5 size-2.5"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 10 6"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                      />
                                    </svg>
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="shadow-lg">
                                  {(() => {
                                    const serviceAreas = Object.values(location.SERVICE_AREAS)
                                    if (serviceAreas.length <= 8) {
                                      return (
                                        <div className="grid grid-cols-1">
                                          {serviceAreas.map(area => (
                                            <DropdownMenuItem
                                              key={area.href}
                                              className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                                              asChild
                                            >
                                              <NavbarLink href={area.href}>{area.name}</NavbarLink>
                                            </DropdownMenuItem>
                                          ))}
                                        </div>
                                      )
                                    }

                                    const numColumns = Math.ceil(serviceAreas.length / 8)
                                    const columns = splitIntoColumns(serviceAreas, numColumns)

                                    return (
                                      <div className={cn(
                                        'grid gap-4',
                                        numColumns === 1 && 'grid-cols-1',
                                        numColumns === 2 && 'grid-cols-2',
                                        numColumns === 3 && 'grid-cols-3',
                                        numColumns === 4 && 'grid-cols-4',
                                      )}
                                      >
                                        {columns.map((column, columnIndex) => (
                                          <div key={`column-${columnIndex}`} className="flex flex-col">
                                            {column.map(area => (
                                              <DropdownMenuItem
                                                key={area.href}
                                                className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                                                asChild
                                              >
                                                <NavbarLink href={area.href}>{area.name}</NavbarLink>
                                              </DropdownMenuItem>
                                            ))}
                                          </div>
                                        ))}
                                      </div>
                                    )
                                  })()}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </li>
                      <li>
                        <NavbarLink href={ROUTES.LOGIN.href}>{ROUTES.LOGIN.name}</NavbarLink>
                      </li>
                    </ul>
                    {/* CTA Button */}
                    <div className="mt-6 flex justify-center">
                      <BookNowButton
                        className="z-50 rounded-lg border-b border-gray-200 px-5 py-3 text-sm"
                        size="sm"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="space-y-6">
                      {/* Divider */}
                      <div className="h-px bg-gray-200" />

                      {/* Contacts */}
                      <div>
                        <h4 className="mb-4 text-sm uppercase text-gray-900">Contacts</h4>
                        <ul className="mb-4 text-gray-700">
                          {phone && (
                            <li className="mb-4">
                              <PhoneLink className="text-lg" phone={phone} />
                            </li>
                          )}
                          <li className="mb-4">
                            <a
                              className="text-lg font-extralight hover:text-primary-700"
                              href={`mailto:${location ? EMAIL[location] : EMAIL.SUPPORT}`}
                            >
                              Email Us
                            </a>
                          </li>
                        </ul>
                      </div>

                      {/* Social Links */}
                      {location && (
                        <div>
                          <h4 className="mb-4 text-sm uppercase text-gray-900">Socials</h4>
                          <ul className="flex items-center gap-4">
                            {Object.values(SOCIAL_LINKS).map(social => (
                              <SocialIcon
                                key={social.name}
                                href={social.href[location]}
                                name={social.name}
                              />
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          {phone && (
            <div className="w-full text-end sm:hidden">
              <PhoneLink phone={phone} />
            </div>
          )}
          <div
            className="hidden w-full items-center justify-between lg:absolute lg:inset-x-0 lg:order-1 lg:flex lg:w-auto lg:justify-center"
            id="navbar-sticky"
          >
            <ul className="mt-4 flex flex-col rounded-lg border bg-white p-4 font-light lg:mt-0 lg:flex-row lg:space-x-8 lg:border-0 lg:p-0 rtl:space-x-reverse">
              <li>
                <NavbarLink className="lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700" href={ROUTES.HOME.href}>{ROUTES.HOME.name}</NavbarLink>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center justify-between rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:hover:bg-transparent md:hover:text-primary-700 lg:p-0"
                    >
                      {ROUTES.ABOUT.name}
                      <svg
                        className="ms-2.5 size-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="shadow-lg max-lg:translate-x-10">
                    <DropdownMenuItem
                      className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                      asChild
                    >
                      <NavbarLink href={ROUTES.ABOUT.href}>About Us</NavbarLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                      onClick={() => {
                        scrollToSection('reviews')
                        setIsOpen(false)
                      }}
                    >
                      Reviews
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                      onClick={() => {
                        scrollToSection('how-it-works')
                        setIsOpen(false)
                      }}
                    >
                      How It Works
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                      asChild
                    >
                      <NavbarLink href={ROUTES.CHECKLIST.href}>{CHECKLIST_NAME}</NavbarLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                      onClick={() => {
                        scrollToSection('pricing')
                        setIsOpen(false)
                      }}
                    >
                      Pricing
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                      onClick={() => {
                        scrollToSection('faq')
                        setIsOpen(false)
                      }}
                    >
                      FAQ
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center justify-between rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:hover:bg-transparent md:hover:text-primary-700 lg:p-0"
                    >
                      Services
                      <svg
                        className="ms-2.5 size-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="shadow-lg max-lg:translate-x-10">
                    {Object.values(ROUTES.SERVICES)
                      .sort((a, b) => {
                        // Preferred order of services in the navbar
                        const order: Record<string, number> = {
                          [ROUTES.SERVICES.DEEP.name]: 0,
                          [ROUTES.SERVICES.MOVE_IN_OUT.name]: 1,
                          [ROUTES.SERVICES.VACATION_RENTAL.name]: 2,
                          [ROUTES.SERVICES.STANDARD.name]: 3,
                        }
                        // If the service is not in the order, put it at the end
                        return (order[a.name] ?? 999) - (order[b.name] ?? 999)
                      })
                      .map(service => (
                        <DropdownMenuItem
                          key={service.name}
                          className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                          asChild
                        >
                          <NavbarLink href={service.href}>{service.name}</NavbarLink>
                        </DropdownMenuItem>
                      ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center justify-between rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:hover:bg-transparent md:hover:text-primary-700 lg:p-0"
                    >
                      Locations
                      <svg
                        className="ms-2.5 size-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="-translate-x-4 shadow-lg sm:translate-x-0">
                    {Object.entries(ROUTES.LOCATIONS).map(([locationKey, location]) => (
                      <DropdownMenu key={locationKey}>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="flex w-full items-center justify-between px-4 py-2 text-base font-light hover:bg-gray-100"
                          >
                            {location.name}
                            <svg
                              className="ms-2.5 size-2.5"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 10 6"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 4 4 4-4"
                              />
                            </svg>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="-translate-x-4 shadow-lg sm:translate-x-0">
                          {(() => {
                            const serviceAreas = Object.values(location.SERVICE_AREAS)
                            if (serviceAreas.length <= 8) {
                              return (
                                <div className="grid grid-cols-1">
                                  {serviceAreas.map(area => (
                                    <DropdownMenuItem
                                      key={area.href}
                                      className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                                      asChild
                                    >
                                      <NavbarLink href={area.href}>{area.name}</NavbarLink>
                                    </DropdownMenuItem>
                                  ))}
                                </div>
                              )
                            }

                            const numColumns = Math.ceil(serviceAreas.length / 8)
                            const columns = splitIntoColumns(serviceAreas, numColumns)

                            return (
                              <div className={cn(
                                'grid gap-4',
                                numColumns === 1 && 'grid-cols-1',
                                numColumns === 2 && 'grid-cols-2',
                                numColumns === 3 && 'grid-cols-3',
                                numColumns === 4 && 'grid-cols-4',
                              )}
                              >
                                {columns.map((column, columnIndex) => (
                                  <div key={`column-${columnIndex}`} className="flex flex-col">
                                    {column.map(area => (
                                      <DropdownMenuItem
                                        key={area.href}
                                        className="block px-4 py-2 text-base font-light hover:bg-gray-100"
                                        asChild
                                      >
                                        <NavbarLink href={area.href}>{area.name}</NavbarLink>
                                      </DropdownMenuItem>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            )
                          })()}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <NavbarLink className="lg:p-0 lg:hover:bg-transparent lg:hover:text-primary-700" href={ROUTES.LOGIN.href}>{ROUTES.LOGIN.name}</NavbarLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* @hack */}
      {/* Add space so children are not covered by navbar. */}
      <div className={FIXED_HEIGHT} />
    </>
  )
}
