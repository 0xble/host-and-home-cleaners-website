import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import CTAButtons from './CTAButtons'

type CTASectionProps = {
  cta?: string
  className?: string
  phone?: string
}

export default function CTASection({ cta, className, phone }: CTASectionProps) {
  return (
    <section
      className={cn(
        'mx-auto max-w-screen-xl items-center gap-8 px-4 py-8 sm:py-16 md:grid md:grid-cols-2 lg:px-6 xl:gap-16',
        className
      )}
    >
      <Image
        className='h-96 rounded-lg lg:h-[600px]'
        alt='placeholder'
        src={require('@/public/flamingo-ring.jpeg')}
        style={{ objectFit: 'cover' }}
        placeholder='blur'
      />
      <div className='mt-4 md:mt-0'>
        <h1 className='mb-4 tracking-tight text-gray-900 dark:text-white sm:text-[58px]'>
          {cta || 'Ready to get a price and reserve a time in 60 seconds?'}
        </h1>
        <p className='mb-12'>
          Get an{' '}
          <Link
            href='https://bookings.pristinemaidcleaning.com/booknow'
            className='link'
          >
            instant, no-obligation quote online
          </Link>
          {phone && (
            <>
              {' '}
              or{' '}
              <a href={`tel:+${phone.replace(/\D/g, '')}`} className='link'>
                give us a call today
              </a>
            </>
          )}
          . If you call and the line is busy, don&apos;t worry — try again at a
          later time or leave a voicemail and we&apos;ll get back to you as soon
          as we can!
        </p>
        <CTAButtons />
      </div>
    </section>
  )
}
