/**
 * Invoice Service
 * 
 * Service layer for invoice-related API operations
 * Demonstrates proper logger usage with API calls
 */

import axiosInstance from './axiosInstance';
import { API_PATHS } from './apiPaths';
import { createLogger } from './logger';
import toast from 'react-hot-toast';

const logger = createLogger('InvoiceService');

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  createdAt: string;
}

export interface CreateInvoiceRequest {
  clientName: string;
  amount: number;
  dueDate: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

/**
 * Fetch all invoices
 */
export const getAllInvoices = async (): Promise<Invoice[]> => {
  try {
    logger.info('Fetching all invoices');
    
    const response = await axiosInstance.get<Invoice[]>(
      API_PATHS.INVOICES.GET_ALL_INVOICES
    );
    
    logger.info('Invoices fetched successfully', { 
      count: response.data.length 
    });
    
    return response.data;
  } catch (error) {
    logger.error('Failed to fetch invoices', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    toast.error('Failed to load invoices');
    throw error;
  }
};

/**
 * Fetch invoice by ID
 */
export const getInvoiceById = async (invoiceId: string): Promise<Invoice> => {
  try {
    logger.info('Fetching invoice by ID', { invoiceId });
    
    const response = await axiosInstance.get<Invoice>(
      API_PATHS.INVOICES.GET_INVOICE_BY_ID(invoiceId)
    );
    
    logger.info('Invoice fetched successfully', { 
      invoiceId,
      invoiceNumber: response.data.invoiceNumber 
    });
    
    return response.data;
  } catch (error) {
    logger.error('Failed to fetch invoice', {
      invoiceId,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    toast.error('Failed to load invoice details');
    throw error;
  }
};

/**
 * Create a new invoice
 */
export const createInvoice = async (
  data: CreateInvoiceRequest
): Promise<Invoice> => {
  try {
    logger.info('Creating new invoice', {
      clientName: data.clientName,
      amount: data.amount,
      itemCount: data.items.length
    });
    
    const response = await axiosInstance.post<Invoice>(
      API_PATHS.INVOICES.CREATE_INVOICE,
      data
    );
    
    logger.info('Invoice created successfully', {
      invoiceId: response.data.id,
      invoiceNumber: response.data.invoiceNumber
    });
    
    toast.success('Invoice created successfully');
    return response.data;
  } catch (error) {
    logger.error('Failed to create invoice', {
      clientName: data.clientName,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    toast.error('Failed to create invoice');
    throw error;
  }
};

/**
 * Update an existing invoice
 */
export const updateInvoice = async (
  invoiceId: string,
  data: Partial<CreateInvoiceRequest>
): Promise<Invoice> => {
  try {
    logger.info('Updating invoice', { invoiceId });
    
    const response = await axiosInstance.put<Invoice>(
      API_PATHS.INVOICES.UPDATE_INVOICE(invoiceId),
      data
    );
    
    logger.info('Invoice updated successfully', { invoiceId });
    
    toast.success('Invoice updated successfully');
    return response.data;
  } catch (error) {
    logger.error('Failed to update invoice', {
      invoiceId,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    toast.error('Failed to update invoice');
    throw error;
  }
};

/**
 * Delete an invoice
 */
export const deleteInvoice = async (invoiceId: string): Promise<void> => {
  try {
    logger.info('Deleting invoice', { invoiceId });
    
    await axiosInstance.delete(
      API_PATHS.INVOICES.DELETE_INVOICE(invoiceId)
    );
    
    logger.info('Invoice deleted successfully', { invoiceId });
    
    toast.success('Invoice deleted successfully');
  } catch (error) {
    logger.error('Failed to delete invoice', {
      invoiceId,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    toast.error('Failed to delete invoice');
    throw error;
  }
};

/**
 * Parse invoice text using AI
 */
export const parseInvoiceText = async (text: string): Promise<CreateInvoiceRequest> => {
  try {
    logger.info('Parsing invoice text with AI', { 
      textLength: text.length 
    });
    
    const response = await axiosInstance.post<CreateInvoiceRequest>(
      API_PATHS.AI.PARSE_INVOICE_TEXT,
      { text }
    );
    
    logger.info('Invoice text parsed successfully', {
      itemCount: response.data.items.length
    });
    
    return response.data;
  } catch (error) {
    logger.error('Failed to parse invoice text', {
      textLength: text.length,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    
    toast.error('Failed to parse invoice text');
    throw error;
  }
};

export default {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  parseInvoiceText,
};
