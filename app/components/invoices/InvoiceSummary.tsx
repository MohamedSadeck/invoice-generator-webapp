import { Card, CardContent, Typography, Stack, Box, Divider } from "@mui/material";

interface InvoiceSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
}

const InvoiceSummary = ({ subtotal, tax, total }: InvoiceSummaryProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Summary
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="text.secondary">Subtotal:</Typography>
            <Typography fontWeight="500">
              ${subtotal.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="text.secondary">Tax:</Typography>
            <Typography fontWeight="500">
              ${tax.toFixed(2)}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 1 }}>
            <Typography variant="h6" fontWeight="600">Total:</Typography>
            <Typography variant="h6" fontWeight="700" color="primary">
              ${total.toFixed(2)}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default InvoiceSummary;
