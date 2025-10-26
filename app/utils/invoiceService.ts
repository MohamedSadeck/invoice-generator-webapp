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
import type { 
  Invoice, 
  CreateInvoiceRequest, 
  UpdateInvoiceRequest,
  InvoicesResponse,
  InvoiceResponse,
  ApiResponse 
} from '~/types';

const logger = createLogger('InvoiceService');

/**
 * Fetch all invoices
 */
export const getAllInvoices = async (): Promise<Invoice[]> => {
  try {
    logger.info('Fetching all invoices');
    
    const response = await axiosInstance.get<InvoicesResponse>(
      API_PATHS.INVOICES.GET_ALL_INVOICES
    );
    
    logger.info('Invoices fetched successfully', { 
      count: response.data.data.length 
    });
    
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Failed to load invoices';
    logger.error('Failed to fetch invoices', {
      error: error instanceof Error ? error.message : 'Unknown error',
      backendMessage: errorMessage
    });
    
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Fetch invoice by ID
 */
export const getInvoiceById = async (invoiceId: string): Promise<Invoice> => {
  try {
    logger.info('Fetching invoice by ID', { invoiceId });
    
    const response = await axiosInstance.get<InvoiceResponse>(
      API_PATHS.INVOICES.GET_INVOICE_BY_ID(invoiceId)
    );
    
    logger.info('Invoice fetched successfully', { 
      invoiceId,
      invoiceNumber: response.data.data.invoiceNumber 
    });
    
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Failed to load invoice details';
    logger.error('Failed to fetch invoice', {
      invoiceId,
      error: error instanceof Error ? error.message : 'Unknown error',
      backendMessage: errorMessage
    });
    
    toast.error(errorMessage);
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
      clientName: data.billTo.clientName,
      itemCount: data.items.length
    });
    
    const response = await axiosInstance.post<InvoiceResponse>(
      API_PATHS.INVOICES.CREATE_INVOICE,
      data
    );
    
    logger.info('Invoice created successfully', {
      invoiceId: response.data.data._id,
      invoiceNumber: response.data.data.invoiceNumber
    });
    
    toast.success('Invoice created successfully');
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Failed to create invoice';
    logger.error('Failed to create invoice', {
      clientName: data.billTo.clientName,
      error: error instanceof Error ? error.message : 'Unknown error',
      backendMessage: errorMessage
    });
    
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Update an existing invoice
 */
export const updateInvoice = async (
  invoiceId: string,
  data: UpdateInvoiceRequest
): Promise<Invoice> => {
  try {
    logger.info('Updating invoice', { invoiceId });
    
    const response = await axiosInstance.put<InvoiceResponse>(
      API_PATHS.INVOICES.UPDATE_INVOICE(invoiceId),
      data
    );
    
    logger.info('Invoice updated successfully', { invoiceId });
    
    toast.success('Invoice updated successfully');
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Failed to update invoice';
    logger.error('Failed to update invoice', {
      invoiceId,
      error: error instanceof Error ? error.message : 'Unknown error',
      backendMessage: errorMessage
    });
    
    toast.error(errorMessage);
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
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Failed to delete invoice';
    logger.error('Failed to delete invoice', {
      invoiceId,
      error: error instanceof Error ? error.message : 'Unknown error',
      backendMessage: errorMessage
    });
    
    toast.error(errorMessage);
    throw error;
  }
};

/**
 * Parse invoice text using AI
 */
export const parseInvoiceText = async (text: string): Promise<Partial<CreateInvoiceRequest>> => {
  try {
    logger.info('Parsing invoice text with AI', { 
      textLength: text.length 
    });
    
    const response = await axiosInstance.post<ApiResponse<Partial<CreateInvoiceRequest>>>(
      API_PATHS.AI.PARSE_INVOICE_TEXT,
      { text }
    );
    
    logger.info('Invoice text parsed successfully', {
      itemCount: response.data.data.items?.length || 0
    });
    
    return response.data.data;
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || 'Failed to parse invoice text';
    logger.error('Failed to parse invoice text', {
      textLength: text.length,
      error: error instanceof Error ? error.message : 'Unknown error',
      backendMessage: errorMessage
    });
    
    toast.error(errorMessage);
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
