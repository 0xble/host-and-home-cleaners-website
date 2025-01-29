'use client'

import type { FC } from 'react'

import { cn } from '@/lib/utils'

type SpinnerProps = {
  className?: string
  text?: string
}

export const Spinner: FC<SpinnerProps> = ({ className, text }) => {
  return (
    <div className={cn('size-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600', className)} role='status'>
      {text && <span className='sr-only'>{text}</span>}
    </div>
  )
}
