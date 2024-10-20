import Image, { ImageProps } from 'next/image'

type HowItWorksCardType = {
  src: ImageProps['src']
  alt: string
  title: string
  width?: number
  height?: number
  description: string | JSX.Element
}

export default function HowItWorksCard({
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
        {typeof description === 'string' ? (
          <p className='text-base'>{description}</p>
        ) : (
          <div className='prose -ml-2 text-base'>{description}</div>
        )}
      </div>
    </div>
  )
}
