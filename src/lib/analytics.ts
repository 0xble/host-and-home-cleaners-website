interface ContentParams {
  content_type: string
  content_name: string
  content_id: string
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
