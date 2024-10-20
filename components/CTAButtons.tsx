import { cn } from '@/lib/utils'
import { PhoneIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

type CTAButtonsProps = {
  className?: string
  phone?: string
}

export default function CTAButtons({ className, phone }: CTAButtonsProps) {
  return (
    <div className={cn('lg:flex-rows flex items-center gap-6', className)}>
      <Link
        href='https://bookings.hostandhomecleaners.com/booknow'
        className='inline-flex items-center justify-center rounded-xl bg-primary-700 p-4 text-center font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 lg:mr-3 lg:px-6 lg:py-4 lg:text-xl '
      >
        Book now
      </Link>
      {phone && (
        <a
          href={`tel:+${phone.replace(/\D/g, '')}`}
          className='flex items-center justify-center gap-3'
        >
          <PhoneIcon className='h-7 text-primary-700 hover:text-primary-800 lg:h-10' />
          <div className='inline-flex flex-col rounded-lg text-start text-base font-medium text-gray-900 dark:text-white '>
            <p className='text-base'>Or give us a call!</p>
            <div className='text-lg font-extralight hover:text-primary-700 lg:text-xl'>
              {phone}
            </div>
          </div>
        </a>
      )}
    </div>
  )
}
