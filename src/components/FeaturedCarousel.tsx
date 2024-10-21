import fs from 'node:fs'
import path from 'node:path'

import type { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

const getFeaturedImages = async (folder: string): Promise<{ name: string, image: StaticImport }[]> => {
  const dir = path.join(process.cwd(), 'public', folder)
  const filenames = fs
    .readdirSync(dir)
    // Filter filenames to include only common image formats (jpg, jpeg, png, gif, webp).
    .filter(name => /\.(?:jpg|jpeg|png|gif|webp)$/i.test(name))
    // Sort by filename (numeric)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

  return await Promise.all(filenames.map(async (name) => {
    return { name, image: await import(`/public/${folder}/${name}`) as StaticImport }
  }))
}

type FeaturedCarouselProps = {
  folder: string
  className?: string
}

export default async function FeaturedCarousel({
  folder,
  className,
}: FeaturedCarouselProps) {
  return (
    <Carousel
      opts={{ loop: true }}
      className={cn('w-full max-w-[650px]', className)}
    >
      <CarouselContent>
        {await getFeaturedImages(folder).then(images => images.map(({ name, image }) => (
          <CarouselItem key={name}>
            <Image
              key={name}
              className='h-[450px] rounded-lg object-cover'
              src={image}
              alt={`${folder} cleaning service image`}
              placeholder='blur'
            />
          </CarouselItem>
        )))}
      </CarouselContent>
    </Carousel>
  )
}
