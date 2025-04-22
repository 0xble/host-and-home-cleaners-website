'use client'

import type { FC } from 'react'

import { cn } from '@/lib/utils'

interface SpinnerProps {
  className?: string
  text?: string
}

export const Spinner: FC<SpinnerProps> = ({ className, text }) => {
  return (
    <div className={cn('size-12 animate-spin rounded-full border-4 border-neutral-400 border-t-primary-600', className)} role="status">
      {text != null && <span className="sr-only">{text}</span>}
    </div>
  )
}
