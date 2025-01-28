import type { FC, HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

type ContainerProps = {} & HTMLAttributes<HTMLDivElement>

export const Container: FC<ContainerProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}
