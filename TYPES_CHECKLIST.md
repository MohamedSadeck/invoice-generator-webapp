# Type System Checklist

## ✅ Daily Development Checklist

### Before Writing Code
- [ ] Check if types exist in `app/types/index.ts`
- [ ] Import types from `~/types` (not local definitions)
- [ ] Review API response structure

### When Creating New Features
- [ ] Define new types in `app/types/index.ts`
- [ ] Export new types properly
- [ ] Document complex types with comments
- [ ] Update `TYPES_DOCUMENTATION.md` if needed

### When Working with Forms
- [ ] Use `FormErrors<T>` for error states
- [ ] Use `TouchedFields<T>` for touched states
- [ ] Define form data interface if not exists
- [ ] Validate types match backend requirements

### When Making API Calls
- [ ] Use correct response type (`InvoicesResponse`, `InvoiceResponse`, etc.)
- [ ] Extract data from `response.data.data`
- [ ] Handle pagination if present
- [ ] Type the return value of service functions

### When Working with State
- [ ] Explicitly type useState hooks
- [ ] Use proper domain models (Invoice, User, etc.)
- [ ] Initialize with correct default values
- [ ] Avoid using `any`

## 📋 Code Review Checklist

### Type Safety
- [ ] No `any` types used
- [ ] All imports from `~/types`
- [ ] Props interfaces defined
- [ ] State properly typed
- [ ] API responses typed

### Consistency
- [ ] Uses centralized types
- [ ] No duplicate type definitions
- [ ] Matches backend API structure
- [ ] Follows naming conventions

### Best Practices
- [ ] Type-only imports where possible
- [ ] Generic types used appropriately
- [ ] Utility types leveraged (Partial, Pick, Omit)
- [ ] Type guards for runtime checks

## 🎯 Common Tasks Checklist

### Task: Create New Component
- [ ] Import required types from `~/types`
- [ ] Define Props interface if needed
- [ ] Type all state variables
- [ ] Type event handlers
- [ ] Type ref objects

### Task: Create New Service Function
- [ ] Import domain types (Invoice, User, etc.)
- [ ] Import response types (InvoicesResponse, etc.)
- [ ] Type function parameters
- [ ] Type return value
- [ ] Handle errors with proper types

### Task: Create New Form
- [ ] Create FormData interface in `~/types`
- [ ] Use `FormErrors<T>` for errors
- [ ] Use `TouchedFields<T>` for touched
- [ ] Type validation functions
- [ ] Type submit handler

### Task: Work with API
- [ ] Check backend response structure
- [ ] Ensure types match exactly
- [ ] Use generic ApiResponse<T>
- [ ] Handle pagination properly
- [ ] Type axios response

## 🔍 Quality Checks

### TypeScript Compilation
- [ ] `npm run typecheck` passes
- [ ] No type errors in IDE
- [ ] All imports resolve
- [ ] No implicit `any` warnings

### Runtime Validation
- [ ] Form validation matches types
- [ ] API responses match types
- [ ] Type guards work correctly
- [ ] Error handling is type-safe

### Documentation
- [ ] Complex types have comments
- [ ] Usage examples provided
- [ ] Migration notes if needed
- [ ] Breaking changes documented

## ⚠️ Common Pitfalls to Avoid

### ❌ DON'T
```typescript
// Don't define types locally
interface User {
  name: string;
}

// Don't use any
const data: any = response.data;

// Don't skip type annotations
const [invoices, setInvoices] = useState([]);

// Don't duplicate types
export interface Invoice { ... }
```

### ✅ DO
```typescript
// Import from central location
import type { User } from '~/types';

// Use specific types
const data: InvoicesResponse = response.data;

// Always type state
const [invoices, setInvoices] = useState<Invoice[]>([]);

// Use centralized types
import { Invoice } from '~/types';
```

## 📝 Type Definition Checklist

When adding new types to `app/types/index.ts`:

- [ ] Add JSDoc comments for complex types
- [ ] Group related types together
- [ ] Export all new types
- [ ] Use consistent naming (PascalCase for types)
- [ ] Add to appropriate section
- [ ] Update documentation
- [ ] Test in actual usage

### Example:
```typescript
/**
 * Represents a payment transaction
 * @property id - Unique transaction identifier
 * @property amount - Transaction amount in cents
 * @property status - Current transaction status
 */
export interface PaymentTransaction {
  id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}
```

## 🔄 Refactoring Checklist

When refactoring existing code to use centralized types:

- [ ] Identify local type definitions
- [ ] Check if type exists in `~/types`
- [ ] If not, add to `~/types`
- [ ] Replace local definition with import
- [ ] Update all usages
- [ ] Test compilation
- [ ] Run type check
- [ ] Update tests if needed

## 🚀 Deployment Checklist

Before deploying:

- [ ] All type checks pass
- [ ] No TypeScript errors
- [ ] Types match backend API
- [ ] Documentation updated
- [ ] Examples tested
- [ ] No breaking changes (or documented)

## 📊 Performance Checklist

- [ ] No circular type dependencies
- [ ] Efficient use of generics
- [ ] Minimal type complexity
- [ ] Type inference used where possible
- [ ] No unnecessary type assertions

## 🎓 Learning Checklist

For new team members:

- [ ] Read `TYPES_DOCUMENTATION.md`
- [ ] Review `TYPES_QUICK_REFERENCE.md`
- [ ] Study `TYPES_ARCHITECTURE.md`
- [ ] Explore `app/types/index.ts`
- [ ] Review example services
- [ ] Practice with simple component
- [ ] Ask questions when unsure

## 🔗 Quick Reference Links

| Resource | Purpose |
|----------|---------|
| `app/types/index.ts` | Type definitions |
| `TYPES_DOCUMENTATION.md` | Full documentation |
| `TYPES_QUICK_REFERENCE.md` | Quick lookup |
| `TYPES_ARCHITECTURE.md` | System architecture |
| `TYPES_MIGRATION_SUMMARY.md` | Migration guide |

## ✨ Summary

**Before every commit:**
1. ✅ Run type check: `npm run typecheck`
2. ✅ Fix all type errors
3. ✅ Ensure imports from `~/types`
4. ✅ No `any` types used
5. ✅ Documentation updated if needed

**Remember:**
- Types are your friends
- Centralized types = consistency
- Type safety catches bugs early
- Good types = better code

---

**Questions?** See full documentation in `TYPES_DOCUMENTATION.md`
