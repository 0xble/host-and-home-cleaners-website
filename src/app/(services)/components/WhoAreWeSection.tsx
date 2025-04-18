import Image from 'next/image'
import Link from 'next/link'

import { BUSINESS_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'

type WhoAreWeSectionProps = {
  className?: string
  showImage?: boolean
}

export default function WhoAreWeSection({ className, showImage = true }: WhoAreWeSectionProps) {
  return (
    <section className={cn('prose prose-lg mx-auto max-w-[1000px] px-4', className)}>
      <div className='not-prose flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12'>
        <div className='flex-1'>
          <h2 className='mb-6 text-4xl font-extralight'>So, Who Are We?</h2>
          <p className='mb-4 text-lg'>
            At
            {' '}
            {BUSINESS_NAME}
            , we're more than just a cleaning service. We're a team of dedicated professionals who believe that a clean home environment is crucial for health, reduced stress, and productivity. Our commitment to excellence and attention to detail sets us apart.
          </p>
          <p className='mb-4 text-lg'>
            We are insured and bonded, and our professional cleaners will treat your home or rental with the same attention we would our own.
          </p>
          <p className='text-lg'>
            And as local cleaning experts, we understand our community's unique needs.
            {' '}
            <Link href='/about' className='text-primary hover:underline'>Learn more about our team and our commitment to excellence</Link>
            .
          </p>
        </div>
        {showImage && (
          <div className='shrink-0'>
            <Image
              src='/housekeeper-kitchen.webp'
              alt='Professional housekeeper cleaning a kitchen'
              width={515}
              height={290}
              className='rounded-lg'
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
