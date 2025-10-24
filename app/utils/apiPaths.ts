export const BASE_URL = "http://localhost:8000/api/v1";

export const API_PATHS = {
    AUTH:{
        REGISTER: '/auth/register',
        LOGIN: '/auth/login',
        GET_ME: '/auth/me',
        UPDATE_PROFILE: '/auth/me',
    },

    INVOICES: {
        CREATE_INVOICE: '/invoices/',
        GET_ALL_INVOICES: '/invoices/',
        GET_INVOICE_BY_ID: (invoiceId: string) => `/invoices/${invoiceId}`,
        UPDATE_INVOICE: (invoiceId: string) => `/invoices/${invoiceId}`,
        DELETE_INVOICE: (invoiceId: string) => `/invoices/${invoiceId}`,
    },

    AI:{
        PARSE_INVOICE_TEXT: '/ai/parse-text',
        GENERATE_REMINDER: '/ai/generate-reminder',
        GET_DASHBOARD_SUMMARY: '/ai/dashboard-summary',
    }
}