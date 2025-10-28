import { 
  Box, 
  Button, 
  Container, 
  Divider, 
  Paper, 
  Stack, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Typography 
} from "@mui/material";
import { AlertCircle, Edit, Loader2, MessageSquare, Printer } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router"
import type { Invoice, InvoiceFormData } from "~/types";
import axiosInstance from "~/utils/axiosInstance";
import logger from "~/utils/logger";
import { API_PATHS } from "~/utils/apiPaths";
import ReminderModal from "~/components/invoices/ReminderModal";
import moment from "moment";

const InvoiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState<boolean>(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await axiosInstance.get<{ data: Invoice }>(`/invoices/${id}`);
        setInvoice(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch invoice details.");
        logger.error('Error fetching invoice details', {
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handleUpdate = async (formData: InvoiceFormData) => {
    try {
      const response = await axiosInstance.put<{ data: Invoice }>(API_PATHS.INVOICES.UPDATE_INVOICE(id!), formData);
      toast.success("Invoice updated successfully!");
      setIsEditing(false);
      setInvoice(response.data.data);
    } catch (error) {
      toast.error('Failed to update the invoice');
      logger.error('Error updating invoice', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  const handleEdit = () => {
    if (invoice) {
      navigate('/invoices/create', { 
        state: { 
          existingInvoice: invoice 
        } 
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '44rem' }}>
        <Loader2 className="animate-spin mr-2 h-5 w-5 text-gray-600" />
      </Box>
    );
  }

  if (!invoice) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <AlertCircle size={64} color="#f44336" style={{ marginBottom: 16 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Invoice Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            The invoice you are looking for does not exist or could not be loaded.
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/invoices/all')}
          >
            Go Back to All Invoices
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header with Invoice ID and Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Invoice #{invoice.invoiceNumber}
        </Typography>
        
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setIsReminderModalOpen(true)}
            startIcon={<MessageSquare size={18} />}
          >
            Generate Reminder
          </Button>
          
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleEdit}
            startIcon={<Edit size={18} />}
          >
            Edit
          </Button>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrint}
            startIcon={<Printer size={18} />}
          >
            Print
          </Button>
        </Stack>
      </Box>

      {/* Invoice Details Section */}
      <Paper 
        ref={invoiceRef}
        elevation={2} 
        sx={{ p: 4, '@media print': { boxShadow: 'none', p: 2 } }}
      >
        {/* Invoice Header */}
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={3} 
          sx={{ mb: 4 }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              From
            </Typography>
            <Typography variant="body1" fontWeight="600">
              {invoice.billFrom.businessName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {invoice.billFrom.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {invoice.billFrom.phoneNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {invoice.billFrom.address}
            </Typography>
          </Box>

          <Box sx={{ flex: 1, textAlign: { xs: 'left', md: 'right' } }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              To
            </Typography>
            <Typography variant="body1" fontWeight="600">
              {invoice.billTo.clientName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {invoice.billTo.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {invoice.billTo.phoneNumber}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {invoice.billTo.address}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Invoice Dates and Status */}
        <Stack 
          direction={{ xs: 'column', sm: 'row' }} 
          spacing={3} 
          sx={{ mb: 4 }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Invoice Date
            </Typography>
            <Typography variant="body1" fontWeight="600">
              {moment(invoice.invoiceDate).format('MMM DD, YYYY')}
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Due Date
            </Typography>
            <Typography variant="body1" fontWeight="600">
              {moment(invoice.dueDate).format('MMM DD, YYYY')}
            </Typography>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Status
            </Typography>
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                px: 2,
                py: 0.5,
                borderRadius: 1,
                bgcolor: invoice.status === 'Paid' ? '#e8f5e9' : invoice.status === 'Unpaid' ? '#ffebee' : '#fff3e0',
                color: invoice.status === 'Paid' ? '#2e7d32' : invoice.status === 'Unpaid' ? '#c62828' : '#e65100',
                fontWeight: 600,
                fontSize: '0.875rem'
              }}
            >
              {invoice.status}
            </Box>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Items Table */}
        <TableContainer sx={{ mb: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Item</strong></TableCell>
                <TableCell align="right"><strong>Quantity</strong></TableCell>
                <TableCell align="right"><strong>Unit Price</strong></TableCell>
                <TableCell align="right"><strong>Tax %</strong></TableCell>
                <TableCell align="right"><strong>Total</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoice.items.map((item, index) => (
                <TableRow key={item._id || index}>
                  <TableCell>
                    <Typography variant="body2" fontWeight="600">
                      {item.name}
                    </Typography>
                    {item.description && (
                      <Typography variant="caption" color="text.secondary">
                        {item.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.unitPrice.toFixed(2)} DZD</TableCell>
                  <TableCell align="right">{item.taxPercent}%</TableCell>
                  <TableCell align="right">
                    <strong>{item.total.toFixed(2)} DZD</strong>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Totals Section */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
          <Box sx={{ minWidth: 300 }}>
            <Stack spacing={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Subtotal:</Typography>
                <Typography variant="body2">{invoice.subTotal.toFixed(2)} DZD</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Tax:</Typography>
                <Typography variant="body2">{invoice.taxTotal.toFixed(2)} DZD</Typography>
              </Box>
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" fontWeight="bold">Total:</Typography>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {invoice.total.toFixed(2)} DZD
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* Notes and Payment Terms */}
        {(invoice.notes || invoice.paymentTerms) && (
          <>
            <Divider sx={{ my: 3 }} />
            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              spacing={3}
            >
              {invoice.notes && (
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Notes
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {invoice.notes}
                  </Typography>
                </Box>
              )}
              {invoice.paymentTerms && (
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Payment Terms
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {invoice.paymentTerms}
                  </Typography>
                </Box>
              )}
            </Stack>
          </>
        )}
      </Paper>

      {/* Reminder Modal */}
      <ReminderModal
        open={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
        invoiceId={invoice._id}
      />
    </Container>
  );
}

export default InvoiceDetails;
