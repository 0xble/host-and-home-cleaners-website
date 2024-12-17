import Script from 'next/script'

export default function ReviewsFloatingBadge() {
  return (
    <>
      <Script src='https://static.elfsight.com/platform/platform.js' strategy='lazyOnload' />
      <div className='elfsight-app-ba527c37-e33e-46d1-8a33-08aed36ffd09' data-elfsight-app-lazy />
    </>
  )
}
