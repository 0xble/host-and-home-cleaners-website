import { NAME } from '@/lib/globals'
import CompetitorComparisonTable from './CompetitorComparisonTable'

const faqs = [
  {
    question: 'Why should I choose you over other competitors?',
    answer: (
      <>
        <p className='mb-6'>
          Beyond our recognized quality and reliability, here&apos;s just a few
          of the other reasons why your neighbors chose us over the competition:
        </p>
        <CompetitorComparisonTable />
      </>
    ),
  },
  {
    question: 'What cleaning services do you offer?',
    answer: (
      <>
        <p className='mb-2'>
          We specialize in offering cleaning services for home and rental
          cleaning. Our services include standard cleanings, thorough deep
          cleanings, and specialized move-in/out cleanings, and expert home
          organization.
        </p>
        <p>
          Our services are designed to meet the unique needs of your space, and
          we offer a range of add-ons to ensure that you get the cleaning you
          need, every time.
        </p>
      </>
    ),
  },
  {
    question: 'Are you bonded and insured?',
    answer: (
      <>
        <p className='mb-2'>
          Yes, {NAME} is fully bonded and insured. This ensures that our clients
          have complete peace of mind when we enter and after we leave their
          spaces, knowing they are protected against any liabilities.
        </p>
        <p>
          Our commitment to professionalism and security is just one of the many
          reasons our clients trust us with their cleaning needs over others.
        </p>
      </>
    ),
  },
  {
    question:
      'How do you ensure the quality and consistency of your cleaning services?',
    answer: (
      <>
        <p className='mb-2'>
          Our team conducts periodic quality checks to guarantee consistency
          across all services and are constantly improving our processes to
          ensure the highest quality.
        </p>
        <p>
          Our quality assurance process includes rigorous training programs,
          regular performance evaluations, and client feedback mechanisms to
          maintain high standards. Our cleaning professionals are in regular
          communication with us during the clean and equipped with checklists to
          ensure no detail is overlooked.
        </p>
      </>
    ),
  },
  {
    question: 'How often should I schedule home cleaning services?',
    answer: (
      <>
        <p>
          We recommend bi-weekly cleanings for consistent upkeep and a fresh
          environment. However, we offer flexible scheduling to perfectly align
          with your unique needs, including monthly deep cleans for those
          seeking a thorough refresh less frequently.
        </p>
      </>
    ),
  },
  {
    question: 'Do you offer weekend or holiday cleaning services?',
    answer: (
      <>
        <p className='mb-2'>
          Yes, we recognize the importance of flexibility in our services. We
          can offer cleaning appointments on weekends and during select holidays
          at a surcharge to ensure we can fit into your busy schedule. Advance
          booking for these high-demand times is recommended to secure your
          preferred slot.
        </p>
      </>
    ),
  },
  {
    question: 'How do you screen and hold your cleaning staff accountable?',
    answer: (
      <>
        <p className='mb-2'>
          We take great care in selecting our team, requiring thorough
          background checks and detailed interviews to assess skills and
          reliability.
        </p>
        <p>
          Each clean goes through a comprehensive checklist to ensure quality
          and rely any accommodations and details from our clients. We use a
          blend of customer feedback and on-site inspections to monitor cleaner
          performance. This allows us to address any issues proactively and
          recognize excellence.
        </p>
      </>
    ),
  },
  {
    question: 'Can you accommodate special requests or add-on services?',
    answer: (
      <>
        <p>
          Yes, we strive to meet all our clients&apos; needs and are happy to
          accommodate special requests and add-on services. Whether it&apos;s
          focusing on specific areas, using particular cleaning products, or
          including additional tasks, just let us know. We&apos;ll tailor our
          services to ensure your utmost satisfaction.
        </p>
      </>
    ),
  },
  {
    question:
      'What is your policy on rescheduling or canceling an appointment?',
    answer: (
      <>
        <p>
          We understand that life can be unpredictable. {NAME} offers flexible
          rescheduling options and request that you provide us with at least 24
          hours notice for cancellations. Our goal is to accommodate your needs
          while ensuring our team can efficiently manage their schedules.
        </p>
      </>
    ),
  },
  {
    question:
      "What should I do if I'm not satisfied with the cleaning service?  ",
    answer: (
      <>
        <p className='mb-2'>
          We take your satisfaction very seriously at {NAME}, and uphold it as
          our top priority. If for any reason you&apos;re not satisfied with our
          service, please contact us right away within 24 hours of the cleaning.
        </p>
        <p>
          We will address any issues promptly and, if you are not 100%
          satisfied, provide a free redo. We&apos;re committed to ensuring every
          client is delighted with our work to earn your continued business.
        </p>
      </>
    ),
  },
]

export default function FAQSection() {
  return (
    <section className='mx-auto max-w-screen-md bg-white dark:bg-gray-900 '>
      <div className='px-4 py-8 sm:py-16 lg:px-6 '>
        <h1 className='mb-6 text-center tracking-tight text-gray-900 dark:text-white lg:mb-8'>
          Frequently asked questions
        </h1>
        <p className='mb-8'>
          Here are a few of the questions we get the most. If you don&apos;t see
          what&apos;s on your mind, reach out to us anytime on phone, chat, or
          email.
        </p>
        <div>
          <div
            id='accordion-flush'
            data-accordion='collapse'
            data-active-classes='bg-white dark:bg-gray-900 text-gray-900 dark:text-white'
            data-inactive-classes='text-gray-500 dark:text-gray-400'
          >
            {faqs.map(({ question, answer }, i) => (
              <>
                <div id={'accordion-flush-heading-' + i}>
                  <button
                    type='button'
                    className='flex w-full items-center justify-between border-b border-gray-200 bg-white py-5 text-left font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-white'
                    data-accordion-target={'#accordion-flush-body-' + i}
                    aria-expanded='true'
                    aria-controls={'accordion-flush-body-' + i}
                  >
                    <span>{question}</span>
                    <svg
                      data-accordion-icon=''
                      className='h-6 w-6 shrink-0 rotate-180'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      ></path>
                    </svg>
                  </button>
                </div>
                <div
                  id={'accordion-flush-body-' + i}
                  className=''
                  aria-labelledby={'accordion-flush-heading-' + i}
                >
                  <div className='border-gray-200 py-5 dark:border-gray-700'>
                    {typeof answer === 'string' ? <p>{answer}</p> : answer}
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
