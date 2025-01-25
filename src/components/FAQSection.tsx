import { Fragment } from 'react'

export type FAQSectionProps = {
  heading: string
  description: string
  faqs: Array<{
    question: string
    answer: React.ReactNode
  }>
}

export default function FAQSection({ heading, description, faqs }: FAQSectionProps) {
  return (
    <section className='mx-auto max-w-screen-md bg-white'>
      <div className='px-4 py-8 sm:py-16 lg:px-6'>
        <h2 className='mb-6 text-center tracking-tight text-gray-900 lg:mb-8'>
          {heading}
        </h2>
        <p className='mb-8'>{description}</p>
        <div>
          <div
            id='accordion-flush'
            data-accordion='collapse'
            data-active-classes='bg-white text-gray-900'
            data-inactive-classes='text-gray-500'
          >
            {faqs.map(({ question, answer }, i) => (
              <Fragment key={question}>
                <div id={`accordion-flush-heading-${i}`}>
                  <button
                    type='button'
                    className='flex w-full items-center justify-between border-b border-gray-200 bg-white py-5 text-left font-medium text-gray-900'
                    data-accordion-target={`#accordion-flush-body-${i}`}
                    aria-expanded='true'
                    aria-controls={`accordion-flush-body-${i}`}
                  >
                    <span>{question}</span>
                    <svg
                      className='size-6 shrink-0 rotate-180'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      >
                      </path>
                    </svg>
                  </button>
                </div>
                <div
                  id={`accordion-flush-body-${i}`}
                  className=''
                  aria-labelledby={`accordion-flush-heading-${i}`}
                >
                  <div className='border-gray-200 py-5'>
                    {typeof answer === 'string' ? <p>{answer}</p> : answer}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
