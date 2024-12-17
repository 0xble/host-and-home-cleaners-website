import Script from 'next/script'

import { cn } from '@/lib/utils'

export type ReviewsMasonryProps = {
  className?: string
}

export default function ReviewsMasonry({ className }: ReviewsMasonryProps) {
  return (
    <div className='px-4 sm:px-20'>
      <Script src='https://static.elfsight.com/platform/platform.js' strategy='lazyOnload' />
      <div className={cn('elfsight-app-d0cb12fc-b042-4a4a-a8cc-9ee8cc58588e', className)} data-elfsight-app-lazy />
    </div>
  )
}
