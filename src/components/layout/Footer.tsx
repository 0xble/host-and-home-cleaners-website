import type { Location } from '@/lib/types'
import CookieConsent from '@/components/analytics/CookieConsent'
import Brand from '@/components/Brand'

import PhoneLink from '@/components/PhoneLink'
import { SocialIcon } from '@/components/SocialIcon'
import { BUSINESS_NAME, EMAIL, PHONE, SOCIAL_LINKS } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
import { useState } from 'react'
import { chunk } from 'remeda'

interface FooterLinkProps {
  href: string
  children: React.ReactNode
}

function FooterLink({ href, children }: FooterLinkProps) {
  const className = 'hover:underline'

  return href.startsWith('http')
    ? (
        <a href={href} className={className}>
          {children}
        </a>
      )
    : (
        <Link href={href} className={className}>
          {children}
        </Link>
      )
}

interface FooterColumnProps {
  title: string
  links: Array<{ name: string, href: string, onClick?: () => void }>
  columns?: number
}

function FooterColumn({ title, links, columns = 1 }: FooterColumnProps) {
  return (
    <div>
      <h4 className="mb-6 text-sm uppercase text-gray-900">
        {title}
      </h4>
      <div
        // @hack Using inline styles to dynamically set grid columns because Tailwind CSS
        //       dynamic class names were not being applied correctly.
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        className="gap-16"
      >
        {chunk(links, Math.ceil(links.length / columns)).map(linkGroup => (
          <ul
            key={`${title}-${linkGroup.map(link => link.name).join('-')}`}
            className="text-gray-500"
          >
            {linkGroup.map(link => (
              <li key={link.href} className="mb-4">
                {link.onClick
                  ? (
                      <button
                        onClick={link.onClick}
                        className="hover:underline"
                      >
                        {link.name}
                      </button>
                    )
                  : (
                      <FooterLink href={link.href}>{link.name}</FooterLink>
                    )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

interface FooterProps {
  location: Location | null
}

interface SocialLinksProps {
  location: Location | null
}

function SocialLinks({ location }: SocialLinksProps) {
  if (!location) {
    return null
  }

  return (
    <>
      <h4 className="mb-6 text-sm uppercase text-gray-900">
        Socials
      </h4>
      <ul className="flex items-center gap-4 text-gray-500">
        {Object.values(SOCIAL_LINKS).map(social => (
          <SocialIcon
            key={social.name}
            href={social.href[location]}
            name={social.name}
          />
        ))}
      </ul>
    </>
  )
}

export default function Footer({ location }: FooterProps) {
  const [showCookieSettings, setShowCookieSettings] = useState(false)

  return (
    <footer className="bg-gray-100">
      {showCookieSettings && (
        <CookieConsent forceShow />
      )}
      <div className="mx-auto max-w-screen-xl p-4 md:p-10">
        <div
          className="grid grid-cols-1 gap-8 py-10 md:grid-cols-2 md:py-0 lg:grid-cols-6"
        >
          <div className="md:col-span-2">
            {/* Contacts */}
            {(() => {
              switch (location) {
                case 'MYRTLE_BEACH':
                  return (
                    <>
                      <h4 className="mb-6 text-sm uppercase text-gray-900">
                        Contacts
                      </h4>
                      <ul className="mb-8 text-gray-700">
                        <li className="mb-4">
                          <PhoneLink
                            className="text-lg"
                            phone={PHONE.MYRTLE_BEACH}
                          />
                        </li>
                        <li className="mb-4">
                          <a
                            className="text-lg font-extralight hover:text-primary-700 max-xs:text-sm"
                            href={`mailto:${EMAIL.MYRTLE_BEACH}`}
                          >
                            {EMAIL.MYRTLE_BEACH}
                          </a>
                        </li>
                      </ul>
                    </>
                  )
                case 'HONOLULU':
                  return (
                    <>
                      <h4 className="mb-6 text-sm uppercase text-gray-900">
                        Contacts
                      </h4>
                      <ul className="mb-8 text-gray-700">
                        <li className="mb-4">
                          <PhoneLink className="text-lg" phone={PHONE.HONOLULU} />
                        </li>
                        <li className="mb-4">
                          <a
                            className="text-lg font-extralight hover:text-primary-700 max-xs:text-sm"
                            href={`mailto:${EMAIL.HONOLULU}`}
                          >
                            {EMAIL.HONOLULU}
                          </a>
                        </li>
                      </ul>
                    </>
                  )
                case null:
                  return (
                    <>
                      <h4 className="mb-6 text-sm uppercase text-gray-900">
                        Contacts
                      </h4>
                      <ul className="mb-8 text-gray-700">
                        <li className="mb-4">
                          <a
                            className="text-lg font-extralight hover:text-primary-700 max-xs:text-sm"
                            href={`mailto:${EMAIL.SUPPORT}`}
                          >
                            {EMAIL.SUPPORT}
                          </a>
                        </li>
                      </ul>
                    </>
                  )
              }
            })()}

            {/* Business Hours */}
            <h4 className="mb-6 text-sm uppercase text-gray-900">
              Business Hours
            </h4>
            <ul className="mb-8 text-gray-700">
              {[
                ['Monday', '8 AM – 8 PM'],
                ['Tuesday', '8 AM – 8 PM'],
                ['Wednesday', '8 AM – 8 PM'],
                ['Thursday', '8 AM – 8 PM'],
                ['Friday', '8 AM – 8 PM'],
                ['Saturday', '8 AM – 8 PM'],
                ['Sunday', '8 AM – 8 PM'],
              ].map(([day, hours]) => (
                <li key={day} className="mb-2 grid grid-cols-[100px_1fr] items-center text-lg font-extralight">
                  <span className="text-center">{day}</span>
                  <span className="text-center">{hours}</span>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <SocialLinks location={location} />
          </div>
          <FooterColumn title="Company" links={[ROUTES.HOME, ROUTES.ABOUT, ROUTES.BOOKING, ROUTES.APPLY, ROUTES.LOGIN, ROUTES.CHECKLIST]} />
          <FooterColumn title="Services" links={Object.values(ROUTES.SERVICES)} />
          {(() => {
            switch (location) {
              case 'MYRTLE_BEACH':
                return (
                  <FooterColumn
                    title="Locations"
                    links={Object.values(ROUTES.LOCATIONS.MYRTLE_BEACH.SERVICE_AREAS)}
                    columns={1}
                  />
                )
              case 'HONOLULU':
                return (
                  <FooterColumn
                    title="Locations"
                    links={Object.values(ROUTES.LOCATIONS.HONOLULU.SERVICE_AREAS)}
                    columns={2}
                  />
                )
              case null:
                return (
                  <FooterColumn
                    title="Locations"
                    links={Object.values(ROUTES.LOCATIONS)}
                    columns={1}
                  />
                )
            }
          })()}
          <FooterColumn
            title="Legal"
            links={[
              ...Object.values(ROUTES.LEGAL),
              {
                name: 'Privacy Settings',
                href: '#',
                onClick: () => setShowCookieSettings(true),
              },
            ]}
          />
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto md:my-8" />
        <div className="pb-10 pt-6 text-center md:p-0">
          <Brand location={location} />
          <span className="mt-2 block text-center text-sm text-gray-500">
            Copyright ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            by
            {' '}
            {BUSINESS_NAME}
            .
            {' '}
            <br className="inline md:hidden" />
            {' '}
            All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
