'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { CookieIcon } from 'lucide-react'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface CookieConsentProps {
  variant?: 'default' | 'small'
  forceShow?: boolean
}

export default function CookieConsent({ variant = 'default', forceShow = false }: CookieConsentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hide, setHide] = useState(false)

  const accept = () => {
    setIsOpen(false)
    document.cookie
      = 'cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT'
    setTimeout(() => {
      setHide(true)
    }, 700)

    // Update Google Analytics consent
    if (window.gtag != null) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Updating Google Analytics consent to granted')
      }
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
        security_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      })
    }
    else {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('Google Analytics gtag function not found')
      }
    }
  }

  const decline = () => {
    setIsOpen(false)
    // Set cookie consent to false
    document.cookie = 'cookieConsent=false; expires=Fri, 31 Dec 9999 23:59:59 GMT'
    setTimeout(() => {
      setHide(true)
    }, 700)

    // Update Google Analytics consent
    if (window.gtag != null) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        functionality_storage: 'denied',
        personalization_storage: 'denied',
        security_storage: 'denied',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      })
    }
  }

  useEffect(() => {
    try {
      if (forceShow) {
        setIsOpen(true)
        setHide(false)
        return
      }

      setIsOpen(true)
      const hasCookieConsent = document.cookie.includes('cookieConsent=true')
      const hasDeniedCookies = document.cookie.includes('cookieConsent=false')

      if (hasCookieConsent || hasDeniedCookies) {
        setIsOpen(false)
        setTimeout(() => {
          setHide(true)
        }, 700)

        // Update Google Analytics consent based on stored preference
        if (window.gtag != null) {
          window.gtag('consent', 'update', {
            analytics_storage: hasCookieConsent ? 'granted' : 'denied',
            functionality_storage: hasCookieConsent ? 'granted' : 'denied',
            personalization_storage: hasCookieConsent ? 'granted' : 'denied',
            security_storage: hasCookieConsent ? 'granted' : 'denied',
            ad_storage: hasCookieConsent ? 'granted' : 'denied',
            ad_user_data: hasCookieConsent ? 'granted' : 'denied',
            ad_personalization: hasCookieConsent ? 'granted' : 'denied',
          })
        }
      }
    }
    catch (error) {
      console.error('Failed to update cookie consent: ', error)
    }
  }, [forceShow])

  return variant !== 'small'
    ? (
        <div
          className={cn(
            'fixed z-50 bottom-0 right-0 left-0 sm:bottom-4 sm:right-4 sm:left-auto w-full sm:max-w-md duration-700',
            !isOpen
              ? 'transition-[opacity,transform] translate-y-8 opacity-0'
              : 'transition-[opacity,transform] translate-y-0 opacity-100',
            hide && 'hidden',
          )}
        >
          <div className="border-border rounded-t-lg border bg-white shadow-lg dark:bg-slate-950 sm:rounded-md">
            <div className="grid gap-2">
              <div className="border-border flex h-12 items-center justify-between border-b bg-slate-50 px-3 py-2 dark:bg-slate-900 sm:h-14 sm:p-4">
                <div className="text-base font-medium text-slate-900 dark:text-slate-50 sm:text-lg">Want a cookie?</div>
                <CookieIcon className="size-[1.1rem] text-primary-600 dark:text-primary-400 sm:size-[1.2rem]" />
              </div>
              <div className="px-3 py-2 sm:p-4">
                <p className="text-start text-xs font-normal text-slate-600 dark:text-slate-300 sm:text-sm">
                  We use cookies to ensure you get the best experience on our website.
                  For more information on how we use cookies, please see our
                  {' '}
                  <Link href="/privacy" className="link">cookie policy</Link>
                  .
                  <br />
                  <br />
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs">
                    By clicking "
                    <span className="font-medium text-slate-900 dark:text-slate-50">Accept</span>
                    ", you
                    agree to our use of all cookies.
                  </span>
                </p>
                <div className="un mt-2 flex gap-2 text-xs">
                  <a href="/terms" className="link underline">
                    Terms & Conditions
                  </a>
                  <a href="/privacy" className="link underline">
                    Privacy Policy
                  </a>
                </div>
              </div>
              <div className="border-border flex gap-2 border-t bg-slate-50 p-3 dark:bg-slate-900 sm:p-4">
                <Button onClick={accept} className="w-full bg-primary text-sm text-white hover:bg-primary-800 sm:text-base">
                  Accept
                </Button>
                <Button onClick={decline} className="w-full text-sm sm:text-base" variant="outline">
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </div>
      )
    : (
        <div
          className={cn(
            'fixed z-50 bottom-0 right-0 left-0 sm:bottom-4 sm:right-4 sm:left-auto w-full sm:max-w-md duration-700',
            !isOpen
              ? 'transition-[opacity,transform] translate-y-8 opacity-0'
              : 'transition-[opacity,transform] translate-y-0 opacity-100',
            hide && 'hidden',
          )}
        >
          <div className="border-border rounded-t-lg border bg-white dark:bg-slate-950 sm:rounded-lg">
            <div className="flex items-center justify-between bg-slate-50 px-3 py-2 dark:bg-slate-900 sm:p-3">
              <h1 className="text-base font-medium text-slate-900 dark:text-slate-50 sm:text-lg">We use cookies</h1>
              <CookieIcon className="size-[1.1rem] text-primary-600 dark:text-primary-400 sm:size-[1.2rem]" />
            </div>
            <div className="-mt-2 px-3 py-2 sm:p-3">
              <p className="text-left text-xs text-slate-600 dark:text-slate-300 sm:text-sm">
                We use cookies to ensure you get the best experience on our website.
                For more information on how we use cookies, please see our cookie
                policy.
              </p>
            </div>
            <div className="mt-2 flex items-center gap-2 border-t bg-slate-50 px-3 py-2 dark:bg-slate-900 sm:p-3">
              <Button onClick={accept} className="h-8 w-full rounded-full bg-primary text-sm text-white hover:bg-primary-800 sm:h-9 sm:text-base">
                accept
              </Button>
              <Button onClick={decline} className="h-8 w-full rounded-full text-sm sm:h-9 sm:text-base" variant="outline">
                decline
              </Button>
            </div>
          </div>
        </div>
      )
}
