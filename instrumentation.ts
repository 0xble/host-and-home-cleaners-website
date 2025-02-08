import * as Sentry from '@sentry/nextjs'

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}

export const onRequestError = (error: Error, request?: Request) => {
  Sentry.captureException(error, {
    extra: {
      url: request?.url,
      method: request?.method,
      headers: Object.fromEntries(request?.headers || []),
    },
  })
}
