import { Card, CardContent, Typography, Stack, TextField } from "@mui/material";

interface BillFromData {
  businessName: string;
  email: string;
  address: string;
  phoneNumber: string;
}

interface BillFromSectionProps {
  billFrom: BillFromData;
  onBillFromChange: (field: string, value: string) => void;
}

const BillFromSection = ({ billFrom, onBillFromChange }: BillFromSectionProps) => {
  return (
    <Card sx={{ flex: 1 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Bill From
        </Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Business Name"
            value={billFrom.businessName}
            onChange={(e) => onBillFromChange('businessName', e.target.value)}
            required
          />
          <TextField
            fullWidth
            type="email"
            label="Email"
            value={billFrom.email}
            onChange={(e) => onBillFromChange('email', e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Address"
            value={billFrom.address}
            onChange={(e) => onBillFromChange('address', e.target.value)}
            multiline
            rows={3}
            required
          />
          <TextField
            fullWidth
            type="tel"
            label="Phone"
            value={billFrom.phoneNumber}
            onChange={(e) => onBillFromChange('phoneNumber', e.target.value)}
            required
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BillFromSection;
