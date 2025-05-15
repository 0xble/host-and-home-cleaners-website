import type { NextRequest } from 'next/server'
import type { z } from 'zod'
import type { UserData } from '@/app/api/conversions-api/types'
import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { CapiBatchRequestSchema, ClientRequestBodySchema, ServerEventSchema } from '@/app/api/conversions-api/types'

// Meta Conversions API endpoint for server-side event tracking
// This API route receives event data, hashes user data as required by Meta, and sends it to the Meta Conversions API (CAPI).

// Latest as of 2025-05-14
// https://developers.facebook.com/docs/marketing-apis
const CAPI_VERSION = 'v22.0'
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN

// Hash a string using SHA256 (required for PII fields by Meta)
function hashData(data: string): string {
  return crypto.createHash('sha256').update(data).digest('hex')
}

// Normalize and hash user data fields as required by Meta
function normalizeAndHashUserData(userData: UserData): UserData {
  const hashedUserData: Record<string, unknown> = {}
  for (const key in userData) {
    const typedKey = key as keyof UserData
    if (Object.prototype.hasOwnProperty.call(userData, typedKey)) {
      const value = userData[typedKey]
      if (typeof value !== 'undefined' && value !== null && value !== '') {
        // Fields that should be hashed: em, ph, fn, ln, zp, ct, st, country, external_id
        if (
          [
            'em',
            'ph',
            'fn',
            'ln',
            'zp',
            'ct',
            'st',
            'country',
            'external_id',
          ].includes(key)
        ) {
          if (Array.isArray(value) && value.every(item => typeof item === 'string')) {
            hashedUserData[typedKey] = value.map(item => hashData(item.toLowerCase()))
          }
          // else: do not assign if not an array of strings
        }
        else {
          // For non-hashed fields (e.g., client_ip_address, client_user_agent), assign as is
          if (typeof value !== 'undefined' && value !== null) {
            hashedUserData[typedKey] = value
          }
        }
      }
    }
  }
  return hashedUserData as UserData
}

// Main API handler for POST requests
export async function POST(req: NextRequest) {
  // Check for required environment variables
  if (typeof PIXEL_ID !== 'string' || PIXEL_ID === '' || typeof ACCESS_TOKEN !== 'string' || ACCESS_TOKEN === '') {
    console.error('Meta CAPI environment variables (Pixel ID or Access Token) are not set.')
    return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 })
  }

  try {
    // Parse and validate the incoming JSON body using ClientRequestBodySchema
    const clientParseResult = ClientRequestBodySchema.safeParse(await req.json())
    if (!clientParseResult.success) {
      console.error('Invalid request body from client:', clientParseResult.error)
      return NextResponse.json({ error: 'Invalid request body', details: clientParseResult.error.errors }, { status: 400 })
    }
    const { event_name, user_data, custom_data, event_source_url, event_id, test_event_code: client_test_event_code } = clientParseResult.data

    // Get current time as Unix timestamp (seconds)
    const eventTime = Math.floor(Date.now() / 1000)
    // Get client IP address from x-forwarded-for header (if available)
    const xForwardedFor = req.headers.get('x-forwarded-for')
    const clientIpAddress = xForwardedFor?.split(',')[0]?.trim() ?? null
    // Get client user agent from headers
    const clientUserAgent = req.headers.get('user-agent') ?? null

    // Hash and normalize user data as required by Meta
    const processedUserData: UserData = normalizeAndHashUserData({
      ...user_data,
      client_ip_address: clientIpAddress ?? undefined,
      client_user_agent: clientUserAgent ?? undefined,
    })

    // Build the server event object for Meta CAPI
    let resolvedEventSourceUrl = ''
    if (typeof event_source_url === 'string' && event_source_url !== '') {
      resolvedEventSourceUrl = event_source_url
    }
    else if (typeof req.url === 'string' && req.url) {
      resolvedEventSourceUrl = req.url
    } // else remains ''

    const serverEventData = {
      event_name,
      event_time: eventTime,
      action_source: 'website' as const,
      user_data: processedUserData,
      custom_data: custom_data ?? undefined,
      event_source_url: resolvedEventSourceUrl,
      event_id: typeof event_id === 'string' ? event_id : undefined,
    }

    // Validate serverEventData before sending
    const { data: serverEventParseResult, success: serverEventParseSuccess, error: serverEventParseError } = ServerEventSchema.safeParse(serverEventData)
    if (!serverEventParseSuccess) {
      console.error('Invalid server event object created:', serverEventParseError)
      return NextResponse.json({ error: 'Invalid server event object', details: serverEventParseError.errors }, { status: 400 })
    }

    // Build the full CAPI batch payload
    const capiPayload: z.infer<typeof CapiBatchRequestSchema> = {
      data: [serverEventParseResult],
    }

    // If a test_event_code is provided from the client, include it at the top level of the CAPI payload
    if (typeof client_test_event_code === 'string' && client_test_event_code.length > 0) {
      capiPayload.test_event_code = client_test_event_code
    }

    // Validate the final CAPI batch payload
    const capiBatchParseResult = CapiBatchRequestSchema.safeParse(capiPayload)
    if (!capiBatchParseResult.success) {
      console.error('Invalid CAPI batch payload:', capiBatchParseResult.error)
      return NextResponse.json({ error: 'Invalid CAPI batch payload', details: capiBatchParseResult.error.errors }, { status: 400 })
    }

    // Send the event to Meta's Conversions API endpoint
    const response = await fetch(
      `https://graph.facebook.com/${CAPI_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(capiBatchParseResult.data), // Send the validated batch data
      },
    )

    // Parse the response from Meta
    const responseDataRaw: unknown = await response.json()
    // Optionally, you could validate responseDataRaw with zod if you have a schema
    // For now, just check it's an object
    const responseData = typeof responseDataRaw === 'object' && responseDataRaw !== null ? responseDataRaw : { error: 'Invalid response from Meta' }

    // If Meta returns an error, log and return it
    if (!response.ok) {
      console.error('Meta CAPI request failed:', responseData)
      return NextResponse.json({ error: 'Failed to send event to Meta.', details: responseData }, { status: response.status })
    }

    // Log and return success
    console.info('Meta CAPI event sent successfully:', responseData)
    return NextResponse.json({ success: true, data: responseData })
  }
  catch (error) {
    // Handle errors (e.g., invalid JSON, network issues)
    console.error('Error processing Meta CAPI request:', error)
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
