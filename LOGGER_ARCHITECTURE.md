# Logger Architecture

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Invoice Generator App                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ imports
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Logger Utility                              │
│                   (app/utils/logger.ts)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────┐        ┌─────────────────┐                 │
│  │  Logger Class  │───────▶│ ScopedLogger    │                 │
│  │                │        │  Class          │                 │
│  │ - setLevel()   │        │                 │                 │
│  │ - debug()      │        │ - debug()       │                 │
│  │ - info()       │        │ - info()        │                 │
│  │ - warn()       │        │ - warn()        │                 │
│  │ - error()      │        │ - error()       │                 │
│  │ - exception()  │        │ - exception()   │                 │
│  │ - createScope()│        │                 │                 │
│  └────────────────┘        └─────────────────┘                 │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┼─────────────────┐
            │                 │                 │
            ▼                 ▼                 ▼
    ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
    │ Development  │  │  Production  │  │  Monitoring  │
    │   Console    │  │   Console    │  │   Service    │
    │              │  │              │  │  (Future)    │
    │ • All Levels │  │ • WARN+ERROR │  │              │
    │ • Colored    │  │ • Plain Text │  │ • Sentry     │
    │ • Detailed   │  │ • Minimal    │  │ • LogRocket  │
    └──────────────┘  └──────────────┘  └──────────────┘
```

## 🎯 Component Integration Flow

```
┌──────────────────────────────────────────────────────────────────┐
│                        Application Layer                          │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  React Components          Service Layer         Utils            │
│  ┌────────────┐           ┌──────────────┐     ┌──────────┐     │
│  │ Login.tsx  │──────────▶│ authService  │────▶│ axios    │     │
│  │            │           │              │     │ Instance │     │
│  │ logger ────┼──┐        │ logger ──────┼──┐  │          │     │
│  └────────────┘  │        └──────────────┘  │  │ logger ──┼──┐  │
│                  │                           │  └──────────┘  │  │
│  ┌────────────┐  │        ┌──────────────┐  │                │  │
│  │ Signup.tsx │  │        │ invoiceServ  │  │                │  │
│  │            │  │        │              │  │                │  │
│  │ logger ────┼──┤        │ logger ──────┼──┤                │  │
│  └────────────┘  │        └──────────────┘  │                │  │
│                  │                           │                │  │
│  ┌────────────┐  │        Context Layer      │                │  │
│  │ Dashboard  │  │        ┌──────────────┐  │                │  │
│  │            │  │        │ AuthContext  │  │                │  │
│  │ logger ────┼──┤        │              │  │                │  │
│  └────────────┘  │        │ logger ──────┼──┤                │  │
│                  │        └──────────────┘  │                │  │
│                  │                           │                │  │
└──────────────────┼───────────────────────────┼────────────────┼──┘
                   │                           │                │
                   └───────────┬───────────────┴────────────────┘
                               │
                               ▼
                    ┌────────────────────┐
                    │   Central Logger   │
                    │                    │
                    │  • Formats logs    │
                    │  • Adds timestamps │
                    │  • Filters by level│
                    │  • Routes output   │
                    └────────────────────┘
```

## 📊 Data Flow

```
User Action
    │
    ▼
Component/Service
    │
    │ logger.info('Action', { context })
    │
    ▼
Scoped Logger
    │
    │ Adds [Scope] prefix
    │
    ▼
Core Logger
    │
    ├─▶ Check log level
    ├─▶ Format message
    ├─▶ Add timestamp
    └─▶ Check environment
         │
         ├─▶ Development
         │   └─▶ console.log with colors
         │
         └─▶ Production
             ├─▶ console.warn/error (minimal)
             └─▶ sendToMonitoringService()
```

## 🏗️ Module Structure

```
app/
└── utils/
    ├── logger.ts                    # Core implementation
    │   ├── Logger class
    │   ├── ScopedLogger class
    │   ├── LogLevel enum
    │   └── helper functions
    │
    ├── LOGGER_README.md             # Full documentation
    ├── hooks.ts                     # React hooks with logging
    ├── authService.ts               # Auth service example
    ├── invoiceService.ts            # Invoice service example
    └── axiosInstance.ts             # HTTP client with logging

components/
├── auth/
│   ├── login.tsx                   # Uses logger
│   └── signup.tsx                  # Uses logger
├── layout/
│   ├── ProtectedLayout.tsx         # Uses logger
│   └── DashboardLayout.tsx         # Uses logger
└── context/
    └── AuthContext.tsx              # Uses logger

root.tsx                             # Error boundary logging
```

## 🔄 Logger Lifecycle

```
Application Startup
    │
    ▼
┌─────────────────────────┐
│ Logger Initialization   │
│                         │
│ 1. Detect environment   │
│    (DEV vs PROD)        │
│                         │
│ 2. Set default level    │
│    - DEV: DEBUG         │
│    - PROD: WARN         │
│                         │
│ 3. Ready for use        │
└─────────────────────────┘
    │
    ▼
Runtime Logging
    │
    ├─▶ Component logs
    ├─▶ Service logs
    ├─▶ API logs
    └─▶ Error logs
    │
    ▼
Output Routing
    │
    ├─▶ Browser Console (always)
    └─▶ Monitoring Service (prod only)
```

## 🎨 Log Format Structure

```
[Timestamp] [Level] [Scope] Message {context}
    │         │       │       │        │
    │         │       │       │        └─▶ JSON context object
    │         │       │       └─▶ Human-readable message
    │         │       └─▶ Module/component scope
    │         └─▶ DEBUG | INFO | WARN | ERROR
    └─▶ ISO 8601 timestamp

Example:
[2025-10-24T10:30:45.123Z] [INFO] [Auth] User logged in {"userId":"123","email":"user@example.com"}
```

## 🔐 Security Considerations

```
Input Data
    │
    ▼
┌──────────────────────┐
│ Before Logging       │
│                      │
│ ✅ Include:          │
│  • User IDs         │
│  • Email addresses  │
│  • Operation names  │
│  • Timestamps       │
│  • Error messages   │
│                      │
│ ❌ Never Log:        │
│  • Passwords        │
│  • Auth tokens      │
│  • Credit cards     │
│  • API keys         │
│  • Personal data    │
└──────────────────────┘
    │
    ▼
Safe Logged Output
```

## 📈 Performance Profile

```
Operation           Time        Impact
─────────────────────────────────────────
Create Logger       ~0.1ms      Minimal
Format Message      ~0.5ms      Low
Console Output      ~1-5ms      Low (dev)
Check Level         ~0.01ms     Negligible
Production (skip)   ~0.01ms     Negligible

Development Mode:   Small overhead, worth it
Production Mode:    Near-zero overhead
```

## 🎯 Best Practice Integration Points

```
┌─────────────────────────────────────┐
│         Application Entry           │
│           (root.tsx)                │
│     • Error boundary logging        │
└─────────────────────────────────────┘
                 │
    ┌────────────┼────────────┐
    │            │            │
    ▼            ▼            ▼
┌────────┐  ┌────────┐  ┌────────┐
│  Auth  │  │  API   │  │Business│
│Context │  │ Layer  │  │ Logic  │
│        │  │        │  │        │
│ logger │  │ logger │  │ logger │
└────────┘  └────────┘  └────────┘
    │            │            │
    └────────────┼────────────┘
                 │
                 ▼
         ┌──────────────┐
         │    Logger    │
         │    Output    │
         └──────────────┘
```

## 🚀 Quick Integration

```typescript
// 1. Import
import { createLogger } from '~/utils/logger';

// 2. Create instance
const logger = createLogger('YourScope');

// 3. Use throughout module
logger.info('Event', { data });
logger.error('Error', { error });
```

---

**Note**: This architecture is designed to be:
- Lightweight and fast
- Easy to integrate
- Production-ready
- Extensible for future needs
