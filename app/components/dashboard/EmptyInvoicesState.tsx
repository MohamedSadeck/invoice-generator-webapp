import { Box, Button, Typography } from "@mui/material";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EmptyInvoicesState = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: 3,
        border: '1px solid rgb(226, 232, 240)',
        p: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: 2,
          bgcolor: 'rgb(248, 250, 252)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3
        }}
      >
        <FileText className="h-8 w-8 text-gray-400" />
      </Box>
      
      <Typography
        variant="h3"
        sx={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'rgb(15, 23, 42)',
          mb: 1
        }}
      >
        No invoices yet
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          fontSize: '0.875rem',
          color: 'rgb(71, 85, 105)',
          mb: 3,
          maxWidth: '400px'
        }}
      >
        You haven't created any invoices yet. Get started by creating your first one.
      </Typography>
      
      <Button
        variant="contained"
        onClick={() => navigate('/invoices/new')}
        sx={{
          bgcolor: 'rgb(37, 99, 235)',
          color: 'white',
          textTransform: 'none',
          px: 3,
          py: 1,
          fontSize: '0.875rem',
          fontWeight: 500,
          borderRadius: 2,
          '&:hover': {
            bgcolor: 'rgb(29, 78, 216)'
          }
        }}
      >
        Create Invoice
      </Button>
    </Box>
  );
};

export default EmptyInvoicesState;
