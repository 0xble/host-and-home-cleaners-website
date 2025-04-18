import fs from 'node:fs'
import path from 'node:path'

import Image from 'next/image'

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

export default function TeamSection() {
  return (
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
  )
}
