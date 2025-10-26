import { Card, CardContent, Typography, Stack, TextField } from "@mui/material";

interface BillToData {
  clientName: string;
  email: string;
  address: string;
  phoneNumber: string;
}

interface BillToSectionProps {
  billTo: BillToData;
  onBillToChange: (field: string, value: string) => void;
}

const BillToSection = ({ billTo, onBillToChange }: BillToSectionProps) => {
  return (
    <Card sx={{ flex: 1 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Bill To
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Client Name"
            value={billTo.clientName}
            onChange={(e) => onBillToChange('clientName', e.target.value)}
            required
          />
          <TextField
            fullWidth
            type="email"
            label="Client Email"
            value={billTo.email}
            onChange={(e) => onBillToChange('email', e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Client Address"
            value={billTo.address}
            onChange={(e) => onBillToChange('address', e.target.value)}
            multiline
            rows={3}
            required
          />
          <TextField
            fullWidth
            type="tel"
            label="Client Phone"
            value={billTo.phoneNumber}
            onChange={(e) => onBillToChange('phoneNumber', e.target.value)}
            required
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BillToSection;
