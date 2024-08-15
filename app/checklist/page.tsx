import CTASection from '@/components/CTASection'
import PackageComparisonTable from '@/components/PackageComparisonTable'
import Page from '@/components/Page'
import { CHECKLIST_NAME } from '@/lib/globals'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pristine Clean 72-point Checklist™',
  description: 'See how we leave your home spotless and pristine, every time.',
}

export default function Checklist() {
  return (
    <Page className='py-24'>
      <div className='px-4 text-center'>
        <h1 className='mb-8 text-4xl sm:text-[45px]'>The {CHECKLIST_NAME}</h1>
        <p className='mb-20'>
          Designed to leave your home spotless and pristine,{' '}
          <span className='text-primary'>every time.</span>
        </p>
      </div>
      <div className='mx-auto mb-20 flex max-w-[1000px] flex-col items-center justify-center gap-20'>
        <PackageComparisonTable
          title='Living Rooms / Bedrooms / Hallways'
          inclusions={[
            {
              name: 'Removing cobwebs from ceiling',
              isIncluded: [true, true, true],
            },
            {
              name: 'Dust ceiling fans & lighting fixtures',
              isIncluded: [true, true, true],
            },
            {
              name: 'Dusting & wiping of windowsills & blinds',
              isIncluded: [true, true, true],
            },
            {
              name: 'Clean windowpanes inside',
              isIncluded: [true, true, true],
            },
            {
              name: 'Dusting & cleaning off of shelves, ledges, desk, & other surfaces',
              isIncluded: [true, true, true],
            },
            {
              name: 'Feather dust wall art, furniture, & objects',
              isIncluded: [true, true, false],
            },
            {
              name: 'Dusting of TV, monitors, & other electronics',
              isIncluded: [true, true, false],
            },
            {
              name: 'Dusting & wiping of light switches',
              isIncluded: [true, true, true],
            },
            {
              name: 'Dusting of door frames',
              isIncluded: [true, true, true],
            },
            {
              name: 'Clean / wipe mirrors & glass items',
              isIncluded: [true, true, true],
            },
            {
              name: 'Hand detailing & cleaning of exposed baseboards',
              isIncluded: [false, true, true],
            },
            {
              name: 'Checking / bagging garbage or trash under beds',
              isIncluded: [true, true, false],
            },
            {
              name: 'Change linens / make beds (linens must be provided)',
              isIncluded: [true, true, false],
            },
            {
              name: 'Remove trash & replace trash can liners (liners must be provided)',
              isIncluded: [true, true, false],
            },
            {
              name: 'Sweep & mop all flooring (hard wood, tile flooring, etc.)',
              isIncluded: [true, true, true],
            },
            {
              name: 'Vacuuming of carpet flooring & around furniture',
              isIncluded: [true, true, true],
            },
            {
              name: 'Vacuuming out of closets',
              isIncluded: [false, false, true],
            },
            {
              name: 'Vacuum / clean inside furniture',
              isIncluded: [true, true, false],
            },
            {
              name: 'Set / stage living room items',
              isIncluded: [true, true, false],
            },
          ]}
        />
        <PackageComparisonTable
          title='Bathrooms'
          inclusions={[
            {
              name: 'Removing cobwebs from ceiling',
              isIncluded: [true, true, true],
            },
            {
              name: 'Dust reachable vents',
              isIncluded: [true, true, true],
            },
            {
              name: 'Dust ceiling fans & light fixtures',
              isIncluded: [true, true, true],
            },
            {
              name: 'Dusting & wiping of windowsills & blinds',
              isIncluded: [true, true, true],
            },
            {
              name: 'Clean windowpanes inside',
              isIncluded: [false, true, true],
            },
            {
              name: 'Dusting & cleaning off of shelves, ledges, desk, & other surfaces',
              isIncluded: [true, true, true],
            },
            {
              name: 'Feather dust wall art & dust around objects',
              isIncluded: [true, true, false],
            },
            {
              name: 'Dusting & wiping of light switches',
              isIncluded: [true, true, true],
            },
            {
              name: 'Dusting of door frames',
              isIncluded: [true, true, true],
            },
            {
              name: 'Cleaning of shower & or tub',
              isIncluded: [true, true, true],
            },
            {
              name: 'Wipe, clean & dry sink / faucets',
              isIncluded: [true, true, true],
            },
            {
              name: 'Cleaning of inside, outside, and around toilet',
              isIncluded: [true, true, true],
            },
            {
              name: 'Hand detailing & cleaning of baseboards',
              isIncluded: [false, true, true],
            },
            {
              name: 'Clean / spot check walls',
              isIncluded: [true, true, true],
            },
            {
              name: 'Wipe mirrors & glass items',
              isIncluded: [true, true, true],
            },
            {
              name: 'Clean & sanitizing of counter tops & ledges',
              isIncluded: [true, true, true],
            },
            {
              name: 'Clean inside of cabinets & drawers',
              isIncluded: [false, false, true],
            },
            {
              name: 'Clean exterior of cabinets & drawers',
              isIncluded: [true, true, true],
            },
            {
              name: 'Remove trash & replace trash can liners',
              isIncluded: [true, true, false],
            },
            {
              name: 'Sweep & mop all flooring (hardwood, tile flooring, etc.)',
              isIncluded: [true, true, true],
            },
          ]}
        />
        <PackageComparisonTable
          title='Kitchen'
          inclusions={[
            {
              name: 'Removing cobwebs from ceiling',
              isIncluded: [true, true, true],
            },
            {
              name: 'Dust reachable vents',
              isIncluded: [true, true, true],
            },
            {
              name: 'Dust ceiling fans & light fixtures',
              isIncluded: [true, true, true],
            },
            {
              name: 'Dusting & wiping of windowsills & blinds',
              isIncluded: [false, true, true],
            },
            {
              name: 'Cleaning of windowpanes insdes',
              isIncluded: [false, true, true],
            },
            {
              name: 'Dusting & cleaning off of shelves, ledges, desk & other surfaces',
              isIncluded: [true, true, true],
            },
            {
              name: 'Feather dust wall art & dust around objects',
              isIncluded: [true, true, false],
            },
            {
              name: 'Dusting & wiping of light switches',
              isIncluded: [true, true, true],
            },
            {
              name: 'Dusting of door frames',
              isIncluded: [true, true, true],
            },
            {
              name: 'Cleaning of the inside of microwaves',
              isIncluded: [true, true, true],
            },
            {
              name: 'Clean inside of fridge, freezer, & stove',
              isIncluded: [false, false, true],
            },
            {
              name: 'Cleaning of stove tops',
              isIncluded: [true, true, true],
            },
            {
              name: 'Clean hood vents',
              isIncluded: [false, true, true],
            },
            {
              name: 'Clean exterior surfaces of fridge, stove, microwave, dishwasher',
              isIncluded: [true, true, true],
            },
            {
              name: 'Clean inside of cabinet & drawers',
              isIncluded: [false, false, true],
            },
            {
              name: 'Clean exterior of cabinet fronts & drawer fronts',
              isIncluded: [true, true, true],
            },
            {
              name: 'Removing of items from counter tops & cleaning all counter tops',
              isIncluded: [true, true, false],
            },
            {
              name: 'Clean & sanitizing of counter tops & ledges',
              isIncluded: [true, true, true],
            },
            {
              name: 'Wipe, clean & dry sink / faucets',
              isIncluded: [true, true, true],
            },
            {
              name: 'Wipe mirrors and glass items',
              isIncluded: [true, true, true],
            },
            {
              name: 'Sweep & mop all flooring (hardwood / tile flooring etc.)',
              isIncluded: [true, true, true],
            },
            {
              name: 'Hand detailing & cleaning of exposed baseboards',
              isIncluded: [false, true, true],
            },
            {
              name: 'Clean / spot check walls',
              isIncluded: [false, true, true],
            },
            {
              name: 'Remove trash & replace trash can liners',
              isIncluded: [true, true, false],
            },
          ]}
        />
        <PackageComparisonTable
          title='Extra Rooms (Laundry, Patio, Garage)'
          inclusions={[
            {
              name: 'Removing of cobwebs throughout',
              isIncluded: [false, false, true],
            },
            {
              name: 'Dust & wipe down outside of washer & dryer',
              isIncluded: [true, true, true],
            },
            {
              name: 'Cleaning of inside glass doorways & windows',
              isIncluded: [false, false, true],
            },
            {
              name: 'Picking up & bagging of trash',
              isIncluded: [true, true, true],
            },
            {
              name: 'Sweeping of complete flooring',
              isIncluded: [false, false, true],
            },
            {
              name: 'Mopping of tile flooring',
              isIncluded: [false, false, true],
            },
            {
              name: 'Vacuuming of carpet flooring',
              isIncluded: [false, false, true],
            },
          ]}
        />
      </div>

      <CTASection />
    </Page>
  )
}
