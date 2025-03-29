import { useEffect, useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { BUSINESS_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'

const TestimonialVideo = ({ src }: { src: string }) => (
  <video
    className='h-[300px] w-[160px] rounded-lg sm:h-[415px] sm:w-[220px] md:h-[400px] md:w-[200px]'
    controls
  >
    <source src={src} type='video/mp4' />
    <track src={src} kind='captions' />
  </video>
)

const TestimonialFigure = ({
  heading,
  text,
  name,
  label,
}: {
  heading: string
  text: string
  name: string
  label: string
}) => (
  <figure className='flex flex-col items-center justify-center rounded-t-lg bg-white p-3 text-center sm:p-4 md:rounded-t-none md:rounded-ss-lg md:p-8'>
    <blockquote className='mx-auto mb-3 max-w-full text-sm text-gray-500 sm:mb-4 sm:text-base md:max-w-2xl lg:mb-8'>
      <h3 className='text-base text-gray-900 sm:text-lg'>{heading}</h3>
      <p className='my-2 sm:my-4'>{text}</p>
    </blockquote>
    <figcaption className='flex items-center justify-center'>
      <div className='text-center text-sm font-medium sm:text-base'>
        <div>{name}</div>
        <div className='text-xs text-gray-500 sm:text-sm'>{label}</div>
      </div>
    </figcaption>
  </figure>
)

export type TestimonialCarouselProps = {
  className?: string
}

export function TestimonialCarousel({ className }: TestimonialCarouselProps) {
  const plugin = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  )

  useEffect(() => {
    // Cleanup autoplay on unmount
    return () => {
      plugin.current.stop()
    }
  }, [])

  return (
    <div className={cn('my-8 flex flex-col text-center sm:my-12', className)}>
      <Carousel
        plugins={[plugin.current]}
        opts={{ loop: true }}
        className='mx-auto w-full max-w-screen-md'
      >
        <CarouselContent>
          <CarouselItem className='flex flex-col items-center md:flex-row md:items-start'>
            <TestimonialVideo src='/testimony1.mp4' />
            <TestimonialFigure
              heading='Reduce stress, save time'
              text={`As a busy mom of two, ${BUSINESS_NAME} has been a total lifesaver for me... I love not having to worry about the cleaning so I can focus more on other things.`}
              name='Ellie Hinton'
              label='Busy Mom'
            />
          </CarouselItem>
          <CarouselItem className='flex flex-col items-center md:flex-row md:items-start'>
            <TestimonialVideo src='/testimony2.mp4' />
            <TestimonialFigure
              heading='Complete peace of mind'
              text={`I haven't gotten a single negative review since I started using ${BUSINESS_NAME}. They give me complete peace of mind!`}
              name='Alice Green'
              label='Airbnb Host, 6 years'
            />
          </CarouselItem>
          <CarouselItem className='flex flex-col items-center md:flex-row md:items-start'>
            <TestimonialVideo src='/testimony3.mp4' />
            <TestimonialFigure
              heading='Sparkling clean after every visit'
              text='"Their team is incredibly thorough and punctual, we love working with them. My place is always left sparkling clean after every visit, and their attention to detail is just incredible."'
              name='Pamela Hobbs'
              label='Grandmother'
            />
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className='absolute left-2 sm:left-4' />
        <CarouselNext className='absolute right-2 sm:right-4' />
      </Carousel>
    </div>
  )
}