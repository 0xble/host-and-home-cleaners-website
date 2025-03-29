'use client'

import { Star } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { round } from 'remeda'

import type { Platform, PlatformRating, Review, ReviewsData } from '@/lib/reviews'
import { cn } from '@/lib/utils'

// Platform Icons Configuration
const PLATFORM_ICONS = {
  Google: '/images/platforms/google.svg',
  Facebook: '/images/platforms/facebook.svg',
  Yelp: '/images/platforms/yelp.svg',
  Thumbtack: '/images/platforms/thumbtack.svg',
  Nextdoor: '/images/platforms/nextdoor.svg',
} as const

// Platform Icon Component
function PlatformIcon({ platform, className }: { platform: Platform, className?: string }) {
  return (
    <Image
      src={PLATFORM_ICONS[platform]}
      alt={`${platform} icon`}
      width={20}
      height={20}
      className={cn('h-5 w-5', className)}
    />
  )
}

const AVATAR_COLORS = [
  'bg-red-500',
  'bg-pink-500',
  'bg-purple-500',
  'bg-deep-purple-500',
  'bg-indigo-500',
  'bg-blue-500',
  'bg-light-blue-500',
  'bg-cyan-500',
  'bg-teal-500',
  'bg-green-500',
  'bg-light-green-500',
  'bg-lime-500',
  'bg-yellow-500',
  'bg-amber-500',
  'bg-orange-500',
  'bg-deep-orange-500',
  'bg-brown-500',
  'bg-blue-grey-500',
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
    <div className={cn('rounded-lg bg-white p-6 shadow-md', className)}>
      <div className='mb-4 flex'>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={`${review.id}-star-${i + 1}`}
            className={cn(
              'h-5 w-5',
              i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300',
            )}
          />
        ))}
      </div>

      <p className='mb-4 text-gray-700'>
        {review.text.length > 250 ? `${review.text.slice(0, 250)}...` : review.text}
      </p>

      {review.url && (
        <a
          href={review.url}
          target='_blank'
          rel='noopener noreferrer'
          className='mb-4 block text-sm text-primary-600 hover:underline'
        >
          Read more
        </a>
      )}

      <div className='mb-4 flex items-center gap-2'>
        <PlatformIcon platform={review.platform} className='size-5' />
        <span className='text-sm text-gray-600'>
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
                width={40}
                height={40}
                className='rounded-full'
              />
            )
          : (
              <div className={cn(
                'flex size-10 items-center justify-center rounded-full text-lg font-medium text-white',
                getAvatarColor(review.author.name || 'Anonymous'),
              )}
              >
                {review.author.name?.charAt(0) || 'A'}
              </div>
            )}
        <div>
          <div className='font-medium text-gray-900'>{review.author.name}</div>
          <div className='text-sm text-gray-500'>{review.date}</div>
        </div>
      </div>
    </div>
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
  selectedPlatform: string | null
  onSelectPlatform: (_platform: string | null) => void
  className?: string
}) {
  const totalReviews = ratings.reduce((acc, curr) => acc + curr.total_reviews, 0)
  const overallRating = round(
    ratings.reduce((acc, curr) => acc + curr.rating * curr.total_reviews, 0) / totalReviews,
    1,
  ).toFixed(1)

  // Create a map of existing ratings for easy lookup
  const ratingMap = new Map(ratings.map(r => [r.platform, r]))

  // Define the desired platform order
  const orderedPlatforms: Platform[] = ['Google', 'Yelp', 'Thumbtack', 'Nextdoor']

  return (
    <div className={cn('flex flex-wrap justify-center gap-4', className)}>
      <div className='relative inline-flex flex-wrap justify-center border-b border-gray-200'>
        <div className='flex flex-wrap justify-center gap-4'>
          <button
            type='button'
            onClick={() => onSelectPlatform(null)}
            className={cn(
              'flex items-center gap-2 border-b-2 px-4 py-2 text-base font-medium transition-colors rounded-t-lg',
              selectedPlatform === null
                ? 'border-primary-700 text-primary-700 hover:bg-gray-100'
                : 'border-transparent text-gray-500 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-700',
            )}
          >
            <span>All Reviews</span>
            <span className='flex items-center gap-1'>
              {totalReviews > 0 && (
                <>
                  <Star className='size-4 fill-yellow-400 text-yellow-400' />
                  {overallRating}
                </>
              )}
            </span>
          </button>

          {orderedPlatforms.map((platform) => {
            const rating = ratingMap.get(platform)
            return (
              <button
                type='button'
                key={platform}
                onClick={() => onSelectPlatform(platform)}
                className={cn(
                  'flex items-center gap-2 border-b-2 px-4 py-2 text-base font-medium transition-colors rounded-t-lg',
                  selectedPlatform === platform
                    ? 'border-primary-700 text-primary-700 hover:bg-gray-100'
                    : 'border-transparent text-gray-500 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-700',
                )}
              >
                <PlatformIcon platform={platform} className='size-4' />
                <span>{platform}</span>
                {rating?.total_reviews
                  ? (
                      <span className='flex items-center gap-1'>
                        <Star className='size-4 fill-yellow-400 text-yellow-400' />
                        {round(rating.rating, 1).toFixed(1)}
                      </span>
                    )
                  : null}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export type ReviewsMasonryClientProps = {
  data: ReviewsData
  className?: string
}

export function ReviewsMasonryClient({ data, className }: ReviewsMasonryClientProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [visibleReviews, setVisibleReviews] = useState(9) // Show 3x3 grid initially

  const filteredReviews = selectedPlatform
    ? data.reviews.filter(review => review.platform === selectedPlatform && review.rating >= 4)
    : data.reviews.filter(review => review.rating >= 4)

  const hasMoreReviews = filteredReviews.length > visibleReviews

  const handleViewMore = () => {
    setVisibleReviews(prev => prev + 9) // Load 9 more reviews
  }

  return (
    <div className='px-4 sm:px-20'>
      <div className={cn('space-y-8', className)}>
        <PlatformRatingTabs
          ratings={data.platform_ratings}
          selectedPlatform={selectedPlatform}
          onSelectPlatform={(platform) => {
            setSelectedPlatform(platform)
            setVisibleReviews(9) // Reset to initial count when switching platforms
          }}
          className='justify-center'
        />
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredReviews.slice(0, visibleReviews).map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        {hasMoreReviews && (
          <div className='flex justify-center'>
            <button
              type='button'
              onClick={handleViewMore}
              className='my-4 rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-200'
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
