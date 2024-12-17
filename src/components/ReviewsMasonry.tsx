import Script from 'next/script'

import { cn } from '@/lib/utils'

export type ReviewsMasonryProps = {
  id: string
  className?: string
}

export default function ReviewsMasonry({ id, className }: ReviewsMasonryProps) {
  return (
    <div className='px-4 sm:px-20'>
      <Script src='https://static.elfsight.com/platform/platform.js' strategy='lazyOnload' />
      <div className={cn(`elfsight-app-${id}`, className)} data-elfsight-app-lazy />
    </div>
  )
}
