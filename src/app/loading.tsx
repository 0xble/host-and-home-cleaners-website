'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'
import { secondsToMilliseconds } from 'date-fns'
import { AlertCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

const loadingMessages = [
  'Dusting off our virtual shelves...',
  'Teaching our robots to fold fitted sheets...',
  'Polishing pixels to perfection...',
  'Organizing our digital cleaning supplies...',
  'Convincing dust bunnies to cooperate...',
  'Making sure every virtual corner sparkles...',
  'Calibrating our quantum mop...',
  'Waxing the digital floor...',
]

export default function Loading() {
  const [showSupport, setShowSupport] = useState(false)
  const [messageIndex, setMessageIndex] = useState(
    Math.floor(Math.random() * loadingMessages.length),
  )
  const [isMessageVisible, setIsMessageVisible] = useState(true)

  useEffect(() => {
    const changeMessage = () => {
      setIsMessageVisible(false)
      setTimeout(() => {
        setMessageIndex(prevIndex => (prevIndex + 1) % loadingMessages.length)
        setIsMessageVisible(true)
      }, secondsToMilliseconds(1)) // Should match the duration of the fade out
    }

    // Initial delay before starting the cycle
    const initialDelay = setTimeout(() => {
      changeMessage()
      // Start the regular interval after the first change
      const messageInterval = setInterval(changeMessage, secondsToMilliseconds(3))
      return () => clearInterval(messageInterval)
    }, secondsToMilliseconds(2))

    // Show support message after 15 seconds
    const supportTimeout = setTimeout(() => {
      setShowSupport(true)
    }, secondsToMilliseconds(15))

    return () => {
      clearTimeout(initialDelay)
      clearTimeout(supportTimeout)
    }
  }, [])

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 p-4 sm:p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="h-[1.5rem] relative flex items-center justify-center w-screen">
          <div
            className={`absolute transition-opacity duration-1000 ease-in-out
              ${isMessageVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <p className="text-lg text-muted-foreground animate-pulse">
              {loadingMessages[messageIndex]}
            </p>
          </div>
        </div>
        <Spinner />
      </div>

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
