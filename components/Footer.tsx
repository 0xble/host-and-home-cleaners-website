import Link from 'next/link'
import Brand from './Brand'
import PhoneLink from './PhoneLink'
import { NAME, EMAIL } from '@/lib/globals'
import { COMPANY_PAGES, LEGAL_PAGES, SERVICE_PAGES } from '@/lib/pages'
import { PHONE_NUMBER as MYRTLE_BEACH_PHONE_NUMBER } from '@/app/house-cleaning-services-myrtle-beach/local'
import { LOCATIONS as MYRTLE_BEACH_LOCATIONS } from '@/app/house-cleaning-services-myrtle-beach/local'
import { Location } from '@/store/useLocationStore'

type FooterLinkProps = {
  href: string
  children: React.ReactNode
}

function FooterLink({ href, children }: FooterLinkProps) {
  const className = 'hover:underline'

  return href.startsWith('http') ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  )
}

type FooterProps = {
  location?: Location
}

export default function Footer({ location }: FooterProps) {
  const getContacts = (location: Location | undefined) => {
    switch (location) {
      case Location.MYRTLE_BEACH:
        return (
          <>
            <h4 className='mb-6 text-sm uppercase text-gray-900 dark:text-white'>
              Contacts
            </h4>
            <ul className='mb-8 text-gray-700'>
              <li className='mb-4'>
                <PhoneLink
                  className='text-lg'
                  phone={MYRTLE_BEACH_PHONE_NUMBER}
                />
              </li>
              <li className='mb-4'>
                <a
                  className='text-lg font-extralight hover:text-primary-700'
                  href={`mailto:${EMAIL}`}
                >
                  {EMAIL}
                </a>
              </li>
            </ul>
          </>
        )
      default:
        return (
          <>
            <h4 className='mb-6 text-sm uppercase text-gray-900 dark:text-white'>
              Contacts
            </h4>
            <ul className='mb-8 text-gray-700'>
              <li className='mb-4'>
                <a
                  className='text-lg font-extralight hover:text-primary-700'
                  href={`mailto:${EMAIL}`}
                >
                  {EMAIL}
                </a>
              </li>
            </ul>
          </>
        )
    }
  }

  const getSocials = (location: Location | undefined) => {
    switch (location) {
      case Location.MYRTLE_BEACH:
        return (
          <>
            <h4 className='mb-6 text-sm uppercase text-gray-900 dark:text-white'>
              Socials
            </h4>
            <ul className='flex items-center gap-4 text-gray-500 dark:text-gray-400'>
              {/* <li>
                // Twitter
                <a
                  href='https://www.twitter.com/pristinemaidcleaning'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <svg
                    className='h-8 w-8 fill-current hover:text-gray-600'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path d='M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z'></path>
                  </svg>
                </a>
              </li> */}
              {/* <li>
                // YouTube
                <a
                  href='https://www.youtube.com/channel/pristinemaidcleaning'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <svg
                    className='h-8 w-8 fill-current hover:text-gray-600'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path d='M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z'></path>
                  </svg>
                </a>
              </li> */}
              <li>
                {/* Facebook */}
                <a
                  href='https://www.facebook.com/pristinemaidcleaningmyrtlebeach'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <svg
                    className='h-8 w-8 fill-current hover:text-gray-600'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h3.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h3.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
              </li>
              <li>
                {/* Instagram */}
                <a
                  href='https://www.instagram.com/pristinemaidcleaning'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <svg
                    className='h-8 w-8 fill-current hover:text-gray-600'
                    viewBox='0 0 24 24'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
              </li>
              <li>
                {/* Google */}
                <a
                  href='https://g.page/r/Ce4kwohQ6LUrEAI'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-7 w-7 fill-current hover:text-gray-600'
                    width='2443'
                    height='2500'
                    preserveAspectRatio='xMidYMid'
                    viewBox='0 0 256 262'
                    id='google'
                  >
                    <path d='M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027'></path>
                    <path d='M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1'></path>
                    <path d='M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782'></path>
                    <path d='M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251'></path>
                  </svg>
                </a>
              </li>
              <li>
                {/* Yelp */}
                <a
                  href='https://www.yelp.com/biz/pristine-maid-cleaning-myrtle-beach'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <svg
                    className='h-8 w-8 fill-current hover:text-gray-600'
                    xmlns='http://www.w3.org/2000/svg'
                    width='48'
                    height='48'
                    viewBox='0 0 48 48'
                    id='yelp'
                  >
                    <path
                      fillRule='evenodd'
                      d='M24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0ZM24.5965 21.2758C24.5085 19.2486 23.8982 10.2222 23.8265 9.80404C23.7236 9.42512 23.4272 9.15446 23.0023 9.04755C21.6964 8.72412 16.7055 10.1221 15.7812 11.0761C15.4835 11.386 15.3739 11.7677 15.4632 12.106C15.6093 12.405 21.7925 22.1338 21.7925 22.1338C22.7059 23.6156 23.4516 23.3856 23.6966 23.3084C23.9388 23.234 24.6804 23.004 24.5965 21.2758ZM35.2454 24.0622C35.0438 24.1948 34.8462 24.2598 29.7308 25.4994C28.9107 25.6942 28.4601 25.8052 28.2084 25.8999C28.2138 25.8932 28.2341 25.8566 28.2341 25.8566C27.7225 25.9987 27.165 25.7524 26.8348 25.2477C26.5154 24.7605 26.5208 24.1921 26.847 23.7956C26.8618 23.7793 28.0987 22.0945 28.0987 22.0945C30.8378 18.3486 30.9826 18.1537 31.1802 18.0252C31.4995 17.8114 31.8839 17.7992 32.2682 17.9832C33.3522 18.5137 35.5526 21.7805 35.6839 23.0364C35.6857 23.0464 35.6851 23.0564 35.6845 23.0661C35.6842 23.0707 35.6839 23.0753 35.6839 23.0797C35.711 23.5046 35.5553 23.8538 35.2454 24.0622ZM13.0584 28.3155C12.8892 26.6835 13.0949 24.2246 13.5821 23.4437C13.8135 23.0824 14.1451 22.8943 14.5186 22.9092C14.7622 22.9119 14.98 22.9904 19.8194 24.9865C19.8221 24.9865 21.2335 25.5616 21.2335 25.5616C21.7451 25.7538 22.055 26.2843 22.0225 26.8851C21.99 27.4711 21.6544 27.9299 21.1551 28.0571C21.1469 28.0611 19.1454 28.6999 19.1454 28.6999C14.6417 30.1479 14.4929 30.1885 14.2533 30.1763C13.8798 30.1628 13.5523 29.9422 13.3574 29.5714C13.2154 29.3034 13.1179 28.8542 13.0584 28.3155ZM24.5098 33.2023C24.4963 37.9334 24.4868 38.089 24.4083 38.3163C24.2798 38.6682 23.9753 38.9037 23.5571 38.9795C22.3527 39.1852 18.5825 37.798 17.7962 36.8643C17.6379 36.6694 17.5418 36.461 17.5215 36.2499C17.5052 36.1024 17.5255 35.9535 17.5756 35.8155C17.6582 35.58 17.8003 35.396 21.1902 31.4133C21.1929 31.4133 22.1808 30.2413 22.1808 30.2413C22.5192 29.8204 23.1214 29.6878 23.6803 29.903C24.2229 30.1114 24.5545 30.5783 24.522 31.0912C24.5207 31.1115 24.5098 33.2023 24.5098 33.2023ZM32.0571 36.6694C33.1938 36.2161 35.673 33.0616 35.8476 31.8477C35.9085 31.4254 35.7759 31.0614 35.4849 30.8286C35.2941 30.6852 35.1493 30.6297 30.6483 29.1519C30.6483 29.1519 28.6739 28.4996 28.6481 28.4875C28.1704 28.3021 27.6251 28.4739 27.2583 28.9259C26.8767 29.3901 26.8199 30.0031 27.1243 30.466L27.9187 31.7597C30.5901 36.0983 30.7944 36.4055 30.9866 36.5557C31.2843 36.7898 31.6633 36.8277 32.0571 36.6694Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
              </li>
              <li>
                {/* Nextdoor */}
                <a
                  href='https://nextdoor.com/pages/pristine-maid-cleaning-myrtle-beach-sc/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <svg
                    className='h-8 w-8 fill-current hover:text-gray-600'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='none'
                    viewBox='0 0 24 24'
                    id='nextdoor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M2.5 3.5C1.94772 3.5 1.5 3.94772 1.5 4.5V7.5C1.5 9.98528 3.51472 12 6 12H6.5V19.5C6.5 20.0523 6.94772 20.5 7.5 20.5H11.5C12.0523 20.5 12.5 20.0523 12.5 19.5V11.5C12.5 10.3954 13.3954 9.5 14.5 9.5C15.6046 9.5 16.5 10.3954 16.5 11.5V19.5C16.5 20.0523 16.9477 20.5 17.5 20.5H21.5C22.0523 20.5 22.5 20.0523 22.5 19.5V11.5C22.5 7.08172 18.9183 3.5 14.5 3.5C11.7541 3.5 9.33238 4.88389 7.89271 6.98846C7.66813 6.93935 7.5 6.73931 7.5 6.5V4.5C7.5 3.94772 7.05228 3.5 6.5 3.5H2.5Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </>
        )
      default:
        return null
    }
  }

  const getLocations = (location: Location | undefined) => {
    switch (location) {
      case Location.MYRTLE_BEACH:
        return (
          <div className='hidden lg:inline'>
            <h4 className='mb-6 text-sm uppercase text-gray-900 dark:text-white'>
              Locations
            </h4>
            <ul className='text-gray-500 dark:text-gray-400'>
              {MYRTLE_BEACH_LOCATIONS.map((location) => (
                <li key={location.name} className='mb-4'>
                  <FooterLink href={location.href}>{location.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <footer className='bg-gray-100 dark:bg-gray-800'>
      <div className='mx-auto max-w-screen-xl p-4 md:p-10'>
        <div className='flex flex-col justify-center gap-8 py-10 md:flex-row md:gap-20 md:py-0'>
          <div>
            {getContacts(location)}
            {getSocials(location)}
          </div>
          <div className=''>
            <h4 className='mb-6 text-sm uppercase text-gray-900 dark:text-white'>
              Company
            </h4>
            <ul className='text-gray-500 dark:text-gray-400'>
              {COMPANY_PAGES.map((link) => (
                <li key={link.name} className='mb-4'>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          <div className=''>
            <h4 className='mb-6 text-sm uppercase text-gray-900 dark:text-white'>
              Services
            </h4>
            <ul className='text-gray-500 dark:text-gray-400'>
              {SERVICE_PAGES.map((link) => (
                <li key={link.name} className='mb-4'>
                  <FooterLink href={link.href}>{link.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
          {getLocations(location)}
          <div className=''>
            <h4 className='mb-6 text-sm uppercase text-gray-900 dark:text-white'>
              Legal
            </h4>
            <ul className='text-gray-500 dark:text-gray-400'>
              {LEGAL_PAGES.map((page) => (
                <li key={page.name} className='mb-4'>
                  <FooterLink href={page.href}>{page.name}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className='my-6 border-gray-200 dark:border-gray-700 sm:mx-auto md:my-8' />
        <div className='pb-10 pt-6 text-center md:p-0'>
          <Brand />
          <span className='mt-5 block text-center text-sm text-gray-500 dark:text-gray-400'>
            Copyright © {new Date().getFullYear()} by {NAME}.{' '}
            <br className='inline md:hidden' /> All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
