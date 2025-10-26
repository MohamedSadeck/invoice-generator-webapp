import { Box } from "@mui/material";
import { FileText, DollarSign, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "~/utils/apiPaths";
import axiosInstance from "~/utils/axiosInstance";
import logger from "~/utils/logger";
import type { Invoice, DashboardStats, InvoicesResponse } from "~/types";

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalInvoices: 0,
    totalPaid: 0,
    totalUnpaid: 0,
  });

  const [recentInvoices, setRecentInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try{
        const response = await axiosInstance.get<InvoicesResponse>(API_PATHS.INVOICES.GET_ALL_INVOICES);
        const invoices = response.data.data;
        const totalInvoices = invoices.length;
        const totalPaid = invoices.reduce((sum: number, invoice: Invoice) => 
          sum + (invoice.status === 'Paid' ? invoice.total : 0), 0);
        const totalUnpaid = invoices.reduce((sum: number, invoice: Invoice) => 
          sum + (invoice.status !== 'Paid' ? invoice.total : 0), 0);
        setStats({ totalInvoices, totalPaid, totalUnpaid });
        setRecentInvoices(invoices.slice(0, 5));
      }catch(error){
        logger.error('Error fetching dashboard data', {
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }finally{
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const statsData = [
    {
      icon: FileText,
      label: "Total Invoices",
      value: stats.totalInvoices,
      color: "blue",
    },
    {
      icon: DollarSign,
      label: "Total Paid",
      value: `${stats.totalPaid.toFixed(2)}`,
      color: "green",
    },
    {
      icon: DollarSign,
      label: "Total Unpaid",
      value: `${stats.totalUnpaid.toFixed(2)}`,
      color: "red",
    },
  ];

  const colorClasses = {
    blue: { bg : "bg-blue-100", text: "text-blue-600" },
    green: { bg : "bg-green-100", text: "text-green-600" },
    red: { bg : "bg-red-100", text: "text-red-600" },
  }

  if(isLoading) {
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

export default Dashboard
