# Logger Documentation

## Overview

The logger utility provides a comprehensive, environment-aware logging system for the Invoice Generator application. It follows best practices for production-ready logging with structured context and multiple log levels.

## Features

- **Multiple Log Levels**: DEBUG, INFO, WARN, ERROR
- **Environment-Aware**: Verbose logging in development, minimal in production
- **Structured Logging**: Include context objects with your log messages
- **Scoped Loggers**: Create loggers with specific prefixes for different modules
- **Color-Coded Output**: Easy-to-read console output in development
- **Error Tracking Ready**: Prepared for integration with monitoring services (Sentry, LogRocket, etc.)
- **Timestamp Support**: All logs include ISO timestamps

## Usage

### Basic Usage

```typescript
import { logger } from '~/utils/logger';

// Debug messages (development only)
logger.debug('Fetching user data', { userId: '123' });

// Informational messages
logger.info('User logged in', { userId: '123', email: 'user@example.com' });

// Warning messages
logger.warn('API rate limit approaching', { remaining: 10 });

// Error messages
logger.error('Failed to save invoice', { 
  invoiceId: '456', 
  error: 'Database connection timeout' 
});
```

### Exception Logging

```typescript
try {
  // Some operation
  throw new Error('Something went wrong');
} catch (error) {
  if (error instanceof Error) {
    logger.exception(error, { 
      context: 'InvoiceCreation',
      userId: currentUser.id 
    });
  }
}
```

### Scoped Loggers

Create module-specific loggers with automatic prefixes:

```typescript
import { createLogger } from '~/utils/logger';

// In your component or module
const logger = createLogger('InvoiceService');

// All logs will be prefixed with [InvoiceService]
logger.info('Creating new invoice', { customerId: '789' });
// Output: [2025-10-24T...] [INFO] [InvoiceService] Creating new invoice {"customerId":"789"}

logger.error('Failed to generate PDF', { invoiceId: '123' });
// Output: [2025-10-24T...] [ERROR] [InvoiceService] Failed to generate PDF {"invoiceId":"123"}
```

## Log Levels

### DEBUG (Level 0)
- Only shown in development
- Use for detailed debugging information
- Automatically stripped in production

```typescript
logger.debug('Computed values', { 
  subtotal: 100, 
  tax: 10, 
  total: 110 
});
```

### INFO (Level 1)
- General informational messages
- Important business events
- User actions

```typescript
logger.info('Invoice created successfully', { invoiceId: '123' });
```

### WARN (Level 2)
- Warning conditions
- Potential issues that don't prevent operation
- Deprecation notices

```typescript
logger.warn('Using deprecated API endpoint', { 
  endpoint: '/api/v1/old-invoices' 
});
```

### ERROR (Level 3)
- Error conditions
- Failed operations
- Critical issues

```typescript
logger.error('Payment processing failed', { 
  paymentId: '456',
  reason: 'Insufficient funds' 
});
```

## Configuration

### Change Log Level Dynamically

```typescript
import { logger, LogLevel } from '~/utils/logger';

// Set minimum log level (useful for testing)
logger.setLevel(LogLevel.WARN); // Only WARN and ERROR will be shown
logger.setLevel(LogLevel.DEBUG); // All logs will be shown
```

## Best Practices

### 1. Use Scoped Loggers for Modules

```typescript
// At the top of each file/module
import { createLogger } from '~/utils/logger';
const logger = createLogger('ModuleName');
```

### 2. Include Relevant Context

Always include context objects with identifiers:

```typescript
// Good ✅
logger.info('Invoice updated', { 
  invoiceId: invoice.id,
  userId: user.id,
  changes: ['amount', 'due_date']
});

// Bad ❌
logger.info('Invoice updated');
```

### 3. Log User Actions

```typescript
logger.info('User action', { 
  action: 'create_invoice',
  userId: user.id,
  timestamp: Date.now()
});
```

### 4. Log API Requests/Responses

```typescript
// In axios interceptor (already implemented)
logger.debug('API Request', { 
  method: config.method,
  url: config.url,
  params: config.params
});

logger.debug('API Response', { 
  status: response.status,
  data: response.data
});
```

### 5. Use Exception Logging for Errors

```typescript
// Good ✅
try {
  await riskyOperation();
} catch (error) {
  if (error instanceof Error) {
    logger.exception(error, { context: 'RiskyOperation' });
  }
  throw error; // Re-throw if needed
}

// Basic alternative
logger.error('Operation failed', { 
  error: error instanceof Error ? error.message : 'Unknown error'
});
```

### 6. Don't Log Sensitive Information

```typescript
// Bad ❌
logger.info('User login', { 
  email: user.email,
  password: user.password // NEVER log passwords!
});

// Good ✅
logger.info('User login', { 
  userId: user.id,
  email: user.email
});
```

## Integration with Monitoring Services

The logger is prepared for integration with error monitoring services. Update the `sendToMonitoringService` method in `logger.ts`:

```typescript
private sendToMonitoringService(message: string, context?: LogContext): void {
  if (!this.isDevelopment) {
    // Example: Sentry integration
    // Sentry.captureMessage(message, {
    //   level: 'error',
    //   extra: context
    // });
    
    // Example: LogRocket integration
    // LogRocket.captureMessage(message, {
    //   extra: context
    // });
  }
}
```

## Examples in the Codebase

### 1. API Requests (axiosInstance.ts)
```typescript
const logger = createLogger('API');

logger.debug('Outgoing request', {
  method: config.method,
  url: config.url,
});

logger.error('Server error - 500', { 
  url: error.config.url,
  method: error.config.method,
  data: error.response.data 
});
```

### 2. Authentication (AuthContext.tsx)
```typescript
const logger = createLogger('Auth');

logger.info('User logged in successfully', { 
  userId: user.id, 
  email: user.email 
});

logger.info('User logged out successfully', { userId });
```

### 3. Route Protection (ProtectedLayout.tsx)
```typescript
const logger = createLogger('ProtectedRoute');

logger.warn('Unauthorized access attempt, redirecting to login');
```

## Environment Configuration

- **Development** (`DEV=true`): Shows all logs (DEBUG and above) with colors
- **Production** (`DEV=false`): Shows only WARN and ERROR logs, plain format

## Future Enhancements

- [ ] Add log persistence to IndexedDB for client-side debugging
- [ ] Implement log batching for production monitoring
- [ ] Add performance timing utilities
- [ ] Create custom log exporters
- [ ] Add user session tracking
- [ ] Implement log filtering by tags

## Troubleshooting

### Logs not appearing in production
- Check that the log level is WARN or ERROR
- Verify that `import.meta.env.DEV` is correctly set

### Too many logs in development
- Use `logger.setLevel(LogLevel.WARN)` to reduce noise
- Use scoped loggers to filter by module

### Need to debug in production
- Temporarily set `logger.setLevel(LogLevel.DEBUG)` 
- Check browser console for any errors
- Enable source maps for better stack traces
