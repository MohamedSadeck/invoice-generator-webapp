# Logger Quick Reference

## 🚀 Quick Start

### 1. Import the Logger
```typescript
import { createLogger } from '~/utils/logger';
```

### 2. Create Instance
```typescript
const logger = createLogger('YourModuleName');
```

### 3. Use It!
```typescript
logger.info('Something happened', { context: 'data' });
```

## 📝 Common Patterns

### API Service
```typescript
const logger = createLogger('APIService');

export const fetchData = async () => {
  try {
    logger.info('Fetching data');
    const response = await api.get('/data');
    logger.info('Data fetched successfully', { count: response.data.length });
    return response.data;
  } catch (error) {
    logger.error('Failed to fetch data', { error });
    throw error;
  }
};
```

### React Component
```typescript
import { createLogger } from '~/utils/logger';

const logger = createLogger('MyComponent');

const MyComponent = () => {
  useEffect(() => {
    logger.debug('Component mounted');
    return () => logger.debug('Component unmounted');
  }, []);

  const handleClick = () => {
    logger.info('Button clicked', { userId: user.id });
  };
};
```

### Authentication Flow
```typescript
const logger = createLogger('Auth');

const login = async (credentials) => {
  try {
    logger.info('Login attempt', { email: credentials.email });
    const response = await authAPI.login(credentials);
    logger.info('Login successful', { userId: response.user.id });
    return response;
  } catch (error) {
    logger.error('Login failed', { email: credentials.email, error });
    throw error;
  }
};
```

### Error Handling
```typescript
try {
  await riskyOperation();
} catch (error) {
  if (error instanceof Error) {
    logger.exception(error, { operation: 'riskyOperation' });
  }
  // Handle error...
}
```

## 🎯 Log Levels

| Level | When to Use | Example |
|-------|-------------|---------|
| `debug()` | Development details | `logger.debug('Cache hit', { key })` |
| `info()` | General events | `logger.info('User logged in', { userId })` |
| `warn()` | Potential issues | `logger.warn('Rate limit approaching', { remaining })` |
| `error()` | Errors | `logger.error('API failed', { error })` |
| `exception()` | Caught exceptions | `logger.exception(error, { context })` |

## 💡 Best Practices

### ✅ DO
```typescript
// Include context
logger.info('Invoice created', { invoiceId, userId });

// Use scoped loggers
const logger = createLogger('InvoiceService');

// Log important business events
logger.info('Payment processed', { amount, currency });

// Log exceptions properly
logger.exception(error, { context: 'PaymentFlow' });
```

### ❌ DON'T
```typescript
// No context
logger.info('Invoice created');

// Sensitive data
logger.info('User login', { password: user.password }); // NEVER!

// Too verbose in loops
for (let i = 0; i < 1000000; i++) {
  logger.debug('Processing item', { i }); // Will flood logs
}

// Generic error handling
logger.error('Error'); // Not helpful
```

## 🔍 Debugging Tips

### Temporarily Increase Log Level
```typescript
import { logger, LogLevel } from '~/utils/logger';

// Show all logs (including debug)
logger.setLevel(LogLevel.DEBUG);

// Back to default
logger.setLevel(LogLevel.WARN);
```

### Check Specific Module
```typescript
// In browser console:
// 1. Find logs with [ModuleName] prefix
// 2. Filter using browser dev tools
// 3. Copy logs as JSON if needed
```

## 📦 Available Utilities

### Custom Hooks with Logging
```typescript
import { useApiCall, useLocalStorage, useForm } from '~/utils/hooks';

// API calls with automatic logging
const { data, loading, error } = useApiCall(fetchInvoices);

// LocalStorage with logging
const [value, setValue] = useLocalStorage('key', defaultValue);

// Form handling with logging
const form = useForm(initialValues, onSubmit);
```

### Service Layers
```typescript
import invoiceService from '~/utils/invoiceService';
import authService from '~/utils/authService';

// All service methods include logging
await invoiceService.createInvoice(data);
await authService.login(credentials);
```

## 🎨 Console Output (Development)

```
[2025-10-24T10:30:45.123Z] [DEBUG] [API] Outgoing request {"method":"GET","url":"/invoices"}
[2025-10-24T10:30:45.456Z] [INFO] [API] Incoming response {"status":200}
[2025-10-24T10:30:45.789Z] [INFO] [InvoiceService] Invoices fetched {"count":15}
[2025-10-24T10:31:00.123Z] [WARN] [Auth] Session expiring soon {"remainingMinutes":5}
[2025-10-24T10:31:15.456Z] [ERROR] [PaymentService] Payment failed {"error":"Insufficient funds"}
```

## 🔗 Related Files

- `app/utils/logger.ts` - Core logger implementation
- `app/utils/LOGGER_README.md` - Full documentation
- `app/utils/invoiceService.ts` - Example service with logging
- `app/utils/authService.ts` - Auth service with logging
- `app/utils/hooks.ts` - React hooks with logging
- `LOGGER_IMPLEMENTATION.md` - Implementation summary

## 🆘 Troubleshooting

### No logs appearing?
- Check log level: `logger.setLevel(LogLevel.DEBUG)`
- Check browser console filters
- Verify import: `import { createLogger } from '~/utils/logger'`

### Too many logs?
- Reduce to WARN: `logger.setLevel(LogLevel.WARN)`
- Filter by scope in browser console

### Need production logs?
- Only WARN and ERROR appear in production
- Integrate with Sentry/LogRocket for remote logging

## 📞 Need More Help?

See `app/utils/LOGGER_README.md` for complete documentation with examples, integration guides, and advanced usage patterns.
