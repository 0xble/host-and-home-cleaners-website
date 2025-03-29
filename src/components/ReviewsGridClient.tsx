'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Star, ChevronRight, ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { round } from 'remeda'
import { hoursToSeconds } from 'date-fns'
import type { Platform, PlatformRating, Review, ReviewsData } from '@/lib/reviews'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

const PLATFORM_ICONS = {
  Google: '/icons/google.svg',
  Facebook: '/icons/facebook.svg',
  Yelp: '/icons/yelp.svg',
  Thumbtack: '/icons/thumbtack.png',
  Nextdoor: '/icons/nextdoor.png',
} as const

// Platform Icon Component
function PlatformIcon({ platform, className }: { platform: Platform, className?: string }) {
  return (
    <Image
      src={PLATFORM_ICONS[platform]}
      alt={`${platform} icon`}
      width={20}
      height={20}
      className={cn('h-5 w-5 rounded-full', className)}
    />
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
  'bg-gray-500',
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
function ReviewCard({ review, className }: { review: Review, className?: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.2 }}
      className={cn('rounded-lg bg-white p-4 shadow-md sm:p-6', className)}
    >
      <div className='mb-3 flex sm:mb-4'>
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

      <p className='mb-3 text-sm sm:mb-4 sm:text-base'>
        "{review.text.length > 250 ? `${review.text.slice(0, 250)}...` : review.text}"
      </p>

      {review.url && (
        <a
          href={review.url}
          target='_blank'
          rel='noopener noreferrer'
          className='mt-2 mb-3 block text-xs text-primary-600 hover:underline sm:mb-4 sm:text-sm'
        >
          Read more
        </a>
      )}

      <div className='mb-3 flex items-center gap-2 sm:mb-4'>
        <PlatformIcon platform={review.platform} />
        <span className='text-xs text-gray-600 sm:text-sm'>
          Posted on
          {' '}
          {review.platform}
        </span>
      </div>

      <div className='flex items-center gap-3'>
        {review.author.image
          ? (
              <Image
                src={review.author.image}
                alt={review.author.name}
                width={32}
                height={32}
                className='rounded-full sm:size-10'
              />
            )
          : (
              <div className={cn(
                'flex size-8 items-center justify-center rounded-full text-base text-white sm:size-10 sm:text-lg',
                getAvatarColor(review.author.name || 'Anonymous'),
              )}
              >
                {review.author.name?.charAt(0) || 'A'}
              </div>
            )}
        <div>
          <div className='text-sm font-medium sm:text-base'>{review.author.name}</div>
          <div className='text-xs font-light text-gray-500 sm:text-sm'>{review.date}</div>
        </div>
      </div>
    </motion.div>
  )
}

// Review Card Skeleton Component
function ReviewCardSkeleton() {
  return (
    <div className='rounded-lg bg-white p-6 shadow-md'>
      <Skeleton className='mb-4 h-5 w-32' />
      <Skeleton className='mb-4 h-24 w-full' />
      <Skeleton className='mb-4 h-5 w-24' />
      <div className='flex items-center gap-3'>
        <Skeleton className='size-10 rounded-full' />
        <div className='space-y-2'>
          <Skeleton className='h-4 w-32' />
          <Skeleton className='h-3 w-24' />
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
        ? 'border-primary-700 text-primary-700 hover:bg-gray-50'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
    ),
    count: cn(
      isActive ? 'text-primary-700' : 'text-gray-400'
    ),
  }
}

function RatingDisplay({ rating, count, className }: { rating?: number, count: number, className?: string }) {
  return (
    <span className='flex items-center gap-1'>
      {count > 0 && (
        <>
          <Star className='size-4 fill-yellow-400 text-yellow-400' />
          {rating?.toFixed(1)}
        </>
      )}
      <span className={className}>({count})</span>
    </span>
  )
}

// Platform Rating Tabs Component
function PlatformRatingTabs({
  ratings,
  selectedPlatform,
  onSelectPlatform,
  className,
}: {
  ratings: PlatformRating[]
  selectedPlatform: Platform | null
  onSelectPlatform: (_platform: Platform | null) => void
  className?: string
}) {
  const totalReviews = ratings.reduce((acc, curr) => acc + curr.total_reviews, 0)
  const overallRating = totalReviews > 0
    ? round(ratings.reduce((acc, curr) => acc + curr.rating * curr.total_reviews, 0) / totalReviews, 1)
    : 0

  // Create a map of existing ratings for easy lookup
  const ratingMap = new Map(ratings.map(r => [r.platform, r]))

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
        type='button'
        key={platform ?? 'all'}
        onClick={() => onSelectPlatform(platform)}
        className={styles.tab}
      >
        {platform ? (
          <>
            <PlatformIcon platform={platform} />
            <span>{platform}</span>
            <RatingDisplay
              rating={rating?.rating}
              count={rating?.total_reviews ?? 0}
              className={styles.count}
            />
          </>
        ) : (
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
      <div className='relative w-full overflow-hidden border-b border-gray-200'>
        <div className='flex items-center'>
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className='no-scrollbar flex gap-3 overflow-x-auto px-6 py-3 sm:gap-2 sm:px-4 sm:py-2 [&::-webkit-scrollbar]:hidden'
          >
            {allPlatforms.map(platform => renderTab(platform))}
          </div>
          {hasOverflow && (
            <>
              {/* Left fade and arrow */}
              {canScrollLeft && (
                <>
                  <div className='pointer-events-none absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-white to-transparent' />
                  <div className='absolute left-3 top-1/2 -translate-y-1/2 transform sm:left-2'>
                    <ChevronLeft className='h-6 w-6 text-gray-400 sm:h-5 sm:w-5' />
                  </div>
                </>
              )}
              {/* Right fade and arrow */}
              {canScrollRight && (
                <>
                  <div className='pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent' />
                  <div className='absolute right-3 top-1/2 -translate-y-1/2 transform sm:right-2'>
                    <ChevronRight className='h-6 w-6 text-gray-400 sm:h-5 sm:w-5' />
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

export default function ReviewsGridClient() {
  const [data, setData] = useState<ReviewsData | null>(null)
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [visibleReviews, setVisibleReviews] = useState(9) // Show 3x3 grid initially

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews', { next: { revalidate: hoursToSeconds(3) } })
        if (!response.ok) {
          throw new Error('Failed to fetch reviews')
        }
        const reviewsData = await response.json()
        setData(reviewsData)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    fetchReviews()
  }, [])

  if (!data) {
    return (
      <div className='px-4 sm:px-20'>
        <div className='space-y-8'>
          <div className='flex justify-center'>
            <Skeleton className='h-12 w-[600px] rounded-lg' />
          </div>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {Array.from({ length: 9 }).map((_, i) => (
              <ReviewCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  const filteredReviews = selectedPlatform
    ? data.reviews.filter(review => review.platform === selectedPlatform && review.rating >= 4)
    : data.reviews.filter(review => review.rating >= 4)

  const hasMoreReviews = filteredReviews.length > visibleReviews

  const handleViewMore = () => {
    setVisibleReviews(prev => prev + 9) // Load 9 more reviews
  }

  return (
    <div className='px-4 sm:px-4 lg:px-20'>
      <div className='space-y-8 sm:space-y-6'>
        <PlatformRatingTabs
          ratings={data.platform_ratings}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={(platform) => {
            setSelectedPlatform(platform)
            setVisibleReviews(9)
          }}
          className='justify-center'
        />
        <motion.div
          layout
          transition={{ duration: 0.2 }}
          className='grid min-h-96 grid-cols-1 gap-6 sm:gap-4 lg:grid-cols-3 md:grid-cols-2'
        >
          <AnimatePresence mode='popLayout' initial={false}>
            {filteredReviews.slice(0, visibleReviews).map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </AnimatePresence>
        </motion.div>
        {hasMoreReviews && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className='flex justify-center'
          >
            <button
              type='button'
              onClick={handleViewMore}
              className='my-4 rounded-lg bg-primary-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-200 sm:px-5 sm:py-2.5'
            >
              View More
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
