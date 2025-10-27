import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Invoice } from "~/types";

interface RecentInvoicesTableProps {
  invoices: Invoice[];
}

const RecentInvoicesTable = ({ invoices }: RecentInvoicesTableProps) => {
  const navigate = useNavigate();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return { bg: 'rgb(220, 252, 231)', text: 'rgb(22, 163, 74)' };
      case 'unpaid':
        return { bg: 'rgb(254, 226, 226)', text: 'rgb(220, 38, 38)' };
      case 'overdue':
        return { bg: 'rgb(254, 215, 170)', text: 'rgb(234, 88, 12)' };
      case 'draft':
        return { bg: 'rgb(226, 232, 240)', text: 'rgb(71, 85, 105)' };
      default:
        return { bg: 'rgb(226, 232, 240)', text: 'rgb(71, 85, 105)' };
    }
  };

  return (
    <Box sx={{ 
      bgcolor: 'white', 
      borderRadius: 3, 
      border: '1px solid rgb(226, 232, 240)',
      overflow: 'hidden'
    }}>
      <Box sx={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgb(248, 250, 252)', borderBottom: '1px solid rgb(226, 232, 240)' }}>
              <th style={{ 
                padding: '12px 16px', 
                textAlign: 'left', 
                fontSize: '0.875rem', 
                fontWeight: 600,
                color: 'rgb(71, 85, 105)'
              }}>
                Client
              </th>
              <th style={{ 
                padding: '12px 16px', 
                textAlign: 'left', 
                fontSize: '0.875rem', 
                fontWeight: 600,
                color: 'rgb(71, 85, 105)'
              }}>
                Amount
              </th>
              <th style={{ 
                padding: '12px 16px', 
                textAlign: 'left', 
                fontSize: '0.875rem', 
                fontWeight: 600,
                color: 'rgb(71, 85, 105)'
              }}>
                Status
              </th>
              <th style={{ 
                padding: '12px 16px', 
                textAlign: 'left', 
                fontSize: '0.875rem', 
                fontWeight: 600,
                color: 'rgb(71, 85, 105)'
              }}>
                Due Date
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => {
              const statusColors = getStatusColor(invoice.status);
              return (
                <tr 
                  key={invoice._id}
                  onClick={() => navigate(`/invoices/${invoice._id}`)}
                  style={{ 
                    borderBottom: '1px solid rgb(226, 232, 240)',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(248, 250, 252)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td style={{ padding: '16px' }}>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 500, color: 'rgb(15, 23, 42)' }}>
                      {invoice.billTo.clientName}
                    </Typography>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: 'rgb(71, 85, 105)' }}>
                      {invoice.total.toFixed(2)} DZD
                    </Typography>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        px: 2,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        bgcolor: statusColors.bg,
                        color: statusColors.text
                      }}
                    >
                      {invoice.status}
                    </Box>
                  </td>
                  <td style={{ padding: '16px' }}>
                    <Typography sx={{ fontSize: '0.875rem', color: 'rgb(71, 85, 105)' }}>
                      {formatDate(invoice.dueDate)}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default RecentInvoicesTable;
