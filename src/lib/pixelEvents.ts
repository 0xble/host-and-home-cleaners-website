/**
 * Facebook Pixel Event Names
 *
 * This file defines standard Facebook Pixel event names that can be used
 * for tracking user interactions. It's kept separate from the client-side
 * implementation to allow it to be imported in both client and server components.
 *
 * IMPORTANT: This file must NOT have the 'use client' directive to ensure
 * it can be safely used in server components.
 *
 * @see https://developers.facebook.com/docs/facebook-pixel/reference
 */

/**
 * Standard Facebook Pixel event names
 * These are defined as string literals to ensure they can be safely used in server components
 */
export const PixelEvent = {
  ADD_PAYMENT_INFO: 'AddPaymentInfo',
  ADD_TO_CART: 'AddToCart',
  ADD_TO_WISHLIST: 'AddToWishlist',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  CONTACT: 'Contact',
  CUSTOMIZE_PRODUCT: 'CustomizeProduct',
  DONATE: 'Donate',
  FIND_LOCATION: 'FindLocation',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  LEAD: 'Lead',
  PURCHASE: 'Purchase',
  SCHEDULE: 'Schedule',
  SEARCH: 'Search',
  START_TRIAL: 'StartTrial',
  SUBMIT_APPLICATION: 'SubmitApplication',
  SUBSCRIBE: 'Subscribe',
  VIEW_CONTENT: 'ViewContent',
} as const

/**
 * Type representing valid Facebook Pixel event names
 */
export type PixelEventName = typeof PixelEvent[keyof typeof PixelEvent]
