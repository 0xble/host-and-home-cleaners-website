import log from 'loglevel'

// Set default level based on environment
const defaultLevel = process.env.NODE_ENV === 'production' ? 'error' : 'debug'

// Initialize logger with default configuration
log.setLevel(defaultLevel)

// Add prefix to all log messages
const originalFactory = log.methodFactory
log.methodFactory = function (methodName, logLevel, loggerName) {
  const rawMethod = originalFactory(methodName, logLevel, loggerName)

  return function (message: unknown, ...args: unknown[]) {
    const prefix = `[${String(methodName).toUpperCase()}]${typeof loggerName === 'string' && loggerName.length > 0 ? ` [${String(loggerName)}]` : ''}`
    rawMethod(`${prefix} ${String(message)}`, ...args)
  }
}

// Create namespaced loggers for different parts of the application
export function getLogger(namespace?: string) {
  return typeof namespace === 'string' && namespace.length > 0 ? log.getLogger(namespace) : log
}

// Re-apply level after methodFactory change
log.setLevel(log.getLevel())

// Export default logger and level constants
export const logger = log
export const levels = log.levels

// Type-safe level setting
export type LogLevel = keyof typeof log.levels

export function setLogLevel(level: LogLevel): void {
  log.setLevel(level)
}

// Convenience exports with proper typing
export const trace = (msg: string, ...args: unknown[]): void => log.trace(msg, ...args)
export const debug = (msg: string, ...args: unknown[]): void => log.debug(msg, ...args)
export const info = (msg: string, ...args: unknown[]): void => log.info(msg, ...args)
export const warn = (msg: string, ...args: unknown[]): void => log.warn(msg, ...args)
export const error = (msg: string, ...args: unknown[]): void => log.error(msg, ...args)
