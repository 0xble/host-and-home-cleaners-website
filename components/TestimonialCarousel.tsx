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

const TestimonialVideo = ({ src }: { src: string }) => (
  <video
    className='h-[300px] w-full rounded-lg md:h-[400px] md:w-[200px]'
    controls
  >
    <source src={src} type='video/mp4' />
    <track src={src} kind='captions' />
  </video>
)

const TestimonialFigure = ({
  title,
  text,
  name,
  label,
}: {
  title: string
  text: string
  name: string
  label: string
}) => (
  <figure className='flex flex-col items-center justify-center rounded-t-lg bg-white p-4 text-center dark:bg-gray-800 md:rounded-t-none md:rounded-ss-lg md:p-8'>
    <blockquote className='mx-auto mb-4 max-w-full text-gray-500 dark:text-gray-400 md:max-w-2xl lg:mb-8'>
      <h3 className='text-gray-900 dark:text-white'>{title}</h3>
      <p className='my-4'>{text}</p>
    </blockquote>
    <figcaption className='flex items-center justify-center'>
      <div className='text-center font-medium dark:text-white'>
        <div>{name}</div>
        <div className='text-sm text-gray-500 dark:text-gray-400'>{label}</div>
      </div>
    </figcaption>
  </figure>
)

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
        <CarouselItem className='flex flex-col md:flex-row'>
          <TestimonialVideo src='/testimony1.mp4' />
          <TestimonialFigure
            title='Reduce stress, save time'
            text='"As a busy mom of two, Pristine Maid Cleaning has been a total lifesaver for me... I love not having to worry about the cleaning so I can focus more on other things."'
            name='Ellie Hinton'
            label='Busy Mom'
          />
        </CarouselItem>
        <CarouselItem className='flex flex-col md:flex-row'>
          <TestimonialVideo src='/testimony2.mp4' />
          <TestimonialFigure
            title='Complete peace of mind'
            text='"I haven’t gotten a single negative review since I started using Pristine Maid Cleaning. They give me complete peace of mind!"'
            name='Alice Green'
            label='Airbnb Host, 6 years'
          />
        </CarouselItem>
        <CarouselItem className='flex flex-col md:flex-row'>
          <TestimonialVideo src='/testimony3.mp4' />
          <TestimonialFigure
            title='Sparkling clean after every visit'
            text='"Their team is incredibly thorough and punctual, we love working with them. My place is always left sparkling clean after every visit, and their attention to detail is just incredible."'
            name='Pamela Hobbs'
            label='Grandmother'
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
