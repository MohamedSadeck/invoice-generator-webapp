/**
 * Logger Utility
 * 
 * A comprehensive logging utility that provides different log levels
 * and can be configured for development and production environments.
 * 
 * Features:
 * - Multiple log levels (debug, info, warn, error)
 * - Environment-aware (verbose in dev, minimal in production)
 * - Structured logging with context
 * - Timestamp support
 * - Color-coded console output (in development)
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

interface LogContext {
  [key: string]: any;
}

class Logger {
  private minLevel: LogLevel;
  private isDevelopment: boolean;

  constructor() {
    // Determine environment
    this.isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
    
    // Set minimum log level based on environment
    this.minLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.WARN;
  }

  /**
   * Set the minimum log level
   */
  setLevel(level: LogLevel): void {
    this.minLevel = level;
  }

  /**
   * Get current timestamp
   */
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  /**
   * Format log message with context
   */
  private formatMessage(level: string, message: string, context?: LogContext): string {
    const timestamp = this.getTimestamp();
    const contextStr = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level}] ${message}${contextStr}`;
  }

  /**
   * Log debug messages (development only)
   */
  debug(message: string, context?: LogContext): void {
    if (this.minLevel <= LogLevel.DEBUG) {
      const formattedMessage = this.formatMessage('DEBUG', message, context);
      
      if (this.isDevelopment) {
        console.log(`%c${formattedMessage}`, 'color: #6c757d');
      }
    }
  }

  /**
   * Log informational messages
   */
  info(message: string, context?: LogContext): void {
    if (this.minLevel <= LogLevel.INFO) {
      const formattedMessage = this.formatMessage('INFO', message, context);
      
      if (this.isDevelopment) {
        console.log(`%c${formattedMessage}`, 'color: #0d6efd');
      } else {
        console.log(formattedMessage);
      }
    }
  }

  /**
   * Log warning messages
   */
  warn(message: string, context?: LogContext): void {
    if (this.minLevel <= LogLevel.WARN) {
      const formattedMessage = this.formatMessage('WARN', message, context);
      
      if (this.isDevelopment) {
        console.warn(`%c${formattedMessage}`, 'color: #ffc107');
      } else {
        console.warn(formattedMessage);
      }
    }
  }

  /**
   * Log error messages
   */
  error(message: string, context?: LogContext): void {
    if (this.minLevel <= LogLevel.ERROR) {
      const formattedMessage = this.formatMessage('ERROR', message, context);
      
      if (this.isDevelopment) {
        console.error(`%c${formattedMessage}`, 'color: #dc3545; font-weight: bold');
      } else {
        console.error(formattedMessage);
      }

      // In production, you might want to send errors to a monitoring service
      this.sendToMonitoringService(message, context);
    }
  }

  /**
   * Log errors with full stack trace
   */
  exception(error: Error, context?: LogContext): void {
    const errorContext = {
      ...context,
      name: error.name,
      message: error.message,
      stack: error.stack,
    };

    this.error('Exception caught', errorContext);
  }

  /**
   * Send critical errors to monitoring service (placeholder)
   * In production, integrate with services like Sentry, LogRocket, etc.
   */
  private sendToMonitoringService(message: string, context?: LogContext): void {
    if (!this.isDevelopment) {
      // TODO: Integrate with error monitoring service
      // Examples: Sentry.captureException(), LogRocket.captureMessage()
      // For now, this is a placeholder
    }
  }

  /**
   * Create a scoped logger with a prefix
   */
  createScope(scope: string): ScopedLogger {
    return new ScopedLogger(this, scope);
  }
}

/**
 * Scoped Logger - adds a prefix to all log messages
 */
class ScopedLogger {
  constructor(private logger: Logger, private scope: string) {}

  debug(message: string, context?: LogContext): void {
    this.logger.debug(`[${this.scope}] ${message}`, context);
  }

  info(message: string, context?: LogContext): void {
    this.logger.info(`[${this.scope}] ${message}`, context);
  }

  warn(message: string, context?: LogContext): void {
    this.logger.warn(`[${this.scope}] ${message}`, context);
  }

  error(message: string, context?: LogContext): void {
    this.logger.error(`[${this.scope}] ${message}`, context);
  }

  exception(error: Error, context?: LogContext): void {
    this.logger.exception(error, { ...context, scope: this.scope });
  }
}

// Export singleton instance
export const logger = new Logger();

// Export helper to create scoped loggers
export const createLogger = (scope: string): ScopedLogger => {
  return logger.createScope(scope);
};

export default logger;
