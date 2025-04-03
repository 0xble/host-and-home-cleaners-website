import Link from 'next/link'
import Image from 'next/image'

import { BUSINESS_NAME } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import type { Location } from '@/lib/types'
import { cn, getUrl } from '@/lib/utils'

type BrandProps = {
  className?: string
  location: Location | null
}

export default function Brand({ className, location }: BrandProps) {
  return (
    <Link
      href={getUrl(location)}
      className={cn(
        'flex items-center justify-center font-serif text-xl font-thin text-gray-900 ',
        className,
      )}
    >
      <Image
        src='/logo.svg'
        alt={`${BUSINESS_NAME} logo`}
        width={40}
        height={40}
        className='size-12 sm:size-14'
      />
      <div className='flex flex-col items-center justify-center'>
        <div className='text-center text-xs xs:text-sm sm:text-base'>{BUSINESS_NAME}</div>
        {location && (
          <div className='text-center text-sm font-sans xs:text-base font-extralight text-gray-700 sm:text-xl'>
            {ROUTES.LOCATIONS[location].name}
          </div>
        )}
      </div>
    </Link>
  )
}
