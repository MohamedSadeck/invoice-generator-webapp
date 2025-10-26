# Invoice Components

This directory contains modular, reusable components for the invoice creation and editing functionality.

## Components Overview

### 1. InvoiceDetailsSection
Handles the basic invoice information including invoice number and dates.

**Features:**
- Invoice number field with auto-generation support
- Date pickers for invoice date and due date (using MUI DatePicker)
- Responsive layout

**Props:**
- `invoiceNumber`: string | undefined
- `invoiceDate`: string
- `dueDate`: string
- `isGeneratingNumber`: boolean
- `onInvoiceNumberChange`: (value: string) => void
- `onInvoiceDateChange`: (value: string) => void
- `onDueDateChange`: (value: string) => void

### 2. BillFromSection
Displays and manages the business/sender information.

**Props:**
- `billFrom`: BillFromData
- `onBillFromChange`: (field: string, value: string) => void

### 3. BillToSection
Displays and manages the client/recipient information.

**Props:**
- `billTo`: BillToData
- `onBillToChange`: (field: string, value: string) => void

### 4. ItemsSection
Manages the list of invoice items with calculations.

**Features:**
- Add/remove items
- Automatic total calculation per item
- Inline editing in table format

**Props:**
- `items`: InvoiceItem[]
- `onItemChange`: (index: number, field: string, value: any) => void
- `onAddItem`: () => void
- `onDeleteItem`: (index: number) => void

### 5. NotesAndTermsSection
Handles additional invoice notes and payment terms.

**Props:**
- `notes`: string | undefined
- `paymentTerms`: string
- `onNotesChange`: (value: string) => void
- `onPaymentTermsChange`: (value: string) => void

### 6. InvoiceSummary
Displays the calculated invoice totals.

**Features:**
- Subtotal display
- Tax total display
- Grand total display

**Props:**
- `subtotal`: number
- `tax`: number
- `total`: number

## Dependencies

- `@mui/material` - UI components
- `@mui/x-date-pickers` - Date picker components
- `moment` - Date manipulation
- `lucide-react` - Icons

## Usage Example

```tsx
import {
  InvoiceDetailsSection,
  BillFromSection,
  BillToSection,
  ItemsSection,
  NotesAndTermsSection,
  InvoiceSummary
} from '~/components/invoices';

// In your component
<InvoiceDetailsSection
  invoiceNumber={formData.invoiceNumber}
  invoiceDate={formData.invoiceDate}
  dueDate={formData.dueDate}
  isGeneratingNumber={isGeneratingNumber}
  onInvoiceNumberChange={(value) => handleInputChange('invoiceNumber', value)}
  onInvoiceDateChange={(value) => handleInputChange('invoiceDate', value)}
  onDueDateChange={(value) => handleInputChange('dueDate', value)}
/>
```

## Notes

- All components use Material-UI for consistent styling
- Date pickers require `LocalizationProvider` wrapper (already included in InvoiceDetailsSection)
- Components are fully typed with TypeScript
- All components are responsive and mobile-friendly
