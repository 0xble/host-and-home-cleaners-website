import type { Phone } from '@/lib/types'
import { cn } from '@/lib/utils'

type PhoneLinkProps = {
  className?: string
  phone: Phone
}

export default function PhoneLink({ className, phone }: PhoneLinkProps) {
  return (
    <a
      className={cn(
        'text-base font-extralight hover:text-primary-700 lg:text-lg whitespace-nowrap',
        className,
      )}
      href={`tel:+${phone.plain}`}
    >
      {phone.formatted}
    </a>
  )
}
