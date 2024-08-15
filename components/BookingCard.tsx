import { cn } from '@/lib/utils'
import Link from 'next/link'
import Badge from './Badge'

type BookingCardProps = {
  name: string
  estimatedTime: string
  estimatedPrice: string
  description: string
  includes?: string
  features: React.ReactNode
  highlighted?: boolean
}

export default function BookingCard({
  name,
  estimatedTime,
  estimatedPrice,
  description,
  includes,
  features,
  highlighted,
}: BookingCardProps) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-xl flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 text-center shadow dark:border-gray-700 dark:bg-gray-800 xl:max-w-lg xl:p-8',
        highlighted && 'border-primary-500 dark:border-primary-600'
      )}
    >
      {highlighted && (
        <div>
          <Badge>Most popular</Badge>
        </div>
      )}
      <h3 className='text-gray-900 dark:text-white'>{name}</h3>
      <p className='text-sm'>{estimatedTime}</p>
      <span className='text-5xl text-gray-900 dark:text-white'>
        {estimatedPrice}
      </span>
      <p className='text-xs'>*starting at price</p>
      <Link
        href='https://pristinemaidcleaning.bookingkoala.com/booknow'
        className={cn(
          'my-4 rounded-lg bg-gray-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 dark:bg-gray-600 dark:text-white  dark:hover:bg-gray-500 dark:focus:ring-gray-600',
          highlighted &&
            'bg-primary-700 hover:bg-primary-800 focus:ring-primary-200 dark:focus:ring-primary-900'
        )}
      >
        Book a cleaning
      </Link>
      <p className='mb-4 text-start text-base'>{description}</p>
      <h4 className='text-lg font-medium'>
        {includes ? includes : 'Includes'}
      </h4>
      <ul
        role='list'
        className='space-y-4 text-left text-gray-900 dark:text-gray-400'
      >
        {features}
      </ul>
    </div>
  )
}
