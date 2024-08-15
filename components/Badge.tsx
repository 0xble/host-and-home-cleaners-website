import { cn } from '@/lib/utils'

type BadgeProps = {
  className?: string
  children: React.ReactNode
}

export default function Badge({ className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'rounded bg-primary-100 px-3 py-1 text-sm font-normal text-primary-800 dark:bg-primary-200',
        className
      )}
    >
      {children}
    </span>
  )
}
