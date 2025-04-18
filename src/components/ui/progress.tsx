'use client'

import { cn } from '@/lib/utils'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import * as React from 'react'

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  steps?: number
  showDividers?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, steps = 3, showDividers = false, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-4 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="size-full flex-1 bg-zinc-900 transition-transform duration-1000 ease-in-out dark:bg-zinc-50"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />

    {showDividers && steps > 1 && (
      <div className="pointer-events-none absolute left-0 top-0 size-full">
        {Array.from({ length: steps - 1 }, (_, i) => {
          const position = ((i + 1) / steps) * 100
          return (
            <div
              key={i}
              className="absolute z-20 h-full -translate-x-1/2"
              style={{ left: `${position}%` }}
            >
              <div className="h-full w-1 bg-white"></div>
            </div>
          )
        })}
      </div>
    )}
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
