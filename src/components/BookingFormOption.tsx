import { cn } from '@/lib/utils'
import * as React from 'react'

interface BookingFormOptionProps {
  children: React.ReactNode
  isSelected: boolean
  onClick: () => void
  className?: string
  isDisabled?: boolean
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
    } cursor-pointer p-4 transition-all active:scale-95`, className)}
      onClick={onClick}
    >
      {/* Add group-active:scale-90 to any direct image container with a delay */}
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement(child)
          && typeof child.props.className === 'string'
          && child.props.className.includes('relative')
        ) {
          return React.cloneElement(child as React.ReactElement<{ className: string }>, {
            className: cn(child.props.className, 'transition-transform duration-200 group-active:scale-90'),
          })
        }
        return child
      })}
    </div>
  )
}
