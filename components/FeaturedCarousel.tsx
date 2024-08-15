import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

const getFeaturedImages = (folder: string) => {
  const dir = path.join(process.cwd(), 'public', folder)
  const filenames = fs
    .readdirSync(dir)
    .filter((name) => /\.(jpg|jpeg|png|gif|webp)$/i.test(name))
    // Sort by filename (numeric)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  return filenames.map((name) => require(`@/public/${folder}/${name}`))
}

type FeaturedCarouselProps = {
  folder: string
  className?: string
}

export default function FeaturedCarousel({
  folder,
  className,
}: FeaturedCarouselProps) {
  return (
    <Carousel
      opts={{ loop: true }}
      className={cn('w-full max-w-[650px]', className)}
    >
      <CarouselContent>
        {getFeaturedImages(folder).map((image, index) => (
          <CarouselItem key={index}>
            <Image
              className='h-[450px] rounded-lg object-cover'
              src={image}
              alt={folder + index + ' cleaning service image'}
              placeholder='blur'
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
