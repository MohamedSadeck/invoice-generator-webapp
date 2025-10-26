import { Box, Button, Typography } from "@mui/material";
import { FileText, DollarSign, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "~/utils/apiPaths";
import axiosInstance from "~/utils/axiosInstance";
import logger from "~/utils/logger";
import type { Invoice, DashboardStats, InvoicesResponse } from "~/types";
import { index } from "@react-router/dev/routes";
import RecentInvoicesTable from "~/components/dashboard/RecentInvoicesTable";
import EmptyInvoicesState from "~/components/dashboard/EmptyInvoicesState";
import StatsCards, { type StatData } from "~/components/dashboard/StatsCards";
import AiInsightsCard from "~/components/dashboard/AiInsightsCard";

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
      try {
        const response = await axiosInstance.get<InvoicesResponse>(API_PATHS.INVOICES.GET_ALL_INVOICES);
        const invoices = response.data.data;
        const totalInvoices = invoices.length;
        const totalPaid = invoices.reduce((sum: number, invoice: Invoice) =>
          sum + (invoice.status === 'Paid' ? invoice.total : 0), 0);
        const totalUnpaid = invoices.reduce((sum: number, invoice: Invoice) =>
          sum + (invoice.status !== 'Paid' ? invoice.total : 0), 0);
        setStats({ totalInvoices, totalPaid, totalUnpaid });
        setRecentInvoices(invoices.slice(0, 5));
      } catch (error) {
        logger.error('Error fetching dashboard data', {
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const statsData: StatData[] = [
    {
      icon: FileText,
      label: "Total Invoices",
      value: stats.totalInvoices,
      color: "blue" as const,
    },
    {
      icon: DollarSign,
      label: "Total Paid",
      value: `${stats.totalPaid.toFixed(2)}`,
      color: "green" as const,
    },
    {
      icon: DollarSign,
      label: "Total Unpaid",
      value: `${stats.totalUnpaid.toFixed(2)}`,
      color: "red" as const,
    },
  ];

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '44rem' }}>
        <Loader2 className="animate-spin mr-2 h-5 w-5 text-gray-600" />
      </Box>
    )
  }

  return (
    <Box sx={{ m: 4, p: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography
          variant="h5"
          sx={{ fontSize: '1.25rem', fontWeight: 600, color: 'rgb(15, 23, 42)' }}
        >
          Dashboard
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: '0.875rem', color: 'rgb(71, 85, 105)', mt: 0.5 }}
        >
          A quick overview of your business finances.
        </Typography>
      </Box>
      {/* StatsCards */}
      <StatsCards stats={statsData} />
      
      {/* AI Insights Card */}
      <AiInsightsCard />

      {/* Recent Invoices */}
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ fontSize: '1.125rem', fontWeight: 600, color: 'rgb(15, 23, 42)' }}
          >
            Recent Invoices
          </Typography>
          <Button
            variant="outlined"
            onClick={() => navigate('/invoices')}
            sx={{
              textTransform: 'none',
              borderColor: 'rgb(226, 232, 240)',
              color: 'rgb(71, 85, 105)',
              fontSize: '0.875rem',
              '&:hover': {
                borderColor: 'rgb(203, 213, 225)',
                bgcolor: 'rgb(248, 250, 252)'
              }
            }}
          >
            View All
          </Button>
        </Box>
        {recentInvoices.length > 0
          ? <RecentInvoicesTable invoices={recentInvoices} />
          : <EmptyInvoicesState />
        }
      </Box>
    </Box>
  )
}

export default Dashboard
