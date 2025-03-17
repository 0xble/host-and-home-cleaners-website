'use client'

import { CookieIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

declare global {
  // Use interface instead of type to extend the Window interface
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Window {
    gtag: (
      _command: 'consent' | 'js' | 'config',
      _action: 'update' | 'default' | 'granted' | 'denied',
      _params?: Record<string, any>
    ) => void
  }
}

type CookieConsentProps = {
  variant?: 'default' | 'small'
  demo?: boolean
}

export default function CookieConsent({
  variant = 'default',
  demo = false,
}: CookieConsentProps) {
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
    if (window.gtag) {
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
  }

  const decline = () => {
    setIsOpen(false)
    setTimeout(() => {
      setHide(true)
    }, 700)

    // Update Google Analytics consent
    if (window.gtag) {
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
      setIsOpen(true)
      if (document.cookie.includes('cookieConsent=true')) {
        if (!demo) {
          setIsOpen(false)
          setTimeout(() => {
            setHide(true)
          }, 700)
        }
      }
    } catch (e) {
      // console.log("Error: ", e);
    }
  }, [])

  return variant !== 'small'
    ? (
        <div
          className={cn(
            'fixed z-[200] bottom-4 right-4 w-full sm:max-w-md duration-700',
            !isOpen
              ? 'transition-[opacity,transform] translate-y-8 opacity-0'
              : 'transition-[opacity,transform] translate-y-0 opacity-100',
            hide && 'hidden',
          )}
        >
          <div className='border-border rounded-md border bg-white shadow-lg dark:bg-slate-950'>
            <div className='grid gap-2'>
              <div className='border-border flex h-14 items-center justify-between border-b bg-slate-50 p-4 dark:bg-slate-900'>
                <h1 className='text-lg font-medium text-slate-900 dark:text-slate-50'>We use cookies</h1>
                <CookieIcon className='size-[1.2rem] text-primary-600 dark:text-primary-400' />
              </div>
              <div className='p-4'>
                <p className='text-start text-sm font-normal text-slate-600 dark:text-slate-300'>
                  We use cookies to ensure you get the best experience on our website.
                  For more information on how we use cookies, please see our cookie
                  policy.
                  <br />
                  <br />
                  <span className='text-xs text-slate-500 dark:text-slate-400'>
                    By clicking "
                    <span className='font-medium text-slate-900 dark:text-slate-50'>Accept</span>
                    ", you
                    agree to our use of cookies.
                  </span>
                </p>
                <div className='mt-2 flex gap-2 text-xs'>
                  <a href='/terms' className='text-primary-600 underline hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300'>
                    Terms & Conditions
                  </a>
                  <a href='/privacy' className='text-primary-600 underline hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300'>
                    Privacy Policy
                  </a>
                </div>
              </div>
              <div className='border-border flex gap-2 border-t bg-slate-50 p-4 py-5 dark:bg-slate-900'>
                <Button onClick={accept} className='w-full bg-primary-700 text-white hover:bg-primary-800'>
                  Accept
                </Button>
                <Button onClick={decline} className='w-full' variant='outline'>
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
            'fixed z-[200] bottom-4 right-4 w-full sm:max-w-md duration-700',
            !isOpen
              ? 'transition-[opacity,transform] translate-y-8 opacity-0'
              : 'transition-[opacity,transform] translate-y-0 opacity-100',
            hide && 'hidden',
          )}
        >
          <div className='border-border rounded-lg border bg-white dark:bg-slate-950'>
            <div className='flex items-center justify-between bg-slate-50 p-3 dark:bg-slate-900'>
              <h1 className='text-lg font-medium text-slate-900 dark:text-slate-50'>We use cookies</h1>
              <CookieIcon className='size-[1.2rem] text-primary-600 dark:text-primary-400' />
            </div>
            <div className='-mt-2 p-3'>
              <p className='text-left text-sm text-slate-600 dark:text-slate-300'>
                We use cookies to ensure you get the best experience on our website.
                For more information on how we use cookies, please see our cookie
                policy.
              </p>
            </div>
            <div className='mt-2 flex items-center gap-2 border-t bg-slate-50 p-3 dark:bg-slate-900'>
              <Button onClick={accept} className='h-9 w-full rounded-full bg-primary-700 text-white hover:bg-primary-800'>
                accept
              </Button>
              <Button onClick={decline} className='h-9 w-full rounded-full' variant='outline'>
                decline
              </Button>
            </div>
          </div>
        </div>
      )
}
