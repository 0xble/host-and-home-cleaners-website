import type { Metadata } from 'next'
import { Suspense } from 'react'

import CTASection from '@/components/CTASection'
import PackageComparisonTable from '@/components/PackageComparisonTable'
import Page from '@/components/Page'
import { CHECKLIST_NAME } from '@/lib/constants'

export const metadata: Metadata = {
  title: CHECKLIST_NAME,
  description: 'View our comprehensive house cleaning checklist to see exactly what we clean during each visit. Learn how we ensure a spotless home every time.',
}

export default function Checklist() {
  return (
    <Page location='CACHED' className='py-24'>
      <div className='px-4 text-center'>
        <h1 className='mb-8 text-4xl sm:text-[45px]'>
          The
          {' '}
          {CHECKLIST_NAME}
        </h1>
        <p className='mb-20'>
          Designed to leave your home spotless and pristine,
          {' '}
          <span className='text-primary'>every time</span>
          .
        </p>
      </div>
      <div className='mx-auto mb-20 flex max-w-[1000px] flex-col items-center justify-center gap-20'>
        <PackageComparisonTable
          title='Living Rooms / Bedrooms / Hallways'
          inclusions={[
            {
              name: 'Removing cobwebs from ceiling',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dust ceiling fans & lighting fixtures',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dusting & wiping of windowsills & blinds',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean windowpanes inside',
              services: {
                STANDARD: false,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dusting & cleaning off of shelves, ledges, desk, & other surfaces',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Feather dust wall art, furniture, & objects',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: false,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dusting of TV, monitors, & other electronics',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: false,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dusting & wiping of light switches',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dusting of door frames',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean / wipe mirrors & glass items',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Hand detailing & cleaning of exposed baseboards',
              services: {
                STANDARD: false,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Checking / bagging garbage or trash under beds',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: false,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Change linens / make beds (linens must be provided)',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: false,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Remove trash & replace trash can liners (liners must be provided)',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: false,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Sweep & mop all flooring (hard wood, tile flooring, etc.)',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Vacuuming of carpet flooring & around furniture',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Vacuuming out of closets',
              services: {
                STANDARD: false,
                DEEP: false,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Vacuum / clean inside furniture',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: false,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Set / stage living room items',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: false,
                VACATION_RENTAL: true,
              },
            },
          ]}
        />
        <PackageComparisonTable
          title='Bathrooms'
          inclusions={[
            {
              name: 'Removing cobwebs from ceiling',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dust reachable vents',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dust ceiling fans & light fixtures',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dusting & wiping of windowsills & blinds',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean windowpanes inside',
              services: {
                STANDARD: false,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dusting & cleaning off of shelves, ledges, desk, & other surfaces',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Feather dust wall art & dust around objects',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: false,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dusting & wiping of light switches',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dusting of door frames',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Cleaning of shower & or tub',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Wipe, clean & dry sink / faucets',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Cleaning of inside, outside, and around toilet',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Hand detailing & cleaning of baseboards',
              services: {
                STANDARD: false,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean / spot check walls',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Wipe mirrors & glass items',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean & sanitizing of counter tops & ledges',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean inside of cabinets & drawers',
              services: {
                STANDARD: false,
                DEEP: false,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean exterior of cabinets & drawers',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Remove trash & replace trash can liners',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: false,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Sweep & mop all flooring (hardwood, tile flooring, etc.)',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
          ]}
        />
        <PackageComparisonTable
          title='Kitchen'
          inclusions={[
            {
              name: 'Removing cobwebs from ceiling',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dust reachable vents',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dust ceiling fans & light fixtures',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dusting & wiping of windowsills & blinds',
              services: {
                STANDARD: false,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Cleaning of windowpanes insdes',
              services: {
                STANDARD: false,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dusting & cleaning off of shelves, ledges, desk & other surfaces',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Feather dust wall art & dust around objects',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: false,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dusting & wiping of light switches',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dusting of door frames',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Cleaning of the inside of microwaves',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean inside of fridge, freezer, & stove',
              services: {
                STANDARD: false,
                DEEP: false,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Cleaning of stove tops',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean hood vents',
              services: {
                STANDARD: false,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean exterior surfaces of fridge, stove, microwave, dishwasher',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean inside of cabinet & drawers',
              services: {
                STANDARD: false,
                DEEP: false,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean exterior of cabinet fronts & drawer fronts',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Removing of items from counter tops & cleaning all counter tops',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: false,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean & sanitizing of counter tops & ledges',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Wipe, clean & dry sink / faucets',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Wipe mirrors and glass items',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Sweep & mop all flooring (hardwood / tile flooring etc.)',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Hand detailing & cleaning of exposed baseboards',
              services: {
                STANDARD: false,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Clean / spot check walls',
              services: {
                STANDARD: false,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Remove trash & replace trash can liners',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: false,
                VACATION_RENTAL: true,
              },
            },
          ]}
        />
        <PackageComparisonTable
          title='Extra Rooms (Laundry, Office, etc.)'
          inclusions={[
            {
              name: 'Removing of cobwebs throughout',
              services: {
                STANDARD: false,
                DEEP: false,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Dust & wipe down outside of washer & dryer',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Cleaning of inside glass doorways & windows',
              services: {
                STANDARD: false,
                DEEP: false,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Picking up & bagging of trash',
              services: {
                STANDARD: true,
                DEEP: true,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Sweeping of complete flooring',
              services: {
                STANDARD: false,
                DEEP: false,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Mopping of tile flooring',
              services: {
                STANDARD: false,
                DEEP: false,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
            {
              name: 'Vacuuming of carpet flooring',
              services: {
                STANDARD: false,
                DEEP: false,
                MOVE_IN_OUT: true,
                VACATION_RENTAL: true,
              },
            },
          ]}
        />
      </div>
      <Suspense>
        <CTASection
          heading='Get Started with Expert Cleaning Services Today!'
          body='Achieve a cleaner, more organized home with our expert cleaning services. Our team of professional cleaners is committed to delivering top-notch services tailored to your unique needs. Whether you require a one-time deep clean or regular maintenance, we have the skills and resources to ensure your home is spotless. Our dedication to quality and customer satisfaction guarantees that your home will be treated with the utmost care and attention to detail. Contact us today to schedule your cleaning service and experience the transformative difference of a professional clean.'
          location='CACHED'
        />
      </Suspense>
    </Page>
  )
}
