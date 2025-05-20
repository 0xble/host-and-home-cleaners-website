import { z } from 'zod'

// https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters
export const UserDataSchema = z.object({
  em: z.array(z.string()).optional(),
  ph: z.array(z.string()).optional(),
  fn: z.array(z.string()).optional(),
  ln: z.array(z.string()).optional(),
  zp: z.array(z.string()).optional(),
  ct: z.array(z.string()).optional(),
  st: z.array(z.string()).optional(),
  country: z.array(z.string()).optional(),
  client_ip_address: z.string().optional(),
  client_user_agent: z.string().optional(),
  fbc: z.string().optional(),
  fbp: z.string().optional(),
  external_id: z.array(z.string()).optional(),
})

export type UserData = z.infer<typeof UserDataSchema>

// https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/custom-data
export const CustomDataSchema = z.object({
  value: z.number().optional(),
  currency: z.string().optional(),
  content_name: z.string().optional(),
  content_category: z.string().optional(),
  content_ids: z.array(z.string()).optional(),
  contents: z.array(z.object({ id: z.string(), quantity: z.number() })).optional(),
  num_items: z.number().optional(),
  order_id: z.string().optional(),
  // Add other custom data fields as needed
}).passthrough()

// https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/server-event
export const ServerEventSchema = z.object({
  event_name: z.string(),
  event_time: z.number().int(), // Unix timestamp in seconds
  action_source: z.enum(['website', 'app', 'physical_store', 'other', 'chat', 'email', 'system_generated', 'business_messaging']),
  user_data: UserDataSchema,
  custom_data: CustomDataSchema.optional(),
  event_source_url: z.string().optional(),
  event_id: z.string().optional(),
  opt_out: z.boolean().optional(),
  data_processing_options: z.array(z.string()).optional(),
  data_processing_options_country: z.number().int().optional(),
  data_processing_options_state: z.number().int().optional(),
})

// This schema represents the body of the request coming from the client (e.g., booking page)
// It's for a single event that will then be wrapped into the CAPI batch format by the API route.
// It combines fields from ServerEvent, UserData, and CustomData as typically sent from a client application.
export const ClientRequestBodySchema = z.object({
  event_name: z.string(),
  user_data: UserDataSchema,
  custom_data: CustomDataSchema.optional(),
  event_source_url: z.string().optional(),
  event_id: z.string().optional(),
  test_event_code: z.string().optional(), // Test event code is passed here if needed
})
export type ClientRequestBody = z.infer<typeof ClientRequestBodySchema>

// https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/main-body
// This schema represents the actual payload sent to the Meta Conversions API
// It includes the 'data' array and the top-level 'test_event_code'
export const CapiBatchRequestSchema = z.object({
  data: z.array(ServerEventSchema),
  test_event_code: z.string().optional(),
})
