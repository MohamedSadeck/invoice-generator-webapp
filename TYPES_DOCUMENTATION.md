# Type Definitions Documentation

## Overview

All TypeScript interfaces and types for the Invoice Generator application are centralized in `app/types/index.ts`. This ensures consistency, reduces duplication, and makes types easily accessible throughout the application.

## Table of Contents

1. [User & Authentication Types](#user--authentication-types)
2. [Invoice Types](#invoice-types)
3. [API Response Types](#api-response-types)
4. [Form Types](#form-types)
5. [Dashboard & Statistics Types](#dashboard--statistics-types)
6. [AI & Parsing Types](#ai--parsing-types)
7. [Logger Types](#logger-types)
8. [Landing Page Types](#landing-page-types)
9. [Utility Types](#utility-types)
10. [Hook Return Types](#hook-return-types)
11. [Usage Examples](#usage-examples)

---

## User & Authentication Types

### `User`
Represents a user in the system.

```typescript
interface User {
  _id: string;        // MongoDB ID
  id?: string;        // Backward compatibility
  name: string;
  email: string;
}
```

### `AuthContextType`
Type definition for the authentication context.

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (data: { user: User; token: string }) => void;
  login: (data: { user: User; token: string }) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}
```

### `LoginRequest` / `RegisterRequest`
Request payloads for authentication.

```typescript
interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}
```

---

## Invoice Types

### `Invoice`
Complete invoice structure matching the backend response.

```typescript
interface Invoice {
  _id: string;
  user: User;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  billFrom: BillFrom;
  billTo: BillTo;
  items: InvoiceItem[];
  notes?: string;
  paymentTerms: string;
  status: InvoiceStatus;
  subTotal: number;
  taxTotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}
```

### `InvoiceStatus`
Union type for invoice statuses.

```typescript
type InvoiceStatus = 'Paid' | 'Unpaid' | 'Overdue' | 'Draft';
```

### `InvoiceItem`
Individual line item in an invoice.

```typescript
interface InvoiceItem {
  _id: string;
  name: string;
  description?: string;
  quantity: number;
  unitPrice: number;
  taxPercent: number;
  total: number;
}
```

### `BillFrom` / `BillTo`
Billing information structures.

```typescript
interface BillFrom {
  businessName: string;
  email: string;
  address: string;
  phoneNumber: string;
}

interface BillTo {
  clientName: string;
  email: string;
  address: string;
  phoneNumber: string;
}
```

### `CreateInvoiceRequest`
Payload for creating a new invoice.

```typescript
interface CreateInvoiceRequest {
  invoiceDate: string;
  dueDate: string;
  billFrom: BillFrom;
  billTo: BillTo;
  items: Omit<InvoiceItem, '_id'>[];
  notes?: string;
  paymentTerms: string;
}
```

---

## API Response Types

### `ApiResponse<T>`
Generic API response wrapper.

```typescript
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: PaginationInfo;
}
```

### `PaginationInfo`
Pagination metadata.

```typescript
interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
```

### Specific Response Types

```typescript
interface InvoicesResponse extends ApiResponse<Invoice[]> {
  pagination: PaginationInfo;
}

interface InvoiceResponse extends ApiResponse<Invoice> {}
interface UserResponse extends ApiResponse<User> {}
interface AuthApiResponse extends ApiResponse<AuthResponse> {}
```

---

## Form Types

### Form Data Types

```typescript
interface LoginFormData {
  email: string;
  password: string;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface InvoiceFormData {
  invoiceNumber?: string;
  invoiceDate: string;
  dueDate: string;
  billFrom: BillFrom;
  billTo: BillTo;
  items: InvoiceItem[];
  notes?: string;
  paymentTerms: string;
  status?: InvoiceStatus;
}
```

### Form Helper Types

```typescript
type FormErrors<T> = {
  [K in keyof T]?: string;
}

type TouchedFields<T> = {
  [K in keyof T]?: boolean;
}
```

---

## Dashboard & Statistics Types

### `DashboardStats`
Statistics shown on the dashboard.

```typescript
interface DashboardStats {
  totalInvoices: number;
  totalPaid: number;
  totalUnpaid: number;
  totalOverdue?: number;
  totalDraft?: number;
}
```

### `RecentInvoice`
Simplified invoice data for lists.

```typescript
interface RecentInvoice {
  _id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  createdAt: string;
}
```

---

## AI & Parsing Types

### `ParseInvoiceTextRequest` / `Response`

```typescript
interface ParseInvoiceTextRequest {
  text: string;
}

interface ParseInvoiceTextResponse {
  invoiceData: Partial<CreateInvoiceRequest>;
  confidence: number;
}
```

### `GenerateReminderRequest` / `Response`

```typescript
interface GenerateReminderRequest {
  invoiceId: string;
  reminderType: 'gentle' | 'firm' | 'final';
}

interface GenerateReminderResponse {
  reminderText: string;
  subject: string;
}
```

---

## Logger Types

```typescript
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

interface LogContext {
  [key: string]: any;
}
```

---

## Landing Page Types

```typescript
interface Feature {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  icon?: string;
}

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatarUrl?: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
}
```

---

## Utility Types

### Generic Utility Types

```typescript
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

### UI Helper Types

```typescript
interface SelectOption {
  label: string;
  value: string | number;
}

interface DateRange {
  startDate: string;
  endDate: string;
}
```

### Table & List Types

```typescript
type SortOrder = 'asc' | 'desc';

interface SortConfig<T> {
  key: keyof T;
  direction: SortOrder;
}

interface FilterConfig {
  status?: InvoiceStatus[];
  dateRange?: DateRange;
  searchQuery?: string;
}
```

---

## Hook Return Types

```typescript
interface UseApiCallReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseFormReturn<T> {
  values: T;
  errors: FormErrors<T>;
  isSubmitting: boolean;
  handleChange: (name: keyof T, value: any) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  setErrors: (errors: FormErrors<T>) => void;
}
```

---

## Usage Examples

### 1. Import Types in Components

```typescript
import { 
  Invoice, 
  InvoiceStatus, 
  DashboardStats,
  type LoginFormData 
} from '~/types';
```

### 2. Use in Services

```typescript
import { Invoice, CreateInvoiceRequest, ApiResponse } from '~/types';

export const createInvoice = async (
  data: CreateInvoiceRequest
): Promise<Invoice> => {
  const response = await axiosInstance.post<ApiResponse<Invoice>>(
    '/invoices',
    data
  );
  return response.data.data;
};
```

### 3. Use in State Management

```typescript
import { Invoice, DashboardStats } from '~/types';

const [invoices, setInvoices] = useState<Invoice[]>([]);
const [stats, setStats] = useState<DashboardStats>({
  totalInvoices: 0,
  totalPaid: 0,
  totalUnpaid: 0,
});
```

### 4. Use in Form Handling

```typescript
import { LoginFormData, FormErrors, TouchedFields } from '~/types';

const [formData, setFormData] = useState<LoginFormData>({
  email: '',
  password: '',
});

const [errors, setErrors] = useState<FormErrors<LoginFormData>>({});
const [touched, setTouched] = useState<TouchedFields<LoginFormData>>({});
```

### 5. Use with API Responses

```typescript
import { InvoicesResponse, InvoiceResponse } from '~/types';

const response = await axiosInstance.get<InvoicesResponse>('/invoices');
const invoices = response.data.data;
const pagination = response.data.pagination;
```

### 6. Type Guards

```typescript
import { Invoice, InvoiceStatus } from '~/types';

function isInvoicePaid(invoice: Invoice): boolean {
  return invoice.status === 'Paid';
}

function filterByStatus(
  invoices: Invoice[], 
  status: InvoiceStatus
): Invoice[] {
  return invoices.filter(inv => inv.status === status);
}
```

---

## Best Practices

### 1. Always Import from Central Location
```typescript
// ✅ Good
import { Invoice, User } from '~/types';

// ❌ Bad - Don't redefine types
interface User {
  name: string;
  email: string;
}
```

### 2. Use Type Aliases for Unions
```typescript
// ✅ Good
type InvoiceStatus = 'Paid' | 'Unpaid' | 'Overdue' | 'Draft';

// ❌ Bad - Inline union types
const status: 'Paid' | 'Unpaid' | 'Overdue' | 'Draft' = 'Paid';
```

### 3. Use Generics for Reusable Types
```typescript
// ✅ Good
interface ApiResponse<T> {
  success: boolean;
  data: T;
}

// ✅ Usage
type InvoiceResponse = ApiResponse<Invoice>;
type UserResponse = ApiResponse<User>;
```

### 4. Extend Existing Types
```typescript
// ✅ Good
interface CreateInvoiceRequest extends Omit<Invoice, '_id' | 'user' | 'createdAt'> {}

// ❌ Bad - Duplicating properties
interface CreateInvoiceRequest {
  invoiceNumber: string;
  // ... repeating all Invoice fields
}
```

---

## Migration Guide

If you have existing local type definitions, migrate them as follows:

### Before:
```typescript
// app/components/MyComponent.tsx
interface User {
  id: string;
  name: string;
}

const MyComponent = () => {
  const [user, setUser] = useState<User | null>(null);
  // ...
};
```

### After:
```typescript
// app/components/MyComponent.tsx
import { User } from '~/types';

const MyComponent = () => {
  const [user, setUser] = useState<User | null>(null);
  // ...
};
```

---

## Type Safety Tips

1. **Use strict mode** - Already enabled in `tsconfig.json`
2. **Avoid `any`** - Use `unknown` or specific types
3. **Use type guards** - Check types at runtime when needed
4. **Leverage utility types** - Use built-in TypeScript utilities like `Partial<T>`, `Pick<T>`, `Omit<T>`

---

## Maintenance

When adding new features:

1. Add new types to `app/types/index.ts`
2. Export them properly
3. Update this documentation
4. Use them consistently across the app

---

## Summary

✅ **All types centralized** in `app/types/index.ts`  
✅ **Matches backend API** responses exactly  
✅ **Type-safe** throughout the application  
✅ **Easy to maintain** and extend  
✅ **Reusable** generic types for common patterns
