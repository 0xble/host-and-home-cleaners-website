import MapFrame from '@/components/MapFrame'
import type { ServiceAreas } from '@/lib/types'

export type LocationsSectionProps = {
  heading: string
  description: string | JSX.Element
  iframeSrc: string
  serviceAreas: ServiceAreas
}

export default function LocationsSection({ heading, description, iframeSrc, serviceAreas }: LocationsSectionProps) {
  return (
    <section className='flex flex-col p-8 text-center'>
      <h2 className='mb-4 tracking-tight text-gray-900'>{heading}</h2>
      <p>{description}</p>
      <div className='mx-auto mt-4 grid max-w-4xl grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {serviceAreas.map(area => (
          <div
            key={area}
            className='flex items-center justify-center'
          >
            <span className='font-normal text-gray-900'>{area}</span>
          </div>
        ))}
      </div>
      <MapFrame
        src={iframeSrc}
        className='mx-auto mt-8 h-[400px] max-w-screen-lg rounded-xl sm:h-[550px]'
      />
      {/* Form Anchor */}
      <div id='form' />
    </section>
  )
}
