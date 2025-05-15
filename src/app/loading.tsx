'use client'

import { secondsToMilliseconds } from 'date-fns'
import { AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'

export default function Loading() {
  const [showSupport, setShowSupport] = useState(false)

  useEffect(() => {
    // Show support message after 15 seconds
    const supportTimeout = setTimeout(() => {
      setShowSupport(true)
    }, secondsToMilliseconds(15))

    return () => {
      clearTimeout(supportTimeout)
    }
  }, [])

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Spinner />

      {/* Show support message after 15 seconds */}
      <div className={`absolute bottom-0 m-4 sm:bottom-20 transition-all duration-500 ease-out transform ${
        showSupport
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      >
        <Alert className="max-w-md mx-auto">
          <AlertTitle className="flex items-center gap-2 mb-3">
            <AlertCircle className="h-4 w-4" />
            <span>Taking longer than expected?</span>
          </AlertTitle>
          <AlertDescription className="text-sm">
            Contact support@hostandhomecleaners.com for assistance. Sorry, looks like we're busy!
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
};
