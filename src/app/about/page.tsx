import fs from 'node:fs'
import path from 'node:path'

import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'

import CTASection from '@/components/CTASection'
import Page from '@/components/Page'
import { BUSINESS_NAME } from '@/lib/constants'
import { ContentViewTracker } from '@/lib/pixel'

export const metadata: Metadata = {
  title: `About Us`,
  description: `Learn more about ${BUSINESS_NAME} and our commitment to excellence, reliability, and customer satisfaction.`,
}
const getTeamImageData = () => {
  const dir = path.join(process.cwd(), 'public', 'team')
  const filenames = fs
    .readdirSync(dir)
    .filter(name => /\.(?:jpg|jpeg|png|gif|webp)$/i.test(name))
    // Sort by filename (numeric)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  return filenames.map(filename => ({
    name: filename
      // Remove numbers
      .replace(/\d+/g, '')
      // Remove file extension
      .replace(/\.[^.]+$/, '')
      // Replace hyphens with spaces
      .replace(/-/g, ' ')
      // Capitalize first letter of each word
      .replace(/\b\w/g, l => l.toUpperCase())
      // Remove leading and trailing spaces
      .trim(),
    experience: Number.parseInt(filename.match(/\d+/)?.[0] || '0', 10),
    image: `/team/${filename}`,
  }))
}

export default function About() {
  return (
    <>
      <ContentViewTracker
        contentType='page'
        contentName='About'
        contentId='about-page'
      />
      <Page location='CACHED' className='mb-24 flex w-full flex-col items-center justify-center gap-12 md:mb-32 md:gap-24'>
        <section className='flex flex-col gap-12 px-4 py-12 md:flex-row md:gap-20 md:pt-24 lg:px-12'>
          <div className='flex max-w-screen-sm flex-col'>
            <h1 className='mb-4 max-sm:text-4xl'>
              About Us
            </h1>
            <p className='mb-4 hidden text-base sm:block sm:text-lg'>
              We believe a clean home environment is crucial for health, reduced
              stress, and productivity. That&apos;s why we offer a wide range of
              high-quality, customized residential cleaning services. Using the
              latest cleaning technology and eco-friendly products, we provide
              thorough, hassle-free house cleaning.
            </p>
            <p className='my-4 text-base sm:text-lg'>
              At
              {' '}
              {BUSINESS_NAME}
              , we&apos;re dedicated to providing top-quality, reliable
              house cleaning services that surpass expectations. Our insured,
              professional cleaning team ensures your home or rental property
              receives a thorough clean. As local cleaning experts, we understand
              our community&apos;s unique home cleaning needs.
            </p>
            <p className='hidden text-base sm:block sm:text-lg'>
              Let us take the hassle out of cleaning, so you can focus on what
              matters most to you and yours!
            </p>
          </div>

          <div className='grid w-full max-w-screen-lg grid-cols-1 gap-2 sm:grid-cols-2 md:w-1/2 md:shrink-0'>
            <Image
              className='h-[200px] w-full rounded sm:h-[300px]'
              src='/about/clean-fan.jpg'
              alt='clean fan'
              style={{ objectFit: 'cover' }}
              width={300}
              height={200}
            />
            <Image
              className='h-[200px] w-full rounded sm:h-[300px]'
              src='/about/clean-kitchen.jpg'
              alt='clean kitchen'
              style={{ objectFit: 'cover' }}
              width={300}
              height={200}
            />
            <Image
              className='h-[200px] w-full rounded sm:h-[300px]'
              src='/about/clean-microwave.jpg'
              alt='clean microwave'
              style={{ objectFit: 'cover' }}
              width={300}
              height={200}
            />
            <Image
              className='h-[200px] w-full rounded sm:h-[300px]'
              src='/about/clean-shelf.jpg'
              alt='clean shelf'
              style={{ objectFit: 'cover' }}
              width={300}
              height={200}
            />
          </div>
        </section>

        <section className='flex w-full flex-col items-center justify-center px-4 pb-12 md:pb-24 lg:px-12'>
          <h2 className='mb-12'>Our Team</h2>
          <p className='mb-12 hidden max-w-screen-md sm:block md:mb-24'>
            Our professional, detail-oriented cleaning team is the heart of our
            service. We have experience and rigorous training. We treat your home
            with the same care we would our own, ensuring a thorough and
            respectful cleaning experience. Our meticulous approach guarantees a
            spotless environment you&apos;ll love coming home to.
          </p>
          <div className='grid w-full grid-cols-1 justify-center gap-10 sm:grid-cols-2'>
            {getTeamImageData().map(({ name, image, experience }) => (
              <div
                key={name}
                className='flex flex-col items-center justify-center'
              >
                <Image
                  className='flex size-[200px] justify-center rounded-full md:size-[300px]'
                  src={image}
                  alt={name}
                  style={{ objectFit: 'cover' }}
                  width={300}
                  height={300}
                />
                <h3 className='pt-6 text-center text-lg md:pt-12 md:text-xl'>
                  {name}
                </h3>
                <p className='text-center text-sm font-extralight md:text-base'>
                  {experience}
                  {' '}
                  years of experience
                </p>
              </div>
            ))}
          </div>
          <p className='mt-10 text-center text-2xl font-extralight md:mt-20'>
            ...and many more!
          </p>
        </section>
        <Suspense>
          <CTASection
            heading='Schedule a cleaning in seconds!'
            body='Let our professional cleaners make your home spotless and organized. From one-time deep cleans to regular maintenance, we deliver exceptional service tailored to your needs. Schedule now to experience the difference!'
            location='CACHED'
          />
        </Suspense>
      </Page>
    </>
  )
}
