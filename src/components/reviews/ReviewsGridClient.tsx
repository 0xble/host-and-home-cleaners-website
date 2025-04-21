'use client'

import type { Platform, PlatformRating, Review, ReviewsData } from '@/lib/reviews'
import type { Location } from '@/lib/types'
import { Skeleton } from '@/components/ui/skeleton'
import { cn, constantCase } from '@/lib/utils'
import { tz } from '@date-fns/tz'

import { compareDesc, formatDistanceToNow, hoursToSeconds } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { round } from 'remeda'
import { Button } from '../ui/button'

type ValidReview = Omit<Review, 'rating' | 'text' | 'date' | 'author'> & {
  rating: number
  text: string
  date: Date
  author: {
    name: string
    image: string | null
  }
}

interface ReviewsGridClientProps {
  location?: Location | null
}

const PLATFORM_ICONS = {
  Google: '/icons/brands/google.svg',
  Facebook: '/icons/brands/facebook.svg',
  Yelp: '/icons/brands/yelp.svg',
  Thumbtack: '/icons/brands/thumbtack.png',
  Nextdoor: '/icons/brands/nextdoor.png',
} as const

// Platform Icon Component
function PlatformIcon({ platform, className }: { platform: Platform, className?: string }) {
  return (
    <Image
      src={PLATFORM_ICONS[platform]}
      alt={`${platform} icon`}
      width={480}
      height={480}
      className={cn('h-5 w-5 rounded-full', className)}
    />
  )
}

// Author Section Component
function AuthorSection({ review, url, className }: { review: ValidReview, url?: string, className?: string }) {
  const content = (
    <div className={cn('flex items-center gap-3', className)}>
      {review.author.image
        ? (
            <Image
              src={review.author.image}
              alt={review.author.name}
              width={120}
              height={120}
              className="size-10 rounded-full object-cover object-center"
            />
          )
        : (
            <div className={cn(
              'flex size-8 items-center justify-center rounded-full text-base text-white sm:size-10 sm:text-lg',
              getAvatarColor(review.author.name),
            )}
            >
              {review.author.name.charAt(0)}
            </div>
          )}
      <div>
        <div className="flex items-center gap-1 text-sm group-hover:underline sm:text-base">
          {review.author.name}
          <Image
            src="/icons/verified.svg"
            alt="Verified"
            width={16}
            height={16}
            className="size-4"
          />
        </div>
        <div className="text-xs font-light text-muted-foreground sm:text-sm">
          {formatDistanceToNow(review.date, { addSuffix: true, in: tz('America/Los_Angeles') })}
        </div>
      </div>
    </div>
  )

  if (!url) {
    return content
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex"
    >
      {content}
    </a>
  )
}

const AVATAR_COLORS = [
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-yellow-500',
  'bg-lime-500',
  'bg-green-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-sky-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-violet-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-pink-500',
  'bg-rose-500',
  'bg-slate-500',
  'bg-muted-foreground',
  'bg-zinc-500',
  'bg-neutral-500',
  'bg-stone-500',
] as const

function getAvatarColor(name: string): string {
  const hash = name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length]!
}

// Review Card Component
function ReviewCard({ review, className }: { review: ValidReview, className?: string }) {
  const maxTextLength = 220

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className={cn('rounded-lg bg-white p-4 shadow-md sm:p-6', className)}
    >
      <div className="mb-3 flex sm:mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={`${review.id}-star-${i + 1}`}
            className={cn(
              'h-4 w-4 sm:h-5 sm:w-5',
              i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300',
            )}
          />
        ))}
      </div>

      {review.text && (
        <>
          <p className="mb-3 text-base sm:mb-4">
            "
            {review.text.length > maxTextLength
              ? `${review.text.slice(0, maxTextLength).split(' ').slice(0, -1).join(' ')}...`
              : review.text}
            "
          </p>

          {review.url && (
            <a
              href={review.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 mt-2 inline-block text-xs text-primary-600 hover:underline sm:mb-4 sm:text-sm"
            >
              Read more
            </a>
          )}
        </>
      )}

      {review.platform && (
        <div className="mb-3 flex items-center gap-2 sm:mb-4">
          <PlatformIcon platform={review.platform} />
          {review.url
            ? (
                <a
                  href={review.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-gray-600 hover:underline sm:text-sm"
                >
                  Posted on
                  {' '}
                  {review.platform}
                </a>
              )
            : (
                <span className="text-xs text-gray-600 sm:text-sm">
                  Posted on
                  {' '}
                  {review.platform}
                </span>
              )}
        </div>
      )}

      <AuthorSection review={review} url={review.url ?? undefined} />
    </motion.div>
  )
}

// Review Card Skeleton Component
function ReviewCardSkeleton() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <Skeleton className="mb-4 h-5 w-32" />
      <Skeleton className="mb-4 h-24 w-full" />
      <Skeleton className="mb-4 h-5 w-24" />
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  )
}

function getTabStyles(isActive: boolean) {
  return {
    tab: cn(
      'flex shrink-0 items-center gap-2 border-b-2 px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap',
      isActive
        ? 'border-primary text-primary hover:bg-gray-50'
        : 'border-transparent text-muted-foreground hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
    ),
    count: cn(
      isActive ? 'text-primary' : 'text-gray-400',
    ),
  }
}

function RatingDisplay({ rating, count, className }: { rating?: number, count: number, className?: string }) {
  return (
    <span className="flex items-center gap-1">
      {count > 0 && (
        <>
          <Star className="size-4 fill-yellow-400 text-yellow-400" />
          {rating?.toFixed(1)}
        </>
      )}
      <span className={className}>
        (
        {count}
        )
      </span>
    </span>
  )
}

// Platform Rating Tabs Component
function PlatformRatingTabs({
  ratings,
  selectedPlatform,
  onSelectPlatform,
  className,
  location,
  reviews,
}: {
  ratings: PlatformRating[]
  selectedPlatform: Platform | null
  onSelectPlatform: (_platform: Platform | null) => void
  className?: string
  location?: Location | null
  reviews: Review[]
}) {
  // Filter ratings if location is provided
  const filteredRatings = location
    ? ratings.map(rating => ({
        ...rating,
        total_reviews: reviews.filter(
          (review: Review) => review.platform === rating.platform
            && review.location
            && constantCase(review.location) === location,
        ).length,
        rating: reviews
          .filter(
            (review: Review) => review.platform === rating.platform
              && review.location
              && constantCase(review.location) === location,
          )
          .reduce((acc: number, review: Review) => acc + (review.rating ?? 0), 0)
          / (reviews.filter(
            (review: Review) => review.platform === rating.platform
              && review.location
              && constantCase(review.location) === location,
          ).length || 1),
      }))
    : ratings

  const totalReviews = filteredRatings.reduce((acc, curr) => acc + curr.total_reviews, 0)
  const overallRating = totalReviews > 0
    ? round(filteredRatings.reduce((acc, curr) => acc + curr.rating * curr.total_reviews, 0) / totalReviews, 1)
    : 0

  // Create a map of existing ratings for easy lookup
  const ratingMap = new Map(filteredRatings.map(r => [r.platform, r]))

  // Define the desired platform order
  const orderedPlatforms: Platform[] = ['Google', 'Yelp', 'Thumbtack', 'Nextdoor']

  // Calculate the current tab index
  const allPlatforms: (Platform | null)[] = [null, ...orderedPlatforms]

  const [hasOverflow, setHasOverflow] = useState(false)
  const [, setScrollPosition] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const checkScrollability = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
        setCanScrollLeft(scrollLeft > 0)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1) // -1 to account for rounding
        setHasOverflow(scrollWidth > clientWidth)
      }
    }

    checkScrollability()
    window.addEventListener('resize', checkScrollability)
    return () => window.removeEventListener('resize', checkScrollability)
  }, [])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1) // -1 to account for rounding
    setScrollPosition(scrollLeft)
  }

  const renderTab = (platform: Platform | null) => {
    const rating = platform ? ratingMap.get(platform) : null
    const styles = getTabStyles(selectedPlatform === platform)

    return (
      <button
        type="button"
        key={platform ?? 'all'}
        onClick={() => onSelectPlatform(platform)}
        className={styles.tab}
      >
        {platform
          ? (
              <>
                <PlatformIcon platform={platform} />
                <span>{platform}</span>
                <RatingDisplay
                  rating={rating?.rating}
                  count={rating?.total_reviews ?? 0}
                  className={styles.count}
                />
              </>
            )
          : (
              <>
                <span>All</span>
                <RatingDisplay
                  rating={overallRating}
                  count={totalReviews}
                  className={styles.count}
                />
              </>
            )}
      </button>
    )
  }

  return (
    <div className={cn('relative flex flex-col', className)}>
      <div className="relative w-full overflow-hidden">
        <div className="flex items-center justify-center">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="no-scrollbar flex max-w-full overflow-x-auto px-6 py-3 sm:px-4 sm:py-2 [&::-webkit-scrollbar]:hidden"
          >
            <div className="flex gap-3 border-b border-neutral-400 sm:gap-2">
              {allPlatforms.map(platform => renderTab(platform))}
            </div>
          </div>
          {hasOverflow && (
            <>
              {/* Left fade and arrow */}
              {canScrollLeft && (
                <>
                  <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent" />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 sm:left-2">
                    <ChevronLeft className="size-6 text-gray-400 sm:size-5" />
                  </div>
                </>
              )}
              {/* Right fade and arrow */}
              {canScrollRight && (
                <>
                  <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 sm:right-2">
                    <ChevronRight className="size-6 text-gray-400 sm:size-5" />
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ReviewsGridClient({ location }: ReviewsGridClientProps) {
  const [data, setData] = useState<ReviewsData | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [visibleReviews, setVisibleReviews] = useState(6)
  const [columnCount, setColumnCount] = useState(1)
  const gridRef = useRef<HTMLDivElement>(null)

  const getColumnCount = () => {
    if (!gridRef.current) {
      return 1
    }
    const computedStyle = window.getComputedStyle(gridRef.current)
    return computedStyle.gridTemplateColumns.split(' ').length
  }

  useEffect(() => {
    const updateColumnCount = () => {
      setColumnCount(getColumnCount())
    }

    updateColumnCount() // Initial count
    window.addEventListener('resize', updateColumnCount)
    return () => window.removeEventListener('resize', updateColumnCount)
  }, [])

  const getReviewsToShow = (baseRowCount = 4) => {
    return columnCount === 1 ? 6 : columnCount * baseRowCount
  }

  useEffect(() => {
    const updateVisibleReviews = () => {
      setVisibleReviews(getReviewsToShow())
    }

    updateVisibleReviews()
  }, [columnCount]) // Only depend on columnCount changes

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews', { next: { revalidate: hoursToSeconds(3) } })
        if (!response.ok) {
          throw new Error('Failed to fetch reviews')
        }
        const reviewsData = await response.json()
        setData(reviewsData)
      }
      catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    fetchReviews()
  }, [])

  if (!data) {
    return (
      <div className="px-4 sm:px-4 lg:px-20">
        <div className="space-y-8 sm:space-y-6">
          <div className="flex justify-center">
            <Skeleton className="h-12 w-[600px] rounded-lg" />
          </div>
          <div ref={gridRef} className="grid min-h-80 grid-cols-1 gap-6 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <ReviewCardSkeleton key={i} />
            ))}
          </div>
          <div className="flex justify-center">
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      </div>
    )
  }

  const reviews = data.reviews.filter((review): review is ValidReview => {
    const ratingThreshold = columnCount === 1 ? 5 : 4

    // Check for required properties
    const hasRequiredProperties = Boolean(
      review.author?.name
      && review.date
      && review.rating
      && review.platform,
    )

    return hasRequiredProperties
      && (!selectedPlatform || review.platform === selectedPlatform)
      && (!location || !review.location || constantCase(review.location) === location)
      && (review.rating ?? 0) >= ratingThreshold
  }).sort((a, b) => compareDesc(a.date, b.date))

  const hasMoreReviews = reviews.length > visibleReviews

  const handleViewMore = () => {
    const increment = getReviewsToShow(2) // Load 2 more rows worth of reviews
    setVisibleReviews(prev => prev + increment)
  }

  return (
    <div className="px-4 sm:px-4 lg:px-20">
      <div className="space-y-8 sm:space-y-6">
        <PlatformRatingTabs
          className="justify-center"
          ratings={data.platform_ratings}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={(platform) => {
            setSelectedPlatform(platform)
            setVisibleReviews(getReviewsToShow())
          }}
          location={location}
          reviews={data.reviews}
        />
        <motion.div
          className="grid min-h-80 grid-cols-1 gap-6 sm:gap-4 md:grid-cols-2 lg:grid-cols-3"
          ref={gridRef}
          layout
          transition={{ duration: 0.2 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {reviews.slice(0, visibleReviews).map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </AnimatePresence>
        </motion.div>
        {hasMoreReviews && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              className=""
              type="button"
              onClick={handleViewMore}
            >
              View More
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
