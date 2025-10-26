import { Card, CardContent, Typography, Stack, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import type { Moment } from "moment";

interface InvoiceDetailsSectionProps {
  invoiceNumber: string | undefined;
  invoiceDate: string;
  dueDate: string;
  isGeneratingNumber: boolean;
  onInvoiceNumberChange: (value: string) => void;
  onInvoiceDateChange: (value: string) => void;
  onDueDateChange: (value: string) => void;
}

const InvoiceDetailsSection = ({
  invoiceNumber,
  invoiceDate,
  dueDate,
  isGeneratingNumber,
  onInvoiceNumberChange,
  onInvoiceDateChange,
  onDueDateChange,
}: InvoiceDetailsSectionProps) => {
  const handleInvoiceDateChange = (date: Moment | null) => {
    if (date && date.isValid()) {
      onInvoiceDateChange(date.format('YYYY-MM-DD'));
    }
  };

  const handleDueDateChange = (date: Moment | null) => {
    if (date && date.isValid()) {
      onDueDateChange(date.format('YYYY-MM-DD'));
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Invoice Details
        </Typography>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Stack 
            direction={{ xs: 'column', md: 'row' }} 
            spacing={3} 
            sx={{ mt: 2 }}
          >
            <TextField
              fullWidth
              label="Invoice Number"
              value={invoiceNumber || ''}
              onChange={(e) => onInvoiceNumberChange(e.target.value)}
              required
              disabled={isGeneratingNumber}
            />
            <DatePicker
              label="Invoice Date"
              value={moment(invoiceDate)}
              onChange={handleInvoiceDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                }
              }}
            />
            <DatePicker
              label="Due Date"
              value={moment(dueDate)}
              onChange={handleDueDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required: true,
                }
              }}
            />
          </Stack>
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
};

export default InvoiceDetailsSection;
