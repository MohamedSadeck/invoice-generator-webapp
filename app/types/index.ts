/**
 * Central Type Definitions
 * 
 * All TypeScript interfaces and types used across the Invoice Generator application
 */

// ============================================================================
// User & Authentication Types
// ============================================================================

export interface User {
  _id: string;
  name: string;
  email: string;
  businessName?: string;
  address?: string;
  phoneNumber?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  register: (data: { user: User; token: string }) => void;
  login: (data: { user: User; token: string }) => void;
  updateUser: (user: User) => void;
  logout: () => void;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// ============================================================================
// Invoice Types
// ============================================================================

export type InvoiceStatus = 'Paid' | 'Unpaid' | 'All Statuses' | 'Pending';

export interface InvoiceItem {
  _id?: string;
  name: string;
  description?: string; // Optional for backward compatibility
  quantity: number;
  unitPrice: number;
  taxPercent: number;
  total: number;
}

export interface BillFrom {
  businessName: string;
  email: string;
  address: string;
  phoneNumber: string;
}

export interface BillTo {
  clientName: string;
  email: string;
  address: string;
  phoneNumber: string;
}

export interface Invoice {
  _id: string;
  user: User;
  invoiceNumber: string;
  invoiceDate: string; // ISO 8601 date string
  dueDate: string; // ISO 8601 date string
  billFrom: BillFrom;
  billTo: BillTo;
  items: InvoiceItem[];
  notes?: string;
  paymentTerms: string;
  status: InvoiceStatus;
  subTotal: number;
  taxTotal: number;
  total: number;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  __v?: number; // MongoDB version key
}

export interface CreateInvoiceRequest {
  invoiceDate: string;
  dueDate: string;
  billFrom: BillFrom;
  billTo: BillTo;
  items: Omit<InvoiceItem, '_id'>[]; // Items without _id when creating
  notes?: string;
  paymentTerms: string;
}

export interface UpdateInvoiceRequest extends Partial<CreateInvoiceRequest> {
  status?: InvoiceStatus;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination?: PaginationInfo;
}

export interface InvoicesResponse extends ApiResponse<Invoice[]> {
  pagination: PaginationInfo;
}

export interface InvoiceResponse extends ApiResponse<Invoice> {}

export interface UserResponse extends ApiResponse<User> {}

export interface AuthApiResponse extends ApiResponse<AuthResponse> {}

// ============================================================================
// Form Types
// ============================================================================

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface InvoiceFormData {
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

export type FormErrors<T> = {
  [K in keyof T]?: string;
}

export type TouchedFields<T> = {
  [K in keyof T]?: boolean;
}

// ============================================================================
// Dashboard & Statistics Types
// ============================================================================

export interface DashboardStats {
  totalInvoices: number;
  totalPaid: number;
  totalUnpaid: number;
  totalOverdue?: number;
  totalDraft?: number;
}

export interface RecentInvoice {
  _id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: InvoiceStatus;
  dueDate: string;
  createdAt: string;
}

// ============================================================================
// AI & Parsing Types
// ============================================================================

export interface ParseInvoiceTextRequest {
  text: string;
}

export interface ParseInvoiceTextResponse {
  invoiceData: Partial<CreateInvoiceRequest>;
  confidence: number;
}

export interface GenerateReminderRequest {
  invoiceId: string;
  reminderType: 'gentle' | 'firm' | 'final';
}

export interface GenerateReminderResponse {
  reminderText: string;
  subject: string;
}

export interface DashboardSummaryRequest {
  startDate?: string;
  endDate?: string;
}

export interface DashboardSummaryData {
  invoiceCount: number;
  totalRevenue: string;
  totalOutstanding: string;
  insights: string[];
}

export interface DashboardSummaryResponse {
  success: boolean;
  data: DashboardSummaryData;
}

// ============================================================================
// Logger Types
// ============================================================================

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

export interface LogContext {
  [key: string]: any;
}

// ============================================================================
// Landing Page Types
// ============================================================================

export interface Feature {
  id: string;
  title: string;
  description: string;
  bullets?: string[];
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatarUrl?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// ============================================================================
// Utility Types
// ============================================================================

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

// ============================================================================
// Hook Return Types
// ============================================================================

export interface UseApiCallReturn<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface UseFormReturn<T> {
  values: T;
  errors: FormErrors<T>;
  isSubmitting: boolean;
  handleChange: (name: keyof T, value: any) => void;
  handleSubmit: (e?: React.FormEvent) => Promise<void>;
  resetForm: () => void;
  setErrors: (errors: FormErrors<T>) => void;
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface LayoutProps {
  children: React.ReactNode;
}

export interface RouteErrorBoundaryProps {
  error: unknown;
}

// ============================================================================
// Table & List Types
// ============================================================================

export type SortOrder = 'asc' | 'desc';

export interface SortConfig<T> {
  key: keyof T;
  direction: SortOrder;
}

export interface FilterConfig {
  status?: InvoiceStatus[];
  dateRange?: DateRange;
  searchQuery?: string;
}

// ============================================================================
// Export all types as a namespace for organized imports
// ============================================================================

export default {
  // Re-export everything for convenience
};
