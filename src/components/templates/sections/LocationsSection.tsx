import type { ServiceAreas } from '@/lib/types'

export interface LocationsSectionProps {
  heading: string
  description: string | JSX.Element
  iframeSrc: string
  serviceAreas: ServiceAreas
}

export default function LocationsSection({ heading, description, iframeSrc, serviceAreas }: LocationsSectionProps) {
  return (
    <section className="flex flex-col p-8 text-center">
      <h2 className="mb-4 tracking-tight text-shade">{heading}</h2>
      <p>{description}</p>
      <div className="mx-auto mt-4 grid max-w-4xl grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {serviceAreas.map(area => (
          <div
            key={area}
            className="flex items-center justify-center"
          >
            <span className="font-normal text-shade">{area}</span>
          </div>
        ))}
      </div>
      <iframe
        sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
        className="mx-auto mt-8 h-[400px] w-full max-w-screen-lg rounded-xl border-none sm:h-[550px]"
        src={iframeSrc}
        loading="lazy"
        scrolling="no"
        allowFullScreen={false}
        title="Service Areas"
      />
      {/* Form Anchor */}
      <div id="form" />
    </section>
  )
}
