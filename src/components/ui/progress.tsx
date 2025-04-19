'use client'

import { cn } from '@/lib/utils'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import * as React from 'react'

type ProgressProps = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  segments?: number
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, segments, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-4 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800',
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="size-full flex-1 bg-gradient-to-r from-gradient-end via-pink-500 to-primary transition-transform duration-1000 ease-in-out"
      style={{ transform: segments ? `translateX(-${value ? 100 - ((value / segments) * 100) : 100}%)` : undefined }}
    />

    {segments && (
      <div className="pointer-events-none absolute left-0 top-0 size-full">
        {Array.from({ length: segments - 1 }, (_, i) => {
          const position = ((i + 1) / segments) * 100
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
