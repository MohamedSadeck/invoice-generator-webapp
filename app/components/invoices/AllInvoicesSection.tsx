import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import { Search, Plus, Sparkles, Eye, Trash2, Mail } from "lucide-react";
import type { Invoice, InvoiceStatus } from "~/types";

interface AllInvoicesSectionProps {
  invoices: Invoice[];
  searchTerm: string;
  statusFilter: InvoiceStatus;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (status: InvoiceStatus) => void;
  onCreateWithAi: () => void;
  onCreateInvoice: () => void;
  onRowClick: (invoice: Invoice) => void;
  onMarkStatusChange: (invoice: Invoice) => void;
  onViewDetails: (invoiceId: string) => void;
  onDelete: (invoiceId: string) => void;
  onSendReminder: (invoiceId: string) => void;
  statusChangeLoading: boolean;
}

const AllInvoicesSection = ({
  invoices,
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusFilterChange,
  onCreateWithAi,
  onCreateInvoice,
  onRowClick,
  onMarkStatusChange,
  onViewDetails,
  onDelete,
  onSendReminder,
  statusChangeLoading,
}: AllInvoicesSectionProps) => {
  const getStatusColor = (status: InvoiceStatus) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "success";
      case "unpaid":
        return "error";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ar-DZ", {
      style: "currency",
      currency: "DZD",
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Box>
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            All Invoices
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage all your invoices in one place
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<Sparkles size={18} />}
            onClick={onCreateWithAi}
            sx={{ textTransform: "none" }}
          >
            Create with AI
          </Button>
          <Button
            variant="contained"
            startIcon={<Plus size={18} />}
            onClick={onCreateInvoice}
            sx={{ textTransform: "none" }}
          >
            Create Invoice
          </Button>
        </Box>
      </Box>

      {/* Filters Section */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          placeholder="Search invoices..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
          size="small"
        />
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <Select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value as InvoiceStatus)}
          >
            <MenuItem value="All Statuses">All Statuses</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Unpaid">Unpaid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #e0e0e0" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: 600 }}>Invoice</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Client</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Amount</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Due Date</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <Typography color="text.secondary">
                    No invoices found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((invoice) => (
                <TableRow
                  key={invoice._id}
                  hover
                  onClick={() => onRowClick(invoice)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { bgcolor: "#f9f9f9" },
                  }}
                >
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {invoice.invoiceNumber}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {invoice.billTo.clientName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {formatCurrency(invoice.total)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(invoice.dueDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={invoice.status}
                      color={getStatusColor(invoice.status)}
                      size="small"
                      sx={{ fontWeight: 500 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkStatusChange(invoice);
                        }}
                        disabled={statusChangeLoading}
                        sx={{ textTransform: "none", minWidth: "auto" }}
                      >
                        {invoice.status === "Paid" ? "Mark Unpaid" : "Mark Paid"}
                      </Button>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(invoice._id);
                        }}
                      >
                        <Eye size={18} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(invoice._id);
                        }}
                      >
                        <Trash2 size={18} />
                        </IconButton>
                      {invoice.status === "Unpaid" && (
                        <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSendReminder(invoice._id);
                        }}
                      >
                        <Mail size={18} />
                      </IconButton>)}
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AllInvoicesSection;
