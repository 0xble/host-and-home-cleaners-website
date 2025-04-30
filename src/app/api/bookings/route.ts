import type { NotionTimezone } from '0xble/notion/schemas'
import type { TriggerTaskPayload } from '@/lib/types/trigger'
import type { SectionBlock } from '@slack/web-api'
import { formatAddress } from '0xble/address'
import { BookingFormSchema } from '@/app/book/types'
import { LOCATIONS } from '@/lib/constants'
import { RecordBookingPayloadSchema } from '@/lib/types/bookings'
import { formatPrice, slugify } from '@/lib/utils'
import { tz } from '@date-fns/tz'
import { WebClient } from '@slack/web-api'
import axios from 'axios'
import { differenceInHours, format } from 'date-fns'
import { NextResponse } from 'next/server'
import { z } from 'zod'

interface TriggerSuccessResponse {
  id: string
}

interface TriggerErrorResponse {
  error: string
}

interface ApiErrorResponse {
  message: string
}

type TriggerResponse = TriggerSuccessResponse | TriggerErrorResponse

export async function POST(request: Request) {
  try {
    if (process.env.TRIGGER_DEV_API_KEY == null) {
      throw new Error('Missing TRIGGER_DEV_API_KEY environment variable')
    }

    const { payload, data } = z.object({
      payload: RecordBookingPayloadSchema,
      data: BookingFormSchema.shape.payment,
    }).parse(await request.json())

    // Structure the payload according to trigger.dev API requirements
    const triggerResponse = await axios.post<TriggerResponse>(
      'https://api.trigger.dev/api/v1/tasks/record-booking-notion/trigger',
      {
        payload,
      } satisfies TriggerTaskPayload<z.infer<typeof RecordBookingPayloadSchema>>,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.TRIGGER_DEV_API_KEY}`,
        },
      },
    )

    if ('id' in triggerResponse.data) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Booking created successfully in Notion:', triggerResponse.data)
      }

      let text = `➕🗓️ Add new booking`
      const fields: SectionBlock['fields'] = []

      const timezone = Object.values(LOCATIONS).find(location => location.name === payload.values.location)?.timezone as NotionTimezone

      if (payload.values.client?.name != null) {
        text += ` from ${payload.values.client.name}`
      }
      text += ` through website to BookingKoala!`

      if (payload.values.location != null) {
        fields.push({
          type: 'mrkdwn',
          text: `*Address*\n${formatAddress({
            street: payload.values.address?.street,
            city: payload.values.address?.city,
            state: payload.values.address?.state,
            zip: payload.values.address?.zip,
          })}`,
        })
      }
      if (payload.values.client?.name != null) {
        fields.push({
          type: 'mrkdwn',
          text: `*Customer*\n${payload.values.client.name}`,
        })
      }
      if (payload.values.client?.email != null) {
        fields.push({
          type: 'mrkdwn',
          text: `*Email*\n${payload.values.client.email}`,
        })
      }
      if (payload.values.client?.phone != null) {
        fields.push({
          type: 'mrkdwn',
          text: `*Phone*\n${payload.values.client.phone}`,
        })
      }
      if (payload.values.service != null) {
        fields.push({
          type: 'mrkdwn',
          text: `*Service*\n${payload.values.service}`,
        })
      }
      if (payload.values.frequency != null) {
        fields.push({
          type: 'mrkdwn',
          text: `*Frequency*\n${payload.values.frequency}`,
        })
      }
      if (payload.values.bedrooms != null) {
        fields.push({
          type: 'mrkdwn',
          text: `*Bedrooms*\n${payload.values.bedrooms} ${payload.values.bedrooms === 1 ? 'bedroom' : 'bedrooms'}`,
        })
      }
      if (typeof payload.values.scheduled !== 'string' && payload.values.scheduled?.end != null) {
        const hours = differenceInHours(payload.values.scheduled.end, payload.values.scheduled.start)
        fields.push({
          type: 'mrkdwn',
          text: `*Hours*\n${hours} ${hours === 1 ? 'hour' : 'hours'}`,
        })
      }
      if (payload.values.scheduled != null) {
        const formatDate = (date: Date | string) => format(date, 'MM/dd/yyyy h:mma', { in: tz(timezone) })
        const scheduled = typeof payload.values.scheduled === 'string'
          ? formatDate(payload.values.scheduled)
          : `${formatDate(payload.values.scheduled.start)}${payload.values.scheduled.end != null ? ` - ${formatDate(payload.values.scheduled.end)}` : ''}`

        fields.push({
          type: 'mrkdwn',
          text: `*Scheduled*\n${scheduled}`,
        })
      }
      if (payload.values.totalPrice != null) {
        fields.push({
          type: 'mrkdwn',
          text: `*Service Total*\n${formatPrice(payload.values.totalPrice)}`,
        })
      }
      if (payload.values.finalPrice != null) {
        fields.push({
          type: 'mrkdwn',
          text: `*Price*\n${formatPrice(payload.values.finalPrice)}`,
        })
      }

      // Notify to add the booking manually to BookingKoala
      const slackResponse = await new WebClient(process.env.SLACK_BOT_TOKEN).chat.postMessage({
        channel: process.env.NODE_ENV !== 'production' ? `#test` : `#${slugify(payload.values.location)}-important`,
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text,
            },
            fields: fields.length > 0 ? fields : undefined,
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '\n',
            },
            fields: [
              {
                type: 'mrkdwn',
                text: `*Card Number*\n${data.cardNumber}`,
              },
              {
                type: 'mrkdwn',
                text: `*Expiration*\n${data.expiration}`,
              },
              {
                type: 'mrkdwn',
                text: `*CVV*\n${data.cvv}`,
              },
            ],
          },
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: 'Instructions',
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'This booking was created on our website but not added to BookingKoala yet.\iPlease add it with the details above in BookingKoala.',
            },
          },
        ],
      })

      if (slackResponse.ok) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('Notified to add the booking in Slack', slackResponse)
        }

        return NextResponse.json({
          status: 'success',
          data: {
            triggerResponse: triggerResponse.data,
            slackResponse,
          },
        }, { status: 200 })
      }
      else {
        return NextResponse.json({
          status: 'error',
          message: slackResponse.error,
        }, { status: 400 })
      }
    }
    return NextResponse.json({
      status: 'error',
      message: triggerResponse.data.error,
    }, { status: 400 })
  }
  catch (error) {
    console.error('Error creating booking:', error)

    // Handle axios errors specifically
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      return NextResponse.json({
        status: 'error',
        message: error.response?.data?.message ?? error.message,
      }, { status: error.response?.status ?? 500 })
    }

    return NextResponse.json({
      status: 'error',
      message: error instanceof Error ? error.message : 'An unknown error occurred',
    }, { status: 500 })
  }
}
