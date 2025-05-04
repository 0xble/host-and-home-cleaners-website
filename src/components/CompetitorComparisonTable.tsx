import { BUSINESS_NAME } from '@/lib/constants'
import { cn } from '@/lib/utils'

const comparisonCriteria = [
  {
    criteria: 'High-Quality Cleanings',
    isOfferedByUs: true,
    isOfferedByCompetitors: true,
  },
  {
    criteria: 'Affordable Prices',
    isOfferedByUs: true,
    isOfferedByCompetitors: true,
  },
  {
    criteria: '100% Satisfaction Guarantee',
    isOfferedByUs: true,
    isOfferedByCompetitors: false,
  },
  {
    criteria: 'Bonded and Insured',
    isOfferedByUs: true,
    isOfferedByCompetitors: false,
  },
  {
    criteria: 'Customizable Packages',
    isOfferedByUs: true,
    isOfferedByCompetitors: false,
  },
  {
    criteria: 'Easy Online Booking',
    isOfferedByUs: true,
    isOfferedByCompetitors: false,
  },
  {
    criteria: 'Transparent Pricing',
    isOfferedByUs: true,
    isOfferedByCompetitors: false,
  },
]

export default function CompetitorComparisonTable() {
  return (
    <div id="detailed-pricing" className={cn('w-full overflow-x-auto')}>
      <div className="overflow-hidden">
        <div className="grid grid-cols-3 items-center justify-center gap-x-16 border-b border-neutral-400 p-4 text-xs font-medium text-shade md:text-sm">
          <div className="flex items-center" />
          <div>{BUSINESS_NAME}</div>
          <div>Competitors</div>
        </div>
        {comparisonCriteria.map(
          ({ criteria, isOfferedByUs, isOfferedByCompetitors }, index) => (
            <div
              key={criteria}
              className={cn(
                'grid grid-cols-3 items-center justify-center gap-x-16 border-b border-neutral-400 p-4 text-xs text-shade md:text-sm',
                // Remove border on last item
                index === comparisonCriteria.length - 1 && 'border-b-0',
              )}
            >
              <div className="flex items-center">{criteria}</div>
              <div>
                {isOfferedByUs
                  ? (
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
                    )
                  : (
                      <svg
                        className="size-4 text-red-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    )}
              </div>
              <div>
                {isOfferedByCompetitors
                  ? (
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
                    )
                  : (
                      <svg
                        className="size-4 text-red-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                    )}
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  )
}
