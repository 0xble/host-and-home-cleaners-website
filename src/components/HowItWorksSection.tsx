import type { ImageProps } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'

import { CHECKLIST_NAME } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'

type HowItWorksCardType = {
  src: ImageProps['src']
  alt: string
  title: string
  width?: number
  height?: number
  description: React.ReactNode
}

export function HowItWorksCard({
  src,
  alt,
  title,
  width,
  height,
  description,
}: HowItWorksCardType) {
  return (
    <div className='mb-2 flex flex-col items-center md:mb-0'>
      <Image
        className='mb-5 mr-4 h-48 w-min rounded-lg md:h-auto md:w-full lg:mb-0'
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ objectFit: 'contain' }}
        placeholder='blur'
      />
      <div>
        <h3 className='mb-2.5 text-xl md:mt-4'>{title}</h3>
        {typeof description === 'string'
          ? (
              <p className='text-base'>{description}</p>
            )
          : (
              <div className='prose -ml-2 text-base'>{description}</div>
            )}
      </div>
    </div>
  )
}

type Step = {
  title: string
  description: React.ReactNode
}

type HowItWorksSectionProps = {
  heading: string
  steps: Step[]
}

export default function HowItWorksSection({ heading, steps }: HowItWorksSectionProps) {
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16'>
        <div className='text-center text-gray-900'>
          <h2 className='mb-4 tracking-tight text-gray-900'>{heading}</h2>
        </div>
        <div className='mt-12 grid gap-6 font-light md:grid-cols-3 lg:mt-14 lg:gap-12'>
          {steps.map(async (step, index) => (
            <HowItWorksCard
              key={step.title}
              title={step.title.includes(`${index + 1}.`) ? step.title : `${index + 1}. ${step.title}`}
              alt={step.title}
              description={step.description}
              src={await import(`@/public/how-it-works/step-${index + 1}.jpg`)}
            />
          ))}
        </div>
      </div>
      <p className='prose mx-auto text-center text-xl text-gray-600'>
        <span className='font-medium'>Want to know more?</span>
        {' '}
        View our
        {' '}
        <br className='sm:hidden' />
        <Link
          className='font-light text-primary-600'
          href={ROUTES.CHECKLIST.href}
        >
          {CHECKLIST_NAME}
        </Link>
        .
      </p>
    </div>
  )
}
