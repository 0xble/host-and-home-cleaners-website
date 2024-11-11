import { cn } from '@/lib/utils'

type MapProps = {
  src: string
  className?: string
}

export default function MapFrame({ src, className }: MapProps) {
  return (
    <iframe
      sandbox='allow-scripts allow-popups allow-popups-to-escape-sandbox'
      className={cn('h-full w-full border-none', className)}
      src={src}
      loading='lazy'
      scrolling='no'
      allowFullScreen={false}
      title='Service Areas'
    />
  )
}
