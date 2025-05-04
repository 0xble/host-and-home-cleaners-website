import { cn } from '@/lib/utils'
import * as React from 'react'

interface BookingFormOptionProps {
  children: React.ReactNode
  isSelected: boolean
  className?: string
  isDisabled?: boolean
  onClick: () => void
}

export function BookingFormOption({
  children,
  isSelected,
  isDisabled = false,
  className,
  onClick,
}: BookingFormOptionProps) {
  return (
    <div
      className={cn(`group flex flex-col items-center justify-between rounded-md border
        ${isDisabled
      ? 'border-muted bg-popover cursor-pointer opacity-70 hover:border-muted-foreground hover:opacity-100'
      : isSelected
        ? 'border-primary ring-primary ring-1 bg-primary-50'
        : 'border-neutral-light bg-popover hover:border-primary'
    } cursor-pointer p-4 transition-transform duration-200 active:scale-95`, className)}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
