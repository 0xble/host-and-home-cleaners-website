import type { FC, HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type CardProps = {} & HTMLAttributes<HTMLDivElement>

export const Card: FC<CardProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('rounded-lg border bg-card text-card-foreground shadow', className)}
      {...props}
    />
  )
}
