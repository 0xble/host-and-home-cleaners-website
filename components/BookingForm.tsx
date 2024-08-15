import { useSearchParams } from 'next/navigation'

export default function BookingForm() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const name = searchParams.get('name')

  return (
    <>
      <iframe
        className='h-full w-full border-none'
        src={
          id && name
            ? `https://pristinemaidcleaning.bookingkoala.com/booking-quote/${id}/${name}?embed=true`
            : 'https://pristinemaidcleaning.bookingkoala.com/booknow?embed=true'
        }
        loading='eager'
        scrolling='no'
        title='Booking'
      />
      <script
        src='https://pristinemaidcleaning.bookingkoala.com/resources/embed.js'
        async
        defer
      />
    </>
  )
}
