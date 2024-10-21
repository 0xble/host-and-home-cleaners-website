import type { Metadata } from 'next'
import Image from 'next/image'

import CTASection from '@/components/CTASection'
import Page from '@/components/Page'
import { BUSINESS_NAME, SERVICES } from '@/lib/constants'
import homeImage from '@/public/home3.jpeg'

export const metadata: Metadata = {
  title: `Host & Home ${SERVICES.STANDARD}`,
  description:
    'Recommended as a recurring service for maintaining the cleanliness of a home after a deep clean.',
}

export default async function StandardCleaning() {
  return (
    <Page location='CACHED' className='pb-24'>
      <section className='px-4 text-center'>
        <Image
          className='mx-auto mb-24 h-[300px] w-full max-w-screen-lg md:h-[450px] lg:rounded-b'
          src={homeImage}
          alt='cleaner walking with supplies'
          style={{ objectFit: 'cover' }}
          placeholder='blur'
        />
        <h1 className='mb-8 text-4xl sm:text-[45px]'>
          {SERVICES.STANDARD}
          {' '}
          Services
        </h1>
        <p className='mb-20'>
          Recommended as a recurring service for maintaining the cleanliness of
          a home after a deep clean.
        </p>
      </section>

      <section className='prose mx-auto mb-24 max-w-screen-md'>
        <p>
          At
          {' '}
          {BUSINESS_NAME}
          , we redefine excellence in the cleaning industry, offering
          unparalleled quality, cost efficiency, and professionalism. Our
          comprehensive range of tailored services, cutting-edge equipment, and
          eco-friendly products ensure that your space receives the highest
          standard of care.
        </p>

        <h2>
          Why Opt for
          {SERVICES.STANDARD}
          ?
        </h2>

        <p>
          When it comes to top-tier cleaning services,
          {' '}
          {BUSINESS_NAME}
          {' '}
          is your premier
          choice. We prioritize cost efficiency, providing affordable solutions
          without compromising on quality. Our competitive pricing packages
          cater to your needs and budget, delivering exceptional value for
          money. Time is precious, which is why we focus on time-saving
          solutions. With our team of skilled professionals and efficient
          cleaning methods, you can enjoy prompt and thorough cleaning services
          without sacrificing quality. We understand the importance of your time
          and ensure that your space is impeccably cleaned in a timely manner.
        </p>

        <h2>Comprehensive Services Tailored to Your Needs</h2>
        <p>
          At
          {' '}
          {BUSINESS_NAME}
          , we provide an extensive array of professional cleaning
          solutions customized to suit your specific needs. Our team of skilled
          professionals is adept in various cleaning techniques, encompassing
          dusting, vacuuming, sanitizing, and polishing. We utilize industry
          best practices and cutting-edge equipment to deliver consistent,
          high-quality results.
        </p>
        <p>
          We are committed to sustainability and prioritize eco-friendly
          practices. Our green cleaning products are gentle on surfaces and safe
          for both your health and the environment, ensuring a clean and healthy
          space for you to enjoy.
        </p>

        <h2>Benefits of Hiring Professional Cleaners</h2>
        <p>
          Professional cleaners offer numerous advantages that contribute to
          maintaining a pristine and organized environment. By outsourcing
          cleaning tasks to experts, you save time and can focus on your core
          activities. Professional cleaners use specialized equipment and
          products to ensure a deep clean and thoroughly clean, leading to
          significant health benefits by reducing the spread of germs and
          allergens.
        </p>
        <p>
          Hiring professional cleaners can be cost-effective in the long run
          despite the initial cost. They bring their supplies, eliminating the
          need for you to purchase cleaning products regularly. With their
          expertise, professional cleaners guarantee that the cleaning is done
          to a high standard, leaving your space spotless and well-maintained.
        </p>

        <h2>Tips for Maintaining a Clean Space</h2>
        <p>
          Maintaining a clean and hygienic space is essential for your
          well-being. Organizing clutter and regularly decluttering can prevent
          buildup and make cleaning more efficient. Moreover, integrating
          eco-friendly cleaning products into your regimen minimizes exposure to
          harmful chemicals and fosters a healthier indoor environment.
        </p>

        <h2>Customer Testimonials and Reviews</h2>
        <p>
          Customer testimonials and reviews are a testament to the quality and
          reliability of our services. Positive reviews highlight our attention
          to detail, promptness, and courteousness, showcasing our commitment to
          customer satisfaction. Consistent cleaning results and glowing
          testimonials demonstrate our dedication to excellence and reliability,
          earning the trust and loyalty of our clients.
        </p>
        <p>
          Experience the
          {' '}
          {BUSINESS_NAME}
          {' '}
          difference today and elevate your cleaning
          standards.
        </p>
      </section>

      <CTASection
        heading='Let Us Transform Your Home!'
        body='Book your standard cleaning service with us today and take the first step towards a cleaner, healthier home. Experience the difference of a truly spotless environment. Make a commitment to a cleaner, healthier living space and see the remarkable results of our expert standard cleaning services.'
        location='CACHED'
      />
    </Page>
  )
}
