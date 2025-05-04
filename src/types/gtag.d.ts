declare global {
  // Use interface instead of type to extend the Window interface

  interface Window {
    gtag: (
      _command: 'consent' | 'js' | 'config' | 'event',
      _action: string,
      _params?: Record<string, any>
    ) => void
  }
}

export {}
