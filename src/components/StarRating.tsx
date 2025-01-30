'use client'

import { Star } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

const LOCATIONS = ['honolulu', 'myrtle-beach'] as const
type Location = typeof LOCATIONS[number]

const REVIEW_URLS = {
  google: {
    'honolulu': 'https://g.page/r/Ca7w1RSnJY2nEBM/review',
    'myrtle-beach': 'https://g.page/r/Ce4kwohQ6LUrEBM/review',
  },
  yelp: {
    'honolulu': 'https://www.yelp.com/writeareview/biz/gPGARc74U7rdWSL0Lf5yzA',
    'myrtle-beach': 'https://www.yelp.com/writeareview/biz/4bG-QPQCWVzAfqG1IonXRw',
  },
  thumbtack: {
    'honolulu': 'https://www.thumbtack.com/reviews/services/531257745964408832/write',
    'myrtle-beach': 'https://www.thumbtack.com/reviews/services/509673378067374094/write',
  },
} as const

type StarRatingProps = Record<string, never>

declare global {
  type TallyWindow = {
    Tally?: {
      loadEmbeds: () => void
    }
  }
}

const TallyForm: FC = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      ;(window as unknown as TallyWindow).Tally?.loadEmbeds()
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='relative'>
      {isLoading && (
        <div className='bg-background absolute inset-0 flex items-center justify-center text-primary'>
          <Spinner className='size-8 border-4' />
        </div>
      )}
      <iframe
        title='Client Feedback Form'
        data-tally-src='https://tally.so/embed/wd89eV?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1'
        width='100%'
        height='403'
        style={{ border: 'none' }}
      />
    </div>
  )
}

type RedirectingMessageProps = {
  message?: string
}
const RedirectingMessage: FC<RedirectingMessageProps> = ({ message = 'Thank you! Redirecting...' }) => (
  <div className='mt-8 flex items-center justify-center gap-3'>
    <p>{message}</p>
    <Spinner className='size-4 border-2 text-primary' />
  </div>
)

export const StarRating: FC<StarRatingProps> = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const location = searchParams.get('location') as Location | null
  const platform = searchParams.get('platform') ?? 'google'
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [showLocationSelect, setShowLocationSelect] = useState(false)
  const formRef = useRef<HTMLDivElement>(null)

  const getReviewUrl = (loc: Location) => {
    try {
      const platformUrls = REVIEW_URLS[platform in REVIEW_URLS ? platform as keyof typeof REVIEW_URLS : 'google']
      return platformUrls[loc] || REVIEW_URLS.google[loc]
    } catch {
      return REVIEW_URLS.google[loc]
    }
  }

  const handleStarClick = (selectedRating: number) => {
    if (rating > 0) {
      return
    }
    setRating(selectedRating)

    if (selectedRating >= 4) {
      if (!location) {
        setShowLocationSelect(true)
      } else {
        setIsRedirecting(true)
        setTimeout(() => {
          router.push(getReviewUrl(location))
        }, 500)
      }
    }
  }

  const handleLocationSelect = (selectedLocation: Location) => {
    setIsRedirecting(true)
    setTimeout(() => {
      router.push(getReviewUrl(selectedLocation))
    }, 500)
  }

  const handleStarHover = (star: number) => {
    if (rating > 0) {
      return
    }
    setHoveredRating(star)
  }

  return (
    <div className='space-y-6'>
      <div className='flex justify-center gap-2'>
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={() => handleStarHover(0)}
            disabled={rating > 0}
            className={`transition-transform ${rating === 0 ? 'hover:scale-110' : 'cursor-default'}`}
          >
            <Star
              size={40}
              className={`transition duration-200 ${
                star <= (hoveredRating || rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
      {rating > 0 && rating < 4 && (
        <div ref={formRef} className='mt-8'>
          <TallyForm />
        </div>
      )}
      {rating >= 4 && !showLocationSelect && location && isRedirecting && (
        <RedirectingMessage />
      )}
      {showLocationSelect && (
        <div className='mt-8 text-center'>
          <div className='flex flex-col gap-3'>
            {!isRedirecting
              ? (
                  <>
                    <h2 className='mb-4 text-[1.3rem] sm:text-2xl'>Which location did you visit?</h2>
                    {LOCATIONS.map(loc => (
                      <Button
                        key={loc}
                        size='lg'
                        variant='ghost'
                        className='text-lg font-light'
                        onClick={() => handleLocationSelect(loc)}
                        disabled={isRedirecting}
                      >
                        <span className='capitalize'>{loc.replace('-', ' ')}</span>
                      </Button>
                    ))}
                  </>
                )
              : (
                  <RedirectingMessage />
                )}
          </div>
        </div>
      )}
    </div>
  )
}
