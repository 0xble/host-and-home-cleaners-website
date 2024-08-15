'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

export default function TestimonialCarousel() {
  const plugin = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      opts={{
        loop: true,
      }}
      className='mx-auto w-full max-w-screen-md'
    >
      <CarouselContent>
        <CarouselItem className='flex'>
          <video className='h-[400px] rounded-lg' controls>
            <source src='/testimony1.mp4' type='video/mp4' />
          </video>
          <figure className='flex flex-col items-center justify-center rounded-t-lg bg-white p-8 text-center dark:bg-gray-800 md:rounded-t-none md:rounded-ss-lg'>
            <blockquote className='mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400 lg:mb-8'>
              <h3 className='text-gray-900 dark:text-white'>
                Reduce stress, save time
              </h3>
              <p className='my-4'>
                &quot;As a busy mom of two, Pristine Maid Cleaning has been a
                total lifesaver for me... I love not having to worry about the
                cleaning so I can focus more on other things.&quot;
              </p>
            </blockquote>
            <figcaption className='flex items-center justify-center'>
              <div className='text-center font-medium dark:text-white'>
                <div>Ellie Hinton</div>
                <div className='text-sm text-gray-500 dark:text-gray-400 '>
                  Busy Mom
                </div>
              </div>
            </figcaption>
          </figure>
        </CarouselItem>
        <CarouselItem className='flex'>
          <video className='h-[400px] rounded-lg' controls>
            <source src='/testimony2.mp4' type='video/mp4' />
          </video>
          <figure className='flex flex-col items-center justify-center rounded-t-lg bg-white p-8 text-center dark:bg-gray-800 md:rounded-t-none md:rounded-ss-lg'>
            <blockquote className='mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400 lg:mb-8'>
              <h3 className='text-gray-900 dark:text-white'>
                Complete peace of mind
              </h3>
              <p className='my-4'>
                &quot;I haven’t gotten a single negative review since I started
                using Pristine Maid Cleaning. They give me complete peace of
                mind!&quot;
              </p>
            </blockquote>
            <figcaption className='flex items-center justify-center'>
              <div className='text-center font-medium dark:text-white'>
                <div>Alice Green</div>
                <div className='text-sm text-gray-500 dark:text-gray-400 '>
                  Airbnb Host, 6 years
                </div>
              </div>
            </figcaption>
          </figure>
        </CarouselItem>
        <CarouselItem className='flex'>
          <video className='h-[400px] rounded-lg' controls>
            <source src='/testimony3.mp4' type='video/mp4' />
          </video>
          <figure className='flex flex-col items-center justify-center rounded-t-lg bg-white p-8 text-center dark:bg-gray-800 md:rounded-t-none md:rounded-ss-lg'>
            <blockquote className='mx-auto mb-4 max-w-2xl text-gray-500 dark:text-gray-400 lg:mb-8'>
              <h3 className='text-gray-900 dark:text-white'>
                Sparkling clean after every visit
              </h3>
              <p className='my-4'>
                &quot;Their team is incredibly thorough and punctual, we love
                working with them. My place is always left sparkling clean after
                every visit, and their attention to detail is just
                incredible.&quot;
              </p>
            </blockquote>
            <figcaption className='flex items-center justify-center'>
              <div className='text-center font-medium dark:text-white'>
                <div>Pamela Hobbs</div>
                <div className='text-sm text-gray-500 dark:text-gray-400 '>
                  Grandmother
                </div>
              </div>
            </figcaption>
          </figure>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
