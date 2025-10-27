import { Box } from "@mui/material";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Invoice, InvoicesResponse, InvoiceResponse, InvoiceStatus } from "~/types";
import { API_PATHS } from "~/utils/apiPaths";
import axiosInstance from "~/utils/axiosInstance";
import logger from "~/utils/logger";
import CreateWithAiModal from "~/components/invoices/CreateWithAiModal";
import ReminderModal from "~/components/invoices/ReminderModal";
import AllInvoicesSection from "~/components/invoices/AllInvoicesSection";

const AllInvoices = () => {
  const [invoices, setInvoices] = useState<Array<Invoice>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusChangeLoading, setStatusChangeLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus>("All Statuses");
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState<boolean>(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      logger.info('Fetching all invoices');
      try {
        setIsLoading(true);
        const response = await axiosInstance.get<InvoicesResponse>(API_PATHS.INVOICES.GET_ALL_INVOICES);
        setInvoices(response.data.data);
      } catch (error) {
        setError("Failed to fetch invoices.");
        logger.error('Error fetching dashboard data', {
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleDelete = async (id: string) => {
    if(window.confirm("Are you sure you want to delete this invoice?")) {
      try {
        await axiosInstance.delete(API_PATHS.INVOICES.DELETE_INVOICE(id));
        setInvoices(prevInvoices => prevInvoices.filter(inv => inv._id !== id));
        logger.info(`Deleted invoice: ${id}`);
      } catch (error) {
        setError("Failed to delete invoice.");
        logger.error('Error deleting invoice', {
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
  };

  const handleStatusChange = async (invoice: Invoice) => {
    try {
      setStatusChangeLoading(true);
      const newStatus = invoice.status === "Paid" ? "Unpaid" : "Paid";
      logger.info(`Changing status to: ${newStatus}`);
      
      const response = await axiosInstance.put<InvoiceResponse>(
        API_PATHS.INVOICES.UPDATE_INVOICE(invoice._id),
        { status: newStatus }
      );
      setInvoices(prevInvoices =>
        prevInvoices.map(inv =>
          inv._id === invoice._id ? response.data.data : inv
        )
      );
    } catch (error) {
      logger.error('Error changing invoice status', {
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setStatusChangeLoading(false);
    }
  };

  const handleOpenReminderModal = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
    setIsReminderModalOpen(true);
  };

  const handleOpenAiModal = () => {
    setIsAiModalOpen(true);
  };

  const handleCreateInvoice = () => {
    navigate("/invoices/create");
  };

  const handleRowClick = (invoice: Invoice) => {
    navigate(`/invoices/${invoice._id}`);
  };

  const handleViewDetails = (invoiceId: string) => {
    navigate(`/invoices/${invoiceId}`);
  };

  const filteredInvoices = useMemo(() => {
    return invoices
    .filter(invoice => statusFilter === "All Statuses" || invoice.status === statusFilter)
    .filter(invoice => 
      invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.billTo.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [invoices, searchTerm, statusFilter]);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '44rem' }}>
        <Loader2 className="animate-spin mr-2 h-5 w-5 text-gray-600" />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <CreateWithAiModal open={false} onClose={function (): void {
        throw new Error("Function not implemented.");
      } }/>
      <ReminderModal open={false} onClose={function (): void {
        throw new Error("Function not implemented.");
      } } invoiceId={null} />
      <AllInvoicesSection
        invoices={filteredInvoices}
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onStatusFilterChange={setStatusFilter}
        onCreateWithAi={handleOpenAiModal}
        onCreateInvoice={handleCreateInvoice}
        onRowClick={handleRowClick}
        onMarkStatusChange={handleStatusChange}
        onViewDetails={handleViewDetails}
        onDelete={handleDelete}
        onSendReminder={handleOpenReminderModal}
        statusChangeLoading={statusChangeLoading}
      />

      <CreateWithAiModal
        open={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
      />

      <ReminderModal
        open={isReminderModalOpen}
        onClose={() => {
          setIsReminderModalOpen(false);
          setSelectedInvoiceId(null);
        }}
        invoiceId={selectedInvoiceId}
      />
    </Box>
  );
};

export default AllInvoices;
