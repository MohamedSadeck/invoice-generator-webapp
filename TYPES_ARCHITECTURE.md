# Type System Architecture

## 📐 Type Hierarchy Overview

```
app/types/index.ts (Central Type Hub)
│
├── User & Authentication
│   ├── User
│   ├── AuthContextType
│   ├── LoginRequest
│   ├── RegisterRequest
│   └── AuthResponse
│
├── Invoice Domain
│   ├── Invoice
│   ├── InvoiceStatus
│   ├── InvoiceItem
│   ├── BillFrom
│   ├── BillTo
│   ├── CreateInvoiceRequest
│   └── UpdateInvoiceRequest
│
├── API Responses
│   ├── ApiResponse<T>
│   ├── PaginationInfo
│   ├── InvoicesResponse
│   ├── InvoiceResponse
│   ├── UserResponse
│   └── AuthApiResponse
│
├── Forms
│   ├── LoginFormData
│   ├── SignupFormData
│   ├── InvoiceFormData
│   ├── FormErrors<T>
│   └── TouchedFields<T>
│
├── Dashboard
│   ├── DashboardStats
│   └── RecentInvoice
│
├── AI & Parsing
│   ├── ParseInvoiceTextRequest/Response
│   ├── GenerateReminderRequest/Response
│   └── DashboardSummaryRequest/Response
│
├── Logger
│   ├── LogLevel
│   └── LogContext
│
├── Landing Page
│   ├── Feature
│   ├── Testimonial
│   └── FAQ
│
├── Utilities
│   ├── Nullable<T>
│   ├── Optional<T>
│   ├── DeepPartial<T>
│   ├── SelectOption
│   └── DateRange
│
├── Hooks
│   ├── UseApiCallReturn<T>
│   └── UseFormReturn<T>
│
└── Components
    ├── LayoutProps
    └── RouteErrorBoundaryProps
```

## 🔄 Data Flow Architecture

```
Backend API Response
        ↓
┌─────────────────────┐
│  ApiResponse<T>     │
│  {                  │
│    success: bool    │
│    message: string  │
│    data: T          │
│    pagination?: {}  │
│  }                  │
└─────────────────────┘
        ↓
┌─────────────────────┐
│ Specific Response   │
│ InvoicesResponse    │
│ InvoiceResponse     │
│ UserResponse        │
└─────────────────────┘
        ↓
┌─────────────────────┐
│  Domain Models      │
│  Invoice            │
│  User               │
│  InvoiceItem        │
└─────────────────────┘
        ↓
┌─────────────────────┐
│  Component State    │
│  useState<Invoice>  │
└─────────────────────┘
```

## 🌊 Type Import Flow

```
Component/Service File
        ↓
    import type { ... } from '~/types'
        ↓
    app/types/index.ts
        ↓
    Type-safe development
```

## 📊 Type Relationship Diagram

```
User
  ↓ used in
Invoice
  ├── contains → InvoiceItem[]
  ├── has → BillFrom
  ├── has → BillTo
  └── has → InvoiceStatus

ApiResponse<T>
  ↓ specialized as
  ├── InvoicesResponse (T = Invoice[])
  ├── InvoiceResponse (T = Invoice)
  └── UserResponse (T = User)

CreateInvoiceRequest
  ↓ creates
Invoice

UpdateInvoiceRequest
  ↓ updates
Invoice
```

## 🎯 Usage Map

```
Services Layer
├── invoiceService.ts
│   ├── uses → Invoice
│   ├── uses → CreateInvoiceRequest
│   ├── uses → UpdateInvoiceRequest
│   ├── uses → InvoicesResponse
│   └── uses → InvoiceResponse
│
└── authService.ts
    ├── uses → User
    ├── uses → LoginRequest
    ├── uses → RegisterRequest
    ├── uses → AuthResponse
    └── uses → UserResponse

Context Layer
└── AuthContext.tsx
    ├── uses → User
    └── uses → AuthContextType

Components Layer
├── Dashboard
│   ├── uses → Invoice
│   ├── uses → DashboardStats
│   └── uses → InvoicesResponse
│
├── Login/Signup
│   ├── uses → LoginFormData
│   ├── uses → SignupFormData
│   ├── uses → FormErrors<T>
│   └── uses → TouchedFields<T>
│
└── InvoiceList
    ├── uses → Invoice[]
    ├── uses → InvoiceStatus
    └── uses → FilterConfig

Utils Layer
└── data.ts
    ├── uses → Feature
    ├── uses → Testimonial
    └── uses → FAQ
```

## 🔧 Generic Type Flow

```
Generic Type Definition
        ↓
type FormErrors<T> = {
  [K in keyof T]?: string;
}
        ↓
Concrete Usage
        ↓
FormErrors<LoginFormData> = {
  email?: string;
  password?: string;
}
```

## 📦 Module Dependencies

```
app/
├── types/
│   └── index.ts ◄───────────┐
│                            │
├── utils/                   │
│   ├── invoiceService.ts ───┤
│   ├── authService.ts ──────┤
│   └── data.ts ─────────────┤
│                            │
├── context/                 │
│   └── AuthContext.tsx ─────┤
│                            │
├── routes/                  │
│   ├── dashboard/           │
│   │   └── dashboard.tsx ───┤
│   ├── auth/               │
│   │   ├── login.tsx ───────┤
│   │   └── signup.tsx ──────┤
│   └── invoices/           │
│       ├── all-invoices.tsx ┤
│       ├── create-invoice.tsx
│       └── invoice-details.tsx
│
└── components/
    └── [various components] ─┘
```

## 🎨 Type Composition Patterns

### Pattern 1: Extending Types
```typescript
interface CreateInvoiceRequest 
  extends Omit<Invoice, '_id' | 'user' | 'createdAt' | 'updatedAt'> {
  // Inherits all Invoice fields except those omitted
}
```

### Pattern 2: Generic Wrapper
```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Usage:
type InvoiceResponse = ApiResponse<Invoice>;
```

### Pattern 3: Mapped Types
```typescript
type FormErrors<T> = {
  [K in keyof T]?: string;
}

// Creates type matching T's structure with optional string values
```

### Pattern 4: Union Types
```typescript
type InvoiceStatus = 'Paid' | 'Unpaid' | 'Overdue' | 'Draft';

// Constrains values to specific strings
```

## 🔍 Type Safety Layers

```
Layer 1: Definition
  └── app/types/index.ts

Layer 2: Service Layer Type Safety
  └── invoiceService.ts, authService.ts
      ├── Request types
      ├── Response types
      └── Return types

Layer 3: State Management Type Safety
  └── Component state
      └── useState<Type>

Layer 4: Props Type Safety
  └── Component props
      └── interface Props { ... }

Layer 5: Runtime Validation
  └── Form validation
      ├── Type guards
      └── Validation functions
```

## ✅ Benefits of Centralized Types

1. **Single Source of Truth**
   - One place to define all types
   - No conflicting definitions

2. **Type Consistency**
   - Same types used everywhere
   - Guaranteed compatibility

3. **Maintainability**
   - Update types in one place
   - Changes propagate automatically

4. **Developer Experience**
   - Better IntelliSense
   - Autocomplete everywhere
   - Catch errors early

5. **Documentation**
   - Types serve as documentation
   - Clear contracts between layers

---

**All types centralized in:** `app/types/index.ts`
**For details see:** `TYPES_DOCUMENTATION.md`
