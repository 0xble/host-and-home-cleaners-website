import type { ServiceKey } from '@/lib/constants'
import { SERVICES } from '@/lib/constants'

import { ROUTES } from '@/lib/routes'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface PackageComparisonTableProps {
  title: string | React.ReactNode
  inclusions: {
    name: string
    services: {
      [_service in keyof typeof SERVICES]: boolean
    }
  }[]
}

export default function PackageComparisonTable({
  title,
  inclusions,
}: PackageComparisonTableProps) {
  return (
    <div id="detailed-pricing" className={cn('w-full overflow-x-auto')}>
      <div className="overflow-hidden">
        <div className="grid grid-cols-6 gap-x-6 border-b border-gray-200 p-4 font-medium text-gray-900 sm:grid-cols-7 sm:gap-x-16">
          <div className="col-span-2 text-sm sm:col-span-3 sm:text-xl">
            {title}
          </div>
          {Object.entries(SERVICES).map(([key, service]) => (
            <div key={service} className="flex flex-col items-start">
              <div className="text-xs sm:text-base">{service}</div>
              <Link
                href={ROUTES.SERVICES[key as ServiceKey].href}
                className="mt-1 text-[10px] font-light text-primary hover:underline sm:text-xs"
              >
                Learn more
              </Link>
            </div>
          ))}
        </div>
        {inclusions.map(({ name, services }) => (
          <div
            key={name}
            className="grid grid-cols-6 gap-x-6 border-b border-gray-200 p-4 text-xs text-gray-900 sm:grid-cols-7 sm:gap-x-16"
          >
            <div className="col-span-2 flex items-center text-sm sm:col-span-3">
              {name}
            </div>
            {Object.entries(services).map(([service, isIncluded]) => (
              <div key={`${name}: ${service}`} className="flex items-center justify-center">
                {isIncluded && (
                  <svg
                    className="size-4 text-green-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 12"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5.917 5.724 10.5 15 1.5"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
