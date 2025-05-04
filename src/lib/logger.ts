import log from 'loglevel'
import prefix from 'loglevel-plugin-prefix'
import kleur from 'kleur'

// Set default level based on environment
const defaultLevel = process.env.NODE_ENV === 'production' ? 'error' : 'debug'

// Color mapping for log levels
const isBrowser = typeof window !== 'undefined'
const levelColors: Record<string, (str: string) => string> = {
  trace: isBrowser ? (str) => `\u001b[35m${str}\u001b[0m` : kleur.magenta,
  debug: isBrowser ? (str) => `\u001b[36m${str}\u001b[0m` : kleur.cyan,
  info: isBrowser ? (str) => `\u001b[32m${str}\u001b[0m` : kleur.green,
  warn: isBrowser ? (str) => `\u001b[33m${str}\u001b[0m` : kleur.yellow,
  error: isBrowser ? (str) => `\u001b[31m${str}\u001b[0m` : kleur.red,
}

// Configure loglevel-plugin-prefix
prefix.reg(log)
prefix.apply(log, {
  format(level, name) {
    const upper = level.toUpperCase()
    const color = levelColors[level] || ((s: string) => s)
    return name ? color(`[${upper}] [${name}]`) : color(`[${upper}]`)
  },
  timestampFormatter(date) {
    return date.toISOString()
  },
})

// Initialize logger with default configuration
log.setLevel(defaultLevel)

// Create namespaced loggers for different parts of the application
export function getLogger(namespace?: string) {
  return typeof namespace === 'string' && namespace.length > 0 ? log.getLogger(namespace) : log
}

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
