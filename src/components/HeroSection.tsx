import FeaturedCarousel from '@/components/FeaturedCarousel'

export type HeroSectionProps = {
  heading: React.ReactNode
  description: string
  actions: JSX.Element
  photos: string
}

export default function HeroSection({ heading, description, actions, photos }: HeroSectionProps) {
  return (
    <section className='bg-white pt-8 lg:pt-12'>
      <div className='mx-auto grid max-w-screen-xl items-center gap-0 px-4 py-8 lg:grid-cols-12 lg:py-16'>
        <div className='mb-24 max-w-xl place-self-center lg:col-span-5 lg:mb-0'>
          <h2 className='mb-4 text-3xl xs:text-4xl font-light md:text-5xl' style={{ lineHeight: '1.2' }}>
            <mark>100% satisfaction</mark>
            {' '}
            guaranteed,
            {' '}
            or we&apos;ll
            {' '}
            redo it for
            {' '}
            <mark>FREE!</mark>

          </h2>
          <h1 className='mb-4 text-xl font-light text-gray-800 md:text-3xl'>
            {heading}
          </h1>
          <p className='mb-6 max-w-2xl text-base md:text-lg lg:mb-8'>{description}</p>
          {actions}
        </div>
        <div className='hidden lg:col-span-1 lg:grid' />
        <div className='flex w-full items-center justify-center lg:col-span-6 lg:mt-0'>
          <FeaturedCarousel folder={photos} />
        </div>
      </div>
    </section>

  )
}
