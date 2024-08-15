import { cn } from '@/lib/utils'

type PackageComparisonTableProps = {
  title: string | React.ReactNode
  inclusions: {
    name: string
    isIncluded: boolean[]
  }[]
}

export default function PackageComparisonTable({
  title,
  inclusions,
}: PackageComparisonTableProps) {
  return (
    <div id='detailed-pricing' className={cn('w-full overflow-x-auto')}>
      <div className='overflow-hidden'>
        <div className='grid grid-cols-5 items-center justify-center gap-x-6 border-b border-gray-200 p-4 font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:grid-cols-6 sm:gap-x-16'>
          <div className='col-span-2 text-sm sm:col-span-3 sm:text-xl'>
            {title}
          </div>
          <div className='text-xs sm:text-base'>Standard Cleaning</div>
          <div className='text-xs sm:text-base'>Deep Cleaning</div>
          <div className='text-xs sm:text-base'>Move In/Out Cleaning</div>
        </div>
        {inclusions.map(({ name, isIncluded }) => (
          <div
            key={name}
            className='grid grid-cols-5 items-center justify-center gap-x-6 border-b border-gray-200 p-4 text-xs text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:grid-cols-6 sm:gap-x-16'
          >
            <div className='col-span-2 flex items-center text-sm sm:col-span-3'>
              {name}
            </div>
            {isIncluded.map((included, index) => (
              <div key={index}>
                {included ? (
                  <svg
                    className='h-4 w-4 text-green-500'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 16 12'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M1 5.917 5.724 10.5 15 1.5'
                    />
                  </svg>
                ) : (
                  <svg
                    className='h-4 w-4 text-red-500'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
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
