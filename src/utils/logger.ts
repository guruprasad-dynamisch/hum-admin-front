import { IS_PRODUCTION } from '@config/config';

/**
 * Production-safe logger utility
 * In production, errors are logged but not exposed to console
 * In development, full error details are shown
 */

type LogLevel = 'info' | 'warn' | 'error';

class Logger {
  private log(level: LogLevel, message: string, data?: any) {
    if (IS_PRODUCTION) {
      // In production, you would send to a logging service (e.g., Sentry, LogRocket)
      // For now, we'll suppress console output to avoid exposing internals
      // TODO: Integrate with your logging service here
      if (level === 'error') {
        // Still log errors in production but without sensitive details
        console.error(`[${level.toUpperCase()}]`, message);
      }
    } else {
      // In development, show full details
      const timestamp = new Date().toISOString();
      console[level](`[${timestamp}] [${level.toUpperCase()}]`, message, data || '');
    }
  }

  info(message: string, data?: any) {
    this.log('info', message, data);
  }

  warn(message: string, data?: any) {
    this.log('warn', message, data);
  }

  error(message: string, data?: any) {
    this.log('error', message, data);
  }
}

export const logger = new Logger();
