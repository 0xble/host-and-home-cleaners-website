import type { Metadata } from 'next'
import WhoAreWeSection from '@/app/(services)/components/WhoAreWeSection'

import { ContentViewTracker } from '@/components/analytics/facebook/Pixel'
import CTASection from '@/components/CTASection'
import Page from '@/components/templates/Page'
import { BUSINESS_NAME, CHECKLIST_NAME, SERVICE_CHECKLIST } from '@/lib/constants'
import { Suspense } from 'react'

import PackageComparisonTable from './components/PackageComparisonTable'

export const metadata: Metadata = {
  title: CHECKLIST_NAME,
  description: 'View our comprehensive house cleaning checklist to see exactly what we clean during each visit. Learn how we ensure a spotless home every time.',
}

export default function Checklist() {
  return (
    <Page location='CACHED'>
      <ContentViewTracker
        contentType='page'
        contentName='Checklist'
        contentId='checklist-page'
      />
      <div className='mt-24 px-4 text-center'>
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
        {Object.entries(SERVICE_CHECKLIST).map(([key, section]) => (
          <PackageComparisonTable
            key={key}
            title={section.title}
            inclusions={section.inclusions}
          />
        ))}
      </div>

      <WhoAreWeSection className='mb-16' />

      <Suspense>
        <CTASection
          heading='Want To See For Yourself?'
          body={`Contact ${BUSINESS_NAME} today to schedule your cleaning service and experience the transformative difference of a professional clean.`}
          location='CACHED'
          showImage={false}
        />
      </Suspense>
    </Page>
  )
}
