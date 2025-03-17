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
      console.log('Updating Google Analytics consent to granted')
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        functionality_storage: 'granted',
        personalization_storage: 'granted',
        security_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      })
    } else {
      console.warn('Google Analytics gtag function not found')
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
            'fixed z-[200] bottom-0 right-0 left-0 sm:bottom-4 sm:right-4 sm:left-auto w-full sm:max-w-md duration-700',
            !isOpen
              ? 'transition-[opacity,transform] translate-y-8 opacity-0'
              : 'transition-[opacity,transform] translate-y-0 opacity-100',
            hide && 'hidden',
          )}
        >
          <div className='border-border rounded-t-lg border bg-white shadow-lg dark:bg-slate-950 sm:rounded-md'>
            <div className='grid gap-2'>
              <div className='border-border flex h-12 items-center justify-between border-b bg-slate-50 px-3 py-2 dark:bg-slate-900 sm:h-14 sm:p-4'>
                <h1 className='text-base font-medium text-slate-900 dark:text-slate-50 sm:text-lg'>We use cookies</h1>
                <CookieIcon className='size-[1.1rem] text-primary-600 dark:text-primary-400 sm:size-[1.2rem]' />
              </div>
              <div className='px-3 py-2 sm:p-4'>
                <p className='text-start text-xs font-normal text-slate-600 dark:text-slate-300 sm:text-sm'>
                  We use cookies to ensure you get the best experience on our website.
                  For more information on how we use cookies, please see our cookie
                  policy.
                  <br />
                  <br />
                  <span className='text-[10px] text-slate-500 dark:text-slate-400 sm:text-xs'>
                    By clicking "
                    <span className='font-medium text-slate-900 dark:text-slate-50'>Accept</span>
                    ", you
                    agree to our use of cookies.
                  </span>
                </p>
                <div className='mt-2 flex gap-2 text-[10px] sm:text-xs'>
                  <a href='/terms' className='text-primary-600 underline hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300'>
                    Terms & Conditions
                  </a>
                  <a href='/privacy' className='text-primary-600 underline hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300'>
                    Privacy Policy
                  </a>
                </div>
              </div>
              <div className='border-border flex gap-2 border-t bg-slate-50 p-3 dark:bg-slate-900 sm:p-4'>
                <Button onClick={accept} className='w-full bg-primary-700 text-sm text-white hover:bg-primary-800 sm:text-base'>
                  Accept
                </Button>
                <Button onClick={decline} className='w-full text-sm sm:text-base' variant='outline'>
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
            'fixed z-[200] bottom-0 right-0 left-0 sm:bottom-4 sm:right-4 sm:left-auto w-full sm:max-w-md duration-700',
            !isOpen
              ? 'transition-[opacity,transform] translate-y-8 opacity-0'
              : 'transition-[opacity,transform] translate-y-0 opacity-100',
            hide && 'hidden',
          )}
        >
          <div className='border-border rounded-t-lg border bg-white dark:bg-slate-950 sm:rounded-lg'>
            <div className='flex items-center justify-between bg-slate-50 px-3 py-2 dark:bg-slate-900 sm:p-3'>
              <h1 className='text-base font-medium text-slate-900 dark:text-slate-50 sm:text-lg'>We use cookies</h1>
              <CookieIcon className='size-[1.1rem] text-primary-600 dark:text-primary-400 sm:size-[1.2rem]' />
            </div>
            <div className='-mt-2 px-3 py-2 sm:p-3'>
              <p className='text-left text-xs text-slate-600 dark:text-slate-300 sm:text-sm'>
                We use cookies to ensure you get the best experience on our website.
                For more information on how we use cookies, please see our cookie
                policy.
              </p>
            </div>
            <div className='mt-2 flex items-center gap-2 border-t bg-slate-50 px-3 py-2 dark:bg-slate-900 sm:p-3'>
              <Button onClick={accept} className='h-8 w-full rounded-full bg-primary-700 text-sm text-white hover:bg-primary-800 sm:h-9 sm:text-base'>
                accept
              </Button>
              <Button onClick={decline} className='h-8 w-full rounded-full text-sm sm:h-9 sm:text-base' variant='outline'>
                decline
              </Button>
            </div>
          </div>
        </div>
      )
}
