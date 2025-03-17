import Script from 'next/script'

export type ReviewsFloatingBadgeProps = {
  id: string
}

export default function ReviewsFloatingBadge({ id }: ReviewsFloatingBadgeProps) {
  return (
    <>
      <Script src='https://static.elfsight.com/platform/platform.js' strategy='lazyOnload' />
      <div className={`elfsight-app-${id} z-[100]`} data-elfsight-app-lazy />
    </>
  )
}
