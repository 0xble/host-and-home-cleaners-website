import type { Location } from '@/lib/types'
import { BUSINESS_NAME } from '@/lib/constants'

import { ROUTES } from '@/lib/routes'
import { cn, getUrl } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

interface BrandProps {
  className?: string
  location: Location | null
}

export default function Brand({ className, location }: BrandProps) {
  return (
    <Link
      href={getUrl(location)}
      className={cn(
        'flex items-center justify-center font-serif text-xl font-thin text-shade z-10',
        className,
      )}
    >
      <Image
        src="/logo.svg"
        alt={`${BUSINESS_NAME} logo`}
        width={40}
        height={40}
        className="size-12 sm:size-16 xl:size-20"
      />
      <div className="flex flex-col items-center justify-center">
        <div className="text-center text-xs xs:text-sm sm:text-base xl:text-lg">{BUSINESS_NAME}</div>
        {location && (
          <div className="text-center font-sans text-sm font-extralight text-gray-700 xs:text-base sm:text-xl">
            {ROUTES.LOCATIONS[location].name}
          </div>
        )}
      </div>
    </Link>
  )
}
