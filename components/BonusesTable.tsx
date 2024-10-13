import { cn } from '@/lib/utils'

const bonuses = [
  {
    criteria: 'Earn a 5-star review from a client for a cleaning',
    bonus: '$10 per 5-star review',
    icon: (
      <svg
        className='mr-2 h-5 w-5 fill-current text-primary-700'
        xmlns='http://www.w3.org/2000/svg'
        enableBackground='new 0 0 24 24'
        viewBox='0 0 24 24'
        id='star'
      >
        <path
          d='M22,10.1c0.1-0.5-0.3-1.1-0.8-1.1l-5.7-0.8L12.9,3c-0.1-0.2-0.2-0.3-0.4-0.4C12,2.3,11.4,2.5,11.1,3L8.6,8.2L2.9,9
	C2.6,9,2.4,9.1,2.3,9.3c-0.4,0.4-0.4,1,0,1.4l4.1,4l-1,5.7c0,0.2,0,0.4,0.1,0.6c0.3,0.5,0.9,0.7,1.4,0.4l5.1-2.7l5.1,2.7
	c0.1,0.1,0.3,0.1,0.5,0.1l0,0c0.1,0,0.1,0,0.2,0c0.5-0.1,0.9-0.6,0.8-1.2l-1-5.7l4.1-4C21.9,10.5,22,10.3,22,10.1z'
        ></path>
      </svg>
    ),
  },
  {
    criteria: 'Making every appointment on time for the month',
    bonus: '$100 every month',
    icon: (
      <svg
        className='mr-2 h-5 w-5 fill-current text-primary-700'
        xmlns='http://www.w3.org/2000/svg'
        enableBackground='new 0 0 24 24'
        viewBox='0 0 24 24'
        id='clock'
      >
        <path
          d='M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M13,12c0,0.4-0.2,0.7-0.5,0.9l-2.6,1.5
	c-0.5,0.3-1.1,0.1-1.4-0.4s-0.1-1.1,0.4-1.4l2.1-1.2V7c0-0.6,0.4-1,1-1s1,0.4,1,1V12z'
        ></path>
      </svg>
    ),
  },
  {
    criteria: 'Taking on a same-day cleaning',
    bonus: '$20 per job',
    icon: (
      <svg
        className='mr-2 h-5 w-5 fill-current text-primary-700'
        xmlns='http://www.w3.org/2000/svg'
        enableBackground='new 0 0 24 24'
        viewBox='0 0 24 24'
        id='calendar'
      >
        <path
          d='M19,4h-1V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v1H8V3c0-0.6-0.4-1-1-1S6,2.4,6,3v1H5C3.3,4,2,5.3,2,7v1h20V7C22,5.3,20.7,4,19,4z
	 M2,19c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3v-9H2V19z M17,12c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S16.4,12,17,12z M17,16
	c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S16.4,16,17,16z M12,12c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S11.4,12,12,12z M12,16
	c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S11.4,16,12,16z M7,12c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S6.4,12,7,12z M7,16
	c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S6.4,16,7,16z'
        ></path>
      </svg>
    ),
  },
  {
    criteria: 'Refer a new client who books a service',
    bonus: '$50 per referral',
    icon: (
      <svg
        className='mr-2 h-5 w-5 fill-current text-primary-700'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 66 66'
        id='handshake'
      >
        <path d='M49.9 44c.7.8.9 2 .4 3-.2.3-.3.5-.6.6-.9.5-3-.2-3.8-1.3l-2.6-3.8c-.3-.4-.9-.6-1.4-.3-.5.3-.6.9-.3 1.4l2.3 3.3c.6.8.8 1.8.4 2.8-.2.4-.4.7-.7.8-1 .4-2.9-.8-3.6-1.4h-.1l-3-4.4c-.3-.5-.9-.6-1.4-.3-.4.3-.6.9-.3 1.4l2.5 3.6c.5.7.5 1.7 0 2.3-.8 1.1-3.4-.1-4.1-1l-2.8-4.1c-.3-.5-.9-.6-1.4-.3-.5.3-.6.9-.3 1.4l3 4.3c0 .6-.1 1.3-.6 1.6-.6.3-1.7 0-2.2-.3h-.1c-1.8-.7-9.1-6.3-13.6-9.9-1.2-1.3-3.2-2-4.4-2.3V21.7l1.5.5c-.4.6-.6 1.2-.6 1.7-.1 2.4 2.6 4.5 2.9 4.8 7.5 4.6 15.9-3.4 16.4-3.8.6-.6 1.1-.6 1.4-.6L49.9 44zM63.5 17.8v28.6c0 .7-.5 1.2-1.2 1.2h-5.7V16.5h5.7c.7 0 1.2.6 1.2 1.3zM3.7 16.5h5.7v31.1H3.7c-.7 0-1.2-.5-1.2-1.2V17.8c0-.7.5-1.3 1.2-1.3z'></path>
        <path d='M40.5 14.8c2.6 2.1 11.3 4.4 14.1 5v20.9c-1.1-.1-2.6-.1-3.6.6-.1.1-.3.2-.4.4L34.4 22.8c-.1-.1-.2-.2-.4-.3-.7-.3-2.5-.6-3.9 1-.1.1-7.7 7.3-13.8 3.5-.5-.4-2.1-1.9-2.1-3.1 0-.2 0-.7 1-1.3l.1-.1h.1l11.4-9.3c3.5-2.5 11 .2 13.7 1.6z'></path>
      </svg>
    ),
  },
  // {
  //   criteria: 'Taking on a cleaning past 5pm',
  //   bonus: '1.25x pay per job past 5pm',
  //   icon: (
  //     <svg
  //       className='mr-2 h-5 w-5 fill-current text-primary-700'
  //       xmlns='http://www.w3.org/2000/svg'
  //       enableBackground='new 0 0 24 24'
  //       viewBox='0 0 24 24'
  //       id='moon'
  //     >
  //       <path
  //         d='M16,19h-1c-0.6,0-1,0.4-1,1s0.4,1,1,1h1c0.6,0,1-0.4,1-1S16.6,19,16,19z M11,19H8c-0.6,0-1,0.4-1,1s0.4,1,1,1h3
  // c0.6,0,1-0.4,1-1S11.6,19,11,19z M20,15h-1.2c0.6-0.9,1-1.9,1.1-3c0.1-0.5-0.3-1.1-0.8-1.2c-0.2,0-0.3,0-0.5,0
  // c-0.6,0.2-1.3,0.3-1.9,0.3c-3.3,0-6.1-2.7-6.1-6c0-0.4,0-0.7,0.1-1C10.9,3.6,10.5,3.1,10,3c-0.2,0-0.3,0-0.5,0C5.3,4.5,3,9,4.4,13.2
  // c0.2,0.6,0.5,1.2,0.9,1.8H4c-0.6,0-1,0.4-1,1s0.4,1,1,1h16c0.6,0,1-0.4,1-1S20.6,15,20,15z'
  //       ></path>
  //     </svg>
  //   ),
  // },
  // {
  //   criteria: 'Working longer on a job going overtime',
  //   bonus: '0.75x pay per hour overtime',
  //   icon: (
  //     <svg
  //       className='mr-2 h-5 w-5 fill-current text-primary-700'
  //       xmlns='http://www.w3.org/2000/svg'
  //       viewBox='0 0 66 66'
  //       id='mop'
  //     >
  //       <path d='M57.745 53.35c-1.78 0-3.23-1.46-3.23-3.24 0-1.79 1.45-3.24 3.23-3.24a3.24 3.24 0 1 1 0 6.48zM62.755 64c0 .55-.44 1-1 1h-4.01c-.55 0-1-.45-1-1s.45-1 1-1h4.01c.56 0 1 .45 1 1zm-45.26-18.22a3.651 3.651 0 0 1-7.3 0c0-2.01 1.64-3.64 3.65-3.64s3.65 1.63 3.65 3.64zm-12.25 7.27c0 1.06.87 1.93 1.93 1.93.56 0 1 .45 1 1s-.44 1-1 1a3.93 3.93 0 0 1-3.93-3.93c0-2.18 1.76-3.94 3.93-3.94.56 0 1 .45 1 1s-.44 1-1 1c-1.06 0-1.93.87-1.93 1.94zm6.82 4.69c0 .91.74 1.65 1.65 1.65.55 0 1 .44 1 1 0 .55-.45 1-1 1-2.01 0-3.65-1.64-3.65-3.65s1.64-3.65 3.65-3.65c.55 0 1 .45 1 1 0 .56-.45 1-1 1-.91 0-1.65.74-1.65 1.65zm27.36-29.45V4.48c0-1.92-1.56-3.48-3.48-3.48-.94 0-1.82.37-2.45 1.01-.66.65-1.03 1.53-1.03 2.47v23.81h6.96zM47.576 42.138a11.943 11.943 0 0 0-4.081-6.478 11.68 11.68 0 0 0-4.07-2.16v-3.21h-6.96v3.21c-4.024 1.212-7.124 4.51-8.12 8.638h23.23zm.42 2H23.76c-1.882 6.469-4.42 12.992-7.575 19.422-.33.681.18 1.44.9 1.44h5.05c.4 0 .76-.24.92-.6.62-1.44 1.67-3.59 2.61-5.47-.24 2.24-.7 4.17-.87 4.54-.2.31-.21.7-.03 1.02.18.31.51.51.88.51h6.7c.37 0 .71-.2.89-.53 1.1-2.11 1.9-4.58 2.48-6.85.06 3.49-.23 6.23-.24 6.27a.998.998 0 0 0 1 1.11h6.76a1 1 0 0 0 1-.95c.07-1.33.14-2.59.2-3.74.79 2.41 1.58 4.02 1.64 4.14.17.34.52.55.9.55h6.52a1 1 0 0 0 .79-1.61c-2.646-5.19-4.7-11.521-6.288-19.252z'></path>
  //     </svg>
  //   ),
  // },
]

export default function BonusesTable() {
  return (
    <div
      id='detailed-pricing'
      className={cn('mx-auto max-w-screen-md overflow-x-auto')}
    >
      <div className='overflow-hidden'>
        <div className='grid grid-cols-3 gap-4 border-b border-gray-200 p-4 text-xs font-medium text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white md:grid-cols-3 md:text-sm'>
          <div className='col-span-2'>Criteria</div>
          <div>Bonus</div>
        </div>
        {bonuses.map(({ criteria, bonus, icon }) => (
          <div
            key={criteria}
            className='grid grid-cols-3 gap-4 border-b border-gray-200 p-4 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white md:grid-cols-3 md:text-sm'
          >
            <div className='col-span-2 flex text-gray-900'>
              {icon}
              {criteria}
            </div>
            <div className='text-gray-500'>{bonus}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
