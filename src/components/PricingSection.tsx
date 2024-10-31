import Link from 'next/link'

import { SERVICES } from '@/lib/constants'
import { ROUTES } from '@/lib/routes'
import { cn } from '@/lib/utils'

import Badge from './Badge'

type PricingCardProps = {
  name: string
  estimatedTime: string
  estimatedPrice: string
  description: string
  includes?: string
  features: React.ReactNode
  highlighted?: boolean
}

function PricingCard({
  name,
  estimatedTime,
  estimatedPrice,
  description,
  includes,
  features,
  highlighted,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-xl flex-col gap-4 rounded-lg border border-gray-200 bg-white p-6 text-center shadow xl:max-w-lg xl:p-8',
        highlighted && 'border-primary-500 ',
      )}
    >
      {highlighted && (
        <div>
          <Badge>Most popular</Badge>
        </div>
      )}
      <h3 className='text-gray-900'>{name}</h3>
      <p className='text-sm'>{estimatedTime}</p>
      <span className='text-5xl text-gray-900'>
        {estimatedPrice}
      </span>
      <p className='text-xs'>*starting at price</p>
      <Link
        href={ROUTES.BOOKING.href}
        className={cn(
          'my-4 rounded-lg bg-gray-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-200',
          highlighted
          && 'bg-primary-700 hover:bg-primary-800 focus:ring-primary-200',
        )}
      >
        Book a cleaning
      </Link>
      <p className='mb-4 text-start text-base'>{description}</p>
      <h4 className='text-lg font-medium'>
        {includes || 'Includes'}
      </h4>
      <ul className='space-y-4 text-left text-gray-900'>
        {features}
      </ul>
    </div>
  )
}

export type PricingSectionProps = {
  heading: string
  description: string | JSX.Element
  pricing: {
    standard: number
    deep: number
    moveInOut: number
    airbnb: number
  }
}

export default function PricingSection({ heading, description, pricing }: PricingSectionProps) {
  return (
    <div className='bg-white'>
      <div className='mx-auto px-4 py-8 sm:py-16 lg:max-w-screen-lg lg:px-6 xl:max-w-screen-2xl'>
        <div className='mx-auto mb-8 max-w-screen-md text-center lg:mb-12'>
          <h2 className='mb-4 tracking-tight text-gray-900'>{heading}</h2>
          {typeof description === 'string' ? <p className='text-left'>{description}</p> : description}
        </div>
        <div className='grid gap-8 sm:grid-cols-2 sm:gap-10 xl:grid-cols-4 xl:gap-4'>
          <PricingCard
            name={SERVICES.STANDARD}
            estimatedTime='2-3 hours (estimated)'
            estimatedPrice={`$${pricing.standard.toFixed(0)}`}
            description='For maintaining cleanliness in well-kept homes. Ideal for weekly, bi-weekly, or monthly bookings.'
            features={(
              <>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 32 32'
                    id='duster'
                  >
                    <path d='M17.459 20.376c-.5.212-1.007.486-1.505.758-.513.279-1.043.568-1.568.788a1.002 1.002 0 0 1-1.093-.215l-.439-.439-8.293 8.293A1.5 1.5 0 1 1 2.44 27.44l8.293-8.293-.439-.439a1.001 1.001 0 0 1-.216-1.093c.22-.525.509-1.056.789-1.568.272-.498.546-1.005.758-1.505a10.873 10.873 0 0 1 5.834 5.834zm12.523-4.732c.06 2.353-.411 4.535-1.643 6.829a.998.998 0 0 1-1.532.286c-1.989-1.708-4.516-2.643-7.328-2.74a12.677 12.677 0 0 0-7.498-7.498c-.097-2.812-1.032-5.34-2.74-7.328a1 1 0 0 1 .286-1.532c2.299-1.235 4.482-1.703 6.83-1.643.924 2.191.849 4.335-.25 6.535a1 1 0 0 0 1.789.895c1.194-2.388 1.405-4.803.666-7.202a13.945 13.945 0 0 1 6.594 3.186l-2.861 2.861a.999.999 0 1 0 1.414 1.414l2.861-2.861a13.945 13.945 0 0 1 3.186 6.594c-2.399-.739-4.813-.528-7.202.666a1 1 0 0 0 .895 1.789c2.198-1.1 4.342-1.175 6.533-.251z' />
                  </svg>
                  <span>
                    Dusting surfaces, furniture, art, and household objects
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    data-name='Layer 3'
                    viewBox='0 0 64 64'
                    id='cleaning'
                  >
                    <path d='M37 32a9.01 9.01 0 0 1 9-9 9.184 9.184 0 0 1 9 9v3h2V32A11.23 11.23 0 0 0 46 21 11.013 11.013 0 0 0 35 32v3h2zM21 36a3 3 0 0 0-3-3H12a3 3 0 0 0-3 3v3.05H21zM8.5 41.05c-4.46 5.746-5.268 15.6-3.782 18.381A21.125 21.125 0 0 0 8 60.824V56a1 1 0 0 1 2 0v5.384a22.383 22.383 0 0 0 4 .54V56a1 1 0 0 1 2 0v5.924a22.473 22.473 0 0 0 4-.539V56a1 1 0 0 1 2 0v4.824a21.184 21.184 0 0 0 3.28-1.392 9.8 9.8 0 0 0 .69-4.122c0-4.3-1.4-10.3-4.479-14.26zM17 4a2.023 2.023 0 0 0-2-2 2 2 0 0 0-2 2V31h4z' />
                    <rect width='28' height='6' x='32' y='37' rx='1' />
                    <path d='M36.614,59.315A3,3,0,0,0,39.6,62H52.4a3,3,0,0,0,2.986-2.687L56.89,45H35.11Z' />
                  </svg>
                  <span>Floor vacuuming and mopping</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    width='68'
                    height='46'
                    viewBox='0 0 68 46'
                    id='bed'
                  >
                    <path
                      fillRule='evenodd'
                      d='M57.991 18C63.52 18 68 22.474 68 28v17.007a.996.996 0 0 1-1.01.993h-1.98A1.01 1.01 0 0 1 64 44.998V34H4v10.998A1 1 0 0 1 2.99 46H1.01A1.01 1.01 0 0 1 0 44.996V1.004C0 .449.443 0 1.01 0h1.98C3.549 0 4 .445 4 1.008v8.756c.135-.023.277-.045.424-.068 3.011-.458 6.183-.518 9.207.087 1.527.305 2.956.774 4.263 1.428a20.593 20.593 0 0 1 3.357 2.084c1.658 1.275 2.881 2.665 3.728 4.076.132.22.249.43.352.629h32.66ZM4.005 13.828 4 18.002h16.486a12.4 12.4 0 0 0-1.673-1.537 16.602 16.602 0 0 0-2.707-1.676c-.973-.486-2.065-.845-3.26-1.084-2.5-.5-5.23-.448-7.82-.054-.375.057-1.021.177-1.021.177Z'
                    />
                  </svg>
                  <span>Bedrooms, living room, and common areas</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 67 67'
                    id='kitchen-sink'
                  >
                    <path d='m59.83 40.963-4.87 17.82a3.973 3.973 0 0 1-3.83 2.91H15.86c-1.79 0-3.35-1.19-3.84-2.91l-4.86-17.82h52.67zm-23.06-26.75v15.84h-5.74v-15.98c0-1.49-1.08-2.87-2.56-3.02a2.866 2.866 0 0 0-3.15 2.85v2.11c0 .42-.34.77-.76.77h-4.22c-.41 0-.76-.35-.76-.77v-2.11c0-5.12 4.5-9.21 9.74-8.52 4.33.56 7.45 4.46 7.45 8.83zM24.748 25.55c0 1.415-1.025 2.571-2.303 2.571-1.268 0-2.293-1.156-2.293-2.57 0-1.416 2.293-5.088 2.293-5.088s2.303 3.672 2.303 5.087z' />
                    <path d='M63.49 33.063a3.484 3.484 0 0 0-2.446-1.01h-8.343v-2.24c0-1.05-.85-1.91-1.9-1.91h-2.13v-2.7h4.54c.55 0 1-.45 1-1 0-.56-.45-1-1-1h-5.54c-.56 0-1 .44-1 1v3.7h-2.14c-1.04 0-1.89.86-1.89 1.91v2.24H5.956A3.46 3.46 0 0 0 2.5 35.507c0 .953.39 1.814 1.01 2.446a3.484 3.484 0 0 0 2.446 1.01h55.088a3.46 3.46 0 0 0 3.456-3.456c0-.953-.39-1.814-1.01-2.445z' />
                  </svg>
                  <span>
                    Kitchen surfaces, outside of appliances, and cabinet faces
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 64 64'
                    id='toilet'
                  >
                    <path d='M27.1 12.5 28.9 28c.2 1.9 1.8 3.3 3.7 3.3h2.2c-3-3.5-4.8-8.6-4.8-14.3 0-1.6.1-3.1.4-4.6h-3.3zM54.3 31.3c1.9 0 3.5-1.4 3.7-3.3l1.8-15.5h-3.4c.3 1.5.4 3 .4 4.6 0 5.7-1.8 10.8-4.7 14.2h2.2zM31.3 9c.4-1.1.8-2.1 1.3-3h-4.5c-1.4 0-2.5 1.1-2.5 2.5v2.4h5.1c.2-.7.4-1.3.6-1.9zM58.7 5.9h-4.5c.5.9.9 2 1.3 3 .2.6.4 1.2.5 1.8h5.2V8.4c0-1.4-1.2-2.5-2.5-2.5z' />
                    <path d='M37 31.3h12.8c3.2-3 5.3-8.3 5.3-14.2 0-9.4-5.2-17-11.7-17-6.5 0-11.7 7.6-11.7 17 0 5.9 2.1 11.1 5.3 14.2zM57.7 33.3H29.1c-.7 0-1.3.3-1.7.7-.4.4-.7 1-.7 1.7 0 1.3 1.1 2.4 2.4 2.4h28.6c.7 0 1.3-.3 1.7-.7.4-.4.7-1 .7-1.7 0-1.3-1.1-2.4-2.4-2.4zM29.1 40h-.5c.7 1.7 1.7 3.3 2.9 4.7 1.8 2 2.8 4.6 3.1 7.2.4 4 .3 8.4-.4 12.2h18.6c-.6-3.7-.8-8.2-.4-12.2.3-2.6 1.3-5.2 3-7.2 1.2-1.4 2.2-2.9 2.8-4.6H29.1zM2.8 15.3h2.3v1.8H2.8zM19.1 15.3h2.2v1.8h-2.2zM15.7 11.5H8.5c-1.3 0-2.4 1.1-2.4 2.4v12.5c0 .7.3 1.4.8 1.9l.7.7c.3.3.7.3 1 0l1-1c.3-.3.7-.3 1 0l1 1c.3.3.7.3 1 0l1-1c.3-.3.7-.3 1 0l1 1c.3.3.7.3 1 0l.7-.7c.5-.5.8-1.2.8-1.9V13.9c0-1.4-1.1-2.4-2.4-2.4z' />
                  </svg>
                  <span>
                    Bathrooms including sink, mirror, bath, and toilet
                  </span>
                </li>
              </>
            )}
          />
          <PricingCard
            highlighted
            name='Deep Cleaning'
            estimatedTime='3-4 hours (estimated)'
            estimatedPrice={`$${pricing.deep.toFixed(0)}`}
            includes='Includes Standard PLUS:'
            description='Recommended for the first visit or once every quarter. Detailed cleaning for often unattended areas.'
            features={(
              <>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    enableBackground='new 0 0 67 67'
                    viewBox='0 0 67 67'
                    id='cleaning-liquid'
                  >
                    <path d='M6.0049744 3.9099731v5.5800171l-3.539978-.3800049C2.0849915 9.0700073 1.7950134 8.75 1.7950134 8.3699951V5.0300293c0-.3800049.289978-.710022.6699829-.75L6.0049744 3.9099731zM28.355011 10.2299805c0 .4100342-.3400269.75-.75.75-.0100098 0-.0100098 0-.0200195 0h-.4500122c-1.5100098 0-2.789978.9500122-3.25 2.3200073h-6.3499756c-.1799927-.5499878-.4899902-1.039978-.9199829-1.4199829-.5599976-.5100098-1.2600098-.8200073-2.0200195-.8900146-.3699951 3.9000244-3.4700317 7.8699951-6.3099976 7.8699951-.4400024 0-.8900146-.0899658-1.3499756-.25C6.644989 18.5 6.4449768 18.2199707 6.4449768 17.9000244c0-.3099976.1900024-.5900269.4900513-.7000122 1.4199829-.5300293 2.7099609-3.3800049 2.8999634-6.2200317H8.2549744c-.4199829 0-.75-.3399658-.75-.75V2.9699707c0-.4099731.3300171-.75.75-.75h12.0800171c4.3500366 0 7.9000244 3.5 8 7.8200073C28.3450012 10.0999756 28.355011 10.1599731 28.355011 10.2299805z' />
                    <path
                      d='M35.4250183,50.960022c0,6.3999634-2.3099976,12.3999634-6.1799927,16.0599976 c-0.1400146,0.1300049-0.3200073,0.1999512-0.5100098,0.1999512H12.394989c-0.1900024,0-0.3800049-0.0699463-0.5200195-0.1999512 c-3.6199951-3.4299927-4.3699951-8.9000244-4.3699951-16.0599976c0-4.9853172,1.2673426-11.7673416,4.3500366-14.8500366 c3-3.8599854,4.6300049-8.6199951,4.6300049-13.4400024v-7.1199951c0-0.4199829,0.3299561-0.75,0.75-0.75h7.5599976 c0.4199829,0,0.75,0.3300171,0.75,0.75v3.3599854c0,3.0100098,0.9699707,5.9900513,2.7199707,8.3900146 C32.7450256,33.4299927,35.4250183,44.1400146,35.4250183,50.960022z'
                    />
                    <rect
                      width='26.55'
                      height='7.048'
                      x='38.655'
                      y='41.285'
                    />
                    <rect
                      width='26.55'
                      height='7.048'
                      x='38.655'
                      y='49.833'
                    />
                    <path
                      d='M51.9303894,18.7156982c-2.5136719,0-4.5585938,2.0444336-4.5585938,4.5576172s2.0449219,4.5581055,4.5585938,4.5581055 c2.5126953,0,4.5576172-2.0449219,4.5576172-4.5581055S54.4430847,18.7156982,51.9303894,18.7156982z'
                    />
                    <path d='M65.2049866 26.5599976V21.789978c0-4.7699585-3.8800049-8.6499634-8.6499634-8.6499634h-9.25c-4.7700195 0-8.6500244 3.8800049-8.6500244 8.6499634v4.7700195c0 1.539978.8099976 2.9000244 2.039978 3.6599731-1.2599487 1.0200195-2.039978 2.5700073-2.039978 4.25v5.3145752h26.5499878v-5.3145752c0-1.6799927-.7799683-3.2399902-2.039978-4.25C64.394989 29.460022 65.2049866 28.0900269 65.2049866 26.5599976zM51.9303894 29.3314209c-3.3408203 0-6.0585938-2.7177734-6.0585938-6.0581055s2.7177734-6.0576172 6.0585938-6.0576172c3.3398438 0 6.0576172 2.7172852 6.0576172 6.0576172S55.2702332 29.3314209 51.9303894 29.3314209zM38.6549988 58.3812256v6.9187622c0 1.0599976.8599854 1.9199829 1.9299927 1.9199829h22.6900024c1.0700073 0 1.9299927-.8599854 1.9299927-1.9199829v-6.9187622H38.6549988z' />
                    <g>
                      <path
                        d='M60.4049988,3.4099731v5.7700195c0,0.4100342-0.3300171,0.75-0.75,0.75H55.644989v1.710022h-7.4299927v-1.710022 h-4.0100098c-0.4199829,0-0.75-0.3399658-0.75-0.75V3.4099731c0-2,1.6199951-3.6299438,3.6199951-3.6299438h9.710022 C58.7850037-0.2199707,60.4049988,1.4099731,60.4049988,3.4099731z'
                      />
                    </g>
                  </svg>
                  <span>
                    Deep cleaning, sanitization, and disinfection rooms and
                    surfaces
                  </span>
                </li>

                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    enableBackground='new 0 0 50 50'
                    viewBox='0 0 50 50'
                    id='cleaning'
                  >
                    <rect
                      width='2.036'
                      height='1.232'
                      x='27.096'
                      y='23.119'
                    />
                    <path
                      d='M46.0013,43.4921V2.5097H24.0107v14.1839c1.2395-0.4798,2.2091-1.2994,2.8888-2.459 c0.689-1.19,2.254-1.5844,3.4185-0.8796c1.1843,0.6943,1.5834,2.1993,0.8896,3.4185c-1.3894,2.359-3.5085,3.9983-6.1474,4.8279 c0.05-0.02,0.1099-0.03,0.1699-0.03h1.5294c0.1199-0.6397,0.6697-1.1195,1.3494-1.1195c0.7697,0,1.3994,0.5897,1.3994,1.3294 v2.6888c0,0.7297-0.6297,1.3194-1.3994,1.3194c-0.7596,0-1.3894-0.5897-1.3894-1.3194v-2.0391h-1.4894 c-0.2499,0-0.4598-0.1899-0.4598-0.4398c0-0.1699,0.1199-0.3199,0.2798-0.3898c-0.3398,0.1099-0.6797,0.1999-1.0395,0.2799v21.6107 H21.012v1.9991H49v-1.9991H46.0013z'
                    />
                    <polygon points='2.386 44.492 1 47.49 11.016 47.49 9.63 44.492' />
                    <path
                      d='M23.0108,36.4951l-2.697-15.2687c-0.0024-0.0138-0.0081-0.0261-0.0106-0.0398 c0.1772,0.0062,0.3482,0.0212,0.5293,0.0212c3.3355,0,7.244-1.0982,9.5096-4.9422c0.4207-0.7131,0.1835-1.6326-0.53-2.0528 c-0.7106-0.4193-1.6321-0.1845-2.0528,0.53c-3.0789,5.2207-9.6819,2.9989-10.6822,2.9134 c-0.6777-0.1773-1.2149-0.2056-1.9275-0.0561c-0.0509,0.0048-0.1013,0.0044-0.1525,0.0146 c-3.8588,0.7541-6.3818,2.6674-7.9811,4.4799v-8.5894H5v11.5794c-0.4629,0.9489-0.8033,1.7637,0,2.5113v13.8972H1.9761v1.9991 h8.0637v-1.9991H7.016V27.596c0.1834-0.1663,0.3392-0.3672,0.4238-0.6183c0.0131-0.0384,1.0127-2.88,4.1142-4.8456l-2.5371,14.363 h2.9987v8.4968c0,0.828,0.6713,1.4994,1.4994,1.4994s1.4994-0.6713,1.4994-1.4994v-8.4968h1.9991v8.4968 c0,0.828,0.6713,1.4994,1.4994,1.4994c0.8281,0,1.4994-0.6713,1.4994-1.4994v-8.4968H23.0108z'
                    />
                    <circle cx='16.014' cy='12.006' r='3.498' />
                  </svg>
                  <span>
                    Baseboards and door frames hand wiped and cleaned
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 48 48'
                    id='window-cleaning'
                  >
                    <path
                      fill='#010101'
                      d='M27.1.5h9v11.2h-9zM38.5.5h9v11.2h-9zM27.1 14.2h9v11.2h-9zM38.5 14.2h9v11.2h-9zM10.7 33.7H3.9c-.8 0-1.5-.7-1.5-1.5v-7.9c0-2.3 1.9-4.2 4.2-4.2 2.3 0 4.2 1.9 4.2 4.2v9.4z'
                    />
                    <path
                      fill='#010101'
                      d='M2.5 47.5c-.2 0-.5 0-.7-.1C.7 47 .2 45.8.6 44.8l2.2-6.1-.5-6.1c-.1-1.1.7-2.1 1.9-2.2 1.1-.1 2.1.7 2.2 1.9l.5 6.5c0 .3 0 .6-.1.9l-2.4 6.5c-.3.8-1 1.3-1.9 1.3z'
                    />
                    <path
                      fill='#010101'
                      d='M10.6 46.8c-.1 0-.1 0 0 0-1.2 0-2.1-1-2-2.1l.1-6.5-2.4-5.6c-.4-1 0-2.2 1.1-2.7s2.2 0 2.7 1.1l2.6 6c.1.3.2.6.2.9l-.1 7c-.2 1-1.1 1.9-2.2 1.9z'
                    />
                    <circle cx='6.6' cy='15.2' r='3.7' fill='#010101' />
                    <path
                      fill='#010101'
                      d='M14.6 30.3c-4.4 0-6.7-3.2-7.7-4.9-.5-.8-.2-1.9.7-2.3.8-.5 1.8-.2 2.3.7 2 3.6 5.1 4.2 9.6 1.7.8-.5 1.8-.2 2.3.7.5.8.2 1.9-.7 2.3-2.6 1.2-4.7 1.8-6.5 1.8z'
                    />
                    <path
                      fill='#010101'
                      d='M9.3 24.5c-2 0-3.4-.6-3.4-.6-.9-.4-1.2-1.4-.8-2.3.4-.8 1.4-1.2 2.2-.8.5.2 5.2 2 8.9-4.8.4-.8 1.5-1.1 2.3-.7.8.5 1.1 1.5.7 2.3-3.2 5.7-7.2 6.9-9.9 6.9z'
                    />
                    <path
                      fill='#010101'
                      d='m21.4 19.7-3.1.9c-.7.2-1.5-.4-1.6-1.3l-.5-3.1c-.3-1.6.5-3 1.7-3.4 1.3-.3 2.6.5 3.2 2l1.1 2.9c.3.9-.1 1.8-.8 2z'
                    />
                    <path fill='#010101' d='m19.2 14.2-1.8.5-.8-3 1.8-.3z' />
                    <path
                      fill='#010101'
                      d='m16.5 11.2-1.1-.7-.2-.7L20 8.5l.2.6-1.6.9s.5 1.4 1.4 1.3c0 0-.7.6-1.6-.4l-1.9.3zM20.784 8.277l.986-.166.05.296-.986.166zM23.782 8.114l-.986.166-.05-.296.987-.166zM24.883 7.93l-.05-.297.987-.165.05.296zM20.776 7.942l-.124-.274.912-.41.124.273zM23.375 6.341l.123.274-.912.41-.123-.273zM25.212 5.543l.123.273-.912.41-.123-.273zM21.83 9.285l-.996-.092.027-.298.996.091zM23.904 9.564l-.996-.092.028-.298.995.091zM25.887 9.734l-.996-.091.028-.3.996.093z'
                    />
                  </svg>
                  <span>Window, blinds, and ledges</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-6 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 128 128'
                    id='wipe'
                  >
                    <path d='M123.09 51.629c-2.757 0-5-2.243-5-5 0-.552-.447-1-1-1s-1 .448-1 1c0 2.757-2.243 5-5 5-.553 0-1 .448-1 1s.447 1 1 1c2.757 0 5 2.243 5 5 0 .552.447 1 1 1s1-.448 1-1c0-2.757 2.243-5 5-5 .553 0 1-.448 1-1s-.447-1-1-1zM16.91 62.669c-2.757 0-5-2.243-5-5 0-.552-.447-1-1-1s-1 .448-1 1c0 2.757-2.243 5-5 5-.553 0-1 .448-1 1s.447 1 1 1c2.757 0 5 2.243 5 5 0 .552.447 1 1 1s1-.448 1-1c0-2.757 2.243-5 5-5 .553 0 1-.448 1-1s-.447-1-1-1zM95.685 42.476c-10.583-6.47-22.906-3.644-25.323-2.995l-7.332-3.999c-.102-.056-.212-.093-.327-.11l-21.345-3.276-7.39-4.937c-.384-.256-.895-.217-1.234.097l-16.503 15.245c-.261.24-.374.601-.299.947.076.347.329.627.666.737l9.962 3.265 3.525 8.333c-3.195.478-5.693 1.958-7.439 4.412-5.614 7.893-1.372 23.122-1.192 23.752 2.79 10.365 11.841 8.486 11.845 8.482 10.821-1.411 16.829 4.875 16.888 4.938.049.053.104.101.163.143 3.699 2.566 7.28 3.48 10.505 3.48 7.917 0 13.684-5.508 13.765-5.587.029-.029.058-.061.084-.093 7.295-9.176 18.729-7.894 18.844-7.879.052.006.106.009.156.007 6.558-.215 11.294-2.269 14.076-6.104 4.436-6.115 2.252-14.489 2.024-15.306-2.031-11.142-6.781-19.065-14.119-23.552zm-24.548 48.4c-.553 0-1-.448-1-1 0-2.757-2.243-5-5-5-.553 0-1-.448-1-1s.447-1 1-1c2.757 0 5-2.243 5-5 0-.552.447-1 1-1s1 .448 1 1c0 2.757 2.243 5 5 5 .553 0 1 .448 1 1s-.447 1-1 1c-2.757 0-5 2.243-5 5 0 .553-.448 1-1 1zm-42.911-44.624c-.112-.266-.335-.471-.609-.561l-8.777-2.876 14.672-13.555 6.919 4.622c.122.081.26.135.404.157l21.391 3.283 10.048 5.479.107 1.758-6.704-3.27c-.498-.242-1.096-.034-1.337.46-.242.497-.036 1.095.46 1.337l9.895 4.827.727 1.904-9.961-2.438c-.528-.131-1.077.196-1.209.733-.131.537.197 1.078.734 1.209l12.585 3.081 11.078 20.248c-5.747 2.263-9.385-2.254-9.824-2.837l-4.438-8.773c-.144-.284-.414-.482-.728-.535l-13.619-2.274c-.038-.006-.076-.01-.114-.012-6.724-.343-8.253 2.713-8.374 2.998l-2.449 4.671c-.241.459-.09 1.027.348 1.307 10.131 6.475 11.538 10.591 11.585 12.296l-23.524-11.291z' />
                  </svg>
                  <span>Clean / spot check walls</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    enableBackground='new 0 0 24 24'
                    viewBox='0 0 24 24'
                    id='trash'
                  >
                    <path
                      d='M20,6h-4V5c0-1.7-1.3-3-3-3h-2C9.3,2,8,3.3,8,5v1H4C3.4,6,3,6.4,3,7s0.4,1,1,1h1v11c0,1.7,1.3,3,3,3h8c1.7,0,3-1.3,3-3V8h1 c0.6,0,1-0.4,1-1S20.6,6,20,6z M10,5c0-0.6,0.4-1,1-1h2c0.6,0,1,0.4,1,1v1h-4V5z M11,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-6 c0-0.6,0.4-1,1-1s1,0.4,1,1V17z M15,17c0,0.6-0.4,1-1,1s-1-0.4-1-1v-6c0-0.6,0.4-1,1-1s1,0.4,1,1V17z'
                    />
                  </svg>
                  <span>Empty trash cans and bins</span>
                </li>
              </>
            )}
          />
          <PricingCard
            name='Move In/Out Cleaning'
            estimatedTime='4-5 hours (estimated)'
            estimatedPrice={`$${pricing.moveInOut.toFixed(0)}`}
            description='A complete one-time, one-stop service to prepare a space before moving.'
            includes='Includes Deep PLUS:'
            features={(
              <>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 32 32'
                    id='oven'
                  >
                    <g data-name='Layer 5'>
                      <path d='M4 12V27a3 3 0 0 0 3 3H25a3 3 0 0 0 3-3V12zM24 24a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2H22a2 2 0 0 1 2 2zM25 2H7A3 3 0 0 0 4 5v5H28V5A3 3 0 0 0 25 2zM13 8H9A1 1 0 0 1 9 6h4a1 1 0 0 1 0 2zm6 0H17a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm4 0a1 1 0 0 1 0-2h0a1 1 0 0 1 0 2z' />
                      <rect width='12' height='8' x='10' y='16' />
                    </g>
                  </svg>
                  <span>Inside oven cleaning</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 48 48'
                    id='fridge'
                  >
                    <path d='M9.8 1.7V16h28.5V1.7c0-.7-.5-1.2-1.2-1.2H11c-.7 0-1.2.5-1.2 1.2zm6.7 11.8h-2V5.8h2v7.7zM11 45.8h3.2v1.8h2v-1.8h15.7v1.8h2v-1.8H37c.7 0 1.2-.5 1.2-1.2V18H9.8v26.6c0 .6.5 1.2 1.2 1.2zm3.5-25.4h2v7.7h-2v-7.7z' />
                  </svg>
                  <span>Inside fridge cleaning</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    viewBox='0 0 30 30'
                    id='closet'
                  >
                    <g>
                      <g fill='none' fillRule='evenodd'>
                        <path
                          fill='#000'
                          d='M203 117h-7v-4h10v2.993a.998.998 0 0 1-.999 1.007H204v1.505a.503.503 0 0 1-.5.495.494.494 0 0 1-.5-.495V117zm-15 0h7v-4h-10v2.993c0 .558.447 1.007.999 1.007H187v1.505c0 .28.224.495.5.495.268 0 .5-.222.5-.495V117zm7-25h-9.001a.998.998 0 0 0-.999 1.007V112h10V92zm1 0h9.001c.552 0 .999.449.999 1.007V112h-10V92zm-2 10.495v2.01a.503.503 0 0 1-.5.495.494.494 0 0 1-.5-.495v-2.01c0-.273.232-.495.5-.495.276 0 .5.216.5.495zm4 0v2.01a.503.503 0 0 1-.5.495.494.494 0 0 1-.5-.495v-2.01c0-.273.232-.495.5-.495.276 0 .5.216.5.495zM199.995 114h2.01c.273 0 .495.232.495.5 0 .276-.216.5-.495.5h-2.01a.503.503 0 0 1-.495-.5c0-.276.216-.5.495-.5zm-11 0h2.01c.273 0 .495.232.495.5 0 .276-.216.5-.495.5h-2.01a.503.503 0 0 1-.495-.5c0-.276.216-.5.495-.5z'
                          transform='translate(-180 -90)'
                        />
                      </g>
                    </g>
                  </svg>
                  <span>Inside cabinets and closets</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    width='128'
                    height='112'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    imageRendering='optimizeQuality'
                    shapeRendering='geometricPrecision'
                    textRendering='geometricPrecision'
                    version='1.0'
                    viewBox='0 0 215.852 189.342'
                    id='clean'
                  >
                    <g>
                      <path d='M71.166 44.127l91.323 -42.584c8.251,-3.848 18.15,-0.245 21.998,8.006l28.621 61.378c3.848,8.252 0.245,18.151 -8.007,21.999l-8.813 4.109 -18.024 -37.007c-3.098,-6.362 -10.32,-8.854 -16.651,-5.903 -0.796,0.371 -1.535,0.807 -2.212,1.301l-2.44 -4.993c-3.092,-6.325 -10.3,-8.852 -16.65,-5.892 -0.802,0.374 -1.545,0.814 -2.226,1.312 -3.749,-4.582 -9.966,-6.095 -15.55,-3.244 -3.525,1.8 -5.915,4.925 -6.769,8.47 -1.722,0.04 -3.49,0.457 -5.234,1.312 -6.749,3.308 -8.815,11.168 -5.731,17.782l14.298 30.662c-5.567,-1.773 -11.735,-0.712 -16.064,4.053 -6.418,7.067 -4.021,16.662 2.411,22.73l7.861 8.113 -6.41 2.989c-8.251,3.847 -18.15,0.244 -21.998,-8.008l-21.847 -46.85c5.15,-9.516 13.977,-16.915 24.873,-20.025 4.274,-1.221 6.986,-5.419 6.339,-9.818 -0.647,-4.401 -4.458,-7.64 -8.906,-7.574 -4.93,0.074 -9.721,-0.744 -14.192,-2.318zm-70.723 24.17c22.336,-0.332 42.245,14.458 48.377,35.936 0.06,0.212 0.265,0.345 0.484,0.313 0.217,-0.032 0.374,-0.218 0.37,-0.438 -0.333,-22.335 14.457,-42.246 35.936,-48.379 0.212,-0.059 0.344,-0.265 0.312,-0.483 -0.032,-0.217 -0.218,-0.374 -0.438,-0.37 -22.335,0.333 -42.247,-14.457 -48.378,-35.937 -0.061,-0.212 -0.266,-0.345 -0.483,-0.313 -0.218,0.033 -0.375,0.218 -0.371,0.439 0.334,22.336 -14.455,42.246 -35.935,48.379 -0.211,0.06 -0.344,0.265 -0.312,0.482 0.032,0.218 0.218,0.375 0.438,0.371zm140.051 24.824l-17.144 -36.765c-2.884,-6.184 6.402,-11.392 9.827,-4.551l18.88 37.72c0.587,1.172 1.33,2.691 2.768,2.021 0.897,-0.418 1.109,-1.402 0.69,-2.299l-14.551 -31.205c-2.884,-6.184 6.356,-10.489 9.352,-4.361l16.127 32.996c0.434,0.889 1.708,1.751 2.603,1.334l0.609 -0.285c0.896,-0.417 1.286,-1.489 0.869,-2.383l-8.261 -17.716c-2.884,-6.184 6.364,-10.492 9.352,-4.361l27.744 56.963c1.147,2.356 1.776,4.542 2.054,7.15l1.05 9.844c0.078,0.737 0.05,1.457 -0.076,2.148 -0.324,1.781 -0.07,3.409 0.782,5.006l11.437 21.443c1.09,2.043 1.604,4.106 0.97,6.335 -0.633,2.229 -2.058,3.899 -4.156,4.877l-24.823 11.576c-3.749,1.748 -8.347,0.286 -10.108,-3.46l-8.791 -18.69c-1.232,-2.619 -3.621,-4.239 -6.511,-4.412 -2.274,-0.136 -4.692,-0.607 -5.79,-1.353l-18.778 -12.74c-2.39,-1.62 -4.284,-3.212 -6.294,-5.286l-19.695 -20.327c-9.956,-9.203 0.949,-19.969 10.062,-12.315l17.587 14.442 -6.723 -14.419 -1.745 -3.741 -17.063 -36.592 -1.244 -2.668c-3.44,-7.377 6.202,-12.498 9.983,-4.5 1.154,2.443 11.95,24.628 15.737,31.646 0.521,0.97 1.247,2.285 2.699,1.73 1.097,-0.419 1.081,-1.707 0.571,-2.802z' />
                    </g>
                  </svg>
                  <span>Wall wiped and cleaned</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                    enableBackground='new 0 0 32 32'
                    viewBox='0 0 32 32'
                    id='keys'
                  >
                    <path
                      d='M23,1c-4.411,0-8,3.589-8,8c0,2.906,1.517,5.505,4,6.926V17c0,0.265,0.105,0.52,0.293,0.707l2.49,2.49l-0.678,1.355 c-0.141,0.282-0.141,0.613,0,0.895L21.882,24l-0.776,1.553C21.036,25.691,21,25.845,21,26v2c0,0.265,0.105,0.52,0.293,0.707l2,2 C23.488,30.902,23.744,31,24,31s0.512-0.098,0.707-0.293l2-2C26.895,28.52,27,28.265,27,28V15.926c2.483-1.421,4-4.02,4-6.926 C31,4.589,27.411,1,23,1z M23.035,9.5C21.933,9.52,21.02,8.638,21,7.535C20.981,6.433,21.863,5.52,22.965,5.5 C24.067,5.48,24.98,6.362,25,7.465C25.019,8.567,24.137,9.48,23.035,9.5z'
                    />
                    <path
                      d='M18,17c0,0.24,0.04,0.49,0.13,0.71c-0.26,0.07-0.53,0.13-0.8,0.18c-0.1,0.04-0.22,0.06-0.33,0.06 c-0.67,0.08-1.62,0.06-2.43-0.11l-8.86,8.87C5.52,26.89,5.27,27,5,27H2c-0.55,0-1-0.45-1-1v-3c0-0.27,0.11-0.52,0.29-0.71l1-1 C2.48,21.11,2.73,21,3,21h1.28l0.77-2.32c0.1-0.29,0.34-0.53,0.63-0.63l2.13-0.71l-0.78-3.1c-0.09-0.34,0.01-0.7,0.26-0.95 l1.15-1.14c-0.77-2.76,0-5.76,2.04-7.81c1.14-1.14,2.58-1.9,4.16-2.2c0.08-0.03,0.16-0.05,0.22-0.06 c0.79-0.12,1.59-0.11,2.37,0.02C15.26,3.75,14,6.23,14,9c0,3.07,1.48,5.82,4,7.48V17z'
                    />
                  </svg>
                  <span>
                    Extra rooms and areas cleaned (laundry, patio, garage)
                  </span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg
                    className='size-5 shrink-0'
                    xmlns='http://www.w3.org/2000/svg'
                    width='20.48'
                    height='20.48'
                    fillRule='evenodd'
                    clipRule='evenodd'
                    imageRendering='optimizeQuality'
                    shapeRendering='geometricPrecision'
                    textRendering='geometricPrecision'
                    viewBox='0 0 213.33 213.33'
                    id='sparkle'
                  >
                    <path d='M149.01 58.4c-4.72 36.83-20.34 60.09-55.8 66.22-.8.14-1.37.82-1.37 1.63 0 .81.57 1.49 1.37 1.63 35.45 6.13 51.07 29.39 55.8 66.22.11.83.8 1.44 1.64 1.44.84 0 1.53-.61 1.64-1.44 4.72-36.83 20.35-60.09 55.8-66.22.8-.14 1.37-.81 1.37-1.63 0-.81-.57-1.49-1.37-1.63-35.45-6.13-51.07-29.39-55.8-66.22-.11-.83-.8-1.44-1.64-1.44-.83 0-1.53.61-1.64 1.44zM39.23 128.6c-3.56 21.57-13.41 35.52-34.06 40.06-.77.17-1.3.83-1.3 1.61 0 .78.53 1.44 1.3 1.61 20.65 4.54 30.5 18.49 34.06 40.06.13.81.82 1.39 1.63 1.39.81 0 1.5-.58 1.63-1.39 3.56-21.57 13.41-35.52 34.06-40.06.76-.17 1.3-.83 1.3-1.61 0-.79-.53-1.44-1.3-1.61-20.65-4.54-30.5-18.48-34.06-40.06-.13-.8-.81-1.38-1.63-1.38-.82 0-1.5.58-1.63 1.38zM74.11 1.38C70.55 22.95 60.7 36.91 40.05 41.44c-.77.17-1.3.83-1.3 1.61 0 .78.53 1.44 1.3 1.61 20.65 4.53 30.5 18.48 34.06 40.06.13.8.81 1.38 1.63 1.38.81 0 1.5-.58 1.63-1.38 3.56-21.57 13.41-35.53 34.06-40.06.76-.17 1.3-.83 1.3-1.61 0-.79-.53-1.44-1.3-1.61-20.65-4.54-30.5-18.48-34.06-40.06C77.24.58 76.56 0 75.74 0c-.81 0-1.5.58-1.63 1.38z' />
                  </svg>
                  <span>
                    Ensuring all rooms and surfaces are ready for new
                    occupants
                  </span>
                </li>
              </>
            )}
          />
          <PricingCard
            name={SERVICES.AIRBNB}
            estimatedTime='2-3 hours (estimated)'
            estimatedPrice={`$${pricing.airbnb.toFixed(0)}`}
            description='Perfect for Airbnb/VRBO hosts. Ensures your property is spotless and ready for guests.'
            includes='Includes all PLUS'
            features={(
              <>
                <li className='flex items-center space-x-3'>
                  <svg className='size-5 shrink-0' xmlns='http://www.w3.org/2000/svg' enableBackground='new 0 0 24 24' viewBox='0 0 24 24' id='calendar'>
                    <path d='M19,4h-1V3c0-0.6-0.4-1-1-1s-1,0.4-1,1v1H8V3c0-0.6-0.4-1-1-1S6,2.4,6,3v1H5C3.3,4,2,5.3,2,7v1h20V7C22,5.3,20.7,4,19,4z M2,19c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3v-9H2V19z M17,12c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S16.4,12,17,12z M17,16 c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S16.4,16,17,16z M12,12c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S11.4,12,12,12z M12,16 c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S11.4,16,12,16z M7,12c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S6.4,12,7,12z M7,16 c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S6.4,16,7,16z' />
                  </svg>
                  <span>Sync with your calendar</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg className='size-5 shrink-0' xmlns='http://www.w3.org/2000/svg' id='phone' x='0' y='0' version='1.1' viewBox='0 0 29 29'>
                    <path d='m20.914 17.743-2.091 1.178a1.319 1.319 0 0 1-1.58-.217l-6.979-6.979a1.32 1.32 0 0 1-.217-1.58l1.178-2.091a1.978 1.978 0 0 0-.325-2.37L7.766 2.55a1.978 1.978 0 0 0-2.798 0L3.545 3.972a5.276 5.276 0 0 0-.793 6.446l.714 1.19a41.36 41.36 0 0 0 14.946 14.631l.141.081c2.102 1.201 4.699.851 6.382-.831l1.486-1.486a1.978 1.978 0 0 0 0-2.798l-3.136-3.136a1.978 1.978 0 0 0-2.371-.326z'></path>
                  </svg>
                  <span>Dedicated support 8AM-8PM 7 days/week</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg className='size-5 shrink-0' xmlns='http://www.w3.org/2000/svg' width='50' height='50' baseProfile='tiny' overflow='inherit' version='1.2' viewBox='0 0 50 50' id='laundry'>
                    <path d='M6 11v33.74C6 46.21 7.237 48 8.76 48h33.218C43.497 48 45 46.21 45 44.74V11H6zm19.46 26.776c-5.86 0-10.611-4.594-10.611-10.263S19.6 17.25 25.46 17.25s10.611 4.594 10.611 10.263c0 5.67-4.751 10.263-10.611 10.263zM41.978 1H8.76C7.237 1 6 2.033 6 3.505V9h39V3.505C45 2.033 43.497 1 41.978 1zM19 7H8V3h11v4zm19.146-.28c-1.249 0-2.258-.979-2.258-2.188 0-1.207 1.009-2.186 2.258-2.186s2.261.979 2.261 2.186c-.001 1.208-1.012 2.188-2.261 2.188z'></path>
                  </svg>
                  <span>Laundry service</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg className='size-5 shrink-0' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' id='blanket'>
                    <path fill='#231f20' d='M15 15h45v-1a7.008 7.008 0 0 0-7-7H13a8.994 8.994 0 0 0-4.104 17 8.984 8.984 0 0 0 0 16A8.994 8.994 0 0 0 13 57h40a7.008 7.008 0 0 0 7-7v-1H15a1 1 0 0 1 0-2h45v-1a6.996 6.996 0 0 0-3.413-6A6.996 6.996 0 0 0 60 34v-1H15a1 1 0 0 1 0-2h45v-1a6.996 6.996 0 0 0-3.413-6A6.996 6.996 0 0 0 60 18v-1H15a1 1 0 0 1 0-2Z'></path>
                  </svg>
                  <span>Optional linen services</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg className='size-5 shrink-0' xmlns='http://www.w3.org/2000/svg' enableBackground='new 0 0 512 512' viewBox='0 0 512 512' id='toilet-paper'>
                    <path d='M179.3,384.2c-8.8,11.5-17.8,20.6-31.4,28.8h56.6v-78.9C194,366.8,179.3,383.8,179.3,384.2z'></path>
                    <path d='M110.2,413c52,0,94.2-66.6,94.2-148.5s-42.2-148.4-94.2-148.4c-11.2,0-22.2,3-32.4,9v87.6c0,4.4,1.2,8.6,3.5,12.2c7.1-12.2,17.5-19.4,29-19.4c14.7,0,27.6,12.2,34.1,31c1.2,3.3,2,6.9,2.8,10.6h-45.5c-7,0-13.8-2.1-19.6-6.1c-9.3-6.4-14.9-17-14.9-28.3V97.1c0-19,15.5-34.3,34.5-34.3h118.7c-1.8-5.5-2.8-11.4-2.8-17.5s1-12,2.8-17.5H101.6c-38.2,0-69.4,31.1-69.4,69.3v115.5c0,28.1,16.9,53.2,42.9,64.1c8.4,3.5,17.3,5.3,26.5,5.3h45.5c-0.7,3.7-1.6,7.3-2.8,10.6c-6.5,18.8-19.3,31-34.1,31c-16.1,0-29.8-14.2-35.6-35.6c-1.2-0.5-2.4-1-3.6-1.4c-29.7-12.4-49-40.9-49.4-72.9C17.9,229.8,16,247,16,264.5C15.9,346.4,58.2,413,110.2,413z'></path>
                    <circle cx='273.4' cy='45.3' r='45.3'></circle>
                    <path d='M213.5,236.7c0.2,1.7,0.4,3.3,0.5,5c0.2,2,0.4,3.9,0.5,6c0,0.3,0.1,0.5,0.1,0.7c0.4,5.3,0.6,10.6,0.6,16.1v217.9c0,16.3,13.3,29.6,29.6,29.6h221.7c16.3,0,29.6-13.3,29.6-29.6V264.5c0-81.9-42.2-148.5-94.2-148.5H147.8C181.6,135.7,207.1,181.3,213.5,236.7z M481,259.2h5.3c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3H481c-2.9,0-5.3-2.4-5.3-5.3S478,259.2,481,259.2z M449,259.2h5.3c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3H449c-2.9,0-5.3-2.4-5.3-5.3S446,259.2,449,259.2z M417,259.2h5.3c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3H417c-2.9,0-5.3-2.4-5.3-5.3S414,259.2,417,259.2z M385,259.2h5.3c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3H385c-2.9,0-5.3-2.4-5.3-5.3S382,259.2,385,259.2z M353,259.2h5.3c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3H353c-2.9,0-5.3-2.4-5.3-5.3S350,259.2,353,259.2z M320.9,259.2h5.3c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3h-5.3c-2.9,0-5.3-2.4-5.3-5.3S318,259.2,320.9,259.2z M288.9,259.2h5.3c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3h-5.3c-2.9,0-5.3-2.4-5.3-5.3S286,259.2,288.9,259.2z M256.9,259.2h5.3c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3h-5.3c-2.9,0-5.3-2.4-5.3-5.3S254,259.2,256.9,259.2z M224.9,259.2h5.3c2.9,0,5.3,2.4,5.3,5.3s-2.4,5.3-5.3,5.3h-5.3c-2.9,0-5.3-2.4-5.3-5.3S222,259.2,224.9,259.2z'></path>
                  </svg>
                  <span>Restocking and inventory management</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg className='size-5 shrink-0' xmlns='http://www.w3.org/2000/svg' enableBackground='new 0 0 24 24' viewBox='0 0 24 24' id='photo'>
                    <path d='M19.5,4h-14c-1.7,0-3,1.3-3,3v10c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3V7C22.5,5.3,21.2,4,19.5,4z M20.5,13.8l-1.9-1.9
	c-1.2-1.1-3.1-1.1-4.2,0l-0.9,0.9l-2.9-2.9c-1.2-1.1-3.1-1.1-4.2,0l-1.9,1.9V7c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1V13.8z'
                    />
                  </svg>
                  <span>Photos after every cleaning</span>
                </li>
                <li className='flex items-center space-x-3'>
                  <svg className='size-5 shrink-0' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' id='checklist'>
                    <path fill='#222' d='M11.55 22A2 2 0 0 1 10 18.8l7.82-10.54A2 2 0 1 1 21 10.65L13.16 21.2a2 2 0 0 1-1.61.8Z'></path>
                    <path fill='#222' d='M11.56 22a2 2 0 0 1-1.56-.7L5.45 16a2 2 0 0 1 3-2.6l4.58 5.35A2 2 0 0 1 11.56 22zM57 18.48h-1a2 2 0 0 1 0-4h1a2 2 0 0 1 0 4zm-6.59 0h-24a2 2 0 0 1 0-4h24a2 2 0 0 1 0 4zM57 35.76h-1a2 2 0 0 1 0-4h1a2 2 0 1 1 0 4zm-6.59 0h-24a2 2 0 0 1 0-4h24a2 2 0 1 1 0 4zM57 53h-1a2 2 0 1 1 0-4h1a2 2 0 0 1 0 4zm-6.59 0h-24a2 2 0 1 1 0-4h24a2 2 0 0 1 0 4zM11.55 39.27a2 2 0 0 1-1.55-.69l-4.55-5.35a2 2 0 0 1 3-2.61l3 3.45 6.37-8.54A2 2 0 1 1 21 27.92l-7.84 10.55a2 2 0 0 1-1.54.8zm0 17.28a2 2 0 0 1-1.51-.7L5.45 50.5a2 2 0 1 1 3-2.6l3 3.45 6.37-8.55A2 2 0 0 1 21 45.2l-7.84 10.54a2 2 0 0 1-1.54.81z'></path>
                  </svg>
                  <span>Customized checklist unique to your property</span>
                </li>
              </>
            )}
          />
        </div>
      </div>
    </div>
  )
}
