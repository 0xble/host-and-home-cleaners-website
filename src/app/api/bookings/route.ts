import { RecordBookingPayloadSchema } from '@/lib/types/bookings'
import axios from 'axios'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    if (!process.env.TRIGGER_DEV_API_KEY) {
      throw new Error('Missing TRIGGER_DEV_API_KEY environment variable')
    }

    const body = await request.json()
    const payload = RecordBookingPayloadSchema.parse(body)

    const { data } = await axios.post(
      'https://api.trigger.dev/api/v1/tasks/record-booking-notion/trigger',
      { payload },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.TRIGGER_DEV_API_KEY}`,
        },
      },
    )

    if (data.id) {
      return NextResponse.json({
        status: 'success',
        run_url: `https://cloud.trigger.dev/orgs/great-expectations-llc-95e5/projects/v3/pristine-maid-cleaning-_LKM/runs/${data.id}`,
      })
    }

    return NextResponse.json({
      status: 'error',
      message: data.error,
    }, { status: 400 })
  }
  catch (error) {
    console.error('Error creating booking:', error)

    // Handle axios errors specifically
    if (axios.isAxiosError(error)) {
      return NextResponse.json({
        status: 'error',
        message: error.response?.data?.message || error.message,
      }, { status: error.response?.status || 500 })
    }

    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    }, { status: 500 })
  }
}
