import { cn } from '@/lib/utils'

type PhoneLinkProps = {
  className?: string
  phone: string
}

export default function PhoneLink({ className, phone }: PhoneLinkProps) {
  return (
    <a
      className={cn(
        'text-base font-extralight hover:text-primary-700 lg:text-lg',
        className
      )}
      href={`tel:+${phone.replace(/\D/g, '')}`}
    >
      {phone}
    </a>
  )
}
