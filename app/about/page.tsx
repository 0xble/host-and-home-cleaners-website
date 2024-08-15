import CTASection from '@/components/CTASection'
import Image from 'next/image'
import { Metadata } from 'next'
import { NAME } from '@/lib/globals'
import Page from '@/components/Page'

export const metadata: Metadata = {
  title: 'About Us',
  description: `Learn more about ${NAME} and our commitment to excellence, reliability, and customer satisfaction.`,
}

export default function About() {
  return (
    <Page className='mb-24 flex w-full flex-col items-center justify-center gap-12 md:mb-32 md:gap-24'>
      <Image
        className='h-[350px] w-full max-w-screen-lg md:h-[500px] lg:rounded-b'
        src={require('@/public/cleaner-walk.gif')}
        alt='cleaner walking with supplies'
        style={{ objectFit: 'cover' }}
        placeholder='blur'
      />

      <section className='mx-auto max-w-screen-md px-4 py-8 md:flex md:flex-col lg:px-6'>
        <h1 className='dark:text-white'>About us</h1>
        <p className='my-4'>
          Our journey started with a commitment to quality, reliability, and
          customer satisfaction — and that has never changed. We built a team of
          professional cleaners highly trained and insured, ensuring that your
          space, whether it&apos;s your home or rental, receives the highest
          standard of care and cleanliness. As a locally-run business, we
          understand the unique needs of our community and strive to deliver
          services that not only meet but exceed expectations.
        </p>
        <p className='mb-4'>
          At {NAME}, we&apos;ve always believed that a clean environment is
          essential for health, productivity, and overall well-being. That has
          always been mission and why aim to offer a widest range of
          high-quality services around, tailored to fit your specific needs.
          Keeping up with the latest best practices, technology, and products,
          we ensure a thorough clean with no fuss. Our commitment to customer
          service is unwavering; we work closely with each client to create a
          customized cleaning plan that aligns with their schedule and budget.
        </p>
        <p>
          Let us take the hassle out of cleaning, so you can focus on what
          matters most to you and yours!
        </p>
      </section>

      <CTASection />
    </Page>
  )
}
