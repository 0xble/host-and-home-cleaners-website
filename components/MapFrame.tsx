import { cn } from '@/lib/utils'

type MapProps = {
  className?: string
}

export default function MapFrame({ className }: MapProps) {
  return (
    <iframe
      className={cn('h-full w-full border-none', className)}
      src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d106194.64630830522!2d-78.8788075!3d33.7197455!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x432592cd81e1d561%3A0x2bb5e85088c224ee!2sPristine%20Maid%20Cleaning!5e0!3m2!1sen!2sus!4v1709048737136!5m2!1sen!2sus'
      loading='lazy'
      scrolling='no'
      allowFullScreen={false}
      title='Service Areas'
    />
  )
}
