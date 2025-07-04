import Script from 'next/script'

export interface ReviewsFloatingBadgeProps {
  id: string
}

export default function ReviewsFloatingBadge({ id }: ReviewsFloatingBadgeProps) {
  return (
    <>
      <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
      <div
        className={`elfsight-app-${id} z-40`}
        data-elfsight-app-lazy
        data-aria-hidden="true"
        aria-hidden="true"
      />
    </>
  )
}
