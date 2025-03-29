/**
 * Facebook Pixel Integration
 *
 * This file re-exports the PixelEvent enum from pixelEvents.ts and the client-side
 * implementation from pixelClient.tsx. This allows server components to safely
 * import and use the PixelEvent enum without triggering React Client Manifest errors.
 */

// Export the PixelEvent enum and PixelEventName type from the separate file
export { PixelEvent, type PixelEventName } from './pixelEvents'

// Export all client-side implementation from the client file
export * from './pixelClient'
