type ContentParams = {
  content_type: string
  content_name: string
  content_id: string
}

declare global {
  // Use interface instead of type to extend the Window interface
  // eslint-disable-next-line ts/consistent-type-definitions
  interface Window {
    // @ts-expect-error - Ignoring type mismatch with CookieConsent.tsx declaration
    gtag: (
      _command: 'consent' | 'js' | 'config' | 'event',
      _action: string,
      _params?: Record<string, any>
    ) => void
  }
}

export function trackPageView(params: ContentParams) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: params.content_name,
      page_location: window.location.href,
      content_type: params.content_type,
      content_name: params.content_name,
      content_id: params.content_id,
    })
  }
}

export function trackContentInteraction(
  action: string,
  params: ContentParams & Record<string, any>,
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      ...params,
    })
  }
}
