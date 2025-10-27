import { Box } from "@mui/material";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Invoice, InvoicesResponse } from "~/types";
import { API_PATHS } from "~/utils/apiPaths";
import axiosInstance from "~/utils/axiosInstance";
import logger from "~/utils/logger";

const AllInvoices = () => {
  const [invoices, setInvoices] = useState<Array<Invoice>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [statusChangeLoading, setStatusChangeLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState<boolean>(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
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

  const handleDelete = async (id:String) => {

  }

  const handleStatusChange = async (invoice: Invoice) => {
  };

  const handleOpenReminderModal = (invoiceId: string) => {
    setSelectedInvoiceId(invoiceId);
    setIsReminderModalOpen(true);
  };

  const filteredInvoices = useMemo(() => {
    return invoices
    .filter(invoice => statusFilter === "All" || invoice.status === statusFilter)
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
    )
  }

  return (
    <Box>
      
    </Box>
  )
}

export default AllInvoices
