import Image from 'next/image'
import { cn } from '@/lib/utils'

const icons = [
  require('@/public/icons/airbnb.svg'),
  require('@/public/icons/zillow.svg'),
  require('@/public/icons/vrbo.svg'),
  require('@/public/icons/homeaway.svg'),
  require('@/public/icons/booking.svg'),
]

type TrustSectionProps = {
  className?: string
}

export default function TrustSection({ className }: TrustSectionProps) {
  return (
    <section className={cn('bg-white dark:bg-gray-900', className)}>
      <div className='mx-auto max-w-screen-xl px-4 py-4 lg:py-8'>
        <div className='mt-16 flex flex-col justify-between gap-12 text-gray-500 dark:text-gray-400 md:flex-row lg:mt-0'>
          {icons.map((icon, i) => (
            <div key={i} className='flex items-center justify-center'>
              <Image
                src={icon}
                alt='icon'
                className='w-40'
                style={{ objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
