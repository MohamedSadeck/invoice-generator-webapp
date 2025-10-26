# Type System Quick Reference

## 🚀 Quick Import Guide

```typescript
// Most common imports
import type { 
  Invoice, 
  User, 
  InvoiceStatus,
  DashboardStats,
  InvoicesResponse,
  InvoiceResponse 
} from '~/types';
```

## 📋 Most Used Types

### Invoice
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

### User
```typescript
interface User {
  _id: string;
  name: string;
  email: string;
}
```

### InvoiceStatus
```typescript
type InvoiceStatus = 'Paid' | 'Unpaid' | 'Overdue' | 'Draft';
```

### API Responses
```typescript
// Generic wrapper
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: PaginationInfo;
}

// Specific responses
type InvoicesResponse = ApiResponse<Invoice[]> & { pagination: PaginationInfo };
type InvoiceResponse = ApiResponse<Invoice>;
type UserResponse = ApiResponse<User>;
```

### Form Types
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

type FormErrors<T> = {
  [K in keyof T]?: string;
}

type TouchedFields<T> = {
  [K in keyof T]?: boolean;
}
```

### Dashboard
```typescript
interface DashboardStats {
  totalInvoices: number;
  totalPaid: number;
  totalUnpaid: number;
  totalOverdue?: number;
  totalDraft?: number;
}
```

## 💡 Common Usage Patterns

### 1. Service Functions
```typescript
import type { Invoice, InvoicesResponse } from '~/types';

export const getAllInvoices = async (): Promise<Invoice[]> => {
  const response = await axiosInstance.get<InvoicesResponse>('/invoices');
  return response.data.data;
};
```

### 2. Component State
```typescript
import type { Invoice, DashboardStats } from '~/types';

const [invoices, setInvoices] = useState<Invoice[]>([]);
const [stats, setStats] = useState<DashboardStats>({
  totalInvoices: 0,
  totalPaid: 0,
  totalUnpaid: 0,
});
```

### 3. Form Handling
```typescript
import type { LoginFormData, FormErrors, TouchedFields } from '~/types';

const [formData, setFormData] = useState<LoginFormData>({
  email: '',
  password: '',
});
const [errors, setErrors] = useState<FormErrors<LoginFormData>>({});
const [touched, setTouched] = useState<TouchedFields<LoginFormData>>({});
```

### 4. Props
```typescript
import type { Invoice } from '~/types';

interface InvoiceCardProps {
  invoice: Invoice;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}
```

## 🎯 Type Guards & Helpers

```typescript
import type { Invoice, InvoiceStatus } from '~/types';

// Check status
function isPaid(invoice: Invoice): boolean {
  return invoice.status === 'Paid';
}

// Filter by status
function filterByStatus(invoices: Invoice[], status: InvoiceStatus): Invoice[] {
  return invoices.filter(inv => inv.status === status);
}

// Calculate totals
function calculateTotal(invoice: Invoice): number {
  return invoice.total;
}
```

## 🔗 File Locations

- **Type Definitions**: `app/types/index.ts`
- **Full Documentation**: `TYPES_DOCUMENTATION.md`
- **Migration Guide**: `TYPES_MIGRATION_SUMMARY.md`

## ⚡ Quick Tips

1. Always import from `~/types`
2. Use `type` keyword for type-only imports
3. Leverage TypeScript's built-in utilities: `Partial<T>`, `Pick<T>`, `Omit<T>`
4. Check API responses match the types
5. Use type guards for runtime type checking

---

**Need more info?** See full documentation in `TYPES_DOCUMENTATION.md`
